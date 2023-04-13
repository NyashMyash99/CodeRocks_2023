import { FunctionParameters } from "../../../utils/types/function-parameters.type";
import { useState } from "react";
import { IconedInput } from "./IconedInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface PasswordInputProps {
  passwordVisibility?: "visible" | "hidden";
}

export const PasswordInput = ({
  passwordVisibility = "hidden",
  ...props
}: PasswordInputProps & FunctionParameters<typeof IconedInput>) => {
  const [textVisibility, setTextVisibility] = useState(
    passwordVisibility === "visible"
  );

  return (
    <IconedInput
      {...props}
      type={textVisibility ? "text" : "password"}
      endIcon={
        textVisibility ? (
          <FaEye onClick={() => setTextVisibility(false)} />
        ) : (
          <FaEyeSlash onClick={() => setTextVisibility(true)} />
        )
      }
    />
  );
};
