import { medicalTypes } from "../AllTypes";

const initialState = {
  allRecords: [],
  recordsLoading: false,
  recordsError: null,
};

const medicalReducer = (state = initialState, action) => {
  switch (action.type) {
    case medicalTypes.FETCH_RECORDS_START:
      return {
        ...state,
        recordsLoading: true,
      };
    case medicalTypes.FETCH_RECORDS_SUCCESS:
      return {
        ...state,
        recordsLoading: false,
        allRecords: action.payload,
        recordsError: null,
      };
    case medicalTypes.FETCH_RECORDS_FAILURE:
      return {
        ...state,
        recordsLoading: false,
        allRecords: [],
        recordsError: action.payload,
      };
    case medicalTypes.UPDATE_RECORDS_SUCCESS:
      return {
        ...state,
        recordsLoading: false,
        allRecords: handleRecordUpdate(state.allRecords, action.payload),
        recordsError: null,
      };
    case medicalTypes.UPDATE_RECORDS_FAILURE:
      return {
        ...state,
        recordsLoading: false,
        allRecords: [...state.allRecords],
        recordsError: null,
      };
    case medicalTypes.DELETE_RECORDS_SUCCESS:
      return {
        ...state,
        recordsLoading: false,
        allRecords: handleRecordDelete(state.allRecords, action.payload),
        recordsError: null,
      };
    case medicalTypes.DELETE_RECORDS_FAILURE:
      return {
        ...state,
        recordsLoading: false,
        allRecords: [...state.allRecords],
        recordsError: null,
      };
    default:
      return state;
  }
};
const handleRecordUpdate = (allRecords, givenObject) => {
  return allRecords.map((record) => {
    if (record.id === givenObject.recordId) {
      return { ...record, date: givenObject.givenDate, status: "approved" };
    } else {
      return record;
    }
  });
};

const handleRecordDelete = (allRecords, recordId) =>
  allRecords.filter((record) => record.id !== recordId);

export default medicalReducer;
