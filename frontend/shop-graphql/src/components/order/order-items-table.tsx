import { Table } from "@components/ui/table";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";

export const OrderItems = ({ products }: { products: any }) => {
  const { t } = useTranslation("common");
  const { alignLeft, alignRight } = useIsRTL();

  const orderTableColumns = [
    {
      title: <span className="ps-20">{t("text-item")}</span>,
      dataIndex: "",
      key: "items",
      align: alignLeft,
      width: 250,
      ellipsis: true,
      render: (_: any, record: any) => {
        const { price } = usePrice({
          amount: record.pivot?.unit_price,
        });
        let name = record.name;
        if (record.pivot.variation_option_id) {
          const variationTitle = record.variation_options.find(
            (vo: any) => vo.id === record.pivot.variation_option_id
          )["title"];
          name = `${name} - ${variationTitle}`;
        }
        return (
          <div className="flex items-center">
            <div className="w-16 h-16 flex flex-shrink-0 rounded overflow-hidden">
              <img
                src={
                  record.image?.thumbnail ??
                  siteSettings.product.placeholderImage
                }
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col ms-4 overflow-hidden">
              <div className="flex mb-1">
                <span className="text-sm text-body truncate inline-block overflow-hidden">
                  {name} x&nbsp;
                </span>
                <span className="text-sm text-heading font-semibold truncate inline-block overflow-hidden">
                  {record.unit}
                </span>
              </div>
              <span className="text-sm text-accent font-semibold mb-1 truncate inline-block overflow-hidden">
                {price}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: t("text-quantity"),
      dataIndex: "pivot",
      key: "pivot",
      align: "center",
      width: 100,
      render: (pivot: any) => {
        return <p className="text-base">{pivot.order_quantity}</p>;
      },
    },
    {
      title: t("text-price"),
      dataIndex: "pivot",
      key: "price",
      align: alignRight,
      width: 100,
      render: (pivot: any) => {
        const { price } = usePrice({
          amount: pivot.subtotal,
        });
        return <p>{price}</p>;
      },
    },
  ];

  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products}
      rowKey={(record: any) =>
        record.pivot?.variation_option_id
          ? record.pivot.variation_option_id
          : record.created_at
      }
      className="orderDetailsTable w-full"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
