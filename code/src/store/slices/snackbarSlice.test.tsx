import { renderHook } from "@testing-library/react";

import { useAppSelector } from "@/hooks/use-redux/useRedux";
import snackbarReducer, {
  _clearTimeout,
  _setSnackbarTimerId,
  closeSnackbar,
  openSnackbar,
  openSnackbarWithTimeout,
  useIsSnackbarOpenSelector,
  useSnackbarConfigSelector
} from "@/store/slices/snackbarSlice";
import { store } from "@/store/store";
import {
  BaseSnackbarConfig,
  SnackbarConfigWithTimeout
} from "@/types/snackbar.types";

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

jest.useFakeTimers();

const mockedInitialState = {
  isOpen: false,
  config: {} as BaseSnackbarConfig
};

describe("snackbarSlice reducers", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test("should return the initial state", () => {
    const initState = snackbarReducer(undefined, { type: "unknown" });
    expect(initState).toEqual(mockedInitialState);
  });

  test("should handle openSnackbar", () => {
    const config: BaseSnackbarConfig = {
      messageTranslationKey: "Test message"
    };
    const nextState = snackbarReducer(mockedInitialState, openSnackbar(config));
    expect(nextState.isOpen).toBe(true);
    expect(nextState.config).toEqual({ variant: "error", ...config });
  });

  test("should handle closeSnackbar", () => {
    const prevState = { ...mockedInitialState, isOpen: true };
    const nextState = snackbarReducer(prevState, closeSnackbar());
    expect(nextState.isOpen).toBe(false);
  });

  test("should handle openSnackbarWithTimeout", () => {
    const config: SnackbarConfigWithTimeout = {
      messageTranslationKey: "Test message",
      autohideDuration: 1000
    };

    store.dispatch(openSnackbarWithTimeout(config));

    expect(store.getState().snackbar.isOpen).toBe(true);
    expect(store.getState().snackbar.config.messageTranslationKey).toBe(
      "Test message"
    );

    jest.advanceTimersByTime(1500);
    expect(store.getState().snackbar.isOpen).toBe(false);
  });

  test("should handle openSnackbarWithTimeout with default timer", () => {
    const config: SnackbarConfigWithTimeout = {
      messageTranslationKey: "Test message"
    };

    store.dispatch(openSnackbarWithTimeout(config));

    expect(store.getState().snackbar.isOpen).toBe(true);
    expect(store.getState().snackbar.config.messageTranslationKey).toBe(
      "Test message"
    );

    jest.advanceTimersByTime(1500);
    expect(store.getState().snackbar.isOpen).toBe(true);

    jest.advanceTimersByTime(3500);
    expect(store.getState().snackbar.isOpen).toBe(false);
  });

  test("should handle _setSnackbarTimerId", () => {
    const timerId = setTimeout(() => {}, 1000);
    const action = { type: _setSnackbarTimerId.type, payload: timerId };
    const nextState = snackbarReducer(mockedInitialState, action);
    expect(nextState._timerId).toBe(timerId);
  });

  test("should handle _clearTimeout with an existing timerId", () => {
    const timerId = setTimeout(() => {}, 1000);
    const prevState = { ...mockedInitialState, _timerId: timerId };
    jest.spyOn(global, "clearTimeout");
    const action = { type: _clearTimeout.type };
    const nextState = snackbarReducer(prevState, action);
    expect(clearTimeout).toHaveBeenCalledWith(timerId);
    expect(nextState._timerId).toBeUndefined();
  });

  test("should handle _clearTimeout without an existing timerId", () => {
    jest.spyOn(global, "clearTimeout");
    const action = { type: _clearTimeout.type };
    const nextState = snackbarReducer(mockedInitialState, action);
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(nextState._timerId).toBeUndefined();
  });
});

describe("snackbarSlice selectors", () => {
  test("useIsSnackbarOpenSelector should return isOpen state", () => {
    mockedUseAppSelector.mockReturnValue(true);
    const { result } = renderHook(() => useIsSnackbarOpenSelector());
    expect(result.current).toEqual(true);
  });

  test("useSnackbarConfigSelector should return config state", () => {
    const config: BaseSnackbarConfig = {
      messageTranslationKey: "Test message",
      variant: "success"
    };
    mockedUseAppSelector.mockReturnValue(config);
    const { result } = renderHook(() => useSnackbarConfigSelector());

    expect(result.current).toEqual(config);
  });
});
