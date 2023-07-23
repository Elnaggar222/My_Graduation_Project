import { useFormik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import styles from "./SignUpForm.module.css";
import { ReactComponent as MySvg } from "./../../assets/images/HeartLogo.svg";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRef } from "react";

const SignUpForm = () => {
  const { register, setpatientLog } = useContext(AuthContext);
  const [registerLoading, setRegisterLoading] = useState(false);
  const isMount = useRef();

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      username: "",
      gender: "",
      approved: false,
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Not Matched password"),
      phone: Yup.string()
        .typeError("That doesn't look like a phone number")
        .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
        .required("A phone number is required"),
      username: Yup.string().required(),
      gender: Yup.string().required().oneOf(["male", "female"]),
      approved: Yup.boolean().oneOf([true], "Required Field :("),
    }),

    onSubmit: async (vals) => {
      const formData = new FormData();
      formData.append("email", vals.email);
      formData.append("password", vals.password);
      formData.append("name", vals.username);
      formData.append("gender", vals.gender);
      formData.append("phone", vals.phone);
      setRegisterLoading(true);
      await register(formData);
      setRegisterLoading(false);
    },
  });

  useEffect(() => {
    if (!isMount.current) {
      setpatientLog(true);
      isMount.current = true;
    }
  }, [setpatientLog]);

  return (
    <Card className={`p-3 bg-light ${styles.card}`}>
      <div className={styles.form_header}>
        <MySvg className={styles.LogoItself} />
        <div>Sign Up</div>
        <div>Register New Account</div>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicMail">
          <div className={styles["svg-input"]}>
            <svg
              className={styles["trans-svg"]}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 01-1.75 1.75H1.75A1.75 1.75 0 010 18.75v-14C0 3.784.784 3 1.75 3zM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0zm0-2.662v.852l10.36 7a.25.25 0 00.28 0l10.36-7V4.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z"></path>
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <div className={styles["svg-input"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>

            <Form.Control
              type="Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Form.Text className="text-danger">
              {formik.errors.confirmPassword}
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

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <select
            className={styles.selectOptions}
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

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I've read terms and conditions"
            name="approved"
            value={formik.values.approved}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.approved && formik.errors.approved}
          />
          {formik.touched.approved && formik.errors.approved && (
            <Form.Text className="text-danger">
              {formik.errors.approved}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          className={`w-100 ${styles.form_button}`}
          variant="primary"
          type="submit"
          disabled={registerLoading}
        >
          <svg
            className={styles.createAccountSvg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M4 8V6a6 6 0 1112 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 10-2 0zM7 6v2h6V6a3 3 0 00-6 0z"></path>
          </svg>
          Create Account {registerLoading ? <>...</> : null}
        </Button>
      </Form>
    </Card>
  );
};

export default SignUpForm;
