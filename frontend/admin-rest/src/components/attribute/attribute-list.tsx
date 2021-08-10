import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { Attribute, Shop } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export type IProps = {
  attributes: Attribute[] | undefined;
};
const AttributeList = ({ attributes }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const alignLeft =
    router.locale === "ar" || router.locale === "he" ? "right" : "left";
  const alignRight =
    router.locale === "ar" || router.locale === "he" ? "left" : "right";

  let columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t("table:table-item-shop"),
      dataIndex: "shop",
      key: "shop",
      width: 120,
      align: "center",
      ellipsis: true,
      render: (shop: Shop) => (
        <span className="whitespace-nowrap truncate">{shop?.name}</span>
      ),
    },
    {
      title: t("table:table-item-values"),
      dataIndex: "values",
      key: "values",
      align: alignLeft,
      render: (values: any) => {
        return (
          <span className="whitespace-nowrap">
            {values?.map((singleValues: any, index: number) => {
              return index > 0
                ? `, ${singleValues.value}`
                : `${singleValues.value}`;
            })}
          </span>
        );
      },
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: alignRight,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${router.asPath}/${id}/edit`}
          deleteModalView="DELETE_ATTRIBUTE"
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== "shop");
  }
  return (
    <div className="rounded overflow-hidden shadow mb-8">
      <Table
        // @ts-ignore
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={attributes}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default AttributeList;
