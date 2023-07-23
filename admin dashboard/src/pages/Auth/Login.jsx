import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../../store/auth/AdminActions";
import { loginSuccess } from "../../store/auth/AdminActions";
import { loginFailure } from "../../store/auth/AdminActions";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(7),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AdminState.isLoading);
  const formik = useFormik({
    validateOnMount: true,
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      dispatch(loginStart());
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/adminlog",
          formData,
          config
        );
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          toast.success("Login Successfully");
          navigate("/", { replace: true });
        }
      } catch (error) {
        dispatch(loginFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  const handlePasswordReset = () => {
    alert("Password reset requested");
  };

  return (
    <div className="adminLoginFormContainer">
      <form onSubmit={formik.handleSubmit} className="adminLogin-form">
        <h2 className="adminHeaderLogin">Login</h2>
        <label className="adminLoginLabel" htmlFor="email">
          Email
        </label>
        <input
          className="adminLoginInput"
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="adminLoginError">{formik.errors.email}</div>
        )}

        <label className="adminLoginLabel" htmlFor="password">
          Password
        </label>
        <input
          className="adminLoginInput"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="adminLoginError">{formik.errors.password}</div>
        )}

        <button className="adminLoginBtn" type="submit" disabled={isLoading}>
          Login{isLoading ? <>...</> : null}
        </button>
        <button
          className="adminLoginBtn"
          type="button"
          onClick={handlePasswordReset}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
