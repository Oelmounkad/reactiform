export interface ReactiformFieldOptions {
  value: ReactiformFieldValue;
  validators?: any;
  customValidators?: ReactiformFieldValidator[];
}

type ReactiformFieldValue = any;
export type ReactiformFieldValidator = (
  field: any
) => ReactiformFieldValidatorReturnType;

interface ReactiformFieldValidatorReturnType {
  [key: string]: boolean;
}
