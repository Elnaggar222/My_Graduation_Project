import "../SingleUser.css";
import { MailOutline, PermIdentity } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchAllAdminsStart } from "../../store/Users/UsersActions";
import { updateAllAdminsSuccess } from "../../store/Users/UsersActions";
import { updateAllAdminsFailure } from "../../store/Users/UsersActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const formSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  newPassword: Yup.string().required().min(7),
});

const SingleAdmin = () => {
  const dispatch = useDispatch();
  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const location = useLocation();
  const { admin } = location.state;

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: admin.name,
      email: admin.email,
      newPassword: "",
    },
    validationSchema: formSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.newPassword);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      };

      dispatch(fetchAllAdminsStart());
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/updateAdminById/${admin.id}`,
          formData,
          config
        );
        if (res.status === 200) {
          dispatch(
            updateAllAdminsSuccess(admin.id, {
              name: values.name,
              email: values.email,
              password: values.newPassword,
            })
          );
          toast.success(res.data.message);
        }
      } catch (error) {
        dispatch(updateAllAdminsFailure(error));
        toast.error(error.message);
        console.log("hereee", error);
      }
    },
  });

  return (
    <div className="singleUser">
      <div className="userTitleContainer">
        <h1 className="userEditTitle">Edit Admin</h1>
        <Link to="/newAdmin">
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
              <span className="userShowTopInfoName">{admin.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowBottomMainTitle">Account Details</span>
            <div className="userShowBottomInfo">
              <PermIdentity className="userShowBottomIcon" />
              <span className="userShowBottomTitle">{admin.name}</span>
            </div>
            <div className="userShowBottomInfo">
              <MailOutline className="userShowBottomIcon" />
              <span className="userShowBottomTitle">{admin.email}</span>
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

export default SingleAdmin;
