import React, { useState } from "react";
import { createOrUpdateAvailableAppointments } from "../../firebase";
import { Grid, Snackbar, Typography } from "@mui/material";
import { DATE_REGEX } from "../../constants/constants";

const Admin = () => {
  const [snackOpen, setSnakOpen] = useState(false);
  const handleForm = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const appointmentsDate: string = e.target.date.value;
    const parsedHours: number[] = JSON.parse("[" + e.target.hours.value + "]");
    const appointmentHours: string[] = parsedHours.map((currHour: number) => {
      return currHour + " - free";
    });
    const isValidDate: boolean = DATE_REGEX.test(appointmentsDate);

    if (isValidDate) {
      await createOrUpdateAvailableAppointments({
        appointmentsDate,
        appointmentHours,
      })
        .then(() => {          
          e.target.date.value = "";
          e.target.hours.value = "";
        })
        .finally(() => setSnakOpen(true));
    } else {
      alert("Wrong date / hour format");
    }
  };
  if (snackOpen) setTimeout(() => setSnakOpen(false), 5000);
  return (
    <Grid container>
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
              <Typography fontSize={"24px"} color="white">
                дата
              </Typography>
            </label>
            <input type="text" name="date" required />
          </Grid>
          <Grid item mb={2}>
            <label htmlFor="hours">
              <Typography fontSize={"24px"} color="white">
                часове
              </Typography>
            </label>
            <input type="text" name="hours" required />
          </Grid>
          <button>
            <Typography variant="body2">добави дата и часове</Typography>
          </button>
        </form>
      </Grid>
      <Grid item container pt={2} justifyContent="start" direction="column">
        <Typography component={"p"} variant="h6">
          година-месец-дата
        </Typography>
        <Typography component={"p"} variant="h6">
          пример
        </Typography>
        <Typography component={"p"} variant="h5" color="white">
          2022-09-31
        </Typography>
        <Typography component={"p"} variant="h5" color="white">
          9, 11, 13, 15, 20
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Admin;
