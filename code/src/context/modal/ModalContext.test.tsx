import { fireEvent, render, renderHook, screen } from "@testing-library/react";

import { ModalProvider, useModalContext } from "@/context/modal/ModalContext";

const TestModalContent = () => {
  return <div>ModalContent</div>;
};

const ContentPlayground = () => {
  const { openModal, closeModal, toggleModal } = useModalContext();

  return (
    <>
      <button
        data-testid="openModal"
        onClick={() => openModal(<TestModalContent />)}
      >
        Open modal
      </button>
      <button data-testid="closeModal" onClick={closeModal}>
        Open modal
      </button>
      <button
        data-testid="toggleModal"
        onClick={() => toggleModal(<TestModalContent />)}
      >
        Toggle Modal
      </button>
    </>
  );
};

const findAndClickButton = (id: string) => {
  const button = screen.getByTestId(id);
  fireEvent.click(button);
};

const assertContentExistance = (shouldContentExist: boolean) => {
  const modalContent = screen.queryByText("ModalContent");

  if (shouldContentExist) {
    expect(modalContent).toBeInTheDocument();
  } else {
    expect(modalContent).not.toBeInTheDocument();
  }
};

describe("ModalContext", () => {
  describe("ModalProvider", () => {
    beforeEach(() => {
      render(
        <ModalProvider>
          <ContentPlayground />
        </ModalProvider>
      );
    });

    test("renders content correctly when openModal is called", () => {
      findAndClickButton("openModal");
      assertContentExistance(true);
    });

    test("closes modal correctly when it was previously opened", () => {
      findAndClickButton("openModal");
      findAndClickButton("closeModal");
      assertContentExistance(false);
    });

    test("toggles modal correctly", () => {
      findAndClickButton("toggleModal");
      assertContentExistance(true);

      findAndClickButton("toggleModal");
      assertContentExistance(false);
    });
  });

  describe("useModalContext", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("throws an error when context in not within a provider", () => {
      jest.spyOn(console, "error").mockImplementation(() => {});

      const errorMessage =
        "useModalContext must be used within a ModalProvider";

      const renderUseModalContextHookWrapper = () =>
        renderHook(() => useModalContext());

      expect(renderUseModalContextHookWrapper).toThrow(errorMessage);
    });
  });
});
