import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { siteSettings } from "@settings/site.settings";
import { useEffect } from "react";

interface Props {
  count: number;
}

const Schedule = ({ count }: Props) => {
  const { updateDeliveryTime } = useCheckout();
  useEffect(() => {
    updateDeliveryTime(siteSettings.deliverySchedule[0]);
  }, []);

  function handleSelect(item: any) {
    updateDeliveryTime(item);
  }
  return (
    <SectionWithCardGroup
      count={count}
      heading="text-delivery-schedule"
      items={siteSettings.deliverySchedule}
      onSelect={handleSelect}
    />
  );
};

export default Schedule;
