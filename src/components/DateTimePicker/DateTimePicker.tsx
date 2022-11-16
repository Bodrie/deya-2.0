import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, useTheme } from "@mui/material";
import bgLocale from "date-fns/locale/bg";
import moment from "moment";
import {
  showOnlyAvailableDates,
  showOnlyAvailableHours,
} from "./dateTimePickerUtils";
import { IDateTimePicker } from "../../types/types";
import { DateTimeValidationError } from "@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation";

const DateTimePicker = ({
  calendarData,
  dateValue,
  setDateValue,
  setIsError,
  isError,
  disabled,
}: IDateTimePicker) => {
  const theme = useTheme();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const handleDatePickerError = (error: DateTimeValidationError) => {
    if (error && error !== "shouldDisableTime-hours") {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={bgLocale}>
      <DesktopDateTimePicker
        PaperProps={{
          sx: {
            "& .MuiCalendarPicker-root": {
              "& div[role=cell]": {
                "& :not(.Mui-disabled).MuiPickersDay-dayWithMargin": {
                  color: theme.palette.primary.contrastText,
                  fontSize: "20px",
                  fontWeight: 600,
                },
              },
            },
            "& .MuiClockPicker-root": {
              "& div[role=listbox]": {
                "& :not(.Mui-disabled)": {
                  fontSize: "17px",
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                  border: `${theme.palette.primary.contrastText} solid 2px`,
                  boxSizing: "border-box",
                },
                "& .Mui-selected": {
                  fontSize: "18px",
                  fontWeight: 600,
                  color: theme.palette.primary.contrastText,
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
            onClick={() => {
              if (!disabled) setIsPickerOpen(!isPickerOpen);
            }}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: "Кликнете за да изберете дата и час",
              readOnly: true,
            }}
            style={{
              backgroundColor: "white",
              width: "100%",
              caretColor: "transparent",
            }}
            label="Час за"
            autoComplete="off"
            error={isError}
          />
        )}
        onChange={(newDate) => {
          setDateValue(moment(newDate).set({ minutes: 0, seconds: 0 }));
        }}
        shouldDisableDate={(date) => showOnlyAvailableDates(calendarData, date)}
        shouldDisableTime={(timeValue, clockType) =>
          showOnlyAvailableHours(dateValue, calendarData, timeValue, clockType)
        }
        key={"appointments-calendar"}
        open={isPickerOpen}
        value={dateValue}
        onAccept={() => setIsPickerOpen(false)}
        onError={(error) => handleDatePickerError(error)}
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
