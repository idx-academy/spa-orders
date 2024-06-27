import React, { useState } from "react";
import AppInput from "./AppInput";

const Demo = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearch = () => {
    console.log("Search:", searchValue);
  };

  return (
    <>
      <AppInput
        variant="search"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        onSearch={handleSearch}
        sx={{ marginTop: "40px" }}
      />
      <AppInput
        variant="regular"
        label="First Name"
        placeholder="First Name"
        helperText="First Name"
        error
        sx={{ marginTop: "20px" }}
      />
      <AppInput
        variant="regular"
        label="Last Name"
        placeholder="Last Name"
        helperText="Last Name"
        error={false}
        sx={{ marginTop: "20px" }}
      />
    </>
  );
};

export default Demo;
