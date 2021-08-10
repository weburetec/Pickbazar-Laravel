import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { WithdrawPaginator } from "@graphql/customers.graphql";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import { Shop } from "@graphql/products.graphql";
import { adminOnly, getAuthCredentials, hasAccess } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import Badge from "@components/ui/badge/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

type IProps = {
  withdraws: WithdrawPaginator | null | undefined;
  onPagination?: (current: number) => void;
};

const WithdrawList = ({ withdraws, onPagination }: IProps) => {
  const { data, paginatorInfo } = withdraws! ?? {};
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const router = useRouter();

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge text={t("text-approved")} color="bg-accent" />;
      case "PENDING":
        return <Badge text={t("text-pending")} color="bg-purple-500" />;
      case "ON_HOLD":
        return <Badge text={t("text-on-hold")} color="bg-pink-500" />;
      case "REJECTED":
        return <Badge text={t("text-rejected")} color="bg-red-500" />;
      case "PROCESSING":
        return <Badge text={t("text-processing")} color="bg-yellow-500" />;
    }
  };

  let columns = [
    {
      title: t("table:table-item-shop-name"),
      dataIndex: "shop",
      key: "shop",
      align: alignLeft,
      render: (shop: Shop) => shop.name,
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount: number) => {
        const { price } = usePrice({
          amount: amount as number,
        });
        return <div>{price}</div>;
      },
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => renderStatusBadge(status),
    },
    {
      title: t("table:table-item-created-at"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      },
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string) => {
        const { permissions } = getAuthCredentials();
        if (hasAccess(adminOnly, permissions)) {
          return (
            <ActionButtons detailsUrl={`${ROUTES.WITHDRAWS}/${id}`} id={id} />
          );
        }
        return null;
      },
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== "actions");
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default WithdrawList;
