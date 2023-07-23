import "./medicalRecords.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Upload, Percent } from "@mui/icons-material";
import { useEffect, useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { format } from "timeago.js";
import { fetchRecordStart } from "../../store/medical/MedicalActions";
import { fetchRecordSuccess } from "../../store/medical/MedicalActions";
import { fetchRecordFailure } from "../../store/medical/MedicalActions";
import { updateRecordSuccess } from "../../store/medical/MedicalActions";
import { updateRecordFailure } from "../../store/medical/MedicalActions";
import { deleteRecordSuccess } from "../../store/medical/MedicalActions";
import { deleteRecordFailure } from "../../store/medical/MedicalActions";
import moment from "moment/moment";

const MedicalRecords = () => {
  const [dateAdmin, setDateAdmin] = useState(null);
  const [timeAdmin, setTimeAdmin] = useState(null);

  const dispatch = useDispatch();
  const isMount = useRef(false);
  const { allPatients, allHospitals } = useSelector(
    (state) => state.allUsersState
  );

  const { allRecords, recordsLoading, recordsError } = useSelector(
    (state) => state.medicalState
  );

  const reFormateMedicalRecords = useCallback(
    (records) => {
      records &&
        records.forEach((record) => {
          let patient = allPatients.find(
            // eslint-disable-next-line eqeqeq
            (patient) => patient.id == record.patient_id
          );
          record.patientName = patient ? patient.name : null;
          let hospital = allHospitals.find(
            // eslint-disable-next-line eqeqeq
            (hospital) => hospital.id == record.Hospital_id
          );
          record.hospitalName = hospital ? hospital.name : null;
        });
      return records;
    },
    [allHospitals, allPatients]
  );
  const adminToken = useSelector(
    (state) => state.AdminState.currentAdmin.token
  );

  const handleRecordDelete = async (recordId) => {
    const formData = new FormData();
    formData.append("id", recordId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    };
    try {
      dispatch(fetchRecordStart());
      const res = await axios.post(
        "http://127.0.0.1:8000/api/deletemedicalrecord",
        formData,
        config
      );
      if (res.status === 200) {
        dispatch(deleteRecordSuccess(recordId));
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(deleteRecordFailure(error));
      console.log("hereeee", error);
      toast.error(error.message);
    }
  };

  const fetchAllMedicalRecords = useCallback(async () => {
    try {
      dispatch(fetchRecordStart());
      const res = await axios.get("http://127.0.0.1:8000/api/medicalrecords");
      if (res.status === 200) {
        let recordsAfter = reFormateMedicalRecords(res.data.data);
        dispatch(fetchRecordSuccess(recordsAfter));
        toast.success("All Medical Records Fetched Successfully");
      }
    } catch (error) {
      dispatch(fetchRecordFailure(error));
      console.log("hereeee", error);
      toast.error(error.message);
    }
  }, [reFormateMedicalRecords, dispatch]);

  useEffect(() => {
    if (!isMount.current) {
      fetchAllMedicalRecords();
      isMount.current = true;
    }
  }, [fetchAllMedicalRecords]);

  const handleUploadMedicalRecords = async (recordId) => {
    const formData = new FormData();
    if (dateAdmin && timeAdmin) {
      const datetimeString = `${dateAdmin} ${timeAdmin}`;
      const date = new Date(datetimeString);
      const isoString = date.toISOString();
      const formattedDate = moment(isoString).format("YYYY-MM-DD HH:mm:ss");
      formData.append("date", formattedDate);
      try {
        dispatch(fetchRecordStart());
        const res = await axios.post(
          `http://127.0.0.1:8000/api/updateStatus_date/${recordId}`,
          formData
        );
        if (res.status === 200) {
          dispatch(updateRecordSuccess(recordId, formattedDate));
          toast.success(res.data.message);
          setDateAdmin(null);
          setTimeAdmin(null);
        }
      } catch (error) {
        dispatch(updateRecordFailure(error));
        console.log("hereeee", error);
        toast.error(error.response.data.message);
        setDateAdmin(null);
        setTimeAdmin(null);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Hospital_id",
      headerName: "Hos_Name/ID",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.hospitalName
              ? params.row.hospitalName
              : params.row.Hospital_id}
          </>
        );
      },
    },
    {
      field: "patient_id",
      headerName: "Pati_Name/ID",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.patientName
              ? params.row.patientName
              : params.row.patient_id}
          </>
        );
      },
    },
    {
      field: "percentageofmodel",
      headerName: "Model Percentage",
      width: 140,
      renderCell: (paaraamss) => {
        return (
          <div className="modePercentage">
            {paaraamss.row.percentageofmodel}{" "}
            <Percent className="modelPercentageIcon" />
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created_At",
      width: 140,
      renderCell: (paaraamss) => {
        return <>{format(paaraamss.row.created_at)}</>;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated_At",
      width: 140,
      renderCell: (paaraamss) => {
        return <>{format(paaraamss.row.updated_at)}</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (paaraamss) => {
        return (
          <button className={`statusBtn ${paaraamss.row.status}`}>
            {paaraamss.row.status}
          </button>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 160,
      renderCell: (paaraamss) => {
        return (
          <>
            {paaraamss.row.date ? (
              moment(paaraamss.row.date, "YYYY-MM-DD HH:mm:ss").calendar()
            ) : (
              <div className="dateTimeContainer">
                <input
                  name="date"
                  onChange={(e) => setDateAdmin(e.target.value)}
                  type="date"
                  className="dateInputAdmin"
                />
                <input
                  name="time"
                  onChange={(e) => setTimeAdmin(e.target.value)}
                  type="time"
                  className="timeInputAdmin"
                />
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (paaraamss) => {
        return (
          <div className="uploadDeleteAdminContainer">
            <button
              type="button"
              onClick={() => handleUploadMedicalRecords(paaraamss.row.id)}
              disabled={paaraamss.row.status === "approved"}
              className="uploadAdminButton"
            >
              <Upload /> Upload
            </button>
            <DeleteOutline
              className="userListDeleteIcon"
              onClick={() => handleRecordDelete(paaraamss.row.id)}
            />
          </div>
        );
      },
    },
  ];

  const spinnerConmonent = () => {
    <CircularProgress />;
  };

  return (
    <div className="userList">
      {!recordsError ? (
        <DataGrid
          rows={allRecords}
          columns={columns}
          getRowHeight={() => "auto"}
          loadingOverlay={spinnerConmonent}
          loading={recordsLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : null}
      {!recordsLoading && recordsError && (
        <div className="gridError"> {recordsError.message} </div>
      )}
    </div>
  );
};

export default MedicalRecords;
