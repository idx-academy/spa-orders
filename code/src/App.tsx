import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppSnackbar from "@/components/app-snackbar/AppSnackbar";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import routes from "@/routes/routes";
import { checkAuth } from "@/store/slices/userSlice";

import useSynchronizeCart from "./hooks/use-synchronize-cart/useSynchronizeCart";

const App = () => {
  const dispatch = useAppDispatch();

  useSynchronizeCart();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
      <AppSnackbar />
      <ScrollToTopButton />
    </>
  );
};

export default App;
