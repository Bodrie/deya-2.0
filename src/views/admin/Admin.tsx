import React, { useState } from "react";
import { addAppointments, getCalendarData } from "../../firebase";
import { Grid, Snackbar, Typography } from "@mui/material";
import { DATE_REGEX } from "../../constants/constants";
import { useRefreshDB } from "../../hooks";
import TableOfAppointments from "./TableOfAppointments";
// import { ICalendar } from "../../types/types";

const Admin = () => {
  useRefreshDB();
  const [snackOpen, setSnakOpen] = useState(false);
  // const [calendarData, setCalendarData] = useState<ICalendar[]>([]);
  // const [valid, setValid] = useState(true);

  // getCalendarData().then((calendarDataRes) => {
  //   setCalendarData(calendarDataRes);
  // });

  const handleForm = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    // const copyOfCalendar = calendarData;
    const appointmentsDate: string = e.target.date.value;
    const isValidDate: boolean = DATE_REGEX.test(appointmentsDate);
    const appointmentHours: number[] = JSON.parse(
      "[" + e.target.hours.value + "]"
    );

    // copyOfCalendar
    //   .filter((doc) => doc.date === appointmentsDate)[0]
    //   .appointments.forEach((el) => {
    //     if (appointmentHours.includes(el.appointment_hour)) setValid(false);
    //     alert(
    //       `Припокриване на запазен час! \n${el.appointment_hour}:00\nИмейл: ${el.user_email}\nПотребител: ${el.display_name}`
    //     );
    //   });

    if (isValidDate) {
      await addAppointments({
        appointmentsDate,
        appointmentHours,
      })
        .then(() => {
          e.target.date.value = "";
          e.target.hours.value = "";
        })
        .finally(() => {
          setSnakOpen(true);
          // setValid(true);
        });
    } else {
      alert("Грешка! Прегледай формата на датата и часа");
    }
  };
  if (snackOpen) setTimeout(() => setSnakOpen(false), 5000);
  return (
    <Grid
      container
      margin={"2rem 0"}
      flex={{ xs: 1 }}
      alignContent="flex-start"
    >
      <Snackbar
        color="success"
        open={snackOpen}
        message={"Часовете са запазени успешно"}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green",
            fontSize: "18px",
            justifyContent: "center",
          },
        }}
      />
      <Grid item container justifyContent="center" xs={12}>
        <form action="submit" onSubmit={handleForm}>
          <Grid item>
            <label htmlFor="date">
              <Typography fontSize={"24px"}>Дата</Typography>
            </label>
            <input type="text" name="date" required />
          </Grid>
          <Grid item mb={2}>
            <label htmlFor="hours">
              <Typography fontSize={"24px"}>Часове</Typography>
            </label>
            <input type="text" name="hours" required />
          </Grid>
          <button>
            <Typography variant="body1">Добави дата и часове</Typography>
          </button>
        </form>
      </Grid>
      <Grid
        item
        container
        pt={2}
        justifyContent="flex-start"
        direction="column"
      >
        <Typography variant="body1" fontWeight={600}>
          ПРИМЕР:
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          2022-09-31
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          9, 11, 13, 15, 20
        </Typography>
      </Grid>
      <TableOfAppointments />
    </Grid>
  );
};

export default Admin;
