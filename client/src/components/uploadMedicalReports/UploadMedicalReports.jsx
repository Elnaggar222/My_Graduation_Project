import styles from "./UploadMedicalReports.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  Mitral_RegurgitationRadio: Yup.string().required("Please select one option"),
  Max_Wall_ThickPercentage: Yup.number()
    .required("Please enter a percentage")
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must be at most 100"),
  Ejection_FractionPercentage: Yup.number()
    .required("Please enter a percentage")
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must be at most 100"),
});

const UploadMedicalReports = () => {
  const { userToken, userPrivateInfo } = useContext(AuthContext);
  const location = useLocation();
  const { name, phone, gender, patient_id } = location.state;
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      genderToggleSwitch: false,
      ObstructiveToggleSwitch: false,
      SyncopeToggleSwitch: false,
      DyspneaToggleSwitch: false,
      FatigueToggleSwitch: false,
      PresyncopeToggleSwitch: false,
      Atrial_FibrillationToggleSwitch: false,
      Beta_blockerToggleSwitch: false,
      HypertensionToggleSwitch: false,
      Ca_Channel_BlockersToggleSwitch: false,
      ACEI_ARBToggleSwitch: false,
      CoumadinToggleSwitch: false,
      Septal_Anterior_MotionToggleSwitch: false,
      NYHA_ClassToggleSwitch: false,
      Mitral_RegurgitationRadio: "",
      Max_Wall_ThickPercentage: 0,
      Ejection_FractionPercentage: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (vals) => {
      const formData = new FormData();
      formData.append("Obstructive_HCM", +vals.ObstructiveToggleSwitch);
      formData.append("Gender", +vals.genderToggleSwitch);
      formData.append("Syncope", +vals.SyncopeToggleSwitch);
      formData.append("Dyspnea", +vals.DyspneaToggleSwitch);
      formData.append("Fatigue", +vals.FatigueToggleSwitch);
      formData.append("Presyncope", +vals.PresyncopeToggleSwitch);
      formData.append("NYHA_Class", +vals.NYHA_ClassToggleSwitch + 1);
      formData.append(
        "Atrial_Fibrillation",
        +vals.Atrial_FibrillationToggleSwitch
      );
      formData.append("Hypertension", +vals.HypertensionToggleSwitch);
      formData.append("Beta_blocker", +vals.Beta_blockerToggleSwitch);
      formData.append(
        "Ca_Channel_Blockers",
        +vals.Ca_Channel_BlockersToggleSwitch
      );
      formData.append("ACEI_ARB", +vals.ACEI_ARBToggleSwitch);
      formData.append("Coumadin", +vals.CoumadinToggleSwitch);
      formData.append("Max_Wall_Thick", vals.Max_Wall_ThickPercentage);
      formData.append(
        "Septal_Anterior_Motion",
        +vals.Septal_Anterior_MotionToggleSwitch
      );
      formData.append("Mitral_Regurgitation", +vals.Mitral_RegurgitationRadio);
      formData.append("Ejection_Fraction", vals.Ejection_FractionPercentage);
      formData.append("patient_id", patient_id);

      const closeAppointment = async () => {
        try {
          const res = await axios.post(
            `http://127.0.0.1:8000/api/appointments/${id}`
          );
          if (res.status === 200) {
            toast.success(res.data.message);
          } else {
            toast.error("Failed To Close Appointment");
            console.log("err", res);
          }
        } catch (error) {
          toast.error("Failed to close appointment");
          console.log("hereee", error);
        }
      };

      async function UploadMedicalReports() {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        };
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/medicalreports",
            formData,
            config
          );

          if (res.status === 201) {
            toast.success(res.data.message);
            closeAppointment();
            navigate(
              `/hospitalAppointments/${userPrivateInfo && userPrivateInfo.id}`
            );
          } else {
            toast.error("Failed To Add MedicalReport");
            console.log("err", res);
          }
        } catch (error) {
          toast.error("Failed to add medicalReport");
          console.error("hereeee", error);
        }
      }

      UploadMedicalReports();
    },
  });

  const handleToggleSwitchClick = (fieldName) => {
    // update the value of toggleSwitch in formik's values object
    formik.setFieldValue(fieldName, !formik.values[fieldName]);
  };

  const ToggleSwitchComponent = ({ fieldName }) => (
    <div className={styles["toggle-switch"]}>
      <input
        type="checkbox"
        id={fieldName}
        checked={formik.values[fieldName]}
        onChange={() => handleToggleSwitchClick(fieldName)} // call handleToggleSwitchClick on change
      />
      <span
        onClick={() => handleToggleSwitchClick(fieldName)}
        className={styles["toggle-switch-slider"]}
      ></span>
    </div>
  );

  // console.log(formik);
  return (
    <div className={styles.cardContainer}>
      <Card className={`p-4 ${styles.card}`}>
        <div className={styles.userInfo}>
          <div className={styles.singleUserInfo}>
            <label>Name :</label>
            <p>{name}</p>
          </div>
          <div className={styles.singleUserInfo}>
            <label>Gender :</label>
            <p>{gender}</p>
          </div>
          <div className={styles.singleUserInfo}>
            <label>Phone :</label>
            <p>{phone}</p>
          </div>
        </div>
        <h1 className={styles.formHeader}>Upload Medical Reports</h1>
        <Form onSubmit={formik.handleSubmit}>
          <div className={styles.uploadReportsForm}>
            <Form.Group className={`mb-3 `} controlId="formBasic1">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="genderToggleSwitch"
                >
                  Gender
                </label>
                <div className={styles.switchAttach}>
                  <span>Female</span>
                  <ToggleSwitchComponent fieldName="genderToggleSwitch" />
                  <span>Male</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic2">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="ObstructiveToggleSwitch"
                >
                  Obstructive HCM
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="ObstructiveToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic3">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="SyncopeToggleSwitch"
                >
                  Syncope
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="SyncopeToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic4">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="DyspneaToggleSwitch"
                >
                  Dyspnea
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="DyspneaToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic5">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="FatigueToggleSwitch"
                >
                  Fatigue
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="FatigueToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic6">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="PresyncopeToggleSwitch"
                >
                  Presyncope
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="PresyncopeToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic7">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="Atrial_FibrillationToggleSwitch"
                >
                  Atrial_Fibrillation
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="Atrial_FibrillationToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic8">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="HypertensionToggleSwitch"
                >
                  Hypertension
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="HypertensionToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic9">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="Beta_blockerToggleSwitch"
                >
                  Beta_blocker
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="Beta_blockerToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic10">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="Ca_Channel_BlockersToggleSwitch"
                >
                  Ca_Channel_Blockers
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="Ca_Channel_BlockersToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic11">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="ACEI_ARBToggleSwitch"
                >
                  ACEI_ARB
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="ACEI_ARBToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic12">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="CoumadinToggleSwitch"
                >
                  Coumadin
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="CoumadinToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic13">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="Septal_Anterior_MotionToggleSwitch"
                >
                  Septal_Anterior_Motion
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="Septal_Anterior_MotionToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 `} controlId="formBasic14">
              <div className={styles["toggle-switch-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="NYHA_ClassToggleSwitch"
                >
                  NYHA_Class
                </label>
                <div className={styles.switchAttach}>
                  <span>Negative</span>
                  <ToggleSwitchComponent fieldName="NYHA_ClassToggleSwitch" />
                  <span>Positive</span>
                </div>
              </div>
            </Form.Group>

            <Form.Group
              className={`mb-3 ${styles.radiosContainer} ${styles["grid-column"]}`}
              controlId="formBasic17"
            >
              <label className={styles.dataLabel}>Mitral_Regurgitation :</label>
              <div className={styles.radioInputAndLabel}>
                <input
                  type="radio"
                  id="option1"
                  name="Mitral_RegurgitationRadio"
                  value="0"
                  checked={formik.values.Mitral_RegurgitationRadio === "0"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option1">0</label>
              </div>
              <div className={styles.radioInputAndLabel}>
                <input
                  type="radio"
                  id="option2"
                  name="Mitral_RegurgitationRadio"
                  value="1"
                  checked={formik.values.Mitral_RegurgitationRadio === "1"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option2">1</label>
              </div>
              <div className={styles.radioInputAndLabel}>
                <input
                  type="radio"
                  id="option3"
                  name="Mitral_RegurgitationRadio"
                  value="2"
                  checked={formik.values.Mitral_RegurgitationRadio === "2"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option3">2</label>
              </div>
              <div className={styles.radioInputAndLabel}>
                <input
                  type="radio"
                  id="option4"
                  name="Mitral_RegurgitationRadio"
                  value="3"
                  checked={formik.values.Mitral_RegurgitationRadio === "3"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option4">3</label>
              </div>
              <div className={styles.radioInputAndLabel}>
                <input
                  type="radio"
                  id="option5"
                  name="Mitral_RegurgitationRadio"
                  value="4"
                  checked={formik.values.Mitral_RegurgitationRadio === "4"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option5">4</label>
              </div>
              {formik.errors.Mitral_RegurgitationRadio &&
                formik.touched.Mitral_RegurgitationRadio && (
                  <Form.Text
                    className={`text-danger d-flex align-items-center ${styles.errorContainer}`}
                  >
                    {formik.errors.Mitral_RegurgitationRadio}
                    <svg
                      className={styles.errorSvg}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm0-3.002a1 1 0 110-2 1 1 0 010 2zm-.997-12h2v8h-2v-8z"
                      ></path>
                    </svg>
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group
              className={`mb-3  ${styles["grid-column"]}`}
              controlId="formBasic15"
            >
              <div className={styles["percentage-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="Max_Wall_ThickPercentage"
                >
                  Max_Wall_ThickPercentage :
                </label>
                <input
                  type="number"
                  id="Max_Wall_ThickPercentage"
                  name="Max_Wall_ThickPercentage"
                  min={0}
                  max={100}
                  value={formik.values.Max_Wall_ThickPercentage}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.Max_Wall_ThickPercentage &&
                formik.touched.Max_Wall_ThickPercentage && (
                  <Form.Text
                    className={`text-danger d-flex align-items-center ${styles.errorContainer}`}
                  >
                    {formik.errors.Max_Wall_ThickPercentage}
                    <svg
                      className={styles.errorSvg}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm0-3.002a1 1 0 110-2 1 1 0 010 2zm-.997-12h2v8h-2v-8z"
                      ></path>
                    </svg>
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group
              className={`mb-3  ${styles["grid-column"]}`}
              controlId="formBasic16"
            >
              <div className={styles["percentage-container"]}>
                <label
                  className={styles.dataLabel}
                  htmlFor="Ejection_FractionPercentage"
                >
                  Ejection_FractionPercentage :
                </label>
                <input
                  type="number"
                  id="Ejection_FractionPercentage"
                  name="Ejection_FractionPercentage"
                  min={0}
                  max={100}
                  value={formik.values.Ejection_FractionPercentage}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.Ejection_FractionPercentage &&
                formik.touched.Ejection_FractionPercentage && (
                  <Form.Text
                    className={`text-danger d-flex align-items-center ${styles.errorContainer}`}
                  >
                    {formik.errors.Ejection_FractionPercentage}
                    <svg
                      className={styles.errorSvg}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm0-3.002a1 1 0 110-2 1 1 0 010 2zm-.997-12h2v8h-2v-8z"
                      ></path>
                    </svg>
                  </Form.Text>
                )}
            </Form.Group>
          </div>
          <Button
            type="submit"
            variant="outline-primary"
            size="lg"
            className={styles.uploadButton}
          >
            Upload
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UploadMedicalReports;
