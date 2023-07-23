import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AllReducers from "./store/AllReducers";
import { applyMiddleware, compose, createStore } from "redux";
import { AdminMiddleware } from "./store/middlewares/cookieMiddlewares.js";
import { adminTypes } from "./store/AllTypes";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  AllReducers,
  composeEnhancers(applyMiddleware(AdminMiddleware))
);
store.dispatch({ type: adminTypes.INITIALIZE_APP_Admin });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
