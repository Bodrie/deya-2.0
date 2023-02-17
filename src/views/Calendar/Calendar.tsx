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
} from "@mui/material";
import { DateTimePicker } from "../../components";
import {
  getCalendarData,
  appointmentCreate,
  updateProfilePhoneNumber,
  getUpdatedUser,
} from "../../firebase";
import moment from "moment";
import { User } from "firebase/auth";
import { ICalendarPageState, IPhoneState } from "../../types/types";
import { useRefreshDB } from "../../hooks";
import { PHONE_REGEX, sxMbSpacing } from "../../constants/constants";
import LoadingContext from "../../context/LoadingContext";

const initialPageState: ICalendarPageState = {
  selectedDate: null,
  calendarData: [],
  savedDate: false,
  saveNewDate: false,
};

const initialPhoneState: IPhoneState = {
  prompt: false,
  consent: false,
  value: "",
  error: false,
};

const Calendar = ({ email, emailVerified, displayName, phoneNumber }: User) => {
  useRefreshDB();
  const theme = useTheme();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isError, setIsError] = useState(false);
  const [pageState, setPageState] = useState(initialPageState);
  const [phoneState, setPhoneState] = useState(initialPhoneState);

  const checkForDisplaingPhonePrompt =
    !phoneNumber && !phoneState.prompt && !phoneState.consent;

  useEffect(() => {
    getCalendarData()
      .then((response) => {
        setPageState({ ...pageState, calendarData: response });
      })
      .catch((err) => console.log(err.message));
  }, [pageState.saveNewDate]);

  const handleAppointmentCreate = async () => {
    const appointmentDate = moment(pageState.selectedDate).format("yyyy-MM-DD");
    const appointmentHour = Number(moment(pageState.selectedDate).format("HH"));
    if (checkForDisplaingPhonePrompt) {
      setPhoneState({ ...phoneState, prompt: true });
    } else {
      setIsLoading(true);
      if (phoneState.prompt && phoneState.value.length > 5) {
        const res = await updateProfilePhoneNumber(phoneState.value);

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
              setPageState({
                ...pageState,
                savedDate: true,
                saveNewDate: false,
              });
              setPhoneState({ ...phoneState, prompt: false });
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
            setPageState({
              ...pageState,
              savedDate: true,
              saveNewDate: false,
            });
            setPhoneState({ ...phoneState, prompt: false });
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const handleAppointmentCreateNew = () => {
    setPageState({ ...initialPageState, saveNewDate: true });
    setIsError(false);
  };

  const handlePhoneCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberPhone = event.target.value;
    if (!PHONE_REGEX.test(numberPhone) || numberPhone.length < 10) {
      setPhoneState({ ...phoneState, error: true });
    } else {
      setPhoneState({ ...phoneState, error: false });
    }
    setPhoneState({ ...phoneState, value: numberPhone });
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
          Портал за запазване на час (РАЗРАБОТКА)
        </Typography>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Typography
          component={"p"}
          typography={"body1"}
          fontWeight={600}
          mb={sxMbSpacing}
        >
          Само с няколко бързи стъпки можете да запазите час за желаната от вас
          процедура
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
            {pageState.savedDate ? (
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
                  {moment(pageState.selectedDate)
                    .locale("bg")
                    .format("dddd - D.MM.yyyy - HH:mmч.")}
                </Typography>
              </Grid>
            ) : (
              <Grid item width="100%">
                <DateTimePicker
                  pageState={pageState}
                  calendarData={pageState.calendarData}
                  dateValue={pageState.selectedDate}
                  setDateValue={setPageState}
                  setIsError={setIsError}
                  isError={isError}
                  disabled={pageState.saveNewDate}
                />
              </Grid>
            )}
          </Grid>
          {!pageState.saveNewDate ? (
            <Grid item display="flex" flexDirection="column">
              <Box
                sx={{
                  maxHeight: phoneState.prompt ? 500 : 0,
                  transition: phoneState.prompt
                    ? "max-height 650ms ease-out"
                    : "max-height 700ms ease-out",
                  overflow: phoneState.prompt ? "unset" : "hidden",
                }}
              >
                <Slide
                  in={phoneState.prompt}
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
                      placeholder="+359 12 345 678"
                      label="Телефон"
                      value={phoneState.value}
                      onInputCapture={handlePhoneCheck}
                      error={phoneState.error}
                      helperText={
                        <span
                          style={{
                            display: phoneState.error ? "inherit" : "none",
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
                        checked={phoneState.consent}
                        onChange={() => {
                          setPhoneState({
                            ...initialPhoneState,
                            prompt: !phoneState.prompt,
                          });
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
                  !pageState.selectedDate ||
                  phoneState.error ||
                  (phoneState.prompt && !phoneState.value.length)
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
