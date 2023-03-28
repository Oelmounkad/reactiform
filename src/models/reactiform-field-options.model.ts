export interface ReactiformFieldOptions {
  value: ReactiformFieldValue;
  validators?: any;
  customValidators?: ReactiformFieldValidator[];
}

type ReactiformFieldValue = any;
export type ReactiformFieldValidator = (
  field: any
) => ReactiformFieldValidatorReturnType;

export interface ReactiformFieldValidatorReturnType {
  [key: string]: boolean;
}
