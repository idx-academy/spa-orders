import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState
} from "react";

import Dialog from "@mui/material/Dialog";

import AppBox from "@/components/app-box/AppBox";

type ModalContextType = {
  openModal: (component: ReactElement) => void;
  toggleModal: (component: ReactElement) => void;
  closeModal: () => void;
};

type ModalProviderProps = Required<PropsWithChildren>;

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<ReactElement | null>(null);

  const isModalOpen = Boolean(modal);

  const openModal = (component: ReactElement) => {
    setModal(component);
  };

  const closeModal = () => {
    setModal(null);
  };

  const toggleModal = (component: ReactElement) => {
    if (modal) {
      closeModal();
    } else {
      openModal(component);
    }
  };

  const modalContent = modal && (
    <Dialog open={isModalOpen} onClose={toggleModal}>
      <AppBox>{modal}</AppBox>
    </Dialog>
  );

  return (
    <ModalContext.Provider value={{ openModal, closeModal, toggleModal }}>
      {modalContent}
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModalContext, ModalContext };
