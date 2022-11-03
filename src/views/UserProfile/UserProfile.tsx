import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { LinkStyled } from "../../components";
import { getCalendarData, appointmentDelete } from "../../firebase";
import moment from "moment";
import { photoEnlarger } from "../../utils/photoEnlarger";
import { User } from "firebase/auth";
import { IUserAppointments } from "../../types/types";

const UserProfile = ({ email, displayName, photoURL, uid }: User) => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState<IUserAppointments[]>([]);

  useEffect(() => {
    const userAppointments: IUserAppointments[] = [];
    getCalendarData()
      .then((calendarData) => {
        calendarData.forEach((date) => {
          date.hours.forEach((hour: string) => {
            if (hour.includes(email!)) {
              userAppointments.push({
                date: date.date,
                hours: Number(hour.slice(0, 2)),
              });
            }
          });

          setAppointments(userAppointments);
        });
      })
      .catch((err) => console.log(err.message));
  }, [email, appointments]);

  return (
    <>
      {email && photoURL && typeof appointments === "object" ? (
        <Grid container item justifyContent="center">
          <Grid item xs={10} mb={2}>
            <Typography component={"p"} variant={"h4"}>
              Вашият профил
            </Typography>
          </Grid>
          <Grid item>
            {email === process.env.REACT_APP_ADMIN && (
              <LinkStyled to={"/admin/new"}>
                <Button variant="contained">Admin Panel</Button>
              </LinkStyled>
            )}
          </Grid>
          <Grid
            container
            item
            xs={10}
            justifyContent="space-evenly"
            flexWrap="wrap"
            mb={2}
          >
            <Grid item p={2}>
              <img
                alt="asd"
                src={photoEnlarger(photoURL)}
                width={150}
                height={150}
                style={{ borderRadius: "15px" }}
              />
            </Grid>

            <Grid item alignSelf="center" p={2}>
              <Typography>{displayName}</Typography>
              <Typography>{email}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} mb={2}>
            <Typography component={"p"} variant={"h4"}>
              {appointments.length > 0
                ? "Записани часове"
                : "Все още нямате записани часове"}
            </Typography>
          </Grid>
          {appointments?.map((appointment, idx) => {
            return (
              <Grid
                container
                item
                xs={10}
                justifyContent="space-evenly"
                key={`${appointment.date}-${appointment.hours}-${idx}`}
                sx={{
                  border: `solid 2px ${theme.palette.primary.main}`,
                  borderRadius: "15px",
                }}
                mb={2}
              >
                <Grid item p={2} textAlign="start">
                  <Typography>Час за нещо {idx}</Typography>
                  <Typography>
                    Дата: {moment(appointment.date).format("D.M.yyyy")}
                  </Typography>
                  <Typography>Час: {appointment.hours}:00</Typography>
                </Grid>
                <Grid item p={2}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      appointmentDelete({
                        appointmentDate: appointment.date,
                        appointmentHour: appointment.hours,
                        userEmail: email,
                      })
                    }
                  >
                    Откажи час
                    <Clear color="error" sx={{ ml: 1 }} />
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
export default UserProfile;
