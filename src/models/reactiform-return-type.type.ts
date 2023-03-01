import { ChangeEventHandler } from "react";
import { ReactiformState } from "./reactiform-state.model";

export type ReactiformReturnType = [
  v: ReactiformState,
  handleChange: ChangeEventHandler<HTMLInputElement>
];
