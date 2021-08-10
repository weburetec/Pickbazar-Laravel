import Button from "@components/ui/button";
import FormattedInput from "@components/ui/formatted-input";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import { useCheckout } from "@contexts/checkout.context";
import {
  useOrderStatusesQuery,
  QueryOrderStatusesOrderByColumn,
  SortOrder,
} from "@graphql/order_status.graphql";
import { useCreateOrderMutation } from "@graphql/orders.graphql";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import ValidationError from "@components/ui/validation-error";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCart } from "@contexts/quick-cart/cart.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";

interface FormValues {
  payment_gateway: "CASH_ON_DELIVERY" | "STRIPE";
  contact: string;
  card: {
    number: string;
    expiry: string;
    cvc: string;
    email: string;
  };
}

const paymentSchema = Yup.object().shape({
  contact: Yup.string().min(8).required("error-contact-required"),
  payment_gateway: Yup.string()
    .default("STRIPE")
    .oneOf(["CASH_ON_DELIVERY", "STRIPE"]),
  card: Yup.mixed().when("payment_gateway", {
    is: (value: string) => value === "STRIPE",
    then: Yup.object().shape({
      number: Yup.string().required("error-card-required"),
      expiry: Yup.string().required("error-expiry-date"),
      cvc: Yup.string().required("error-cvc"),
      email: Yup.string().email().required("error-email-required"),
    }),
  }),
});

const PaymentForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [createOrder, { loading }] = useCreateOrderMutation({
    onCompleted: (data) => {
      if (data?.createOrder?.tracking_number) {
        router.push(`${ROUTES.ORDERS}/${data?.createOrder?.tracking_number}`);
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const { data: orderStatusData } = useOrderStatusesQuery({
    variables: {
      first: 100,
      page: 1,
      orderBy: [
        {
          column: QueryOrderStatusesOrderByColumn.Serial,
          order: SortOrder.Asc,
        },
      ],
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      payment_gateway: "STRIPE",
    },
  });

  const { items } = useCart();
  const {
    billing_address,
    shipping_address,
    delivery_time,
    checkoutData,
    coupon,
    discount,
  } = useCheckout();

  const available_items = items?.filter(
    (item) => !checkoutData?.unavailable_products?.includes(item.id)
  );

  const subtotal = calculateTotal(available_items);
  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: checkoutData?.total_tax!,
      shipping_charge: checkoutData?.shipping_charge!,
    },
    discount
  );
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    let input = {
      //@ts-ignore
      products: available_items?.map((item) => formatOrderedProduct(item)),
      customer_contact: values.contact,
      status: orderStatusData?.orderStatuses?.data[0]?.id ?? 1,
      amount: subtotal,
      coupon_id: coupon?.id,
      discount: discount ?? 0,
      paid_total: total,
      total,
      sales_tax: checkoutData?.total_tax,
      delivery_fee: checkoutData?.shipping_charge,
      delivery_time: delivery_time?.description,
      payment_gateway: values.payment_gateway,
      billing_address: {
        ...(billing_address?.address && billing_address.address),
      },
      shipping_address: {
        ...(shipping_address?.address && shipping_address.address),
      },
    };
    if (values.payment_gateway !== "CASH_ON_DELIVERY") {
      // @ts-ignore
      input.card = {
        number: values.card.number,
        expiryMonth: values.card.expiry?.split("/")[0],
        expiryYear: values.card.expiry?.split("/")[1],
        cvv: values.card.cvc,
        email: values.card.email,
      };
    }
    delete input.billing_address.__typename;
    delete input.shipping_address.__typename;
    createOrder({
      variables: {
        // @ts-ignore
        input,
      },
    });
  };
  const isCashOnDelivery = watch("payment_gateway");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col"
    >
      <Input
        {...register("contact")}
        label={t("text-enter-contact-number")}
        variant="outline"
        className="flex-1"
        onChange={(e) => setValue("contact", maskPhoneNumber(e.target.value))}
        error={t(errors?.contact?.message!)}
      />

      <div className="my-6">
        <Label>{t("text-payment-gateway")}</Label>
        <div className="space-s-4 flex items-center">
          <Radio
            id="stripe"
            type="radio"
            {...register("payment_gateway")}
            value="STRIPE"
            label={t("text-stripe")}
          />

          <Radio
            id="cod"
            type="radio"
            {...register("payment_gateway")}
            value="CASH_ON_DELIVERY"
            label={t("text-cash-on-delivery")}
          />
        </div>
      </div>

      {isCashOnDelivery === "STRIPE" && (
        <div>
          <Label>{t("text-card-info")}</Label>

          <Input
            {...register("card.email")}
            variant="outline"
            placeholder={t("text-email")}
            error={t(errors.card?.email?.message!)}
          />

          <FormattedInput
            variant="outline"
            placeholder={t("placeholder-card-number")}
            {...register("card.number")}
            options={{
              creditCard: true,
            }}
            error={t(errors.card?.number?.message!)}
          />

          <div className="flex space-s-4 w-full">
            <FormattedInput
              variant="outline"
              className="w-1/2"
              placeholder={t("placeholder-m-y")}
              options={{ date: true, datePattern: ["m", "y"] }}
              {...register("card.expiry")}
              error={t(errors.card?.expiry?.message!)}
            />
            <FormattedInput
              variant="outline"
              className="w-1/2"
              placeholder={t("placeholder-cvc")}
              options={{ blocks: [4] }}
              {...register("card.cvc")}
              error={t(errors.card?.cvc?.message!)}
            />
          </div>
        </div>
      )}
      {!subtotal && <ValidationError message={t("error-order-unavailable")} />}
      {total < 0 && (
        <div className="mt-3">
          <ValidationError message={t("error-cant-process-order")} />
        </div>
      )}
      <Button
        loading={loading}
        disabled={!subtotal || total < 0}
        className="w-full lg:w-auto lg:ms-auto mt-5"
      >
        {t("text-place-order")}
      </Button>
    </form>
  );
};

export default PaymentForm;
