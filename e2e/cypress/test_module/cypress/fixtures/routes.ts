export const {
  apiBaseUrl,
  baseUrl,
} = Cypress.config();

export const commonRoutes = {
  global: {},
};

export const desktopRoutes = {
  homeModule: {
    homeUrl: `${baseUrl}`,
    kpiEndpoint: `${apiBaseUrl}/v1/sustainability-file/kpi`,
  },
};