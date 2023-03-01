import React, { useState } from "react";

interface InitialValues {
  [key: string]: any;
}

export const useReactiform = (
  initialValues: InitialValues
): [form: JSX.Element, v: InitialValues] => {
  const [formValues, setFormValues] = useState<InitialValues>(initialValues);

  const onFormValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const htmlForm = (
    <div>
      {Object.entries(formValues).map(([key, value]) => (
        <input
          key={key}
          name={key}
          value={value}
          placeholder={key}
          onChange={onFormValuesChange}
        />
      ))}
    </div>
  );

  return [htmlForm, formValues];
};
