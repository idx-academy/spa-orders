import { fireEvent, screen } from "@testing-library/react";
import { Navigate } from "react-router-dom";

import routePaths from "@/constants/routes";
import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { RedirectConfig } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => mockUseNavigate),
  Navigate: jest.fn(() => null)
}));

type PlaygroundProps = {
  shouldRedirectWithComponent?: boolean;
  redirectConfig?: RedirectConfig;
};

const Playground = ({
  shouldRedirectWithComponent,
  redirectConfig
}: PlaygroundProps) => {
  const { renderRedirectComponent, redirect } = useErrorPageRedirect();

  if (shouldRedirectWithComponent) {
    return renderRedirectComponent(redirectConfig);
  }

  return (
    <button data-testid="redirect" onClick={() => redirect(redirectConfig)}>
      Redirect
    </button>
  );
};

const testCases: Array<[string, RedirectConfig?]> = [
  ["default component", undefined],
  ["goBackPath", { goBackPath: "/back" }],
  [
    "goBackButtonTranslationKey",
    { goBackButtonTranslationKey: "translation.key" }
  ],
  [
    "errorMessageTranslationKey",
    { errorMessageTranslationKey: "translation.key" }
  ]
];

const to = routePaths.error.unknown.path;

const createBaseConfig = (config?: RedirectConfig) => ({
  state: config ?? {},
  replace: true
});

const assertRedirectWithFunction = (config?: RedirectConfig) => {
  renderWithProviders(<Playground redirectConfig={config} />);

  const redirectButton = screen.getByTestId("redirect");
  fireEvent.click(redirectButton);

  expect(mockUseNavigate).toHaveBeenCalledWith(to, createBaseConfig(config));
};

const assertRedirectWithComponent = (config?: RedirectConfig) => {
  renderWithProviders(
    <Playground shouldRedirectWithComponent redirectConfig={config} />
  );

  const redirectConfig = {
    to,
    ...createBaseConfig(config)
  };

  expect(Navigate).toHaveBeenCalledWith(redirectConfig, {});
};

describe("useErrorPageRedirect", () => {
  describe("redirect", () => {
    test.each(testCases)("redirects with %s", (_, config) => {
      assertRedirectWithFunction(config);
    });
  });

  describe("renderRedirectComponent", () => {
    test.each(testCases)("redirects with %s", (_, config) => {
      assertRedirectWithComponent(config);
    });
  });
});
