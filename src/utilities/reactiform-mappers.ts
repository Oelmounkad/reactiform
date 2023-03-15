import { ReactiformValidatorFunctions } from "../hooks/useReactiform";
import { ReactiformFields } from "../models/reactiform-fields.model";

export const getReactiformStateFromReactiformFields = (
  initialValues: ReactiformFields
) => {
  return Object.entries(initialValues).reduce((acc: any, curr) => {
    acc[curr[0]] = {value: curr[1].value};
    return acc;
  }, {});
};

export const getReactiformCustomValidatorFunctionsFromReactiformFields = (
  initialValues: ReactiformFields
): ReactiformValidatorFunctions => {
  return Object.entries(initialValues).reduce((acc: any, curr) => {
    acc[curr[0]] = curr[1].customValidators;
    return acc;
  }, {});
};
