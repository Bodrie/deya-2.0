export const photoEnlarger = (photoUrl) => {
  if (photoUrl.includes("=s")) {
    return photoUrl.replace("=s", "=s5");
  } else {
    return photoUrl.concat("?type=large");
  }
};
