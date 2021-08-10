import { useMutation, useQueryClient } from "react-query";
import { CustomerService, CustomerType } from "./customer.service";

export const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (input: CustomerType) => CustomerService.updateCustomer(input),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("me");
      },
    }
  );
};
