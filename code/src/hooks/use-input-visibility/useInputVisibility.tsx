import { useState } from "react";

import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import AppIconButton from "@/components/app-icon-button/AppIconButton";

const useInputVisibility = (error: string) => {
  const [showInputText, setShowInputText] = useState(false);

  //   visibilityIconColor = error ? "error" : "secondary";

  const inputVisibility = {
    endAdornment: (
      <InputAdornment position="end">
        <AppIconButton onClick={() => setShowInputText(!showInputText)}>
          {showInputText ? (
            <VisibilityIcon color="secondary" />
          ) : (
            <VisibilityOffIcon color="secondary" />
          )}
        </AppIconButton>
      </InputAdornment>
    )
  };

  return { inputVisibility, showInputText, setShowInputText };
};

export default useInputVisibility;
