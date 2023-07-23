import { useFormik } from "formik";
import { Button, Card, Form, FormText } from "react-bootstrap";
import * as Yup from "yup";
import { ReactComponent as MySvg } from "./../../assets/images/HeartLogo.svg";
import styles from "./LoginForm.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login, patientLog, setpatientLog } = useContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false);

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),

    onSubmit: async (vals) => {
      const formData = new FormData();
      formData.append("email", vals.email);
      formData.append("password", vals.password);
      setLoginLoading(true);
      await login(formData, vals.email, vals.password);
      setLoginLoading(false);
    },
  });

  console.log("formik is", formik);

  return (
    <Card className={`p-3 bg-light ${styles.card}`}>
      <div className={styles.form_header}>
        <MySvg className={styles.LogoItself} />
        <div>{patientLog ? "Login as Patient" : "Login as Hospital"}</div>
        <div>Sign in to your account</div>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-2" controlId="formBasicMail">
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
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div className={styles["svg-input"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <circle
                cx="33.4"
                cy="14.8"
                r="3.9"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
              <path
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.4 20.4a11.47 11.47 0 015.2-13.3 11.31 11.31 0 0114.1 2.3 11.32 11.32 0 01-13 17.9"
              ></path>
              <path
                fill="none"
                stroke="#000"
                d="M20.4 20.4L5.5 37v5.4h6.1l.7-4.2 6.5-.4.5-5.5 5.5-.1 1.8-4.8"
              ></path>
            </svg>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          disabled={loginLoading}
          className={`w-100 ${styles.form_button}`}
          variant="primary"
          type="submit"
        >
          Login {loginLoading ? <>...</> : null}
        </Button>
        {patientLog ? (
          <div className={styles.form_footer}>
            <FormText className={styles["footer-text"]}>
              I forgot my password. Click here to reset
            </FormText>
            <Button
              className={styles.registerNewAcc}
              variant="outline-secondary"
            >
              Register New Account
            </Button>
            <Button
              className={styles.chooseLogButton}
              variant="outline-info"
              onClick={() => setpatientLog(false)}
            >
              Login as Hospital
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        ) : (
          <Button
            className={styles.chooseLogButton}
            variant="outline-info"
            onClick={() => setpatientLog(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
            Login as Patient
          </Button>
        )}
      </Form>
    </Card>
  );
};
export default LoginForm;
