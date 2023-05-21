import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  appointmentCreate,
  appointmentDelete,
  getCalendarData,
} from "../../firebase";
import { IAppointment, IUserAppointments } from "../../types/types";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import moment from "moment";

const TableOfAppointments = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [appointments, setAppointments] = useState<IUserAppointments[]>([]);
  const [loading, setLoading] = useState(false);

  const getCurrentUserAppointments = () => {
    setLoading(true);
    const userAppointments: IUserAppointments[] = [];
    getCalendarData()
      .then((calendarData) => {
        calendarData.forEach((date, dateIndex: number) => {
          date.appointments.forEach(
            (
              {
                appointment_hour,
                display_name,
                is_approved,
                phone,
                user_email,
              },
              appointmentIndex: number
            ) => {
              userAppointments.push({
                id: Number(`${dateIndex}${appointmentIndex}`),
                date: moment(date.date).format("MM.DD.YYYY"),
                hours: appointment_hour,
                email: user_email,
                isApproved: is_approved,
                displayName: display_name,
                phone: phone,
              });
            }
          );
        });
      })
      .then(() => setAppointments(userAppointments))
      .finally(() => setLoading(false))
      .catch((err) => new Error(err.message));
  };

  const handleApproveAppointment = (params: GridRenderCellParams) => {
    if (params.value === true) return;
    setLoading(true);
    const rowData: IUserAppointments = params.row;
    const payload: IAppointment = {
      appointmentDate: moment(rowData.date).format("YYYY-MM-DD"),
      appointmentHour: rowData.hours,
      userEmail: rowData.email as string,
      isApproved: false,
      displayName: rowData.displayName,
      phone: rowData.phone,
    };
    if (rowData.email && !rowData.isApproved) {
      appointmentDelete(payload).then(() => {
        appointmentCreate({ ...payload, isApproved: true }).finally(() =>
          setLoading(false)
        );
      });
      rowData.isApproved = true;
    }
  };

  const handleUnapproveAppointment = (params: GridRenderCellParams) => {
    if (params.value === false) return;
    setLoading(true);
    const rowData: IUserAppointments = params.row;
    const payload: IAppointment = {
      appointmentDate: moment(rowData.date).format("YYYY-MM-DD"),
      appointmentHour: rowData.hours,
      userEmail: rowData.email as string,
      isApproved: true,
      displayName: rowData.displayName,
      phone: rowData.phone,
    };
    if (rowData.email && rowData.isApproved) {
      appointmentDelete(payload).then(() => {
        appointmentCreate({ ...payload, isApproved: false }).finally(() =>
          setLoading(false)
        );
      });
      rowData.isApproved = false;
    }
  };

  useEffect(() => {
    getCurrentUserAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Дата",
      width: mdUp ? (lgUp ? 200 : 150) : 100,
    },
    { field: "hours", headerName: "Час", width: 50 },
    {
      field: "displayName",
      headerName: "Имена",
      width: mdUp ? (lgUp ? 230 : 180) : 130,
      valueFormatter: (params) => {
        if (!params.value) return "Няма";
      },
    },
    {
      field: "phone",
      headerName: "Телефон",
      width: mdUp ? (lgUp ? 230 : 180) : 130,
      valueFormatter: (params) => {
        if (!params.value) return "Няма";
      },
    },
    {
      field: "email",
      headerName: "Имейл",
      width: mdUp ? (lgUp ? 280 : 230) : 180,
    },
    {
      field: "isApproved",
      headerName: "Потвърди",
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.value ? "Потвърден" : "Непотвърден"}
            <Box display="flex">
              <Check
                onClick={() => handleApproveAppointment(params)}
                sx={{
                  marginRight: "1rem",
                  border: params.value
                    ? `1px solid ${theme.palette.success.main}`
                    : "none",
                  backgroundColor: params.value
                    ? theme.palette.success.light
                    : "unset",
                  borderRadius: "50%",
                  color: params.value ? "white" : "lightgrey",
                  transition: "all 500ms",
                }}
                cursor="pointer"
              />
              <Clear
                onClick={() => handleUnapproveAppointment(params)}
                cursor="pointer"
                sx={{
                  border: !params.value
                    ? `1px solid ${theme.palette.error.main}`
                    : "none",
                  backgroundColor: !params.value
                    ? theme.palette.error.light
                    : "unset",
                  borderRadius: "50%",
                  color: !params.value ? "white" : "lightgrey",
                  transition: "all 500ms",
                }}
              />
            </Box>
          </Box>
        );
      },
    },
  ];
  return (
    <div
      style={{
        height: 500,
        width: "100%",
        margin: mdUp ? (lgUp ? "3rem" : "2rem") : "1rem",
      }}
    >
      <DataGrid
        loading={loading}
        rows={appointments}
        columns={columns}
        rowHeight={70}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
};

export default TableOfAppointments;
