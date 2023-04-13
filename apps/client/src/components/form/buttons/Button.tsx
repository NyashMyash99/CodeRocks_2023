import { PropsWithChildren } from "react";

export interface ButtonProps {
  width?: "full-width" | "fit" | "75" | "50" | "25";
  size?: "small" | "medium" | "large";
  variant?: "filled" | "outline";
  rounding?: "default" | "rounded" | "h-rounded";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ButtonStyles: Record<
  keyof Pick<ButtonProps, "width" | "size" | "variant" | "rounding">,
  any
> = {
  width: {
    "full-width": "w-full",
    fit: "w-fit",
    75: "w-3/4",
    50: "w-1/2",
    25: "w-1/4",
  },
  size: {
    small: "text-xl p-2 px-6 font-regular",
    medium: "text-2xl p-3 px-8 font-medium",
    large: "text-4xl p-4 px-12 font-semibold",
  },
  variant: {
    filled: "bg-primary text-white",
    outline:
      "border-primary text-primary border-2 disabled:bg-none disabled:border-black disabled:text-black",
  },
  rounding: {
    rounded: "rounded-xl",
    "h-rounded": "rounded-3xl",
  },
};

export const Button = ({
  width = "full-width",
  size = "medium",
  variant = "filled",
  rounding = "rounded",
  disabled = false,
  className = "",
  onClick = () => {},
  children,
}: ButtonProps & PropsWithChildren) => {
  return (
    <button
      className={`${className} disabled:bg-black disabled:hover:scale-100 disabled:cursor-no-drop drop-shadow-black shadow-md hover:scale-105 transition-transform ${ButtonStyles.width[width]} ${ButtonStyles.size[size]} ${ButtonStyles.variant[variant]} ${ButtonStyles.rounding[rounding]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
