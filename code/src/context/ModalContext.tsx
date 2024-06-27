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
  handleOpenModal: (component: ReactElement) => void;
  handleToggleModal: (component: ReactElement) => void;
  handleCloseModal: () => void;
};

type ModalProviderProps = Required<PropsWithChildren>;

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<ReactElement | null>(null);

  const isModalOpen = Boolean(modal);

  const handleOpenModal = (component: ReactElement) => {
    setModal(component);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const handleToggleModal = (component: ReactElement) => {
    if (modal) {
      handleCloseModal();
    } else {
      handleOpenModal(component);
    }
  };

  const modalContent = modal && (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <AppBox>{modal}</AppBox>
    </Dialog>
  );

  return (
    <ModalContext.Provider
      value={{ handleOpenModal, handleCloseModal, handleToggleModal }}
    >
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
