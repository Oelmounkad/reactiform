export interface ReactiformFieldOptions {
  value: ReactiformFieldValue;
  validators?: ReactiformFieldValidator[];
}

type ReactiformFieldValue = any;
export type ReactiformFieldValidator = (
  field: any
) => ReactiformFieldValidatorReturnType;

interface ReactiformFieldValidatorReturnType {
  [key: string]: boolean;
}
