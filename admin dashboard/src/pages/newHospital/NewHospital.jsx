import axios from "axios";
import "../newusers.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addHospitalSuccess } from "../../store/Users/UsersActions";
import { addHospitalFailure } from "../../store/Users/UsersActions";
import { fetchHospitalStart } from "../../store/Users/UsersActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(7),
  contactno: Yup.string()
    .typeError("That doesn't look like a phone number")
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("A phone number is required"),
});

export default function NewHospital() {
  const dispatch = useDispatch();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      contactno: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("contactno", values.contactno);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      dispatch(fetchHospitalStart());
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/hospitalss",
          formData,
          config
        );
        if (res.status === 200) {
          console.log(res)
          dispatch(addHospitalSuccess(res.data[0]));
          toast.success("Hospital Added Successfully");
        }
      } catch (error) {
        dispatch(addHospitalFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Hospital</h1>
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
          <label>Contact No</label>
          <input
            name="contactno"
            type="text"
            value={formik.values.contactno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.contactno && formik.touched.contactno && (
            <div className="adminNewPatientError">
              {formik.errors.contactno}
            </div>
          )}
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
