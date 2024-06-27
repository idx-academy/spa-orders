import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState
} from "react";
import Dialog from "@mui/material/Dialog";
import AppBox from "@/components/app-box/AppBox";

type ModalContextType = {
  handleOpenModal: (component: ReactElement) => void;
  handleCloseModal: () => void;
};

type ModalProviderProps = { children: ReactNode };

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<ReactElement | null>(null);
  const handleOpenModal = (component: ReactElement) => {
    modalRef.current = component;
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    modalRef.current = null;
  };

  return (
    <ModalContext.Provider value={{ handleOpenModal, handleCloseModal }}>
      {modalRef.current && (
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <AppBox>{modalRef.current}</AppBox>
        </Dialog>
      )}
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
