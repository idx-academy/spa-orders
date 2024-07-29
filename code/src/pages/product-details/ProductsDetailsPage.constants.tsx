import routePaths from "@/constants/routes";
import { RedirectConfig } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";

export const productNotFoundRedirectConfig: RedirectConfig = {
  errorType: "notFound",
  errorMessageTranslationKey: "productDetailsPage.notFound",
  goBackButtonTranslationKey: "productDetailsPage.goBack",
  goBackPath: routePaths.products.path
};
