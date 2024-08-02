import { renderHook } from "@testing-library/react";

import { useLocaleContext } from "@/context/i18n/I18nProvider";

import useLongestTranslationLength from "./useLongestTranslationLength";

jest.mock("@/context/i18n/I18nProvider", () => ({
  ...jest.requireActual("@/context/i18n/I18nProvider"),
  useLocaleContext: jest.fn()
}));

const mockLocale = "en";

type ListItem = {
  key: string;
};

const translationList: ListItem[] = [
  { key: "12345" },
  { key: "123" },
  { key: "123456789" }
];
const extractTranslationKey = (value: ListItem) => value.key;

describe("useLongestTranslationLength", () => {
  beforeEach(() => {
    (useLocaleContext as jest.Mock).mockReturnValue({ locale: mockLocale });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns the length of the longest translation", () => {
    const { result } = renderHook(() =>
      useLongestTranslationLength(translationList, extractTranslationKey)
    );

    expect(result.current).toBe(9);
  });

  it("returns 0 when the translation list is empty", () => {
    const { result } = renderHook(() =>
      useLongestTranslationLength([] as ListItem[], extractTranslationKey)
    );

    expect(result.current).toBe(0);
  });
});
