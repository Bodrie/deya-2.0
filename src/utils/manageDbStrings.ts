export const manageDbStrings = (hour: string) => {
  const splitedData = hour.split(" - ");
  const currentHour = Number(splitedData[0]);
  const currentUserEmail = splitedData[1];
  const currentDisplayName = splitedData[2];
  const currentPhoneNumber = splitedData[3];
  const currentApproval = splitedData[4];
  return {
    currentHour,
    currentUserEmail,
    currentDisplayName,
    currentPhoneNumber,
    currentApproval,
  };
};
