import { fireEvent, render, renderHook, screen } from "@testing-library/react";

import { I18nProvider, useLocaleContext } from "@/context/i18n/I18nProvider";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const LocaleDisplay = () => {
  const { locale } = useLocaleContext();
  return <div data-testid="localeDisplay">{locale}</div>;
};

const LocaleChanger = () => {
  const { setLocale } = useLocaleContext();
  return (
    <>
      <button data-testid="setLocaleEn" onClick={() => setLocale("en")}>
        Set Locale to EN
      </button>
      <button data-testid="setLocaleUk" onClick={() => setLocale("uk")}>
        Set Locale to UK
      </button>
    </>
  );
};

const mockAndRender = (locale: string | null, navigatorLanguage?: string) => {
  Storage.prototype.getItem = jest.fn(() => locale);

  if (navigatorLanguage) {
    Object.defineProperty(navigator, "language", {
      value: navigatorLanguage,
      configurable: true
    });
  }

  render(<I18nPlayground />);
};

const I18nPlayground = () => {
  return (
    <I18nProvider>
      <LocaleDisplay />
      <LocaleChanger />
    </I18nProvider>
  );
};

describe("I18nProvider", () => {
  let localeDisplay: HTMLElement;
  let setUkButton: HTMLElement;
  let setEnButton: HTMLElement;

  describe("Locale display and changer functionality", () => {
    beforeEach(() => {
      renderWithProviders(<I18nPlayground />);

      localeDisplay = screen.getByTestId("localeDisplay");
      setUkButton = screen.getByTestId("setLocaleUk");
      setEnButton = screen.getByTestId("setLocaleEn");
    });

    test("initially sets the locale to 'en'", () => {
      expect(localeDisplay).toHaveTextContent("en");
    });

    test("changes locale to 'uk' when setLocaleUk is clicked", () => {
      fireEvent.click(setUkButton);

      expect(localeDisplay).toHaveTextContent("uk");
    });

    test("changes locale back to 'en' when setLocaleEn is clicked after setting it to 'uk'", () => {
      fireEvent.click(setUkButton);
      fireEvent.click(setEnButton);

      expect(localeDisplay).toHaveTextContent("en");
    });
  });

  describe("I18nProvider and getInitialLocale", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("sets the locale correctly based on browser locale", () => {
      mockAndRender(null, "uk");

      localeDisplay = screen.getByTestId("localeDisplay");
      expect(localeDisplay).toHaveTextContent("uk");
    });

    test("initially sets the locale correctly based on localStorage locale", () => {
      mockAndRender("uk", "en-US");

      localeDisplay = screen.getByTestId("localeDisplay");
      expect(localeDisplay).toHaveTextContent("uk");
    });

    test("falls back to 'en' when no matching locale is found", () => {
      mockAndRender(null, "fr");

      localeDisplay = screen.getByTestId("localeDisplay");
      expect(localeDisplay).toHaveTextContent("en");
    });
  });

  describe("useLocaleContext", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("throws an error when context in not within a provider", () => {
      jest.spyOn(console, "error").mockImplementation(() => {});

      const errorMessage =
        "useLocaleContext must be used within I18nProvider. Ensure you have wrapped your app with <I18nProvider>.";

      const renderUseModalContextHookWrapper = () =>
        renderHook(() => useLocaleContext());

      expect(renderUseModalContextHookWrapper).toThrow(errorMessage);
    });
  });
});
