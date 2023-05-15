export const manageDbStrings = (hour: string) => {
  const [
    currentHour,
    currentUserEmail,
    currentApproval,
    currentDisplayName = "Няма",
    currentPhoneNumber = "Няма",
  ] = hour.split(" - ");

  return {
    currentHour: Number(currentHour),
    currentUserEmail,
    currentDisplayName,
    currentPhoneNumber,
    currentApproval,
  };
};
