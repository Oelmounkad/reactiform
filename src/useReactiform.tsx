import React, { ChangeEventHandler, useState } from "react";

interface ReactiformOptions {
  initialValues: ReactiformFields;
}

interface ReactiformFieldOptions {
  value: any;
  validators?: Function[];
}
interface ReactiformFields {
  [key: string]: ReactiformFieldOptions;
}

interface ReactiformState {
  [key: string]: any;
}

type ReactiformReturnType = [
  v: ReactiformState,
  handleChange: ChangeEventHandler<HTMLInputElement>
];

const getReactiformStateFromReactiformFields = (
  initialValues: ReactiformFields
) => {
  return Object.entries(initialValues).reduce((acc: any, curr) => {
    acc[curr[0]] = curr[1].value;
    return acc;
  }, {});
};

export const useReactiform = (
  reactiformOptions: ReactiformOptions
): ReactiformReturnType => {
  const { initialValues } = reactiformOptions;

  const reactiformState = getReactiformStateFromReactiformFields(initialValues);

  const [formValues, setFormValues] =
    useState<ReactiformState>(reactiformState);

  const onFormValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // to delete if useless
  /*   const htmlForm: JSX.Element = (
    <>
      {Object.entries(formValues).map(([key, value]) => (
        <input
          key={key}
          name={key}
          value={value}
          placeholder={key}
          onChange={onFormValuesChange}
        />
      ))}
    </>
  ); */

  return [formValues, onFormValuesChange];
};
