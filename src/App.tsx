import { useReactiform } from "./hooks/useReactiform";
import Validators from "./utilities/reactiform-validators";

const myCustomValidator = (values: any) => {
  return values.user === 'toto'
    ? { dumbUserError: true }
    : { dumbUserError: false };
};

const myPasswordValidator = (password: any) => {
  return password.length < 4
    ? { passwordLessThan4Error: true }
    : { passwordLessThan4Error: false };
};

const mySecondPasswordValidator = (password: any) => {
  return password === "12345"
    ? { passwordSecurityError: true }
    : { passwordSecurityError: false };
};

const myUserValidator = (user: any) => {
  return user.length > 4
    ? { userMoreThan4CharactersError: true }
    : { userMoreThan4CharactersError: false };
};

function App() {
  // testing playground

  const { fields, handleChange, globalErrors, hasError, fieldsErrors } = useReactiform({
    initialValues: {
      user: {
        value: '',
        // validators: [Validators.required], // need to add the functionnality for validators (To Add Later)
        customValidators: [myUserValidator],
      },
      password: {
        value: '',
        customValidators: [myPasswordValidator, mySecondPasswordValidator],
      },
    },
    globalCustomValidators: [myCustomValidator]
  });

  return (
    <>
      <input
        name="user"
        placeholder="User"
        value={fields.user}
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="Password"
        value={fields.password}
        onChange={handleChange}
      />
      <p>{JSON.stringify(fields)}</p>
      <p>{JSON.stringify(globalErrors)}</p>
      <hr />
      <p>{JSON.stringify(fieldsErrors)}</p>
      {/* <ul>
        {Object.keys(errors).map((errorName) => (
          <li>
            {" "}
            {errorName} = {hasError(errorName).toString()}{" "}
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default App;
