import "../SingleUser.css";
import { MailOutline, PermIdentity, PhoneAndroid } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateHospitalSuccess } from "../../store/Users/UsersActions";
import { updateHospitalFailure } from "../../store/Users/UsersActions";
import { fetchHospitalStart } from "../../store/Users/UsersActions";
import { toast } from "react-toastify";

const formSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  newPassword: Yup.string().required().min(7),
  contactno: Yup.string()
    .typeError("That doesn't look like a phone number")
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("A phone number is required"),
});

const SingleHospital = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { hospital } = location.state;

  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: hospital.name,
      email: hospital.email,
      newPassword: "",
      contactno: hospital.contactno,
    },
    validationSchema: formSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.newPassword);
      formData.append("contactno", values.contactno);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchHospitalStart());
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/updateHospitalById/${hospital.id}`,
          formData,
          config
        );
        if (res.status === 200) {
          dispatch(
            updateHospitalSuccess(hospital.id, {
              name: values.name,
              email: values.email,
              password: values.newPassword,
              contactno: values.contactno,
            })
          );
          toast.success(res.data.message);
        }
      } catch (error) {
        dispatch(updateHospitalFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  return (
    <div className="singleUser">
      <div className="userTitleContainer">
        <h1 className="userEditTitle">Edit Hospital</h1>
        <Link to="/newHospital">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userShowAndUpdateContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://media.istockphoto.com/id/1173593689/vector/large-hospital-infrastructure-icon.jpg?s=612x612&w=0&k=20&c=yDzusUV9-fQwt1eDHyeVi_kf-y0G_ICRbE65Y5u0c-w="
              alt="userImg"
              className="userShowTopImg"
            />
            <div className="userShowTopInfo">
              <span className="userShowTopInfoName">{hospital.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowBottomMainTitle">Account Details</span>
            <div className="userShowBottomInfo">
              <PermIdentity className="userShowBottomIcon" />
              <span className="userShowBottomTitle">{hospital.name}</span>
            </div>
            <div className="userShowBottomInfo">
              <MailOutline className="userShowBottomIcon" />
              <span className="userShowBottomTitle">{hospital.email}</span>
            </div>
            <span className="userShowBottomMainTitle">Contact Details</span>
            <div className="userShowBottomInfo">
              <PhoneAndroid className="userShowBottomIcon" />
              <span className="userShowBottomTitle">
                {" "}
                {hospital.contactno}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={formik.handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>name</label>
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
                <label>Contact No</label>
                <input
                  name="contactno"
                  type="text"
                  value={formik.values.contactno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="userUpdateInput"
                />
                {formik.errors.contactno && formik.touched.contactno && (
                  <div className="adminNewPatientError">
                    {formik.errors.contactno}
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

export default SingleHospital;
