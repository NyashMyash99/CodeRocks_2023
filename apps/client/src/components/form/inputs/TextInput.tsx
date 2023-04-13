import { FunctionParameters } from "../../../utils/types/function-parameters.type";
import { IconedInput } from "./IconedInput";

export const TextInput = (props: FunctionParameters<typeof IconedInput>) => {
  return <IconedInput {...props} type="text" />;
};
