import Navbar from "./components/header/Nabar";
import "./App.css";
import React from "react";
import { NavRoutes } from "./routes/NavRoutes";
import { useData } from "./contexts/DataProvider";
import { Loader } from "./components/Loader/Loader";

function App() {
  const { loading } = useData();
  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <NavRoutes />
    </>
  );
}

export default App;
