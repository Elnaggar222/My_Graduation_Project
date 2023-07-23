import { useFormik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import styles from "./appointmentForm.module.css";
import { ReactComponent as MySvg } from "./../../assets/images/HeartLogo.svg";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { formatISO9075 } from "date-fns";

const MainAppointmentForm = ({ closeModal }) => {
  const [hospitals, setHospitals] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMount = useRef(false);

  const { userToken } = useContext(AuthContext);
  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      username: "",
      phone: "",
      hospital: "",
      date: "",
      gender: "",
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      phone: Yup.string()
        .typeError("That doesn't look like a phone number")
        .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
        .required("A phone number is required"),
      hospital: Yup.string().required(),
      date: Yup.date().required().min(formatISO9075(new Date())),
      time: Yup.string().required("Time is required"),
      gender: Yup.string().required().oneOf(["male", "female"]),
    }),

    onSubmit: (vals) => {
      const formData = new FormData();
      formData.append("name", vals.username);
      formData.append("phone", vals.phone);
      formData.append("gender", vals.gender);
      formData.append("Hospital_id", vals.hospital);
      const dateString = vals.date;
      const timeString = vals.time;
      const datetimeString = `${dateString} ${timeString}`;
      const date = new Date(datetimeString);
      const isoString = date.toISOString();
      const formattedDate = moment(isoString).format("YYYY-MM-DD HH:mm:ss");
      formData.append("date", formattedDate);
      async function addAppointment() {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        };
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/appointment1",
            formData,
            config
          );

          if (res.status === 201 || res.status === 200) {
            console.log("OK", res);
            toast.success("Appointment Added Successfully");
            closeModal();
          } else {
            toast.error("Failed To Add Appointment");
            console.log("err", res);
          }
        } catch (error) {
          toast.error("Failed to add appointment");
          console.error("hereeee", error);
        }
      }

      addAppointment();
    },
  });

  const fetchAllHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/hospitals");
      setLoading(false);
      if (res.status === 200) {
        setHospitals(res.data.data);
      } else {
        toast.error("Error At loading Hospitals");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error at loading hospitals");
      // toast.error("server Error");
    }
  }, []);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllHospitals();
      isMount.current = true;
    }
  }, [fetchAllHospitals]);

  console.log("formik is", formik);

  return (
    <Card className={`p-3 bg-light ${styles.card}`}>
      <div className={styles.form_header}>
        <MySvg className={styles.LogoItself} />
        <div>CARDIOLOGY REQUISITION</div>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <div className={styles["svg-input"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            <Form.Control
              type="text"
              name="username"
              placeholder="User Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && formik.errors.username}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <Form.Text className="text-danger">
              {formik.errors.username}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <div className={styles["svg-input"]}>
            <svg
              className={styles["trans-svg"]}
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <path d="M32 2H16c-3.31 0-6 2.69-6 6v32c0 3.31 2.69 6 6 6h16c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm-4 40h-8v-2h8v2zm6.5-6h-21V8h21v28z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>

            <Form.Control
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && formik.errors.phone}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <Form.Text className="text-danger">{formik.errors.phone}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <div className={styles["svg-input"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="640"
              height="512"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M232 0c-39.8 0-72 32.2-72 72v8H72c-39.8 0-72 32.2-72 72v288c0 39.8 32.2 72 72 72h496c39.8 0 72-32.2 72-72V152c0-39.8-32.2-72-72-72h-88v-8c0-39.8-32.2-72-72-72H232zm248 128h88c13.3 0 24 10.7 24 24v40h-56c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v48h-56c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v104c0 13.3-10.7 24-24 24h-88V128zm-408 0h88v336H72c-13.2 0-24-10.7-24-24V336h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H48v-48h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H48v-40c0-13.3 10.7-24 24-24zm136-56c0-13.3 10.7-24 24-24h176c13.3 0 24 10.7 24 24v392h-64v-64c0-26.5-21.5-48-48-48s-48 21.5-48 48v64h-64V72zm88 24v24h-24c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-24h24c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16h-24V96c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16z"
              ></path>
            </svg>
            <select
              className={styles.selectOptions}
              name="hospital"
              value={formik.values.hospital}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Select Hospital
              </option>
              {hospitals &&
                hospitals.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {loading && !hospitals && (
            <div style={{ textAlign: "center" }}>loading...</div>
          )}
          {formik.touched.hospital && formik.errors.hospital && (
            <Form.Text className="text-danger">
              {formik.errors.hospital}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMail">
          <Form.Control
            className={styles.dateInput}
            type="date"
            name="date"
            placeholder="Date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.date && formik.errors.date}
          />
          {formik.touched.date && formik.errors.date && (
            <Form.Text className="text-danger">{formik.errors.date}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMail">
          <Form.Control
            className={styles.dateInput}
            type="time"
            name="time"
            placeholder="Time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.time && formik.errors.time}
          />
          {formik.touched.time && formik.errors.time && (
            <Form.Text className="text-danger">{formik.errors.time}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <select
            className={`${styles.selectOptions} ${styles.genderInput}`}
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="male"> Male</option>
            <option value="female"> Female </option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <Form.Text className="text-danger">
              {formik.errors.gender}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          className={`w-100 ${styles.form_button}`}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default MainAppointmentForm;
