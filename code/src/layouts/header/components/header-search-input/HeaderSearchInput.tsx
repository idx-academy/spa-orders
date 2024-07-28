import { ChangeEvent, useState } from "react";

import AppInputWithIcon from "@/components/app-input-with-icon/AppInputWithIcon";

const HeaderSearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  // @TODO: add logic to search product
  const handleSearch = () => {};

  return (
    <AppInputWithIcon
      placeholder="Search..."
      value={searchValue}
      onChange={handleSearchChange}
      onClear={handleClearSearch}
      onSearch={handleSearch}
    />
  );
};

export default HeaderSearchInput;
