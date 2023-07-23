import { useCallback, useEffect, useRef } from "react";
import "../widgets.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPatientStart } from "../../store/Users/UsersActions";
import { fetchPatientSuccess } from "../../store/Users/UsersActions";
import { fetchPatientFailure } from "../../store/Users/UsersActions";
import { toast } from "react-toastify";

const WidgetPatient = () => {
  const dispatch = useDispatch();
  const isMount = useRef(false);
  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );
  const { allPatients, patientLoading, patientError } = useSelector(
    (state) => state.allUsersState
  );

  const fetchAllPatients = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchPatientStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getallpatients",
        config
      );
      if (res.status === 200) {
        res.data.data.sort((a, b) => {
          return b.id - a.id;
        });
        dispatch(fetchPatientSuccess(res.data.data));
      }
    } catch (error) {
      dispatch(fetchPatientFailure(error));
      console.log("hereeee", error);
      toast.error("server Error");
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllPatients();
      isMount.current = true;
    }
  }, [fetchAllPatients]);

  return (
    <div className="widgetSmall">
      <span className="widgetSmTitle">New Join Patients</span>
      <ul className="widgetSmList">
        {allPatients && allPatients.length && !patientLoading
          ? allPatients.slice(0,5).map((patient) => (
              <li key={patient.id} className="widgetSmListItem">
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{patient.name}</span>
                  <span className="widgetSmUserTitle">{patient.email}</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
            ))
          : null}
      </ul>
      {patientLoading && !allPatients.length && (
        <div className="newJoinLoading">loading...</div>
      )}
      {!patientLoading && !allPatients.length && patientError && (
        <div className="newJoinError">{patientError.message}</div>
      )}
    </div>
  );
};

export default WidgetPatient;
