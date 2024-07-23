import { Navigate } from "react-router-dom";

import routePaths from "@/constants/routes";

const DashboardPage = () => {
  return <Navigate to={routePaths.dashboard.orders.path} />; // Redirect to default dashboard tab
};

export default DashboardPage;
