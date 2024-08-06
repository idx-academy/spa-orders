import { useState } from "react";

const useDropdown = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleCloseDropdown = () => {
    setIsDropdownOpened(false);
  };

  const handleOpenDropdown = () => {
    setIsDropdownOpened(true);
  };

  return {
    isDropdownOpened,
    handleOpenDropdown,
    handleCloseDropdown
  } as const;
};

export default useDropdown;
