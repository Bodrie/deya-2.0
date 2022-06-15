import React from "react";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { Grid, Typography } from "@mui/material";

const Admin = () => {
  const handleForm = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const hours = JSON.parse("[" + e.target.hours.value + "]");
    const regex =
      /^20[2-3][0-9]-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
    const isValidDate = regex.test(date);
    if (isValidDate) {
      setDoc(doc(db, "data", date), {
        date: date,
        hours: hours,
      });
    } else {
        alert("Wrong date / hour format")
    }
  };
  return (
    <Grid container>
      <Grid item container justifyContent="center" xs={12}>
        <form action="submit" onSubmit={handleForm}>
          <Grid item>
            <label htmlFor="date">
              <Typography fontSize={"24px"} color="white">
                дата
              </Typography>
            </label>
            <input type="text" name="date" required />
          </Grid>
          <Grid item mb={2}>
            <label htmlFor="hours">
              <Typography fontSize={"24px"} color="white">
                часове
              </Typography>
            </label>
            <input type="text" name="hours" required />
          </Grid>
          <button>
            <Typography variant="body2">добави дата и часове</Typography>
          </button>
        </form>
      </Grid>
      <Grid item container pt={2} justifyContent="start" direction="column">
        <Typography component={"p"} variant="h6">
          година-месец-дата
        </Typography>
        <Typography component={"p"} variant="h6">
          пример
        </Typography>
        <Typography component={"p"} variant="h5" color="white">
          2022-09-31
        </Typography>
        <Typography component={"p"} variant="h5" color="white">
          9, 11, 13, 15, 20
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Admin;
