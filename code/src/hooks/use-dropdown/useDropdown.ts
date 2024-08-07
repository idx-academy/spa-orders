import { useState } from "react";

const useDropdown = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleCloseDropdown = () => {
    setIsDropdownOpened(false);
  };

  const handleOpenDropdown = () => {
    setIsDropdownOpened(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  return {
    isDropdownOpened,
    toggleDropdown,
    handleOpenDropdown,
    handleCloseDropdown
  } as const;
};

export default useDropdown;
