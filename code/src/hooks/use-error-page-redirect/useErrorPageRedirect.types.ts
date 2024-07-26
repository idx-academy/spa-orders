export type ErrorPageState = {
  goBackPath?: string;
  goBackButtonTranslationKey?: string;
  errorMessageTranslationKey?: string;
};

export type ErrorType = "notFound" | "unknown";

export type RedirectConfig = Partial<{ errorType: ErrorType } & ErrorPageState>;
