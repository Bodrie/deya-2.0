import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import { DateTimePicker } from "../../components";
import { getCalendarData, appointmentCreate } from "../../firebase";
import moment, { Moment } from "moment";
import { User } from "firebase/auth";
import { ICalendar } from "../../types/types";

const Calendar = ({ email }: User) => {
  const theme = useTheme();
  const [date, setDate] = useState<Moment | null>(null);
  const [isError, setIsError] = useState(false);
  const [appointmentSaved, setAppointmentSaved] = useState(false);
  const [calendarData, setCalendarData] = useState<ICalendar[]>([]);

  useEffect(() => {
    getCalendarData()
      .then((response) => {
        setCalendarData(response);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleAppointmentCreate = async () => {
    const appointmentDate = moment(date).format("yyyy-MM-DD");
    const appointmentHour = Number(moment(date).format("HH"));

    await appointmentCreate({
      appointmentDate: appointmentDate,
      appointmentHour: appointmentHour,
      userEmail: email,
    }).then(() => setAppointmentSaved(true));
  };

  return (
    <Grid container justifyContent="center" margin={"2rem 0"}>
      <Grid item xs={10}>
        <Typography
          component={"h3"}
          typography={"h5"}
          mb={2}
          letterSpacing="0.1rem"
          fontWeight={600}
        >
          Заглавие / запазете час / тест
        </Typography>
        <Typography component={"p"} typography={"body1"} fontWeight={600}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
          delectus sed necessitatibus, facilis, suscipit unde impedit illum in
          sapiente ab, iste praesentium magnam? Debitis id totam quasi quis quam
          corrupti?
        </Typography>
      </Grid>
      <Grid
        container
        item
        mb={2}
        xs={10}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item ml={2} mr={2}>
          <DateTimePicker
            calendarData={calendarData}
            dateValue={date}
            setDateValue={setDate}
            setIsError={setIsError}
            disabled={appointmentSaved}
          />
        </Grid>
        <Grid item ml={2} mr={2}>
          <Button
            variant="contained"
            disabled={isError || !date || appointmentSaved}
            onClick={handleAppointmentCreate}
          >
            <Typography typography={"body1"}>Запази час</Typography>
          </Button>
        </Grid>
      </Grid>
      <>
        {appointmentSaved && (
          <Grid item xs={10}>
            <Box
              sx={{
                border: `${theme.palette.primary.main} solid 2px`,
                borderRadius: "15px",
              }}
            >
              <Typography component={"p"} typography={"body1"}>
                Имате запазен час за:
              </Typography>
              <Typography component={"p"} typography={"body1"}>
                {moment(date).locale("bg").format("dddd - D.MM.yyyy - HH:mmч.")}
              </Typography>
            </Box>
          </Grid>
        )}
      </>
    </Grid>
  );
};

export default Calendar;
