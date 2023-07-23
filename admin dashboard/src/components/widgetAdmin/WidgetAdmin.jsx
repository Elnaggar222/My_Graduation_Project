import { useCallback, useEffect, useRef } from "react";
import "../widgets.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllAdminsStart } from "../../store/Users/UsersActions";
import { fetchAllAdminsSuccess } from "../../store/Users/UsersActions";
import { fetchAllAdminsFailure } from "../../store/Users/UsersActions";
import { toast } from "react-toastify";

const WidgetAdmin = () => {
  const dispatch = useDispatch();
  const isMount = useRef(false);
  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );
  const { allAdmins, adminLoading, adminError } = useSelector(
    (state) => state.allUsersState
  );

  const fetchAllAdmins = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchAllAdminsStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getalladmins",
        config
      );
      if (res.status === 200) {
        res.data.data.sort((a, b) => {
          return b.id - a.id;
        });
        dispatch(fetchAllAdminsSuccess(res.data.data));
      }
    } catch (error) {
      dispatch(fetchAllAdminsFailure(error));
      console.log("helll", error);
      toast.error("server Error");
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllAdmins();
      isMount.current = true;
    }
  }, [fetchAllAdmins]);

  return (
    <div className="widgetSmall">
      <span className="widgetSmTitle">Latest Added Admins</span>
      <ul className="widgetSmList">
        {allAdmins && allAdmins.length && !adminLoading
          ? allAdmins.slice(0, 5).map((hospital) => (
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
      {adminLoading && !allAdmins.length && (
        <div className="newJoinLoading">loading...</div>
      )}
      {!adminLoading && !allAdmins.length && adminError && (
        <div className="newJoinError">{adminError.message}</div>
      )}
    </div>
  );
};

export default WidgetAdmin;
