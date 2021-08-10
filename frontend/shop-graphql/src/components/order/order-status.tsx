import ErrorMessage from "@components/ui/error-message";
import Spinner from "@components/ui/loaders/spinner/spinner";
import ProgressBox from "@components/ui/progress-box/progress-box";
import {
  useOrderStatusesQuery,
  QueryOrderStatusesOrderByColumn,
  SortOrder,
} from "@graphql/order_status.graphql";

interface Props {
  status: number;
}

const OrderStatus = ({ status }: Props) => {
  const { data, loading, error } = useOrderStatusesQuery({
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
  if (loading) return <Spinner showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;
  return <ProgressBox data={data?.orderStatuses?.data} status={status} />;
};

export default OrderStatus;
