export const manageDbStrings = (hour: string) => {
  const splitedData = hour.split(" - ");
  const currentHour = Number(splitedData[0]);
  const currentUserEmail = splitedData[1];
  const currentApproval = splitedData[2];
  const currentDisplayName =
    splitedData[3] !== "null" ? splitedData[3] : "Няма";
  const currentPhoneNumber =
    splitedData[4] !== "null" ? splitedData[4] : "Няма";
  return {
    currentHour,
    currentUserEmail,
    currentDisplayName,
    currentPhoneNumber,
    currentApproval,
  };
};
