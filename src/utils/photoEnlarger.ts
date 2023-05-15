export const photoEnlarger = (photoUrl: string) => {
  if (photoUrl.includes("=s")) return photoUrl.replace("=s", "=s5");

  return photoUrl.concat("?type=large");
};
