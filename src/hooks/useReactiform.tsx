import { ChangeEvent, useEffect, useState } from "react";
import { ReactiformError } from "../models/reactiform-error.model";
import { ReactiformFieldValidator, ReactiformFieldValidatorReturnType } from "../models/reactiform-field-options.model";
import { ReactiformFieldsError } from "../models/reactiform-fields-errors.model";
import {
  ReactiformGlobalCustomValidator,
  ReactiformOptions,
} from "../models/reactiform-options.model";
import { ReactiformReturnType } from "../models/reactiform-return-type.type";
import { ReactiformState } from "../models/reactiform-state.model";
import {
  getReactiformStateFromReactiformFields,
  getReactiformCustomValidatorFunctionsFromReactiformFields,
  initializeFieldsErrorsState,
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

  const initializedFieldsErrors = initializeFieldsErrorsState(initialValues);

  // FIELD ERRORS STATE
  const [fieldsErrors, setFieldsErrors] = useState<ReactiformFieldsError[]>(initializedFieldsErrors);

  // GLOBAL ERRORS STATE
  const [globalErrors, setGlobalErrors] = useState<ReactiformError>({});

  useEffect(() => {
    console.log('customValidationFunctions:', customValidationFunctions)
    Object.entries(customValidationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const error = validator(fields[key]);
        fillFieldsWithErrors(error, key);
      });
    });

    globalCustomValidationFunctions.forEach((validator) => {
      const error = validator(fields); // same treatment to include .value
      setGlobalErrors((currentErrors) => ({ ...currentErrors, ...error }));
    });
/* 
    console.log('validationFunctions:',customValidationFunctions);
    console.log('globalCustomValidationFunctions:',globalCustomValidationFunctions); */
  }, [fields]);

  const fillFieldsWithErrors = (error: ReactiformFieldValidatorReturnType, key: string) => {
    // if error is true and error doesnt exist
    if (Object.values(error)[0] && !fieldHasError(key, Object.keys(error)[0])) {
      setFieldsErrors((currentFieldsErrors) => 
      ([...currentFieldsErrors,
        {
          [key]: {
            key,
            errors: [...currentFieldsErrors.find((err) => err.key === key)?.errors as string[], Object.keys(error)[0]],
          } 
        } as unknown as ReactiformFieldsError
         ])
        )
    // if error is false and error exists
    } else if (!Object.values(error)[0] && fieldHasError(key, Object.keys(error)[0])){
      setFieldsErrors((currentFieldsErrors) => 
      ([...currentFieldsErrors,
        {
          [key]: {
            key,
            errors: currentFieldsErrors.find((fieldError) => fieldError.key === key)?.errors
            .filter((err) => err !== Object.keys(error)[0])
          } 
        } as unknown as ReactiformFieldsError
         ])
        )
  } 
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]:e.target.value,
    });
  };

  const fieldHasError = (field: string, error: string) => {
    const errorArray = fieldsErrors.find((fieldError) => fieldError.key === field)?.errors;
    return errorArray?.find((err) => err === error);
  }

  const hasError = (error: string): boolean => {
       return Object.entries(globalErrors).some((formError) =>
      [error, true].every((value, i) => value === formError[i])
    );
  };

  return { fields, handleChange, fieldsErrors, globalErrors, hasError};
};
