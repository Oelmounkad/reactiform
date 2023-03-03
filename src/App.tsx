import { useReactiform } from "./hooks/useReactiform";


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
  return password === "1234"
    ? { passwordSecurityError: true }
    : { passwordSecurityError: false };
};

const myUserValidator = (user: any) => {
  return user.length > 5
    ? { userMoreThan4CharactersError: true }
    : { userMoreThan4CharactersError: false };
};

function App() {
  // testing playground

  const { values, handleChange, errors, hasError } = useReactiform({
    initialValues: {
      user: {
        value: "",
        validators: [myUserValidator],
      },
      password: {
        value: "",
        validators: [myPasswordValidator, mySecondPasswordValidator],
      },
    },
    globalCustomValidators: [myCustomValidator]
  });

  return (
    <>
      <input
        name="user"
        placeholder="User"
        value={values.user}
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      <p>{JSON.stringify(values)}</p>
      <p>{JSON.stringify(errors)}</p>
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
