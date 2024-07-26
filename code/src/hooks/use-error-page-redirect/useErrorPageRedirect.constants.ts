import routePaths from "@/constants/routes";
import { ErrorType } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";

export const errorPages: Record<ErrorType, string> = {
  notFound: routePaths.error.notFound.path,
  unknown: routePaths.error.unknown.path
};
