import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, useTheme, Divider } from "@mui/material";
import { DateTimePicker } from "../../components";
import { getCalendarData, appointmentCreate } from "../../firebase";
import moment, { Moment } from "moment";
import { User } from "firebase/auth";
import { ICalendar } from "../../types/types";
import { useRefreshDB } from "../../hooks";
import { sxMbSpacing } from "../../constants/constants";

const Calendar = ({ email, emailVerified }: User) => {
  useRefreshDB();
  const theme = useTheme();
  const [date, setDate] = useState<Moment | null>(null);
  const [isError, setIsError] = useState(false);
  const [appointmentSaved, setAppointmentSaved] = useState(false);
  const [saveMoreAppointment, setSaveMoreAppointment] = useState(false);
  const [calendarData, setCalendarData] = useState<ICalendar[]>([]);

  useEffect(() => {
    getCalendarData()
      .then((response) => {
        setCalendarData(response);
      })
      .catch((err) => console.log(err.message));
  }, [saveMoreAppointment]);

  const handleAppointmentCreate = async () => {
    const appointmentDate = moment(date).format("yyyy-MM-DD");
    const appointmentHour = Number(moment(date).format("HH"));

    await appointmentCreate({
      appointmentDate: appointmentDate,
      appointmentHour: appointmentHour,
      userEmail: email,
    }).then(() => {
      setAppointmentSaved(true);
      setSaveMoreAppointment(false);
    });
  };
  throw Error();
  const handleAppointmentCreateNew = () => {
    setSaveMoreAppointment(true);
    setDate(null);
    setIsError(false);
    setAppointmentSaved(false);
    setCalendarData([]);
  };

  return (
    <Grid
      container
      item
      alignContent="flex-start"
      xs={10}
      sm={8}
      md={6}
      lg={4}
      margin="2rem auto"
      flex={{ xs: 1 }}
    >
      <Grid item>
        <Typography
          component={"h3"}
          typography={"h5"}
          mb={sxMbSpacing}
          letterSpacing="0.1rem"
          fontWeight={600}
        >
          Заглавие / запазете час / тест
        </Typography>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Typography
          component={"p"}
          typography={"body1"}
          fontWeight={600}
          mb={sxMbSpacing}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
          delectus sed necessitatibus, facilis, suscipit unde impedit illum in
          sapiente ab, iste praesentium magnam? Debitis id totam quasi quis quam
          corrupti?
        </Typography>
        <Divider
          flexItem
          sx={{
            marginBottom: sxMbSpacing,
            backgroundColor: "black",
          }}
        />
      </Grid>
      {emailVerified ? (
        <Grid container item direction="column">
          <Grid container item mb={sxMbSpacing}>
            {appointmentSaved ? (
              <Grid
                item
                width="100%"
                minHeight={"56px"}
                sx={{
                  border: `${theme.palette.primary.main} solid 2px`,
                  borderRadius: "15px",
                }}
              >
                <Typography component={"p"} typography={"body1"}>
                  Имате запазен час за:
                </Typography>
                <Typography component={"p"} typography={"body1"}>
                  {moment(date)
                    .locale("bg")
                    .format("dddd - D.MM.yyyy - HH:mmч.")}
                </Typography>
              </Grid>
            ) : (
              <Grid item width="100%">
                <DateTimePicker
                  calendarData={calendarData}
                  dateValue={date}
                  setDateValue={setDate}
                  setIsError={setIsError}
                  isError={isError}
                  disabled={appointmentSaved}
                />
              </Grid>
            )}
          </Grid>
          {!appointmentSaved ? (
            <Grid item>
              <Button
                disabled={isError || !date}
                variant="contained"
                onClick={handleAppointmentCreate}
              >
                <Typography typography={"body1"}>Запази час</Typography>
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button variant="contained" onClick={handleAppointmentCreateNew}>
                <Typography typography={"body1"}>Запази още часове</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Calendar;
