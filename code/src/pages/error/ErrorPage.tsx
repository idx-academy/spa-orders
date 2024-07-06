import { useRouteError } from "react-router-dom";

import AppContainer from "@/components/app-container/AppContainer";

const ErrorPage = () => {
  const error = useRouteError();
  return <AppContainer>Error: {JSON.stringify(error)}</AppContainer>;
};

export default ErrorPage;
