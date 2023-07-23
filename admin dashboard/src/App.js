import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/productList/ProductList";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Auth/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import PatientList from "./pages/patientsList/PatientList";
import HospitalList from "./pages/hospitalList/HospitalList";
import AdminList from "./pages/adminList/AdminList";
import MedicalRecords from "./pages/medicalRecords/MedicalRecords";
import NewPatient from "./pages/newPatient/NewPatient";
import SinglePatient from "./pages/singlePatient/SinglePatient";
import SingleHospital from "./pages/singleHospital/SingleHospital";
import SingleAdmin from "./pages/singleAdmin/SingleAdmin";
import NewAdmin from "./pages/newAdmin/NewAdmin";
import NewHospital from "./pages/newHospital/NewHospital";
import Analysis from "./pages/analysis/Analysis";

function App() {
  const adminData = useSelector((state) => state.AdminState.currentAdmin);

  return (
    <>
      {adminData ? (
        <>
          <Topbar />
          <div className="AppContainer">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analysis />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/hospitals" element={<HospitalList />} />
              <Route path="/admins" element={<AdminList />} />
              <Route path="/records" element={<MedicalRecords />} />
              <Route path="/patient/:patientId" element={<SinglePatient />} />
              <Route path="/hospital/:hospitalId" element={<SingleHospital />} />
              <Route path="/admin/:adminId" element={<SingleAdmin />} />
              <Route path="/newPatient" element={<NewPatient />} />
              <Route path="/newAdmin" element={<NewAdmin />} />
              <Route path="/newHospital" element={<NewHospital />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<SingleProduct />} />
              <Route path="/newProduct" element={<NewProduct />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
