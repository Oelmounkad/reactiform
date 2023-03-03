import { ChangeEvent, useEffect, useState } from "react";
import { ReactiformError } from "../models/reactiform-error.model";
import { ReactiformFieldValidator } from "../models/reactiform-field-options.model";
import {
  ReactiformGlobalCustomValidator,
  ReactiformOptions,
} from "../models/reactiform-options.model";
import { ReactiformReturnType } from "../models/reactiform-return-type.type";
import { ReactiformState } from "../models/reactiform-state.model";
import {
  getReactiformStateFromReactiformFields,
  getReactiformValidatorFunctionsFromReactiformFields,
} from "../utilities/reactiform-mappers";

export interface ReactiformValidatorFunctions {
  [key: string]: ReactiformFieldValidator[];
}

export const useReactiform = (
  reactiformOptions: ReactiformOptions
): ReactiformReturnType => {
  const { initialValues, globalCustomValidators } = reactiformOptions;

  const reactiformState = getReactiformStateFromReactiformFields(initialValues);

  const reactiformValidationFunctions =
    getReactiformValidatorFunctionsFromReactiformFields(initialValues);

  const [validationFunctions] = useState<ReactiformValidatorFunctions>(
    reactiformValidationFunctions
  );

  const [globalCustomValidationFunctions] = useState<
    ReactiformGlobalCustomValidator[]
  >(globalCustomValidators as ReactiformGlobalCustomValidator[]);

  const [values, setValues] = useState<ReactiformState>(reactiformState);

  const [errors, setErrors] = useState<ReactiformError>({});

  useEffect(() => {
    Object.entries(validationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const error = validator(values[key]);
        setErrors((currentErrors) => ({ ...currentErrors, ...error }));
      });
    });

    globalCustomValidationFunctions.forEach((validator) => {
      const error = validator(values);
      setErrors((currentErrors) => ({ ...currentErrors, ...error }));
    });
  }, [values]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const hasError = (error: string): boolean => {
    return Object.entries(errors).some((formError) =>
      [error, true].every((value, i) => value === formError[i])
    );
  };

  return { values, handleChange, errors, hasError };
};
