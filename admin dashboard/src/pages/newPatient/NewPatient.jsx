import axios from "axios";
import "../newusers.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPatientSuccess } from "../../store/Users/UsersActions";
import { addPatientFailure } from "../../store/Users/UsersActions";
import { fetchPatientStart } from "../../store/Users/UsersActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(7),
  phone: Yup.string()
    .typeError("That doesn't look like a phone number")
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("A phone number is required"),
  gender: Yup.string().required().oneOf(["male", "female"]),
});

export default function NewPatient() {
  const dispatch = useDispatch();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      dispatch(fetchPatientStart());
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/patientregister",
          formData,
          config
        );
        if (res.status === 200) {
          dispatch(addPatientSuccess(res.data[0]));
          toast.success("Patient Added Successfully");
        }
      } catch (error) {
        dispatch(addPatientFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Patient</h1>
      <form onSubmit={formik.handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>name</label>
          <input
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="adminNewPatientError">{formik.errors.name}</div>
          )}
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="adminNewPatientError">{formik.errors.email}</div>
          )}
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="adminNewPatientError">{formik.errors.password}</div>
          )}
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="adminNewPatientError">{formik.errors.phone}</div>
          )}
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <select
              className="patientGenderSelect"
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
            {formik.errors.gender && formik.touched.gender && (
              <div className="adminNewPatientError">{formik.errors.gender}</div>
            )}
          </div>
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
