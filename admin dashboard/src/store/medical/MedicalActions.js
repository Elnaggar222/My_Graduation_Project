import { medicalTypes } from "../AllTypes";

export const fetchRecordStart = () => {
  return {
    type: medicalTypes.FETCH_RECORDS_START,
  };
};
export const fetchRecordSuccess = (allRecords) => {
  return {
    type: medicalTypes.FETCH_RECORDS_SUCCESS,
    payload: allRecords,
  };
};
export const fetchRecordFailure = (errorMessage) => {
  return {
    type: medicalTypes.FETCH_RECORDS_FAILURE,
    payload: errorMessage,
  };
};
export const updateRecordSuccess = (recordId, givenDate) => {
  return {
    type: medicalTypes.UPDATE_RECORDS_SUCCESS,
    payload: { recordId, givenDate },
  };
};
export const updateRecordFailure = (errorMessage) => {
  return {
    type: medicalTypes.UPDATE_RECORDS_FAILURE,
    payload: errorMessage,
  };
};
export const deleteRecordSuccess = (recordId) => {
  return {
    type: medicalTypes.DELETE_RECORDS_SUCCESS,
    payload: recordId,
  };
};
export const deleteRecordFailure = (errorMessage) => {
  return {
    type: medicalTypes.DELETE_RECORDS_FAILURE,
    payload: errorMessage,
  };
};
