import "../usersList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllAdminsStart } from "../../store/Users/UsersActions";
import { fetchAllAdminsSuccess } from "../../store/Users/UsersActions";
import { fetchAllAdminsFailure } from "../../store/Users/UsersActions";
import { CircularProgress } from "@mui/material";
import { DeleteAllAdminsSuccess } from "../../store/Users/UsersActions";
import { deleteAllAdminsFailure } from "../../store/Users/UsersActions";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMount = useRef(false);

  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const { allAdmins, adminLoading, adminError } = useSelector(
    (state) => state.allUsersState
  );

  const handleUserDelete = async (adminId) => {
    const formData = new FormData();
    formData.append("id", adminId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      dispatch(fetchAllAdminsStart());
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/admin/${adminId}`,
        config,
        formData
      );
      if (res.status === 200) {
        dispatch(DeleteAllAdminsSuccess(adminId));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(deleteAllAdminsFailure(error.response.data));
      console.log("hereeee", error);
      toast.error(error.response.data.error);
    }
  };

  const fetchAllAdmins = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      dispatch(fetchAllAdminsStart());
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getalladmins",
        config
      );
      if (res.status === 200) {
        dispatch(fetchAllAdminsSuccess(res.data.data));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(fetchAllAdminsFailure(error));
      console.log("hereeee", error);
      toast.error("server Error");
    }
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllAdmins();
      isMount.current = true;
    }
  }, [fetchAllAdmins]);

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
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (paaraamss) => {
        return (
          <>
            <button
              onClick={() =>
                navigate(`/admin/${paaraamss.row.id}`, {
                  state: {
                    admin: paaraamss.row,
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
      {!adminError ? (
        <DataGrid
          rows={allAdmins}
          columns={columns}
          loadingOverlay={spinnerConmonent}
          loading={adminLoading}
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
      {!adminLoading && adminError && (
        <div className="gridError"> {adminError.error} </div>
      )}
    </div>
  );
};

export default AdminList;
