import { patientTypes } from "../AllTypes";
import { hospitalTypes } from "../AllTypes";
import { allAdminsTypes } from "../AllTypes";

const initialState = {
  allPatients: [],
  patientLoading: false,
  patientError: null,
  allHospitals: [],
  hospitalLoading: false,
  hospitalError: null,
  allAdmins: [],
  adminLoading: false,
  adminError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case patientTypes.FETCH_PATIENT_START:
      return {
        ...state,
        patientLoading: true,
      };
    case patientTypes.FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        patientLoading: false,
        allPatients: action.payload,
        patientError: null,
      };
    case patientTypes.FETCH_PATIENT_FAILURE:
      return {
        ...state,
        patientLoading: false,
        allPatients: [],
        patientError: action.payload,
      };
    case patientTypes.DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patientLoading: false,
        allPatients: handlePatientDelete(state.allPatients, action.payload),
        patientError: null,
      };
    case patientTypes.DELETE_PATIENT_FAILURE:
      return {
        ...state,
        patientLoading: false,
        allPatients: [...state.allPatients],
        patientError: action.payload,
      };
    case patientTypes.ADD_PATIENT_SUCCESS:
      return {
        ...state,
        patientLoading: false,
        allPatients: [...state.allPatients, action.payload],
        patientError: null,
      };
    case patientTypes.ADD_PATIENT_FAILURE:
      return {
        ...state,
        patientLoading: false,
        allPatients: [...state.allPatients],
        patientError: action.payload,
      };
    case patientTypes.UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patientLoading: false,
        allPatients: handlePatientUpdate(state.allPatients, action.payload),
        patientError: null,
      };
    case patientTypes.UPDATE_PATIENT_FAILURE:
      return {
        ...state,
        patientLoading: false,
        allPatients: [...state.allPatients],
        patientError: action.payload,
      };
    case hospitalTypes.FETCH_HOSPITAL_START:
      return {
        ...state,
        hospitalLoading: true,
      };
    case hospitalTypes.FETCH_HOSPITAL_SUCCESS:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: action.payload,
        hospitalError: null,
      };
    case hospitalTypes.FETCH_HOSPITAL_FAILURE:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: [],
        hospitalError: action.payload,
      };
    case hospitalTypes.DELETE_HOSPITAL_SUCCESS:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: handleHospitalDelete(state.allHospitals, action.payload),
        hospitalError: null,
      };
    case hospitalTypes.DELETE_HOSPITAL_FAILURE:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: [...state.allHospitals],
        hospitalError: action.payload,
      };
    case hospitalTypes.ADD_HOSPITAL_SUCCESS:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: [...state.allHospitals, action.payload],
        hospitalError: null,
      };
    case hospitalTypes.ADD_HOSPITAL_FAILURE:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: [...state.allHospitals],
        hospitalError: action.payload,
      };
    case hospitalTypes.UPDATE_HOSPITAL_SUCCESS:
      return {
        ...state,
        hospitalLoading: false,
        allHospitals: handleHospitalUpdate(state.allHospitals, action.payload),
        hospitalError: null,
      };
    case allAdminsTypes.FETCH_ALLADMIN_START:
      return {
        ...state,
        adminLoading: true,
      };
    case allAdminsTypes.FETCH_ALLADMIN_SUCCESS:
      return {
        ...state,
        adminLoading: false,
        allAdmins: action.payload,
        adminError: null,
      };
    case allAdminsTypes.FETCH_ALLADMIN_FAILURE:
      return {
        ...state,
        adminLoading: false,
        allAdmins: [],
        adminError: action.payload,
      };
    case allAdminsTypes.DELETE_ALLADMIN_SUCCESS:
      return {
        ...state,
        adminLoading: false,
        allAdmins: handleAdminDelete(state.allAdmins, action.payload),
        adminError: null,
      };
    case allAdminsTypes.DELETE_ALLADMIN_FAILURE:
      return {
        ...state,
        adminLoading: false,
        allAdmins: [...state.allAdmins],
        adminError: action.payload,
      };
    case allAdminsTypes.ADD_ALLADMIN_SUCCESS:
      return {
        ...state,
        adminLoading: false,
        allAdmins: [...state.allAdmins, action.payload],
        adminError: null,
      };
    case allAdminsTypes.ADD_ALLADMIN_FAILURE:
      return {
        ...state,
        adminLoading: false,
        allAdmins: [...state.allAdmins],
        adminError: action.payload,
      };
    case allAdminsTypes.UPDATE_ALLADMIN_SUCCESS:
      return {
        ...state,
        adminLoading: false,
        allAdmins: handleAdminUpdate(state.allAdmins, action.payload),
        adminError: null,
      };
    case allAdminsTypes.UPDATE_ALLADMIN_FAILURE:
      return {
        ...state,
        adminLoading: false,
        allAdmins: [...state.allAdmins],
        adminError: action.payload,
      };
    default:
      return state;
  }
};

const handlePatientDelete = (allPatients, patientId) =>
  allPatients.filter((patient) => patient.id !== patientId);

const handleHospitalDelete = (allHospitals, hospitalId) =>
  allHospitals.filter((hospital) => hospital.id !== hospitalId);

const handleAdminDelete = (allAdmins, adminId) =>
  allAdmins.filter((admin) => admin.id !== adminId);

const handleAdminUpdate = (allAdmins, adminObject) => {
  return allAdmins.map((admin) => {
    if (admin.id === adminObject.targetAdmimnId) {
      return { ...admin, ...adminObject.updatedAdminInfo };
    } else {
      return admin;
    }
  });
};
const handlePatientUpdate = (allPatients, patientObject) => {
  return allPatients.map((patient) => {
    if (patient.id === patientObject.targetpatientId) {
      return { ...patient, ...patientObject.updatedPatientInfo };
    } else {
      return patient;
    }
  });
};
const handleHospitalUpdate = (allHospitals, hospitalObject) => {
  return allHospitals.map((hospital) => {
    if (hospital.id === hospitalObject.targethospitalId) {
      return { ...hospital, ...hospitalObject.updatedHospitalInfo };
    } else {
      return hospital;
    }
  });
};

export default usersReducer;
