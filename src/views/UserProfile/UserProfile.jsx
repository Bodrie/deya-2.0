import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAppointmentData } from "../../firebase";
import moment from "moment";

const UserProfile = ({ user }) => {
  const [data, setData] = useState();
  useEffect(() => {
    getAppointmentData()
      .then((res) => setData(...res))
      .catch((err) => console.log(err.message));
  }, []);
  console.log(data);
  return (
    <>
      {user && data ? (
        <Grid container item justifyContent="center">
          <Grid item xs={10}>
            <Typography component={"p"} variant={"h4"}>
              Вашият профил
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{user.displayName}</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={5}>
            <img alt="asd" src={user.photoURL} />
          </Grid>
          {data.appointments?.map((el, i) => {
            return (
              <Box
                key={`${el.savedDate}-${el.savedHour}`}
                sx={{ border: "solid 2px red", m: 2 }}
              >
                <Typography>Час за нещо {i}</Typography>
                <Typography>
                  Дата: {moment(el.savedDate).format("D.M.yyyy")}
                </Typography>
                <Typography>Час: {el.savedHour}:00</Typography>
              </Box>
            );
          })}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
export default UserProfile;
