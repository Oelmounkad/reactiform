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
  getReactiformCustomValidatorFunctionsFromReactiformFields,
} from "../utilities/reactiform-mappers";

export interface ReactiformValidatorFunctions {
  [key: string]: ReactiformFieldValidator[];
}

export const useReactiform = (
  reactiformOptions: ReactiformOptions
): ReactiformReturnType => {
  const { initialValues, globalCustomValidators } = reactiformOptions;

  const reactiformState = getReactiformStateFromReactiformFields(initialValues);

  const reactiformCustomValidationFunctions = getReactiformCustomValidatorFunctionsFromReactiformFields(initialValues);

  // customValidators VALIDATION FUNCTIONS
  const [customValidationFunctions] = useState<ReactiformValidatorFunctions>(reactiformCustomValidationFunctions);

  // globalCustomValidators VALIDATION FUNCTIONS
  const [globalCustomValidationFunctions] = useState<ReactiformGlobalCustomValidator[]>(globalCustomValidators as ReactiformGlobalCustomValidator[]);

  // VALUES STATE
  const [fields, setFields] = useState<ReactiformState>(reactiformState);

  // ERRORS STATE
  const [globalErrors, setGlobalErrors] = useState<ReactiformError>({});

  useEffect(() => {
    Object.entries(customValidationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const error = validator(fields[key]);
        setGlobalErrors((currentErrors) => ({ ...currentErrors, ...error }));
      });
    });

    globalCustomValidationFunctions.forEach((validator) => {
      const error = validator(fields);
      setGlobalErrors((currentErrors) => ({ ...currentErrors, ...error }));
    });

    console.log('validationFunctions:',customValidationFunctions);
    console.log('globalCustomValidationFunctions:',globalCustomValidationFunctions);
  }, [fields]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: {
        ...fields[e.target.name],
        value: e.target.value
      },
    });
  };

  const hasError = (error: string): boolean => {
    return Object.entries(globalErrors).some((formError) =>
      [error, true].every((value, i) => value === formError[i])
    );
  };

  return { fields, handleChange, globalErrors, hasError};
};
