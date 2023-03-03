import { ReactiformFields } from "./reactiform-fields.model";

export interface ReactiformOptions {
  initialValues: ReactiformFields;
  globalCustomValidators?: ReactiformGlobalCustomValidator[];
}

export type ReactiformGlobalCustomValidator = (
  formValues: any
) => ReactiformGlobalCustomValidatorReturnType;

interface ReactiformGlobalCustomValidatorReturnType {
  [key: string]: boolean;
}
