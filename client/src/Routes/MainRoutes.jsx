import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Appointments from "../pages/Appointments";
import HeaderLayout from "../Layouts/HeaderLayout";
import UploadMedicalReports from "../components/uploadMedicalReports/UploadMedicalReports";
import PatientAppointments from "../pages/PatientAppointments";
import ContactUs from "../pages/ContactUs";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/" element={<HeaderLayout />}>
        <Route path="hospitalAppointments/:id" element={<Appointments />} />
        <Route
          path="patientAppointments/:id"
          element={<PatientAppointments />}
        />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>

      <Route
        path="/appointments/upload/:id"
        element={<UploadMedicalReports />}
      />
    </Routes>
  );
};

export default MainRoutes;
