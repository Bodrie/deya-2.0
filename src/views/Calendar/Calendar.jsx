import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, useTheme } from "@mui/material";
import bgLocale from "date-fns/locale/bg";
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

  const shouldDisableDate = (date) => {
    const blackoutDates = data.dates;
    return !blackoutDates.includes(moment(date).format().split("T")[0]);
  };

  const shouldDisableHours = (timeValue, clockType) => {
    const blackoutHours = data.hours;
    if (clockType === "hours") return !blackoutHours.includes(timeValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={bgLocale}>
      <DesktopDateTimePicker
        PaperProps={{
          sx: {
            "& .MuiCalendarPicker-root": {
              "& div[role=cell]": {
                "& :not(.Mui-disabled).MuiPickersDay-dayWithMargin": {
                  color: theme.palette.text.secondary,
                  fontSize: "18px",
                },
              },
            },
            "& .MuiClockPicker-root": {
              "& div[role=listbox]": {
                "& :not(.Mui-disabled)": {
                  fontSize: "18px",
                  color: theme.palette.primary.main,
                  border: `${theme.palette.text.secondary} solid 2px`,
                  boxSizing: "border-box",
                },
                "& .Mui-selected": {
                  fontSize: "18px",
                  color: theme.palette.text.secondary,
                  border: "none",
                },
                "& .Mui-disabled": {
                  color: "lightgray",
                },
              },
            },
          },
        }}
        key={"teta"}
        open={open}
        value={date}
        shouldDisableDate={shouldDisableDate}
        shouldDisableTime={shouldDisableHours}
        onChange={(newDate) => {
          setDate(moment(newDate).set({ minutes: 0 }));
        }}
        onAccept={() => setOpen(false)}
        onError={(er, val) => console.log(er, val)}
        renderInput={(params) => (
          <TextField
            onClick={() => setOpen(!open)}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: "Кликнете за да изберете дата и час",
              readOnly: true,
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
        inputFormat={"EEEE - d.M.yyyy - Час: HH:mm"}
        views={["day", "hours"]}
        disableOpenPicker
        disableMaskedInput
        disablePast
        showToolbar
      />
    </LocalizationProvider>
  );
};

export default Calendar;
