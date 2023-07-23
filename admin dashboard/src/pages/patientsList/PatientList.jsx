import "../usersList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPatientStart } from "../../store/Users/UsersActions";
import { fetchPatientSuccess } from "../../store/Users/UsersActions";
import { fetchPatientFailure } from "../../store/Users/UsersActions";
import { CircularProgress } from "@mui/material";
import { DeletePatientSuccess } from "../../store/Users/UsersActions";
import { deletePatientFailure } from "../../store/Users/UsersActions";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMount = useRef(false);

  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const { allPatients, patientLoading, patientError } = useSelector(
    (state) => state.allUsersState
  );

  const handleUserDelete = async (patientId) => {
    const formData = new FormData();
    formData.append("id", patientId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      dispatch(fetchPatientStart());
      const res = await axios.post(
        "http://127.0.0.1:8000/api/deletepatient",
        formData,
        config
      );
      if (res.status === 200) {
        dispatch(DeletePatientSuccess(patientId));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(deletePatientFailure(error));
      console.log("hereeee", error);
      toast.error("server Error");
    }
  };

  const fetchAllPatients = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchPatientStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getallpatients",
        config
      );
      if (res.status === 200) {
        dispatch(fetchPatientSuccess(res.data.data));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(fetchPatientFailure(error));
      console.log("hereeee", error);
      toast.error("server Error");
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllPatients();
      isMount.current = true;
    }
  }, [fetchAllPatients]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Username",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (paaraamss) => {
        return (
          <>
            <button
              onClick={() =>
                navigate(`/patient/${paaraamss.row.id}`, {
                  state: {
                    patient: paaraamss.row,
                  },
                })
              }
              className="userListButton"
            >
              Edit
            </button>
            <DeleteOutline
              className="userListDeleteIcon"
              onClick={() => handleUserDelete(paaraamss.row.id)}
            />
          </>
        );
      },
    },
  ];

  const spinnerConmonent = () => {
    <CircularProgress />;
  };

  return (
    <div className="userList">
      {!patientError ? (
        <DataGrid
          rows={allPatients}
          columns={columns}
          loadingOverlay={spinnerConmonent}
          loading={patientLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : null}
      {!patientLoading && patientError && (
        <div className="gridError"> {patientError.message} </div>
      )}
    </div>
  );
};

export default PatientList;
