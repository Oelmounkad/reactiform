import { ReactiformError } from "./reactiform-error.model";
import { ChangeEventHandler } from "react";
import { ReactiformState } from "./reactiform-state.model";
import { ReactiformFieldsError } from "./reactiform-fields-errors.model";

type HasErrorFunction = (error: string) => boolean;
export interface ReactiformReturnType {
  fields: ReactiformState;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  fieldsErrors: ReactiformFieldsError[];
  globalErrors: ReactiformError;
  hasError: HasErrorFunction;
}
