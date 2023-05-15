import moment, { Moment } from "moment";
import { ICalendar } from "../../types/types";

export const showOnlyAvailableDates = (
  calendarData: ICalendar[],
  date: Moment
) => {
  const blackoutDates = calendarData.map((date) => {
    const isDateAvailable = date.hours.find((hour) => hour.includes("free"));
    if (isDateAvailable) return date.date;
    return null;
  });
  return !blackoutDates.includes(moment(date).format().split("T")[0]);
};

export const showOnlyAvailableHours = (
  dateValue: Moment | null,
  calendarData: ICalendar[],
  timeValue: number,
  clockType: string
) => {
  const selectedDate = moment(dateValue).format("yyyy-MM-DD");

  const blackoutHours = calendarData.flatMap((date) =>
    date.date === selectedDate
      ? date.hours
          .filter((currHour) => currHour.includes("free"))
          .map((currHour) => Number(currHour.slice(0, 2)))
      : []
  );

  if (clockType === "hours") {
    return !blackoutHours.includes(timeValue);
  } else {
    return false;
  }
};
