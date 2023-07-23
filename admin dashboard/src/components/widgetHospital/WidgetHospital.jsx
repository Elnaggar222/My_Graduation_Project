import { useCallback, useEffect, useRef } from "react";
import "../widgets.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHospitalStart } from "../../store/Users/UsersActions";
import { fetchHospitalSuccess } from "../../store/Users/UsersActions";
import { fetchHospitalFailure } from "../../store/Users/UsersActions";
import { toast } from "react-toastify";

const WidgetHospital = () => {
  const dispatch = useDispatch();
  const isMount = useRef(false);
  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );
  const { allHospitals, hospitalLoading, hospitalError } = useSelector(
    (state) => state.allUsersState
  );

  const fetchAllHospitals = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchHospitalStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getallhospitals",
        config
      );
      if (res.status === 200) {
        res.data.data.sort((a, b) => {
          return b.id - a.id;
        });
        dispatch(fetchHospitalSuccess(res.data.data));
      }
    } catch (error) {
      dispatch(fetchHospitalFailure(error));
      console.log("helll", error);
      toast.error("server Error");
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllHospitals();
      isMount.current = true;
    }
  }, [fetchAllHospitals]);

  return (
    <div className="widgetSmall">
      <span className="widgetSmTitle">New Join Hospitals</span>
      <ul className="widgetSmList">
        {allHospitals && allHospitals.length && !hospitalLoading
          ? allHospitals.slice(0, 5).map((hospital) => (
              <li key={hospital.id} className="widgetSmListItem">
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{hospital.name}</span>
                  <span className="widgetSmUserTitle">{hospital.email}</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
            ))
          : null}
      </ul>
      {hospitalLoading && !allHospitals.length && (
        <div className="newJoinLoading">loading...</div>
      )}
      {!hospitalLoading && !allHospitals.length && hospitalError && (
        <div className="newJoinError">{hospitalError.message}</div>
      )}
    </div>
  );
};

export default WidgetHospital;
