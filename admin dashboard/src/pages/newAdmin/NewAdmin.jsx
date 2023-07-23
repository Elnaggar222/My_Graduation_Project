import axios from "axios";
import "../newusers.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchAllAdminsStart } from "../../store/Users/UsersActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddAllAdminsSuccess } from "../../store/Users/UsersActions";
import { AddAllAdminsFailure } from "../../store/Users/UsersActions";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(7),
});

export default function NewAdmin() {
  const dispatch = useDispatch();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      dispatch(fetchAllAdminsStart());
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/adminregister",
          formData,
          config
        );
        if (res.status === 200) {
          dispatch(AddAllAdminsSuccess(res.data[0]));
          toast.success("Admin Added Successfully");
        }
      } catch (error) {
        dispatch(AddAllAdminsFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Admin</h1>
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
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
