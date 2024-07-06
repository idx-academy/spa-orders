import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

import AppIconButton from "@/components/app-icon-button/AppIconButton";

import cn from "@/utils/cn/cn";

import "@/hooks/use-input-visibility/VisibilityIcon.scss";

type UseInputVisibilityProps = {
  isError?: boolean;
};

const useInputVisibility = ({ isError }: UseInputVisibilityProps = {}) => {
  const [shouldShowInputText, setShouldShowInputText] = useState(false);

  let errorClass: string | undefined;
  if (isError) {
    errorClass = "spa-visibility-icon--error";
  }

  const inputVisibility = {
    endAdornment: (
      <InputAdornment position="end">
        <AppIconButton
          onClick={() => setShouldShowInputText(!shouldShowInputText)}
        >
          {shouldShowInputText ? (
            <VisibilityIcon className={cn(errorClass)} />
          ) : (
            <VisibilityOffIcon className={cn(errorClass)} />
          )}
        </AppIconButton>
      </InputAdornment>
    )
  };

  return { inputVisibility, shouldShowInputText, setShouldShowInputText };
};

export default useInputVisibility;
