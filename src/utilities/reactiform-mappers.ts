import { ReactiformValidatorFunctions } from "../hooks/useReactiform";
import { ReactiformFieldsErrors } from "../models/reactiform-fields-errors.model";
import { ReactiformFields } from "../models/reactiform-fields.model";

export const getReactiformStateFromReactiformFields = (
  initialValues: ReactiformFields
) => {
  return Object.entries(initialValues).reduce((acc: any, curr) => {
    acc[curr[0]] = curr[1].value;
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

export const initializeFieldsErrorsState = (
  initialValues: ReactiformFields
): ReactiformFieldsErrors => {
  return Object.keys(initialValues).reduce((acc: any, curr) => {
    acc[curr] = [];
    return acc;
  }, {})
};
