import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useCheckout } from "@contexts/checkout.context";
import { AddressType } from "@graphql/address.graphql";
import { loggedIn } from "@utils/is-loggedin";
import { useEffect } from "react";

interface Props {
  id: string;
  heading: string;
  addresses: any[] | undefined;
  count?: number;
  type?: "BILLING" | "SHIPPING";
}

const Address = ({ id, addresses, heading, count, type }: Props) => {
  const { openModal } = useModalAction();
  const { updateBillingAddress, updateShippingAddress } = useCheckout();
  useEffect(() => {
    if (addresses && type === AddressType.Billing) {
      updateBillingAddress(addresses[0]);
    }
    if (addresses && type === AddressType.Shipping) {
      updateShippingAddress(addresses[0]);
    }
  }, [addresses]);
  function handleAdd() {
    if (loggedIn()) {
      openModal("ADD_OR_UPDATE_ADDRESS", { customerId: id, type });
    } else {
      openModal("LOGIN_VIEW");
    }
  }
  function handleEdit(address: any) {
    openModal("ADD_OR_UPDATE_ADDRESS", { customerId: id, address });
  }
  function handleDelete(address: any) {
    openModal("DELETE_ADDRESS", { customerId: id, addressId: address.id });
  }
  function handleSelect(item: any) {
    if (type === "BILLING") {
      updateBillingAddress(item);
    } else {
      updateShippingAddress(item);
    }
  }
  return (
    <SectionWithCardGroup
      count={count}
      heading={heading}
      addActionText="text-address"
      items={addresses}
      onSelect={handleSelect}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default Address;
