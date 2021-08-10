import ErrorMessage from "@components/ui/error-message";
import Spinner from "@components/ui/loaders/spinner/spinner";
import ProgressBox from "@components/ui/progress-box/progress-box";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";

interface Props {
  status: number;
}

const OrderStatus = ({ status }: Props) => {
  const { data, isLoading: loading, error } = useOrderStatusesQuery();
  if (loading) return <Spinner showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;
  return <ProgressBox data={data?.order_statuses?.data} status={status} />;
};

export default OrderStatus;
