import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";
import { ButtonProps, ButtonStyles } from "../buttons/Button";

export interface IconedInputProps {
  width?: ButtonProps["width"];
  size?: ButtonProps["size"];
  rounding?: ButtonProps["rounding"];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
}

export const IconedInputStyles: Record<
  keyof Pick<IconedInputProps, "width" | "size" | "rounding">,
  any
> = {
  width: ButtonStyles.width,
  size: {
    small: "text-lg p-1 font-regular",
    medium: "text-xl p-2 font-medium",
    large: "text-2xl p-3 font-semibold",
  },
  rounding: ButtonStyles.rounding,
};

const iconStyle = {
  start: {
    small: "pl-2",
    medium: "pl-3",
    large: "pl-4",
  },
  end: {
    small: "pr-2",
    medium: "pr-3",
    large: "pr-4",
  },
};

export const IconedInput = ({
  startIcon,
  endIcon,
  width = "full-width",
  size = "medium",
  rounding = "rounded",
  type = "text",
  required = false,
  defaultValue = "",
  placeholder = "",
  name = "",
  className = "bg-white-opacity",
  inputClassName = "",
  onChange = () => {},
}: IconedInputProps) => {
  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    onChange(target.value);
  }

  return (
    <div
      className={`${className} bg-white-opacity flex justify-center items-center shadow-black drop-shadow-md border-primary border-2 text-primary ${IconedInputStyles.width[width]} ${IconedInputStyles.rounding[rounding]} ${IconedInputStyles.size[size]}`}
    >
      {startIcon && <span className={iconStyle.start[size]}>{startIcon}</span>}

      <input
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        className={`${inputClassName} bg-none w-full focus:outline-none placeholder:text-primary placeholder:opacity-50 ${IconedInputStyles.rounding[rounding]} ${IconedInputStyles.size[size]}`}
      />

      {endIcon && <span className={iconStyle.end[size]}>{endIcon}</span>}
    </div>
  );
};
