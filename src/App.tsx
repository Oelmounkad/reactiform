import { useReactiform } from "./useReactiform";

function App() {
  const [values, handleChange] = useReactiform({
    initialValues: {
      user: {
        value: "myUser",
      },
      password: {
        value: "myPassword",
      },
    },
  });

  return (
    <>
      <input name="user" value={values.user} onChange={handleChange} />
      <input name="password" value={values.password} onChange={handleChange} />
      <p>{JSON.stringify(values)}</p>
    </>
  );
}

export default App;
