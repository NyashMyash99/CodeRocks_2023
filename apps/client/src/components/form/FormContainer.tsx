import { FormEvent, PropsWithChildren } from "react";
import { useActions } from "../../hooks/actions.hook";
import { toastError } from "../../utils/helpers/toast.helpers";

interface Validator {
  pattern: RegExp;
  error: string;
}

interface FormProps {
  onSuccess: (data: any) => void;
  validator?: Record<string, [Validator]>;
  className?: string;
}

export function FormContainer({
  onSuccess,
  validator,
  className,
  children,
}: FormProps & PropsWithChildren) {
  const { errorWatchable } = useActions();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: { [key: string]: any } = {};
    new FormData(event.currentTarget).forEach((value, name) => {
      formData[name] = value;
    });

    if (!validator) return onSuccess(formData);

    for (const [name, rules] of Object.entries(validator)) {
      const value = formData[name];
      if (value === undefined) continue;

      for (const rule of rules) {
        if (!rule.pattern.test(value)) {
          toastError(rule.error);
          errorWatchable(name);
          return;
        }
      }
    }

    onSuccess(formData);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
