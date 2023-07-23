import { patientTypes } from "../AllTypes";
import { hospitalTypes } from "../AllTypes";
import { allAdminsTypes } from "../AllTypes";

export const fetchPatientStart = () => {
  return {
    type: patientTypes.FETCH_PATIENT_START,
  };
};
export const fetchPatientSuccess = (allPatients) => {
  return {
    type: patientTypes.FETCH_PATIENT_SUCCESS,
    payload: allPatients,
  };
};
export const fetchPatientFailure = (errorMessage) => {
  return {
    type: patientTypes.FETCH_PATIENT_FAILURE,
    payload: errorMessage,
  };
};

export const DeletePatientSuccess = (patientId) => {
  return {
    type: patientTypes.DELETE_PATIENT_SUCCESS,
    payload: patientId,
  };
};
export const deletePatientFailure = (errorMessage) => {
  return {
    type: patientTypes.DELETE_PATIENT_FAILURE,
    payload: errorMessage,
  };
};
export const addPatientSuccess = (newPatient) => {
  return {
    type: patientTypes.ADD_PATIENT_SUCCESS,
    payload: newPatient,
  };
};
export const addPatientFailure = (errorMessage) => {
  return {
    type: patientTypes.ADD_PATIENT_FAILURE,
    payload: errorMessage,
  };
};
export const updatePatientSuccess = (targetpatientId, updatedPatientInfo) => {
  return {
    type: patientTypes.UPDATE_PATIENT_SUCCESS,
    payload: { targetpatientId, updatedPatientInfo },
  };
};
export const updatePatientFailure = (errorMessage) => {
  return {
    type: patientTypes.UPDATE_PATIENT_FAILURE,
    payload: errorMessage,
  };
};
export const fetchHospitalStart = () => {
  return {
    type: hospitalTypes.FETCH_HOSPITAL_START,
  };
};
export const fetchHospitalSuccess = (allHospitals) => {
  return {
    type: hospitalTypes.FETCH_HOSPITAL_SUCCESS,
    payload: allHospitals,
  };
};
export const fetchHospitalFailure = (errorMessage) => {
  return {
    type: hospitalTypes.FETCH_HOSPITAL_FAILURE,
    payload: errorMessage,
  };
};
export const DeleteHospitalSuccess = (hospitalId) => {
  return {
    type: hospitalTypes.DELETE_HOSPITAL_SUCCESS,
    payload: hospitalId,
  };
};
export const deleteHospitalFailure = (errorMessage) => {
  return {
    type: hospitalTypes.DELETE_HOSPITAL_FAILURE,
    payload: errorMessage,
  };
};
export const addHospitalSuccess = (newHospital) => {
  return {
    type: hospitalTypes.ADD_HOSPITAL_SUCCESS,
    payload: newHospital,
  };
};
export const addHospitalFailure = (errorMessage) => {
  return {
    type: hospitalTypes.ADD_HOSPITAL_FAILURE,
    payload: errorMessage,
  };
};
export const updateHospitalSuccess = (
  targethospitalId,
  updatedHospitalInfo
) => {
  return {
    type: hospitalTypes.UPDATE_HOSPITAL_SUCCESS,
    payload: { targethospitalId, updatedHospitalInfo },
  };
};
export const updateHospitalFailure = (errorMessage) => {
  return {
    type: hospitalTypes.UPDATE_HOSPITAL_FAILURE,
    payload: errorMessage,
  };
};

export const fetchAllAdminsStart = () => {
  return {
    type: allAdminsTypes.FETCH_ALLADMIN_START,
  };
};
export const fetchAllAdminsSuccess = (allAdmins) => {
  return {
    type: allAdminsTypes.FETCH_ALLADMIN_SUCCESS,
    payload: allAdmins,
  };
};
export const fetchAllAdminsFailure = (errorMessage) => {
  return {
    type: allAdminsTypes.FETCH_ALLADMIN_FAILURE,
    payload: errorMessage,
  };
};
export const DeleteAllAdminsSuccess = (adminId) => {
  return {
    type: allAdminsTypes.DELETE_ALLADMIN_SUCCESS,
    payload: adminId,
  };
};
export const deleteAllAdminsFailure = (errorMessage) => {
  return {
    type: allAdminsTypes.DELETE_ALLADMIN_FAILURE,
    payload: errorMessage,
  };
};
export const AddAllAdminsSuccess = (newAdmin) => {
  return {
    type: allAdminsTypes.ADD_ALLADMIN_SUCCESS,
    payload: newAdmin,
  };
};
export const AddAllAdminsFailure = (errorMessage) => {
  return {
    type: allAdminsTypes.ADD_ALLADMIN_FAILURE,
    payload: errorMessage,
  };
};
export const updateAllAdminsSuccess = (targetAdmimnId, updatedAdminInfo) => {
  return {
    type: allAdminsTypes.UPDATE_ALLADMIN_SUCCESS,
    payload: { targetAdmimnId, updatedAdminInfo },
  };
};
export const updateAllAdminsFailure = (errorMessage) => {
  return {
    type: allAdminsTypes.UPDATE_ALLADMIN_FAILURE,
    payload: errorMessage,
  };
};
