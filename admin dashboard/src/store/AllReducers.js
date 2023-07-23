import AdminReducer from "./auth/AdminReducer";
import usersReducer from "./Users/UsersReducer";
import medicalReducer from "./medical/MedicalReducer";
import MonthlyReducer from "./monthlyAnalysis/MonthlyReducer";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
  AdminState: AdminReducer,
  allUsersState: usersReducer,
  medicalState: medicalReducer,
  chartState: MonthlyReducer,
});
export default AllReducers;
