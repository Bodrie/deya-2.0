import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  useTheme,
  Divider,
  TextField,
  Slide,
  Box,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { DateTimePicker } from "../../components";
import {
  getCalendarData,
  appointmentCreate,
  updateProfilePhoneNumber,
  getUpdatedUser,
} from "../../firebase";
import moment, { Moment } from "moment";
import { User } from "firebase/auth";
import { ICalendar } from "../../types/types";
import { useRefreshDB } from "../../hooks";
import { PHONE_REGEX, sxMbSpacing } from "../../constants/constants";
import LoadingContext from "../../context/LoadingContext";

const Calendar = ({ email, emailVerified, displayName, phoneNumber }: User) => {
  useRefreshDB();
  const theme = useTheme();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [date, setDate] = useState<Moment | null>(null);
  const [isError, setIsError] = useState(false);
  const [appointmentSaved, setAppointmentSaved] = useState(false);
  const [saveMoreAppointment, setSaveMoreAppointment] = useState(false);
  const [calendarData, setCalendarData] = useState<ICalendar[]>([]);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [phonePromptConsent, setPhonePromptConsent] = useState(false);
  const [phonePromptValue, setPhonePromptValue] = useState("");
  const [phonePromptError, setPhonePromptError] = useState(false);

  useEffect(() => {
    getCalendarData()
      .then((response) => {
        setCalendarData(response);
      })
      .catch((err) => console.log(err.message));
  }, [saveMoreAppointment]);

  const handleAppointmentCreate = async () => {
    const appointmentDate = moment(date).format("yyyy-MM-DD");
    const appointmentHour = Number(moment(date).format("HH"));
    if (!phoneNumber && !showPhonePrompt && !phonePromptConsent) {
      setShowPhonePrompt(true);
    } else {
      setIsLoading(true);
      if (showPhonePrompt && phonePromptValue.length > 5) {
        const res = await updateProfilePhoneNumber(phonePromptValue);

        if (!res?.error) {
          const updatedPhoneFromDB = await getUpdatedUser();
          await appointmentCreate({
            appointmentDate: appointmentDate,
            appointmentHour: appointmentHour,
            userEmail: email,
            isApproved: "unapproved",
            phone: updatedPhoneFromDB,
            displayName: displayName,
          })
            .then(() => {
              setAppointmentSaved(true);
              setSaveMoreAppointment(false);
              setShowPhonePrompt(false);
            })
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
          return alert(res.errorMsg);
        }
      }
      if (phoneNumber) {
        await appointmentCreate({
          appointmentDate: appointmentDate,
          appointmentHour: appointmentHour,
          userEmail: email,
          isApproved: "unapproved",
          phone: phoneNumber,
          displayName: displayName,
        })
          .then(() => {
            setAppointmentSaved(true);
            setSaveMoreAppointment(false);
            setShowPhonePrompt(false);
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const handleAppointmentCreateNew = () => {
    setSaveMoreAppointment(true);
    setDate(null);
    setIsError(false);
    setAppointmentSaved(false);
    setCalendarData([]);
  };

  return (
    <Grid
      container
      item
      alignContent="flex-start"
      xs={10}
      sm={8}
      md={6}
      lg={4}
      margin="2rem auto"
      flex={{ xs: 1 }}
    >
      <div id="recaptcha-container"></div>
      <Grid item>
        <Typography
          component={"h3"}
          typography={"h5"}
          mb={sxMbSpacing}
          letterSpacing="0.1rem"
          fontWeight={600}
        >
          Заглавие / запазете час / тест
        </Typography>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Typography
          component={"p"}
          typography={"body1"}
          fontWeight={600}
          mb={sxMbSpacing}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
          delectus sed necessitatibus, facilis, suscipit unde impedit illum in
          sapiente ab, iste praesentium magnam? Debitis id totam quasi quis quam
          corrupti?
        </Typography>
        <Divider
          flexItem
          sx={{
            marginBottom: sxMbSpacing,
            backgroundColor: "black",
          }}
        />
      </Grid>
      {emailVerified ? (
        <Grid container item direction="column">
          <Grid container item mb={sxMbSpacing}>
            {appointmentSaved ? (
              <Grid
                item
                width="100%"
                minHeight={"56px"}
                sx={{
                  border: `${theme.palette.primary.main} solid 2px`,
                  borderRadius: "15px",
                }}
              >
                <Typography component={"p"} typography={"body1"}>
                  Имате запазен час за:
                </Typography>
                <Typography component={"p"} typography={"body1"}>
                  {moment(date)
                    .locale("bg")
                    .format("dddd - D.MM.yyyy - HH:mmч.")}
                </Typography>
              </Grid>
            ) : (
              <Grid item width="100%">
                <DateTimePicker
                  calendarData={calendarData}
                  dateValue={date}
                  setDateValue={setDate}
                  setIsError={setIsError}
                  isError={isError}
                  disabled={appointmentSaved}
                />
              </Grid>
            )}
          </Grid>
          {!appointmentSaved ? (
            <Grid item display="flex" flexDirection="column">
              <Box
                sx={{
                  maxHeight: showPhonePrompt ? 500 : 0,
                  transition: showPhonePrompt
                    ? "max-height 650ms ease-out"
                    : "max-height 700ms ease-out",
                  overflow: showPhonePrompt ? "unset" : "hidden",
                }}
              >
                <Slide
                  in={showPhonePrompt}
                  direction="left"
                  appear={false}
                  mountOnEnter
                  timeout={{ enter: 850, exit: 700 }}
                  easing={{
                    enter: theme.transitions.easing.easeIn,
                    exit: theme.transitions.easing.easeOut,
                  }}
                >
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"flex-start"}
                    mb={sxMbSpacing}
                  >
                    <TextField
                      label="Телефон"
                      value={phonePromptValue}
                      onInputCapture={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const number = event.target.value;
                        if (!PHONE_REGEX.test(number) || number.length < 10) {
                          setPhonePromptError(true);
                        } else {
                          setPhonePromptError(false);
                        }
                        setPhonePromptValue(number);
                        console.log(number, "Number from Calendar.tsx");
                      }}
                      error={phonePromptError}
                      helperText={
                        <span
                          style={{
                            display: phonePromptError ? "inherit" : "none",
                            position: "absolute",
                            top: 57,
                            left: 5,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            letterSpacing: "0.07rem",
                          }}
                        >
                          Невалидни данни!
                        </span>
                      }
                      sx={{ mb: sxMbSpacing }}
                    />
                    <Typography textAlign="left" mb={sxMbSpacing}>
                      Забелязахме, че не предоставяте мобилният си телефон, ако
                      го направите ще имате предимство за одобрение на час и
                      лесна комуникация с Еми.
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Checkbox
                        sx={{ padding: 0 }}
                        checked={phonePromptConsent}
                        onChange={() => {
                          setPhonePromptConsent(!phonePromptConsent);
                          setShowPhonePrompt(false);
                          setPhonePromptError(false);
                          setPhonePromptValue("");
                        }}
                      />
                      <Typography>Не желая!</Typography>
                    </Box>
                  </Box>
                </Slide>
              </Box>
              <Button
                disabled={
                  isError ||
                  !date ||
                  phonePromptError ||
                  (showPhonePrompt && !phonePromptValue.length)
                }
                variant="contained"
                onClick={handleAppointmentCreate}
              >
                <Typography typography={"body1"} color="white">
                  Запази час
                </Typography>
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button variant="contained" onClick={handleAppointmentCreateNew}>
                <Typography typography={"body1"}>Запази още часове</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Calendar;
