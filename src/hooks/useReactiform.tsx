import { ChangeEvent, useState } from "react";
import { ReactiformOptions } from "../models/reactiform-options.model";
import { ReactiformReturnType } from "../models/reactiform-return-type.type";
import { ReactiformState } from "../models/reactiform-state.model";
import { getReactiformStateFromReactiformFields } from "../utilities/reactiform-mappers";

export const useReactiform = (
  reactiformOptions: ReactiformOptions
): ReactiformReturnType => {
  const { initialValues } = reactiformOptions;

  const reactiformState = getReactiformStateFromReactiformFields(initialValues);

  const [formValues, setFormValues] =
    useState<ReactiformState>(reactiformState);

  const onFormValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return [formValues, onFormValuesChange];
};
