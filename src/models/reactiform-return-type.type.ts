import { ReactiformError } from "./reactiform-error.model";
import { ChangeEventHandler } from "react";
import { ReactiformState } from "./reactiform-state.model";

type HasErrorFunction = (error: string) => boolean;
export interface ReactiformReturnType {
  values: ReactiformState;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: ReactiformError;
  hasError: HasErrorFunction;
}
