import { fireEvent, render, screen } from "@testing-library/react";

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
      const openModalButton = screen.getByTestId("openModal");
      fireEvent.click(openModalButton);

      const modalContent = screen.getByText("ModalContent");
      expect(modalContent).toBeInTheDocument();
    });

    test("closes modal correctly when it was previously opened", () => {
      const openModalButton = screen.getByTestId("openModal");
      fireEvent.click(openModalButton);

      const closeModalButton = screen.getByTestId("closeModal");
      fireEvent.click(closeModalButton);

      const modalContent = screen.queryByText("ModalContent");
      expect(modalContent).not.toBeInTheDocument();
    });

    test("toggles modal correctly", () => {
      const toggleModalButton = screen.getByTestId("toggleModal");
      fireEvent.click(toggleModalButton);

      const modalContentAfterFirstClick = screen.getByText("ModalContent");
      expect(modalContentAfterFirstClick).toBeInTheDocument();

      fireEvent.click(toggleModalButton);

      const modalContentAfterSecondClick = screen.queryByText("ModalContent");
      expect(modalContentAfterSecondClick).not.toBeInTheDocument();
    });
  });

  describe("useModalContext", () => {
    test("should throw an error when context in not within a provider", () => {
      expect(() => render(<ContentPlayground />)).toThrow(
        new Error("useModalContext must be used within a ModalProvider")
      );
    });
  });
});
