import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppSnackbar from "@/components/app-snackbar/AppSnackbar";
import routes from "@/routes/routes";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import { checkAuth } from "@/store/slices/userSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
      <AppSnackbar />
    </>
  );
};

export default App;
