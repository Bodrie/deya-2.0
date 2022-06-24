import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { getAppointmentData } from "../../firebase";
import moment from "moment";
import { photoEnlarger } from "../../utils/photoEnlarger";

const UserProfile = ({ user }) => {
  const theme = useTheme();
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
        <Grid container item justifyContent="center">
          <Grid item xs={10} mb={2}>
            <Typography component={"p"} variant={"h4"}>
              Вашият профил
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={10}
            justifyContent="space-evenly"
            flexWrap="wrap"
            mb={2}
          >
            <Grid item p={2}>
              <img
                alt="asd"
                src={photoEnlarger(user.photoURL)}
                width={150}
                height={150}
                style={{ borderRadius: "15px" }}
              />
            </Grid>
            <Grid item alignSelf="center" p={2}>
              <Typography>{user.displayName}</Typography>
              <Typography>{user.email}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} mb={2}>
            <Typography component={"p"} variant={"h4"}>
              Записани часове
            </Typography>
          </Grid>
          {data.appointments?.map((el, i) => {
            return (
              <Grid
                container
                item
                xs={10}
                justifyContent="space-evenly"
                key={`${el.savedDate}-${el.savedHour}`}
                sx={{
                  border: `solid 2px ${theme.palette.primary.main}`,
                  borderRadius: "15px",
                }}
                mb={2}
              >
                <Grid item p={2} textAlign="start">
                  <Typography>Час за нещо {i}</Typography>
                  <Typography>
                    Дата: {moment(el.savedDate).format("D.M.yyyy")}
                  </Typography>
                  <Typography>Час: {el.savedHour}:00</Typography>
                </Grid>
                <Grid item p={2}>
                  <Button variant="contained">
                    Откажи час
                    <Clear color="error" sx={{ml: 1}} />
                  </Button>
                </Grid>
              </Grid>
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
