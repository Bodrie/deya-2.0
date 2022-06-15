import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, useTheme } from "@mui/material";
import bgLocale from "date-fns/locale/bg";
import moment from "moment";

const DateTimePicker = ({
  data,
  dateValue,
  setDateValue,
  setIsError,
  disabled,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const shouldDisableDate = (date) => {
    const blackoutDates = data.map((el) => el.date);
    return !blackoutDates.includes(moment(date).format().split("T")[0]);
  };

  const shouldDisableHours = (timeValue, clockType) => {
    const selectedDate = moment(dateValue).format("yyyy-MM-DD");
    const blackoutHours = data
      .map((el) => {
        if (el.date === selectedDate) {
          return el.hours;
        }
        return null;
      })
      .flat()
      .filter(Boolean);
    if (clockType === "hours")
      return !Object.values(blackoutHours).includes(timeValue);
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
        onChange={(newDate) => {
          setDateValue(moment(newDate).set({ minutes: 0, seconds: 0 }));
        }}
        shouldDisableDate={shouldDisableDate}
        shouldDisableTime={shouldDisableHours}
        key={"teta"}
        open={open}
        value={dateValue}
        onAccept={() => setOpen(false)}
        onError={(error) => {
          setIsError(error ? true : false);
        }}
        inputFormat={"EEEE - d.M.yyyy - Час: HH:mm"}
        views={["day", "hours"]}
        disableOpenPicker
        disableMaskedInput
        disablePast
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
