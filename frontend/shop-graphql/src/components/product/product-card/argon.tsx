import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import usePrice from "@utils/use-price";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";

type ArgonProps = {
  product: any;
  className?: string;
};

const Argon: React.FC<ArgonProps> = ({ product, className }) => {
  const { t } = useTranslation("common");
  const { name, image, quantity } = product ?? {};
  const { openModal } = useModalAction();
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });
  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.slug);
  }

  return (
    <article
      className={cn(
        "product-card cart-type-argon rounded bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5 h-full",
        className
      )}
      onClick={handleProductQuickView}
      role="button"
    >
      <div className="relative flex items-center justify-center w-auto h-48 sm:h-52">
        <span className="sr-only">{t("text-product-image")}</span>
        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 start-3 md:top-4 md:start-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )}
        <div className="absolute top-3 end-3 md:top-4 md:end-4">
          {quantity > 0 ? (
            <AddToCart variant="argon" data={product} />
          ) : (
            <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
              {t("text-out-stock")}
            </div>
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm md:text-base text-heading font-semibold">
            {basePrice ? basePrice : price}
          </span>
          {discount && (
            <del className="text-xs md:text-sm text-body ms-2">{price}</del>
          )}
        </div>
        {/* End of product price */}

        <h3 className="text-xs md:text-sm text-body">{name}</h3>
        {/* End of product title */}
      </header>
    </article>
  );
};

export default Argon;
