import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  appointmentCreate,
  appointmentDelete,
  getCalendarData,
} from "../../firebase";
import { IAppointment, IUserAppointments } from "../../types/types";
import { manageDbStrings } from "../../utils/manageDbStrings";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Check, Clear } from "@mui/icons-material";

const TableOfAppointments = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [appointments, setAppointments] = useState<IUserAppointments[]>([]);

  const getCurrentUserAppointments = () => {
    const userAppointments: IUserAppointments[] = [];
    getCalendarData()
      .then((calendarData) => {
        calendarData.forEach((date, dateIndex: number) => {
          date.hours.forEach((hour: string, index: number) => {
            const {
              currentHour,
              currentUserEmail,
              currentDisplayName,
              currentPhoneNumber,
              currentApproval,
            } = manageDbStrings(hour);
            if (!hour.includes(" - free")) {
              userAppointments.push({
                id: Number(`${dateIndex}${index}`),
                email: currentUserEmail,
                date: date.date,
                hours: currentHour,
                isApproved: currentApproval === "approved" ? true : false,
                displayName: currentDisplayName,
                phone: currentPhoneNumber,
              });
            }
          });
        });
      })
      .then(() => setAppointments(userAppointments))
      .catch((err) => console.log(err.message));
  };

  const handleApproveAppointment = (params: GridRenderCellParams) => {
    const rowData: IUserAppointments = params.row;
    const payload: IAppointment = {
      appointmentDate: rowData.date,
      appointmentHour: rowData.hours,
      userEmail: rowData.email as string,
      isApproved: "unapproved",
    };
    if (rowData.email && !rowData.isApproved) {
      appointmentDelete(payload).then(() => {
        appointmentCreate({ ...payload, isApproved: "approved" });
      });
      rowData.isApproved = true;
    }
  };

  const handleUnapproveAppointment = (params: GridRenderCellParams) => {
    const rowData: IUserAppointments = params.row;
    const payload: IAppointment = {
      appointmentDate: rowData.date,
      appointmentHour: rowData.hours,
      userEmail: rowData.email as string,
      isApproved: "approved",
    };
    if (rowData.email && rowData.isApproved) {
      appointmentDelete(payload).then(() => {
        appointmentCreate({ ...payload, isApproved: "unapproved" });
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
      headerName: "Човек",
      width: mdUp ? (lgUp ? 230 : 180) : 130,
    },
    {
      field: "phone",
      headerName: "Телефон",
      width: mdUp ? (lgUp ? 230 : 180) : 130,
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
