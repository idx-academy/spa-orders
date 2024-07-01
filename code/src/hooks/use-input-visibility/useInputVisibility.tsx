import { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import AppIconButton from "@/components/app-icon-button/AppIconButton";

const useInputVisibility = () => {
  const [shouldShowInputText, setShouldShowInputText] = useState(false);

  const inputVisibility = {
    endAdornment: (
      <InputAdornment position="end">
        <AppIconButton onClick={() => setShouldShowInputText(!shouldShowInputText)}>
          {shouldShowInputText ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </AppIconButton>
      </InputAdornment>
    )
  };

  return { inputVisibility, shouldShowInputText, setShouldShowInputText };
};

export default useInputVisibility;
