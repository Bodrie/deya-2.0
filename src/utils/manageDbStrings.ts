export const manageDbStrings = (hour: string) => {
  const firstDashIdx = hour.indexOf(" - ");
  const lastDashIdx = hour.lastIndexOf(" - ");
  const currentUserEmail = hour.substring(firstDashIdx + 3, lastDashIdx);
  const currentApproval = hour.substring(lastDashIdx + 3, hour.length);
  return { currentUserEmail, currentApproval };
};
