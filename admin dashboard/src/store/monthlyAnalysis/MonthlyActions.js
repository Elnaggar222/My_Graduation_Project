import { chartTypes } from "../AllTypes";

export const fetchPatientMonthlyStart = () => {
  return {
    type: chartTypes.FETCH_PATIENTSMONTHLY_START,
  };
};
export const fetchPatientMonthlySuccess = (PatientsMonthly) => {
  return {
    type: chartTypes.FETCH_PATIENTSMONTHLY_SUCCESS,
    payload: PatientsMonthly,
  };
};
export const fetchPatientMonthlyFailure = (errorMessage) => {
  return {
    type: chartTypes.FETCH_PATIENTSMONTHLY_FAILURE,
    payload: errorMessage,
  };
};

export const fetchHospitalMonthlyStart = () => {
  return {
    type: chartTypes.FETCH_HOSPITALSMONTHLY_START,
  };
};
export const fetchHospitalMonthlySuccess = (hospitalsMonthly) => {
  return {
    type: chartTypes.FETCH_HOSPITALSMONTHLY_SUCCESS,
    payload: hospitalsMonthly,
  };
};
export const fetchHospitalMonthlyFailure = (errorMessage) => {
  return {
    type: chartTypes.FETCH_HOSPITALSMONTHLY_FAILURE,
    payload: errorMessage,
  };
};
export const fetchRecordsMonthlyStart = () => {
  return {
    type: chartTypes.FETCH_RECORDSMONTHLY_START,
  };
};
export const fetchRecordsMonthlySuccess = (recordsMonthly) => {
  return {
    type: chartTypes.FETCH_RECORDSMONTHLY_SUCCESS,
    payload: recordsMonthly,
  };
};
export const fetchRecordsMonthlyFailure = (errorMessage) => {
  return {
    type: chartTypes.FETCH_RECORDSMONTHLY_FAILURE,
    payload: errorMessage,
  };
};
