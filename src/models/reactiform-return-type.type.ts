import { ReactiformError } from "./reactiform-error.model";
import { ChangeEventHandler } from "react";
import { ReactiformState } from "./reactiform-state.model";
import { ReactiformFieldsErrors } from "./reactiform-fields-errors.model";

type HasErrorFunction = (error: string) => boolean;
type FieldHasErrorFunction = (field: string, error: string) => boolean;
export interface ReactiformReturnType {
  fields: ReactiformState;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  fieldsErrors?: ReactiformFieldsErrors;
  globalErrors?: ReactiformError;
  hasError: HasErrorFunction;
  fieldHasError: FieldHasErrorFunction;
  valid: boolean;
}
