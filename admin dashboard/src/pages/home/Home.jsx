import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetPatient from "../../components/widgetPatient/WidgetPatient";
import WidgetHospital from "../../components/widgetHospital/WidgetHospital";
import WidgetAdmin from "../../components/widgetAdmin/WidgetAdmin";
import { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientMonthlyStart } from "../../store/monthlyAnalysis/MonthlyActions";
import { fetchPatientMonthlySuccess } from "../../store/monthlyAnalysis/MonthlyActions";
import { fetchPatientMonthlyFailure } from "../../store/monthlyAnalysis/MonthlyActions";
import { fetchHospitalMonthlyStart } from "../../store/monthlyAnalysis/MonthlyActions";
import { fetchHospitalMonthlySuccess } from "../../store/monthlyAnalysis/MonthlyActions";
import { fetchHospitalMonthlyFailure } from "../../store/monthlyAnalysis/MonthlyActions";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const Home = () => {
  const isMountMonthlyPatient = useRef(false);
  const isMountMonthlyHospital = useRef(false);
  const dispatch = useDispatch();

  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const { PatientsMonthly, PatientsMonthlyLoading, PatientsMonthlyError } =
    useSelector((state) => state.chartState);

  const { hospitalsMonthly, hospitalsMonthlyLoading, hospitalsMonthlyError } =
    useSelector((state) => state.chartState);

  const fetchPatientChart = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      dispatch(fetchPatientMonthlyStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/monthly-patient-logins",
        config
      );
      if (res.status === 200) {
        dispatch(fetchPatientMonthlySuccess(res.data));
        toast.success("Patients per Month fetched Successfully");
      }
    } catch (error) {
      dispatch(fetchPatientMonthlyFailure(error));
      console.log("hereeee", error);
      toast.error(error.message);
    }
  }, [dispatch, adminToken]);

  useEffect(() => {
    if (!isMountMonthlyPatient.current) {
      fetchPatientChart();
      isMountMonthlyPatient.current = true;
    }
  }, [fetchPatientChart]);

  const fetchHospitalChart = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      dispatch(fetchHospitalMonthlyStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/monthly-hospital-registrations",
        config
      );
      if (res.status === 200) {
        dispatch(fetchHospitalMonthlySuccess(res.data));
        toast.success("Hospitals per Month fetched Successfully");
      }
    } catch (error) {
      dispatch(fetchHospitalMonthlyFailure(error));
      console.log("hereeee", error);
      toast.error(error.message);
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMountMonthlyHospital.current) {
      fetchHospitalChart();
      isMountMonthlyHospital.current = true;
    }
  }, [fetchHospitalChart]);

  return (
    <div className="home">
      {PatientsMonthlyLoading && !PatientsMonthly.length ? (
        <div className="monthlyLoading">
          <CircularProgress />
        </div>
      ) : null}
      {!PatientsMonthlyLoading && PatientsMonthly.length ? (
        <Chart
          data={PatientsMonthly}
          dataKey="count"
          title="Patient Analytics"
          grid
        />
      ) : null}
      {!PatientsMonthlyLoading &&
      !PatientsMonthly.length &&
      PatientsMonthlyError ? (
        <div className="monthlyError">{PatientsMonthlyError.message}</div>
      ) : null}
      {hospitalsMonthlyLoading && !hospitalsMonthly.length ? (
        <div className="monthlyLoading">
          <CircularProgress />
        </div>
      ) : null}
      {!hospitalsMonthlyLoading && hospitalsMonthly.length ? (
        <Chart
          data={hospitalsMonthly}
          dataKey="count"
          title="Hospital Analytics"
          grid
        />
      ) : null}
      {!hospitalsMonthlyLoading &&
      !hospitalsMonthly.length &&
      hospitalsMonthlyError ? (
        <div className="monthlyError">{PatientsMonthlyError.message}</div>
      ) : null}
      <div className="homewidgets">
        <WidgetPatient />
        <WidgetHospital />
        <WidgetAdmin />
      </div>
    </div>
  );
};

export default Home;
