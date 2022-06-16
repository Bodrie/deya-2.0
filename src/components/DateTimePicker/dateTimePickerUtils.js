import moment from "moment";

export const showOnlyAvailableDates = (calendarData, date) => {
  const blackoutDates = calendarData.map((el) => {
    if (el.hours.length <= 0) return null;
    return el.date;
  });
  return !blackoutDates.includes(moment(date).format().split("T")[0]);
};

export const showOnlyAvailableHours = (
  dateValue,
  calendarData,
  timeValue,
  clockType
) => {
  const selectedDate = moment(dateValue).format("yyyy-MM-DD");
  const blackoutHours = calendarData
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
