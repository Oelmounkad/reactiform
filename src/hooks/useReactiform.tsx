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

  // GLOBAL ERRORS STATE
  const [globalErrors, setGlobalErrors] = useState<ReactiformError>({});

  useEffect(() => {
    console.log('customValidationFunctions:', customValidationFunctions)
    Object.entries(customValidationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const error = validator(fields[key].value);
        if (Object.values(error)[0]) {
          setFields((currFields) => ({ 
        ...currFields,
         [key]: {
          ...fields[key],
          errors: [...fields[key].errors]
        }}))
        } else {
            setFields((currFields) => ({ 
          ...currFields,
           [key]: {
            ...fields[key],
            errors: fields[key].errors?.filter((err) => err !== Object.keys(error)[0])
          }}));
      } 
      });
    });

    globalCustomValidationFunctions.forEach((validator) => {
      const error = validator(fields); // same treatment to include .value
      setGlobalErrors((currentErrors) => ({ ...currentErrors, ...error }));
    });
/* 
    console.log('validationFunctions:',customValidationFunctions);
    console.log('globalCustomValidationFunctions:',globalCustomValidationFunctions); */
  }, [fields, customValidationFunctions, globalCustomValidationFunctions]);

  const fillFieldsWithErrors = () => {
    // move logic here to prevent infinite loops caused by useµEffect calling useState and changinf the dependant state
  }

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
