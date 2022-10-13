import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import { DateTimePicker } from "../../components";
import { db, getCalendarData } from "../../firebase";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import moment from "moment";

const Calendar = ({ user }) => {
  const theme = useTheme();
  const [date, setDate] = useState(null);
  const [isError, setIsError] = useState(false);
  const [appointmentSaved, setAppointmentSaved] = useState();
  const [calendarData, setCalendarData] = useState();

  useEffect(() => {
    getCalendarData()
      .then((response) => setCalendarData(response))
      .catch((err) => console.log(err.message));
  }, []);

  const handleAppointmentSave = async () => {
    const dateId = moment(date).format("yyyy-MM-DD");
    const hourToRemove = Number(moment(date).format("HH"));
    const docRef = doc(db, "data", dateId);
    await updateDoc(docRef, { hours: arrayRemove(`${hourToRemove} - free`) });
    await updateDoc(docRef, {
      hours: arrayUnion(`${hourToRemove} - ${user.email}`),
    })
      .then(setAppointmentSaved(true))
      .catch((err) => console.log(err.message));
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Typography component={"h3"} typography={"h5"} mb={2} color="white">
          Заглавие / запазете час / тест
        </Typography>
        <Typography component={"p"} typography={"body1"} color="white">
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
            onClick={handleAppointmentSave}
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
              <Typography component={"p"} typography={"body1"} color="white">
                Имате запазен час за:
              </Typography>
              <Typography component={"p"} typography={"body1"} color="white">
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
