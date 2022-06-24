import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAppointmentData } from "../../firebase";
import moment from "moment";
import { photoEnlarger } from "../../utils/photoEnlarger";

const UserProfile = ({ user }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAppointmentData()
      .then((res) => {
        const filtred = res.filter((el) => {
          return el?.email === user?.email;
        });
        setData(...filtred);
      })
      .catch((err) => console.log(err.message));
  }, [user]);

  if (!data) {
    setData([]);
  }

  return (
    <>
      {user && data ? (
        <Grid container item justifyContent="center" direction="column">
          <Grid item xs={10} mb={2}>
            <Typography component={"p"} variant={"h4"}>
              Вашият профил
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} mb={2}>
            <img
              alt="asd"
              src={photoEnlarger(user.photoURL)}
              width={150}
              height={150}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>{user.displayName}</Typography>
            <Typography>{user.email}</Typography>
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
