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

  const [validationFunctions, setValidationFunctions] =
    useState<ReactiformValidatorFunctions>(reactiformValidationFunctions);

  const [formValues, setFormValues] =
    useState<ReactiformState>(reactiformState);

  const [errors, setErrors] = useState<ReactiformError[]>([]);

  useEffect(() => {
    Object.entries(validationFunctions).forEach(([key, validators]) => {
      validators.forEach((validator) => {
        const x = validator(formValues[key]);
        console.log("new error", x);
        setErrors((err) => [...err, x]);

        console.log(`##################errors: ${JSON.stringify(errors)}`);
      });
    });

    console.log("changed");
  }, [formValues]);

  const onFormValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return [formValues, onFormValuesChange, errors];
};
