import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField, useTheme } from "@mui/material";
import { bgLocale } from "moment/locale/bg";

const Calendar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={bgLocale}>
      <DateTimePicker
        key={"teta"}
        open={open}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        onAccept={() => setOpen(false)}
        OpenPickerButtonProps={{ sx: { display: "none" } }}
        PaperProps={{
          classes: {
            "MuiCalendarPicker-root": {
              fontSize: 20,
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            onClick={() => setOpen(!open)}
            {...params}
            style={{ width: "17rem", caretColor: "transparent" }}
            autoComplete="off"
          />
        )}
        ampm={false}
        ampmInClock={false}
        inputFormat={"dddd - DD.M.yyyy - Час: HH:mm"}
        disableMaskedInput
        disablePast
        showToolbar
        views={["day", "hours", "minutes"]}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
