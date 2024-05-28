/* istanbul ignore file */
import { Routes } from "react-router-dom";

import dashboardPageModule from "@/pages/dashboard";

import messages from "@/messages";

export const locales = Object.keys(messages);

export const appRoutes = (
  <Routes>
    {dashboardPageModule}
  </Routes>
);
