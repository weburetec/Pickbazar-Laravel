import Pagination from "@components/ui/pagination";
import Image from "next/image";
import dayjs from "dayjs";
import { Table } from "@components/ui/table";
import { CouponPaginator } from "@ts-types/generated";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { Attachment } from "@ts-types/generated";
import usePrice from "@utils/use-price";
import { ROUTES } from "@utils/routes";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTranslation } from "next-i18next";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

type IProps = {
  coupons: CouponPaginator | null | undefined;
  onPagination: (current: number) => void;
};
const CouponList = ({ coupons, onPagination }: IProps) => {
  const { data, paginatorInfo } = coupons!;
  const { t } = useTranslation();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 64,
    },
    {
      title: t("table:table-item-banner"),
      dataIndex: "image",
      key: "image",
      width: 74,
      render: (image: Attachment) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="coupon banner"
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t("table:table-item-code"),
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (text: string) => (
        <span className="whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: 132,
      render: (amount: number, record: any) => {
        const { price } = usePrice({
          amount: amount,
        });
        if (record.type === "PERCENTAGE_COUPON") {
          return <span>{amount}%</span>;
        }
        return <span>{price}</span>;
      },
    },
    {
      title: t("table:table-item-active"),
      dataIndex: "active_from",
      key: "active_from",
      align: "center",
      render: (date: string) => (
        <span className="whitespace-nowrap">
          {dayjs().to(dayjs.utc(date).tz(dayjs.tz.guess()))}
        </span>
      ),
    },
    {
      title: t("table:table-item-expired"),
      dataIndex: "expire_at",
      key: "expire_at",
      align: "center",
      render: (date: string) => (
        <span className="whitespace-nowrap">
          {dayjs().to(dayjs.utc(date).tz(dayjs.tz.guess()))}
        </span>
      ),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.COUPONS}/edit/${id}`}
          deleteModalView="DELETE_COUPON"
        />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        {/* @ts-ignore */}
        <Table
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CouponList;
