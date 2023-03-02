import { ChangeEvent, useEffect, useState } from "react";
import { ReactiformError } from "../models/reactiform-error.model";
import { ReactiformFieldValidator } from "../models/reactiform-field-options.model";
import { ReactiformOptions } from "../models/reactiform-options.model";
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
  const { initialValues } = reactiformOptions;

  const reactiformState = getReactiformStateFromReactiformFields(initialValues);

  const reactiformValidationFunctions =
    getReactiformValidatorFunctionsFromReactiformFields(initialValues);

  const [validationFunctions] = useState<ReactiformValidatorFunctions>(
    reactiformValidationFunctions
  );

  const [formValues, setFormValues] =
    useState<ReactiformState>(reactiformState);

  const [errors, setErrors] = useState<ReactiformError>({});

  useEffect(() => {
    Object.entries(validationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const error = validator(formValues[key]);
        setErrors((currentErrors) => ({ ...currentErrors, ...error }));
      });
    });
  }, [formValues]);

  const onFormValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const hasError = (error: string): boolean => {
    return Object.entries(errors).some((formError) =>
      [error, true].every((value, i) => value === formError[i])
    );
  };

  return [formValues, onFormValuesChange, errors, hasError];
};
