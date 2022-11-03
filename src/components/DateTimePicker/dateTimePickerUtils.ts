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
  const blackoutHours = calendarData
    .map((date) => {
      if (date.date === selectedDate) {
        const freeHours = date.hours.map((currHour) => {
          if (currHour.includes("free")) {
            return Number(currHour.slice(0, 2));
          }
          return null;
        });
        return freeHours;
      }
      return null;
    })
    .flat()
    .filter(Boolean);
  if (clockType === "hours") {
    return !Object.values(blackoutHours).includes(timeValue);
  } else {
    return false;
  }
};
