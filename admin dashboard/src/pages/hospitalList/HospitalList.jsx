import "../usersList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHospitalStart } from "../../store/Users/UsersActions";
import { fetchHospitalSuccess } from "../../store/Users/UsersActions";
import { fetchHospitalFailure } from "../../store/Users/UsersActions";
import { CircularProgress } from "@mui/material";
import { DeleteHospitalSuccess } from "../../store/Users/UsersActions";
import { deleteHospitalFailure } from "../../store/Users/UsersActions";
import { useNavigate } from "react-router-dom";

const HospitalList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMount = useRef(false);

  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const { allHospitals, hospitalLoading, hospitalError } = useSelector(
    (state) => state.allUsersState
  );

  const handleUserDelete = async (hospitalId) => {
    const formData = new FormData();
    formData.append("id", hospitalId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      dispatch(fetchHospitalStart());
      const res = await axios.post(
        "http://127.0.0.1:8000/api/deletehospital",
        formData,
        config
      );
      if (res.status === 200) {
        dispatch(DeleteHospitalSuccess(hospitalId));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(deleteHospitalFailure(error));
      console.log("hereeee", error);
      toast.error("server Error");
    }
  };

  const fetchAllHospitals = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchHospitalStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getallhospitals",
        config
      );
      if (res.status === 200) {
        dispatch(fetchHospitalSuccess(res.data.data));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(fetchHospitalFailure(error));
      console.log("hereeee", error);
      toast.error("server Error");
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllHospitals();
      isMount.current = true;
    }
  }, [fetchAllHospitals]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "contactno",
      headerName: "Contact Number",
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
                navigate(`/hospital/${paaraamss.row.id}`, {
                  state: {
                    hospital: paaraamss.row,
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
      {!hospitalError ? (
        <DataGrid
          rows={allHospitals}
          columns={columns}
          loadingOverlay={spinnerConmonent}
          loading={hospitalLoading}
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
      {!hospitalLoading && hospitalError && (
        <div className="gridError"> {hospitalError.message} </div>
      )}
    </div>
  );
};

export default HospitalList;
