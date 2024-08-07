import { renderHook } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import usePagination from "@/hooks/use-pagination/usePagination";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn()
}));

const mockSetSearchParams = jest.fn();

const mockAndRender = ({ page = 1 } = {}) => {
  (useSearchParams as jest.Mock).mockReturnValue([
    new URLSearchParams({ page: page.toString() }),
    mockSetSearchParams
  ]);

  return renderHook(() => usePagination());
};

describe("usePagination", () => {
  test("renders default page correctly", () => {
    const { result } = mockAndRender({ page: 3 });
    expect(result.current.page).toBe(3);
  });

  test("updates page correctly when page is not null", () => {
    const { result } = mockAndRender();

    result.current.setPage(5);
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ page: "5" })
    );
  });

  test("updates page correctly when page is null", () => {
    const mockDelete = jest.fn();
    jest
      .spyOn(URLSearchParams.prototype, "delete")
      .mockImplementationOnce(mockDelete);

    const { result } = mockAndRender();

    result.current.setPage(null);
    expect(mockDelete).toHaveBeenCalledWith("page");
  });
});
