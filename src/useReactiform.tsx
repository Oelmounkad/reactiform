import React, { ChangeEventHandler, useState } from "react";

interface ReactiformOptions {
  initialValues: InitialValues;
}
interface InitialValues {
  [key: string]: any;
}

export const useReactiform = (
  reactiFormOptions: ReactiformOptions
): [v: InitialValues, handleChange: ChangeEventHandler<HTMLInputElement>] => {
  const { initialValues } = reactiFormOptions;
  const [formValues, setFormValues] = useState<InitialValues>(initialValues);

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
