import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const store = configureStore();
ReactDOM.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      {/* <Router>
        <App />
      </Router> */}

      <HashRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>,
      </HashRouter>

    </React.StrictMode>
  </ReduxProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
