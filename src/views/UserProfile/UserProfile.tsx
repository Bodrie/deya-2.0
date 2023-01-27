import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  useTheme,
  Divider,
} from "@mui/material";
import { AccountCircle, Clear } from "@mui/icons-material";
import { LinkStyled } from "../../components";
import { getCalendarData, appointmentDelete } from "../../firebase";
import moment from "moment";
import { photoEnlarger } from "../../utils/photoEnlarger";
import { User } from "firebase/auth";
import { IUserAppointments } from "../../types/types";
import { useRefreshDB } from "../../hooks";
import { sxMbSpacing } from "../../constants/constants";
import { manageDbStrings } from "../../utils/manageDbStrings";

const UserProfile = ({ email, displayName, photoURL, uid }: User) => {
  useRefreshDB();
  const theme = useTheme();
  const [appointments, setAppointments] = useState<IUserAppointments[]>([]);
  const itsMe = process.env.REACT_APP_ADMIN?.toString().includes(
    email as string
  );
  const getCurrentUserAppointments = () => {
    const userAppointments: IUserAppointments[] = [];
    getCalendarData()
      .then((calendarData) => {
        calendarData.forEach((date) => {
          date.hours.forEach((hour: string) => {
            const {
              currentUserEmail,
              currentApproval,
              currentDisplayName,
              currentHour,
              currentPhoneNumber,
            } = manageDbStrings(hour);
            if (currentUserEmail.includes(email!)) {
              userAppointments.push({
                hours: currentHour,
                date: date.date,
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

  useEffect(() => {
    getCurrentUserAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {uid ? (
        <Grid
          container
          item
          alignContent="flex-start"
          justifyContent="center"
          xs={10}
          sm={8}
          md={6}
          lg={4}
          margin="2rem auto"
          flex={{ xs: 1 }}
        >
          <Grid item mb={sxMbSpacing}>
            <Typography
              component={"p"}
              variant={"h4"}
              fontWeight={600}
              letterSpacing="0.1rem"
            >
              Вашият профил
            </Typography>
          </Grid>
          <Divider
            sx={{
              width: "100%",
              marginBottom: sxMbSpacing,
              backgroundColor: "black",
            }}
          />
          <Grid item>
            {itsMe && (
              <LinkStyled to={"/admin/new"}>
                <Button variant="contained">Admin Panel</Button>
              </LinkStyled>
            )}
          </Grid>
          <Grid
            container
            item
            justifyContent="space-evenly"
            flexWrap="wrap"
            mb={2}
          >
            <Grid item p={2}>
              {photoURL ? (
                <img
                  alt="user"
                  src={photoEnlarger(photoURL)}
                  width={150}
                  height={150}
                  style={{ borderRadius: "15px" }}
                />
              ) : (
                <AccountCircle
                  color="disabled"
                  width={150}
                  height={150}
                  sx={{ width: 150, height: 150 }}
                />
              )}
            </Grid>

            <Grid item alignSelf="center" p={2}>
              <Typography fontWeight={600}>{displayName}</Typography>
              <Typography fontWeight={600}>{email}</Typography>
            </Grid>
          </Grid>
          <Divider
            sx={{
              width: "100%",
              marginBottom: sxMbSpacing,
              backgroundColor: "black",
            }}
          />
          <Grid item mb={sxMbSpacing}>
            <Typography
              component={"p"}
              variant={"h4"}
              fontWeight={600}
              letterSpacing="0.1rem"
            >
              {appointments.length > 0
                ? "Записани часове"
                : "Все още нямате записани часове"}
            </Typography>
          </Grid>
          <Divider
            sx={{
              width: "100%",
              marginBottom: sxMbSpacing,
              backgroundColor: "black",
            }}
          />
          {appointments?.map((appointment, idx) => {
            return (
              <Grid
                container
                item
                justifyContent="space-evenly"
                key={`${appointment.date}-${appointment.hours}-${idx}`}
                sx={{
                  border: `solid 2px ${theme.palette.primary.main}`,
                  borderRadius: "15px",
                  transition: "all 1s",
                }}
                mb={sxMbSpacing}
              >
                <Grid item p={2} textAlign="start">
                  <Typography>Час за нещо {idx}</Typography>
                  <Typography>
                    Дата: {moment(appointment.date).format("D.M.yyyy")}
                  </Typography>
                  <Typography>Час: {appointment.hours}:00</Typography>
                  <Typography>
                    {appointment.isApproved ? "Потвърден" : "Непотвърден"}
                  </Typography>
                </Grid>
                <Grid item p={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      appointmentDelete({
                        appointmentDate: appointment.date,
                        appointmentHour: appointment.hours,
                        userEmail: email,
                        isApproved: appointment.isApproved
                          ? "approved"
                          : "unapproved",
                        displayName:
                          appointment.displayName !== "Няма"
                            ? appointment.displayName
                            : "null",
                        phone:
                          appointment.phone !== "Няма"
                            ? appointment.phone
                            : "null",
                      }).then(() => getCurrentUserAppointments());
                    }}
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
