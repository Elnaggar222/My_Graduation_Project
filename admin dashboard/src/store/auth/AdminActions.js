import { adminTypes } from "../AllTypes";
export const loginStart = () => {
  return {
    type: adminTypes.LOGIN_START,
  };
};
export const loginSuccess = (adminInfo) => {
  return {
    type: adminTypes.LOGIN_SUCCESS,
    payload: adminInfo,
  };
};
export const loginFailure = (errorMessage) => {
  return {
    type: adminTypes.LOGIN_FAILURE,
    payload: errorMessage,
  };
};

export const DeleteAdmin = () => {
  return {
    type: adminTypes.DELETE_Admin,
  };
};
