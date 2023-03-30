import { ChangeEvent, useEffect, useState } from "react";
import { ReactiformError } from "../models/reactiform-error.model";
import { ReactiformFieldValidator, ReactiformFieldValidatorReturnType } from "../models/reactiform-field-options.model";
import { ReactiformFieldsErrors } from "../models/reactiform-fields-errors.model";
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
  const [fieldsErrors, setFieldsErrors] = useState<ReactiformFieldsErrors>(initializedFieldsErrors);

  // GLOBAL ERRORS STATE
  const [globalErrors, setGlobalErrors] = useState<ReactiformError>({});

  useEffect(() => {
    Object.entries(customValidationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const error = validator(fields[key]);
        fillFieldsErrors(error, key);
      });
    });

    globalCustomValidationFunctions.forEach((validator) => {
      const error = validator(fields);
      console.log('#############', error)
      setGlobalErrors((currentErrors) => ({ ...currentErrors, ...error }));
    });
  }, [fields]);

  const fillFieldsErrors = (error: ReactiformFieldValidatorReturnType, key: string) => {
    const errorKey = Object.keys(error)[0];
    // if error is true and error doesnt exist
    if (Object.values(error)[0] && !fieldHasError(key, errorKey)) {
      setFieldsErrors((currFieldsErrors) => 
      ({ 
        ...currFieldsErrors,
        [key]: [...currFieldsErrors[key], errorKey]
      }))
    // if error is false and error exists
    } else if (!Object.values(error)[0] && fieldHasError(key, errorKey)){
      setFieldsErrors((currFieldsErrors) => 
      ({ 
        ...currFieldsErrors,
        [key]: currFieldsErrors[key].filter((err) => err !== errorKey)
      }))
  } 
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]:e.target.value,
    });
  };

  const fieldHasError = (field: string, error: string) => {
    return Boolean(fieldsErrors[field].find((err) => err === error));
  }

  const hasError = (error: string): boolean => {
       return Object.entries(globalErrors).some((formError) =>
      [error, true].every((value, i) => value === formError[i])
    );
  };
  

  return { fields, handleChange, fieldsErrors, globalErrors, hasError, fieldHasError};
};
