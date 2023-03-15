import { ReactiformError } from "./reactiform-error.model";
import { ChangeEventHandler } from "react";
import { ReactiformState } from "./reactiform-state.model";

type HasErrorFunction = (error: string) => boolean;
export interface ReactiformReturnType {
  fields: ReactiformState;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  globalErrors: ReactiformError;
  hasError: HasErrorFunction;
}
