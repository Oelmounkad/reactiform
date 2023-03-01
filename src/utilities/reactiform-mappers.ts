import { ReactiformFields } from "../models/reactiform-fields.model";

export const getReactiformStateFromReactiformFields = (
  initialValues: ReactiformFields
) => {
  return Object.entries(initialValues).reduce((acc: any, curr) => {
    acc[curr[0]] = curr[1].value;
    return acc;
  }, {});
};
