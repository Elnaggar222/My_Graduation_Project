import MainRoutes from "./Routes/MainRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <MainRoutes />
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
