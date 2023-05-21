import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import bgLocale from "date-fns/locale/bg";
import moment from "moment";
import {
  showOnlyAvailableDates,
  showOnlyAvailableHours,
} from "./dateTimePickerUtils";
import { IDateTimePicker } from "../../types/types";
import { DateTimeValidationError } from "@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation";

const DateTimePicker = ({
  pageState,
  calendarData,
  dateValue,
  setDateValue,
  setIsError,
  isError,
  disabled,
}: IDateTimePicker) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleDatePickerError = (error: DateTimeValidationError) => {
    if (error && error !== "shouldDisableTime-hours") return setIsError(true);
    return setIsError(false);
  };
  // console.log(calendarData);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={bgLocale}>
      <DesktopDateTimePicker
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
            style={styles.textField}
            label="Час за"
            autoComplete="off"
            error={isError}
          />
        )}
        onChange={(newDate) => {
          setDateValue({
            ...pageState,
            selectedDate: moment(newDate).set({ minutes: 0, seconds: 0 }),
          });
        }}
        shouldDisableDate={(date) => showOnlyAvailableDates(calendarData, date)}
        shouldDisableTime={(timeValue, clockType) =>
          showOnlyAvailableHours(dateValue, calendarData, timeValue, clockType)
        }
        key={"appointments-calendar"}
        open={isPickerOpen}
        value={dateValue}
        onAccept={() => setIsPickerOpen(false)}
        onError={handleDatePickerError}
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

const styles = {
  textField: {
    backgroundColor: "white",
    width: "100%",
    caretColor: "transparent",
  },
};

export default DateTimePicker;
