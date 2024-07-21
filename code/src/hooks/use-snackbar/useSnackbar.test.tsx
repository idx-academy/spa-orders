import { renderHook } from "@testing-library/react";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import {
  closeSnackbar as closeSnackbarAction,
  openSnackbar as openSnackbarAction,
  openSnackbarWithTimeout as openSnackbarWithTimeoutAction,
  useIsSnackbarOpenSelector,
  useSnackbarConfigSelector
} from "@/store/slices/snackbarSlice";
import { SnackbarConfigWithTimeout } from "@/types/snackbar.types";

jest.mock("@/store/slices/snackbarSlice");
jest.mock("@/hooks/use-redux/useRedux");

(useIsSnackbarOpenSelector as jest.Mock).mockReturnValue(true);
(useSnackbarConfigSelector as jest.Mock).mockReturnValue({
  message: "Hello"
});

const mockDispatch = jest.fn();
(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

describe("useSnackbar hook", () => {
  let hookOutput: ReturnType<typeof useSnackbar>;

  beforeEach(() => {
    const { result } = renderHook(() => useSnackbar());
    hookOutput = result.current;
  });

  test("calls open snackbar correctly", () => {
    const config: SnackbarConfigWithTimeout = {
      messageTranslationKey: "translation.key"
    };

    hookOutput.openSnackbar(config);

    expect(mockDispatch).toHaveBeenCalledWith(openSnackbarAction(config));
  });

  test("calls open snackbar with timeout correctly", () => {
    const config: SnackbarConfigWithTimeout = {
      messageTranslationKey: "translation.key"
    };
    hookOutput.openSnackbarWithTimeout(config);

    expect(mockDispatch).toHaveBeenCalledWith(
      openSnackbarWithTimeoutAction(config)
    );
  });

  test("calls close snackbar correctly", () => {
    hookOutput.closeSnackbar();
    expect(mockDispatch).toHaveBeenCalledWith(closeSnackbarAction());
  });
});
