import React, { useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField, useTheme } from "@mui/material";
import { bgLocale } from "moment/locale/bg";
import moment from "moment";
import { database } from "../../firebase";
import { ref, get, child } from "firebase/database";

const Calendar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `data/calendar`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);
  console.log(data.dates);
  const shouldDisableDate = (date) => {
    const blackoutDates = data.dates;
    return !blackoutDates.includes(moment(date).format().split("T")[0]);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={bgLocale}>
      <DateTimePicker
        key={"teta"}
        open={open}
        value={date}
        shouldDisableDate={shouldDisableDate}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        onAccept={() => setOpen(false)}
        renderInput={(params) => (
          <TextField
            onClick={() => setOpen(!open)}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: "Кликнете за да изберете дата и час",
            }}
            style={{
              margin: "2rem 0",
              width: "20rem",
              caretColor: "transparent",
            }}
            autoComplete="off"
          />
        )}
        ampm={false}
        ampmInClock={false}
        inputFormat={"dddd - DD.M.yyyy - Час: HH:mm"}
        views={["day", "hours", "minutes"]}
        minutesStep={5}
        disableOpenPicker
        disableMaskedInput
        disablePast
        showToolbar
      />
    </LocalizationProvider>
  );
};

export default Calendar;
