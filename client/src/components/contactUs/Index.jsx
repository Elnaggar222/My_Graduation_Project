import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import "./contactUs.module.css";
import styles from "./contactUs.module.css";

const Index = () => {
  const scrollIsMount = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // TODO: Implement form submission logic
      console.log(values);
    },
  });
  return (
    <>
      <div
        className={`${isScrolled && styles.scrolled} ${styles.headerBack}`}
      ></div>
      <div className={styles.seperator}></div>
      <div className={styles.container}>
        <h1 className={styles.header}>Contact Us</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.error}>{formik.errors.name}</div>
            ) : null}
          </label>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </label>
          <label className={styles.label}>
            Message:
            <textarea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.input} ${styles.message}`}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className={styles.error}>{formik.errors.message}</div>
            ) : null}
          </label>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Index;
