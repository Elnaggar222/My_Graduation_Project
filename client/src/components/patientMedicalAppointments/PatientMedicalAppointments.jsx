import { useEffect, useRef, useState } from "react";
import styles from "./PatientMedicalAppointments.module.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { formatISO9075 } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { patientAppointments } from "../../dummydata";
import moment from "moment/moment";

const ButtonComponent = ({ type }) => {
  return (
    <button className={"statusBtn " + type}>
      {type && type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
};
const PatientMedicalAppointments = () => {
  const [recordsLoading, setRecordsLoading] = useState(false);
  const isMountHospitals = useRef(false);
  const isMountRecords = useRef(false);
  const [hospitalLoading, setHospitalLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [recordsData, setRecordsData] = useState([]);
  const [filterdRecords, setFilterdRecords] = useState([]);
  const [appFilters, setAppFilters] = useState({});
  const [sort, setSort] = useState("");
  const scrollIsMount = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { userPrivateInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!scrollIsMount.current) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      });
      scrollIsMount.current = true;
    }
  }, []);

  useEffect(() => {
    recordsData.length &&
      hospitals.length &&
      recordsData.forEach((record) => {
        let hospital = hospitals.find(
          // eslint-disable-next-line eqeqeq
          (hospital) => hospital.id == record.Hospital_id
        );
        record.hospitalName = hospital ? hospital.name : null;
      });
  }, [hospitals, recordsData]);

  const fetchAllHospitals = useCallback(async () => {
    setHospitalLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/hospitals");
      setHospitalLoading(false);
      if (res.status === 200) {
        setHospitals(res.data.data);
      } else {
        toast.error("Error At loading Hospitals");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error at loading hospitals");
    }
  }, []);

  useEffect(() => {
    if (!isMountHospitals.current) {
      fetchAllHospitals();
      isMountHospitals.current = true;
    }
  }, [fetchAllHospitals]);

  useEffect(() => {
    if (sort === "asc") {
      setFilterdRecords((prev) =>
        [...prev].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
    } else if (sort === "desc") {
      setFilterdRecords((prev) =>
        [...prev].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }
  }, [sort]);

  useEffect(() => {
    setFilterdRecords(
      recordsData.length &&
        recordsData.filter((item) =>
          Object.entries(appFilters).every(([key, value]) => {
            // Only check the filter if its value is not empty
            if (value) {
              return item[key] === value;
            }
            return true; // Filter is empty, so always return true
          })
        )
    );
  }, [appFilters, recordsData]);

//   [
//     ["status","approved"],
// ]
  const handleFilters = (e) => {
    const value = e.target.value;
    setAppFilters({
      ...appFilters,
      [e.target.name]: value,
    });
  };

  const fetchPatientRecords = useCallback(async () => {
    setRecordsLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/fetchMedicalRecords/${
          userPrivateInfo && userPrivateInfo.id
        }`
      );
      setRecordsLoading(false);
      if (res.status === 200) {
        setRecordsData(res.data.data);
        toast.success("Patient Records Fetched Successfully");
      }
    } catch (error) {
      console.log("hereeee", error);
      toast.error("server Error");
    }
  }, [userPrivateInfo]);

  useEffect(() => {
    if (!isMountRecords.current) {
      fetchPatientRecords();
      isMountRecords.current = true;
    }
  }, [fetchPatientRecords]);

  console.log("recordsData", recordsData);
  console.log("filteredRecords", filterdRecords);

  return (
    <>
      <div
        className={`${isScrolled && styles.scrolled} ${styles.headerBack}`}
      ></div>
      <div className={styles.seperator}></div>
      <div className={styles.cont}>
        <div className={styles.patientAppointmentLeft}>
          <h2 className={styles.patientAppointmentLeftTitle}>Filter By :</h2>
          <div className={styles.filterContainer}>
            <label htmlFor="status">Status</label>
            <select
              className={styles.filterSelect}
              name="status"
              id="status"
              onChange={handleFilters}
            >
              <option value="">All</option>
              <option value="waiting">Waiting</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <div className={styles.filterContainer}>
            <label htmlFor="date">Date</label>
            <select
              className={styles.filterSelect}
              id="date"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Select</option>
              <option value="asc"> asc</option>
              <option value="desc"> desc </option>
            </select>
          </div>
        </div>
        <div className={styles.patientAppointmentRight}>
          <Table responsive>
            <thead>
              <tr>
                <th>#Id</th>
                <th>PatientName</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>HospitalName</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filterdRecords &&
              filterdRecords.length &&
              recordsData &&
              recordsData.length &&
              !recordsLoading
                ? filterdRecords.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{userPrivateInfo.name}</td>
                      <td>{userPrivateInfo.phone}</td>
                      <td>{userPrivateInfo.gender}</td>
                      <td>{item.hospitalName}</td>
                      <td>
                        <ButtonComponent type={item.status} />
                      </td>
                      <td>
                        {item.date ? (
                          <div className={styles.existedDateRecord}>
                            {moment(
                              item.date,
                              "YYYY-MM-DD HH:mm:ss"
                            ).calendar()}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                            >
                              <path d="M128 0c13.3 0 24 10.7 24 24v40h144V24c0-13.3 10.7-24 24-24s24 10.7 24 24v40h40c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h40V24c0-13.3 10.7-24 24-24zm272 192H48v256c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V192zm-71 105L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                            </svg>
                          </div>
                        ) : (
                          <div className={styles.emptyDateRecord}>
                            Wait Your Turn{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 384 512"
                            >
                              <path d="M0 24C0 10.7 10.7 0 24 0h336c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v19c0 40.3-16 79-44.5 107.5L225.9 256l81.5 81.5C336 366 352 404.7 352 445v19h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8v-19c0-40.3 16-79 44.5-107.5l81.6-81.5-81.6-81.5C48 146 32 107.3 32 67V48h-8C10.7 48 0 37.3 0 24zm110.5 347.5c-3.9 3.9-7.5 8.1-10.7 12.5h184.4c-3.2-4.4-6.8-8.6-10.7-12.5L192 289.9l-81.5 81.5zM284.2 128C297 110.4 304 89 304 67V48H80v19c0 22.1 7 43.4 19.8 61h184.4z"></path>
                            </svg>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
          {(hospitalLoading && !hospitals.length) ||
          (recordsLoading && !recordsData.length) ? (
            <div className={styles.spinnerContainer}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : null}
          {!recordsLoading && !recordsData.length ? (
            <div
              style={{ textAlign: "center", marginTop: "200px", color: "red" }}
            >
              No MedicalRecords found for you
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PatientMedicalAppointments;
