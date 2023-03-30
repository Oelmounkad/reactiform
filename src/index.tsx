import React from "react";
import ReactDOM from "react-dom/client";
import TestingPlayground from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TestingPlayground />
  </React.StrictMode>
);
