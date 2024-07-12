import {
  RenderHookResult,
  act,
  renderHook,
  screen,
  waitFor
} from "@testing-library/react";

import {
  DrawerContextType,
  DrawerProvider,
  useDrawerContext
} from "@/context/drawer/DrawerContext";

const testDrawerText = "I am drawer content!";
const TestComponent = () => <p>{testDrawerText}</p>;

const renderDrawerHookWithProvider = () => {
  return renderHook(() => useDrawerContext(), {
    wrapper: ({ children }) => (
      <DrawerProvider>
        <div>{children}</div>
      </DrawerProvider>
    )
  });
};

const openDrawer = (res: RenderHookResult<DrawerContextType, unknown>) =>
  act(() => res.result.current.openDrawer(<TestComponent />));

const closeDrawer = (res: RenderHookResult<DrawerContextType, unknown>) =>
  act(() => res.result.current.closeDrawer());

const toggleDrawer = (
  res: RenderHookResult<DrawerContextType, unknown>,
  passElement: boolean = false
) =>
  act(() =>
    res.result.current.toggleDrawer(passElement ? <TestComponent /> : undefined)
  );

describe("Test drawer context", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Should throw error if useDrawerContext is used outside of DrawerProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    const errorMessage =
      "useDrawerContext must be used within a DrawerProvider";

    const renderUseDrawer = () => renderHook(() => useDrawerContext());

    expect(renderUseDrawer).toThrow(errorMessage);
  });

  test("Should open drawer with passed component", () => {
    const result = renderDrawerHookWithProvider();

    openDrawer(result);

    const drawer = screen.getByText(testDrawerText);
    expect(drawer).toBeInTheDocument();
  });

  test("Should close drawer", async () => {
    const result = renderDrawerHookWithProvider();

    openDrawer(result);

    const drawer = screen.getByText(testDrawerText);
    expect(drawer).toBeInTheDocument();

    closeDrawer(result);

    await waitFor(() => {
      const possibleDrawer = screen.queryByText(testDrawerText);
      expect(possibleDrawer).not.toBeInTheDocument();
    });
  });

  test("Should toggle drawer", async () => {
    const result = renderDrawerHookWithProvider();

    toggleDrawer(result, true);

    const drawer = screen.getByText(testDrawerText);
    expect(drawer).toBeInTheDocument();

    toggleDrawer(result);

    await waitFor(() => {
      const possibleDrawer = screen.queryByText(testDrawerText);
      expect(possibleDrawer).not.toBeInTheDocument();
    });

    toggleDrawer(result, true);

    const openedDrawer = screen.getByText(testDrawerText);
    expect(openedDrawer).toBeInTheDocument();
  });
});
