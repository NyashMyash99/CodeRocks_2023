import { ChangeEvent } from "react";
import { ButtonProps, ButtonStyles } from "../buttons/Button";

export interface TextAreaProps {
  width?: ButtonProps["width"];
  size?: ButtonProps["size"];
  rounding?: ButtonProps["rounding"];
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const TextAreaStyles: Record<
  keyof Pick<ButtonProps, "width" | "size" | "rounding">,
  any
> = {
  width: ButtonStyles.width,
  size: {
    small: "text-lg p-1 px-2 font-regular",
    medium: "text-xl p-2 px-5 font-medium",
    large: "text-2xl p-3 px-6 font-semibold",
  },
  rounding: ButtonStyles.rounding,
};

export const TextArea = ({
  width = "full-width",
  size = "medium",
  rounding = "rounded",
  required = false,
  defaultValue = "",
  placeholder = "",
  name = "",
  className = "bg-white-opacity",
  onChange = () => {},
}: TextAreaProps) => {
  function handleChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    onChange(target.value);
  }

  return (
    <textarea
      required={required}
      defaultValue={defaultValue}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      className={`${className} ${TextAreaStyles.size[size]} ${TextAreaStyles.width[width]} ${TextAreaStyles.rounding[rounding]} shadow-black drop-shadow-md border-primary border-2 text-primary w-full focus:outline-none placeholder:text-primary placeholder:opacity-50`}
    />
  );
};
