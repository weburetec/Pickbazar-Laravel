import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteAddressMutation } from "@graphql/address.graphql";
import { CustomerDocument } from "@graphql/auth.graphql";
import { getErrorMessage } from "@utils/form-error";

const AddressDeleteView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const [deleteAddressById, { loading }] = useDeleteAddressMutation({
    refetchQueries: [{ query: CustomerDocument }],
  });

  function handleDelete() {
    try {
      deleteAddressById({
        variables: { id: data.addressId },
      });
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default AddressDeleteView;
