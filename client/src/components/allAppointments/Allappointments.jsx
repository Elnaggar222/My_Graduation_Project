import { useEffect, useRef, useState } from "react";
import styles from "./allAppointments.module.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { format } from "timeago.js";

const ButtonComponent = ({ type }) => {
  return (
    <button className={"statusBtn " + type}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
};
const Allappointments = () => {
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const isMount = useRef(false);

  const [appointmentsData, setAppointmentsData] = useState(null);
  const [filterdAppointments, setFilterdAppointments] = useState([]);
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
    if (sort === "asc") {
      setFilterdAppointments((prev) =>
        [...prev].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
    } else if (sort === "desc") {
      setFilterdAppointments((prev) =>
        [...prev].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }
  }, [sort]);

// [
//     ["gender",""],
//     ["status",""]
// ]
  useEffect(() => {
    setFilterdAppointments(
      appointmentsData &&
        appointmentsData.filter((item) =>
          Object.entries(appFilters).every(([key, value]) => {
            // Only check the filter if its value is not empty
            if (value) {
              return item[key] === value;
            }
            return true; // Filter is empty, so always return true
          })
        )
    );
  }, [appFilters, appointmentsData]);

  const handleFilters = (e) => {
    const value = e.target.value;
    setAppFilters({
      ...appFilters,
      [e.target.name]: value,
    });
  };

  const fetchAllAppointments = useCallback(async () => {
    setAppointmentsLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/appointmentsHospital/${
          userPrivateInfo && userPrivateInfo.id
        }`
      );
      setAppointmentsLoading(false);
      if (res.status === 200 && res.data.message) {
      } else if (res.status === 200 && res.data) {
        setAppointmentsData(res.data);
      }
    } catch (error) {
      console.log("hereeee", error);
      // console.error(error);
      // toast.error("server Error");
    }
  }, [userPrivateInfo]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllAppointments();
      isMount.current = true;
    }
  }, [fetchAllAppointments]);
  console.log(sort)
  console.log(filterdAppointments)

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
            <label htmlFor="gender">Gender</label>
            <select
              className={styles.filterSelect}
              name="gender"
              id="gender"
              onChange={handleFilters}
            >
              <option value="">All</option>
              <option value="male"> Male</option>
              <option value="female"> Female </option>
            </select>
          </div>
          <div className={styles.filterContainer}>
            <label htmlFor="status">Status</label>
            <select
              className={styles.filterSelect}
              name="status"
              id="status"
              onChange={handleFilters}
            >
              <option value="">All</option>
              <option value="closed">Closed</option>
              <option value="scheduled">Scheduled</option>
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
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Date</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterdAppointments &&
              filterdAppointments.length &&
              appointmentsData &&
              !appointmentsLoading
                ? filterdAppointments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.gender}</td>
                      <td>
                        <ButtonComponent type={item.status} />
                      </td>
                      <td>{item.date}</td>
                      <td>{format(new Date(item.created_at))}</td>
                      <td>{format(new Date(item.updated_at))}</td>
                      <td>
                        <Button
                          onClick={() =>
                            navigate(`/appointments/upload/${item.id}`, {
                              state: {
                                name: item.name,
                                phone: item.phone,
                                gender: item.gender,
                                patient_id: item.patient_id,
                              },
                            })
                          }
                          disabled={item.status === "closed"}
                        >
                          Upload
                        </Button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
          {appointmentsLoading && !appointmentsData ? (
            <div className={styles.spinnerContainer}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : null}

          {!appointmentsLoading && !appointmentsData ? (
            <div
              style={{ textAlign: "center", marginTop: "200px", color: "red" }}
            >
              No appointments found for this hospital
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Allappointments;
