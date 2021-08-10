import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { Shipping } from "@graphql/shipping.graphql";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";

export type IProps = {
  shippings: Shipping[] | undefined;
};

const ShippingList = ({ shippings }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 62,
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      width: 150,
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: t("table:table-item-global"),
      dataIndex: "is_global",
      key: "is_global",
      align: "center",
      render: (value: boolean) => (
        <span className="capitalize">{value.toString()}</span>
      ),
    },
    {
      title: t("table:table-item-type"),
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.SHIPPINGS}/${id}/edit`}
          deleteModalView="DELETE_SHIPPING"
        />
      ),
      width: 200,
    },
  ];

  return (
    <div className="rounded overflow-hidden shadow mb-8">
      <Table
        //@ts-ignore
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={shippings}
        rowKey="id"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default ShippingList;
