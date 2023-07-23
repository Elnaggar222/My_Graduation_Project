import { adminTypes } from "../AllTypes";

const initialState = {
  currentAdmin: null,
  isLoading: false,
  error: null,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case adminTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentAdmin: action.payload,
        error: null,
      };
    case adminTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        currentAdmin: null,
        error: action.payload,
      };
    case adminTypes.LOAD_Admin_DATA:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        currentAdmin: action.payload.currentAdmin,
        error: action.payload.error,
      };
    case adminTypes.DELETE_Admin:
      return {
        currentAdmin: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default AdminReducer;
