import { useReactiform } from "./useReactiform";

function App() {
  const [htmlForm, values] = useReactiform({
    user: "",
    password: "",
    email: "",
  });

  return (
    <>
      <div>{htmlForm}</div>

      <p>{JSON.stringify(values)}</p>
    </>
  );
}

export default App;
