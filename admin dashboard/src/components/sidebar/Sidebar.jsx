import {
  LineStyle,
  Timeline,
  AdminPanelSettingsOutlined,
  SupervisorAccountOutlined,
  LocalHospital,
  ReceiptLongOutlined,
  BarChart,
  EmailOutlined,
  DynamicFeedOutlined,
  ChatBubbleOutlineOutlined,
  WorkOutlineOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="Link">
              <li className="sidebarItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            <NavLink to="/analytics" className="Link">
              <li className="sidebarItem">
                <Timeline className="sidebarIcon" />
                Analysis
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/patients" className="Link">
              <li className="sidebarItem">
                <SupervisorAccountOutlined className="sidebarIcon" />
                Patients
              </li>
            </NavLink>
            <NavLink to="/hospitals" className="Link">
              <li className="sidebarItem">
                <LocalHospital className="sidebarIcon" />
                Hospitals
              </li>
            </NavLink>
            <NavLink to="/admins" className="Link">
              <li className="sidebarItem">
                <AdminPanelSettingsOutlined className="sidebarIcon" />
                Admins
              </li>
            </NavLink>
            <NavLink to="/records" className="Link">
              <li className="sidebarItem">
                <ReceiptLongOutlined className="sidebarIcon" />
                Medical Records
              </li>
            </NavLink>
            <NavLink to="/reports" className="Link">
              <li className="sidebarItem">
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <NavLink to="/manage" className="Link">
              <li className="sidebarItem">
                <WorkOutlineOutlined className="sidebarIcon" />
                Manage
              </li>
            </NavLink>
            <NavLink to="/siteReports" className="Link">
              <li className="sidebarItem">
                <ReportGmailerrorredOutlined className="sidebarIcon" />
                Reports
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
