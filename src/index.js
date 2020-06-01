import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AddressContextProvier } from "./context/addressContext";
import App from "./App";

ReactDOM.render(
  <Router>
    <AddressContextProvier>
      <App />
    </AddressContextProvier>
  </Router>,
  document.getElementById("root")
);
