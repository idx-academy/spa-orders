import { useNavigate } from "react-router-dom";

import routes from "@/constants/routes";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useCreateOrderMutation } from "@/store/api/ordersApi";
import { OrderPostParams } from "@/types/order.types";

const useCreateOrder = () => {
  const [createOrder, options] = useCreateOrderMutation();
  const navigate = useNavigate();
  const { openSnackbarWithTimeout } = useSnackbar();

  const handleCreateOrder = async (data: OrderPostParams) => {
    const { error } = await createOrder(data);

    // Error is handled by the global middleware
    if (error) {
      return;
    }

    openSnackbarWithTimeout({
      messageTranslationKey: "orders.create.success",
      variant: "success",
      autohideDuration: 5000
    });

    navigate(routes.home.path, {replace: true});
  };

  return [handleCreateOrder, options] as const;
};

export default useCreateOrder;
