import { renderHook } from "@testing-library/react";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useLongestTranslationLength from "@/hooks/use-longest-translation-length/useLongestTranslationLength";

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

const renderAndMock = (list: ListItem[]) => {
  (useLocaleContext as jest.Mock).mockReturnValue({ locale: mockLocale });

  return renderHook(() =>
    useLongestTranslationLength(list, extractTranslationKey)
  );
};

describe("useLongestTranslationLength", () => {
  it("returns the length of the longest translation", () => {
    const { result } = renderAndMock(translationList);
    expect(result.current).toBe(9);
  });

  it("returns 0 when the translation list is empty", () => {
    const { result } = renderAndMock([]);
    expect(result.current).toBe(0);
  });
});
