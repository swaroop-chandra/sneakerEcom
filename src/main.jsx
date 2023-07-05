import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./contexts/DataProvider.jsx";
import { makeServer } from "./server";
import { UserProvider } from "./contexts/UserDataProvider.jsx";
makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>
);
