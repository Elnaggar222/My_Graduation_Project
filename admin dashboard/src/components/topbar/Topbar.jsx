import "./Topbar.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAdmin } from "../../store/auth/AdminActions";
import { toast } from "react-toastify";

const Topbar = () => {
  // const { name } = useSelector((state) => state.AdminState.currentAdmin.admin);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(DeleteAdmin());
    toast.success("LogOut Successfully");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="TopbarLeft">
          <span className="topbarLogo">Admin Panel</span>
        </div>
        <div className="TopbarRight">
          <Button
            onClick={handleLogout}
            className="TopbarLogOut"
            variant="outlined"
            color="error"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
