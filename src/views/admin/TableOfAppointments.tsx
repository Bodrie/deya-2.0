import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Check } from "@mui/icons-material";
import { getCalendarData } from "../../firebase";
import { IUserAppointments } from "../../types/types";
import { manageDbStrings } from "../../utils/manageDbStrings";

const TableOfAppointments = () => {
  const [appointments, setAppointments] = useState<IUserAppointments[]>([]);

  const getCurrentUserAppointments = () => {
    const userAppointments: IUserAppointments[] = [];
    getCalendarData()
      .then((calendarData) => {
        calendarData.forEach((date, dateIndex: number) => {
          date.hours.forEach((hour: string, index: number) => {
            const { currentUserEmail, currentApproval } = manageDbStrings(hour);
            userAppointments.push({
              id: Number(`${dateIndex}${index}`),
              email: currentUserEmail,
              date: date.date,
              hours: Number(hour.slice(0, 2)),
              isApproved: currentApproval === "approved" ? true : false,
            });
          });
        });
      })
      .then(() => setAppointments(userAppointments))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCurrentUserAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(appointments);

  // const rows: GridRowsProp = [
  //   {
  //     id: 1,
  //     col1: "1.12.2022",
  //     col2: "12",
  //     col3: "Dobromir Kirov",
  //     col4: "0877177133",
  //     col5: "kirov0407@gmial.com",
  //   },
  //   {
  //     id: 2,
  //     col1: "1.12.2022",
  //     col2: "15",
  //     col3: "Dobromir Kirov",
  //     col4: "+359877177133",
  //     col5: "kirov0407@gmial.com",
  //   },
  //   {
  //     id: 3,
  //     col1: "1.12.2022",
  //     col2: "9",
  //     col3: "Dobromir Kirov",
  //     col4: "0877177133",
  //     col5: "kirov0407@gmial.com",
  //   },
  // ];
  const columns: GridColDef[] = [
    { field: "date", headerName: "Дата", width: 100 },
    { field: "hours", headerName: "Час", width: 50 },
    { field: "col3", headerName: "Човек", width: 130 },
    { field: "col4", headerName: "Телефон", width: 130 },
    { field: "email", headerName: "Имейл", width: 180 },
    {
      field: "isApproved",
      headerName: "Потвърди",
      width: 100,
      renderCell: (params: GridRenderCellParams<Date>) => {
        console.log(params);

        return <strong>{params.value ? "Потвърден" : "Непотвърден"}</strong>;
      },
    },
  ];
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={appointments} columns={columns} rowHeight={70} />
    </div>
  );
};

export default TableOfAppointments;
