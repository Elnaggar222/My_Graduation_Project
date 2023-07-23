import Cookies from "js-cookie";
import {adminTypes } from "../AllTypes";

export const AdminMiddleware = (store) => (next) => (action) => {
    let AdminData = null;
    const result = next(action);
    if (
      action.type === adminTypes.LOGIN_SUCCESS ||
      action.type === adminTypes.LOGIN_FAILURE
    ) {
      Cookies.set("adminData", JSON.stringify(store.getState().AdminState));
    } else if (action.type === adminTypes.INITIALIZE_APP_Admin) {
      if (Cookies.get("adminData")) {
        AdminData = JSON.parse(Cookies.get("adminData"));
        store.dispatch({ type: adminTypes.LOAD_Admin_DATA, payload: AdminData });
      }
    } else if (action.type === adminTypes.DELETE_Admin) {
      Cookies.set("adminData", "");
    }
    return result;
  };
  