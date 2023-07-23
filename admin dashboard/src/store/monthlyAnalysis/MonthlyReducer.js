import { chartTypes } from "../AllTypes";

const initialState = {
  PatientsMonthly: [],
  PatientsMonthlyLoading: false,
  PatientsMonthlyError: null,
  hospitalsMonthly: [],
  hospitalsMonthlyLoading: false,
  hospitalsMonthlyError: null,
  recordsMonthly: [],
  recordsMonthlyLoading: false,
  recordsMonthlyError: null,
};

const MonthlyReducer = (state = initialState, action) => {
  switch (action.type) {
    case chartTypes.FETCH_PATIENTSMONTHLY_START:
      return {
        ...state,
        PatientsMonthlyLoading: true,
      };
    case chartTypes.FETCH_PATIENTSMONTHLY_SUCCESS:
      return {
        ...state,
        PatientsMonthlyLoading: false,
        PatientsMonthly: action.payload,
        PatientsMonthlyError: null,
      };
    case chartTypes.FETCH_PATIENTSMONTHLY_FAILURE:
      return {
        ...state,
        PatientsMonthlyLoading: false,
        PatientsMonthly: [],
        PatientsMonthlyError: action.payload,
      };
    case chartTypes.FETCH_HOSPITALSMONTHLY_START:
      return {
        ...state,
        hospitalsMonthlyLoading: true,
      };
    case chartTypes.FETCH_HOSPITALSMONTHLY_SUCCESS:
      return {
        ...state,
        hospitalsMonthlyLoading: false,
        hospitalsMonthly: action.payload,
        hospitalsMonthlyError: null,
      };
    case chartTypes.FETCH_HOSPITALSMONTHLY_FAILURE:
      return {
        ...state,
        hospitalsMonthlyLoading: false,
        hospitalsMonthly: [],
        hospitalsMonthlyError: action.payload,
      };
    case chartTypes.FETCH_RECORDSMONTHLY_START:
      return {
        ...state,
        recordsMonthlyLoading: true,
      };
    case chartTypes.FETCH_RECORDSMONTHLY_SUCCESS:
      return {
        ...state,
        recordsMonthlyLoading: false,
        recordsMonthly: action.payload,
        recordsMonthlyError: null,
      };
    case chartTypes.FETCH_RECORDSMONTHLY_FAILURE:
      return {
        ...state,
        recordsMonthlyLoading: false,
        recordsMonthly: [],
        recordsMonthlyError: action.payload,
      };
    default:
      return state;
  }
};
export default MonthlyReducer;
