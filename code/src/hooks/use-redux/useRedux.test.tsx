import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import { store } from "@/store/store";

describe("useRedux hooks", () => {
  it("should return the dispatch function from the store", () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    expect(result.current).toBe(store.dispatch);
  });
});
