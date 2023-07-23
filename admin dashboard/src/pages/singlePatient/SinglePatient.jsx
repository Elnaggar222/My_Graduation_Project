import "../SingleUser.css";
import { MailOutline, PermIdentity, PhoneAndroid } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchPatientStart } from "../../store/Users/UsersActions";
import { updatePatientSuccess } from "../../store/Users/UsersActions";
import { updatePatientFailure } from "../../store/Users/UsersActions";
import { toast } from "react-toastify";

const formSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  newPassword: Yup.string().required().min(7),
  phone: Yup.string()
    .typeError("That doesn't look like a phone number")
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("A phone number is required"),
  gender: Yup.string().required().oneOf(["male", "female"]),
});

const SinglePatient = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { patient } = location.state;

  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: patient.name,
      email: patient.email,
      newPassword: "",
      phone: patient.phone,
      gender: patient.gender,
    },
    validationSchema: formSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.newPassword);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchPatientStart());
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/patientUpdate/${patient.id}`,
          formData,
          config
        );
        if (res.status === 200) {
          dispatch(
            updatePatientSuccess(patient.id, {
              name: values.name,
              email: values.email,
              password: values.newPassword,
              phone: values.phone,
              gender: values.gender,
            })
          );
          toast.success(res.data.message);
        }
      } catch (error) {
        dispatch(updatePatientFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  return (
    <div className="singleUser">
      <div className="userTitleContainer">
        <h1 className="userEditTitle">Edit Patient</h1>
        <Link to="/newPatient">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userShowAndUpdateContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
              alt="userImg"
              className="userShowTopImg"
            />
            <div className="userShowTopInfo">
              <span className="userShowTopInfoName">{patient.name}</span>
              <span className="userShowTopInfoTitle">{patient.gender}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowBottomMainTitle">Account Details</span>
            <div className="userShowBottomInfo">
              <PermIdentity className="userShowBottomIcon" />
              <span className="userShowBottomTitle">{patient.name}</span>
            </div>
            <div className="userShowBottomInfo">
              <MailOutline className="userShowBottomIcon" />
              <span className="userShowBottomTitle">{patient.email}</span>
            </div>
            <span className="userShowBottomMainTitle">Contact Details</span>
            <div className="userShowBottomInfo">
              <PhoneAndroid className="userShowBottomIcon" />
              <span className="userShowBottomTitle"> {patient.phone} </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={formik.handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="userUpdateInput"
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="adminNewPatientError">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="userUpdateInput"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="adminNewPatientError">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="userUpdateItem">
                <label>New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="userUpdateInput"
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <div className="adminNewPatientError">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="userUpdateInput"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <div className="adminNewPatientError">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <select
                  className="genderSelectNew"
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
                  <div className="adminNewPatientError">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
            </div>
            <div className="userUpdateRight">
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;
