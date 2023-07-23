import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const existedPatientLog = Cookies.get("patientLog")
    ? JSON.parse(Cookies.get("patientLog"))
    : true;
  const [patientLog, setpatientLog] = useState(existedPatientLog);
  const navigate = useNavigate();
  const existedUserCookies = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null;

  const [userToken, setUserToken] = useState(
    existedUserCookies ? existedUserCookies.token : null
  );
  const [userPrivateInfo, setUserPrivateInfo] = useState(
    existedUserCookies
      ? patientLog
        ? existedUserCookies.patient
        : existedUserCookies.hospital
      : null
  );

  const handleUser = (returnedInfo) => {
    if (returnedInfo) {
      setUserToken(returnedInfo.token);
      if (patientLog) {
        setUserPrivateInfo(returnedInfo.patient);
      } else {
        setUserPrivateInfo(returnedInfo.hospital);
      }
      const userCookies = JSON.stringify(returnedInfo);
      Cookies.set("userInfo", userCookies);
    } else {
      setUserToken(null);
      setUserPrivateInfo(null);
      Cookies.remove("userInfo");
    }
  };

  useEffect(() => {
    Cookies.set("patientLog", JSON.stringify(patientLog));
  }, [patientLog]);

  async function login(formData, email, password) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    try {
      const res = await axios.post(
        patientLog
          ? `http://127.0.0.1:8000/api/patientlog?email=${email}&password=${password}`
          : `http://127.0.0.1:8000/api/hospitallog`,
        formData,
        config
      );

      if (res.status === 200) {
        handleUser(res.data);
        toast.success(
          patientLog
            ? "Patient Logging Successfully"
            : "Hospital Logging Successfully"
        );
        navigate("/", { replace: true });
      } else {
        console.log("err", res);
        handleUser(null);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("hereee", error);
    }
  }

  async function register(formData) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/patientregisterWithToken",
        formData,
        config
      );

      if (res.status === 200) {
        if (!patientLog) {
          setpatientLog(true);
        }
        handleUser(res.data);
        toast.success("Registration Successfully");
        navigate("/", { replace: true });
      } else {
        console.log("err", res);
        handleUser(null);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("hereee", error);
    }
  }

  const logOut = () => {
    handleUser(null);
    toast.success(
      patientLog
        ? "Patient LogOut Successfully"
        : "Hospital LogOut Successfully"
    );
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        patientLog,
        setpatientLog,
        login,
        register,
        userToken,
        userPrivateInfo,
        isAuth: !!userToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
