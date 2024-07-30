import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import cartApi from "@/store/api/cartApi";
import { clearLocalCart } from "@/store/slices/localCart";
import { logout } from "@/store/slices/userSlice";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearLocalCart());
    dispatch(cartApi.util.resetApiState());
  };

  return handleLogout;
};

export default useLogout;
