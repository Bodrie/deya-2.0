import React, { useContext } from "react";
import LoadingContext from "../../context/LoadingContext";
import { Box, Button, Modal, Paper, TextField } from "@mui/material";
import { sxMbSpacing } from "../../constants/constants";
import bgimg from "../../assets/images/patternpad.svg";
import { AccountCircle, Close } from "@mui/icons-material";
import { photoEnlarger } from "../../utils/photoEnlarger";
import { appointmentUpdate, updateUserProfile } from "../../firebase";
import { IUserAppointments } from "../../types/types";

interface UserSettingsModalProps {
  open: boolean;
  setModalState: (state: boolean) => void;
  displayName: string | null;
  photoURL: string | null;
  appointmetnsToUpdate: IUserAppointments[];
}

const UserSettingsModal = ({
  open,
  displayName,
  photoURL,
  setModalState,
  appointmetnsToUpdate,
}: UserSettingsModalProps) => {
  const { setIsLoading } = useContext(LoadingContext);

  const updateUserProfileHandler = async (e: any) => {
    setIsLoading(true);
    setModalState(false);
    e.preventDefault();
    const photo: File | string = e.target[0].files[0]
      ? e.target[0].files[0]
      : photoURL;
    const name: string = e.target[1].value;

    if (typeof photo !== "string" && photo.size > 2100000) {
      alert("Файла е прекалено голям. Max 2MB");
      setIsLoading(false);
    }
    updateUserProfile(name, photo)
      .then(() => {
        appointmetnsToUpdate.map((appointment: IUserAppointments) => {
          console.log(typeof appointment);
          
          return appointmentUpdate({
            appointmentDate: appointment.date,
            appointmentHour: appointment.hours,
            isApproved: appointment.isApproved,
            userEmail: appointment.email as string,
            newDisplayName: name,
            oldDisplayName: appointment.displayName
          });
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal open={open} sx={styles.modal}>
      <Paper elevation={5} sx={styles.paper}>
        <Close
          color="error"
          fontSize="medium"
          onClick={() => setModalState(false)}
          sx={styles.closeIcon}
        />
        <form onSubmit={updateUserProfileHandler}>
          <Box sx={styles.boxContainer}>
            {photoURL ? (
              <img
                alt="user"
                src={photoEnlarger(photoURL)}
                width={150}
                height={150}
                style={styles.img}
              />
            ) : (
              <AccountCircle
                color="disabled"
                width={150}
                height={150}
                sx={styles.accIcon}
              />
            )}

            <input type="file" name="newImage" />

            <TextField
              id="displayName"
              variant="outlined"
              label="Име"
              type="text"
              autoComplete="current-name"
              defaultValue={displayName}
              sx={styles.textField}
            />
            <Button type="submit" variant="contained" disabled={false}>
              Запази
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
};

const styles = {
  modal: {
    maxWidth: { xs: "350px", md: "500px" },
    margin: "6rem auto",
  },

  paper: {
    position: "absolute",
    border: "2px solid #873F91",
    borderRadius: "15px",
    padding: "3rem 1rem",
    backgroundImage: `url(${bgimg})`,
    marginBottom: sxMbSpacing,
    width: "fill-available",
  },

  closeIcon: {
    position: "absolute",
    top: "10px",
    left: { xs: "312px", md: "460px" },
    "&:hover": { transform: "scale(1.2)" },
    transition: "all 200ms",
    cursor: "pointer",
  },

  accIcon: { width: 150, height: 150 },

  boxContainer: { display: "flex", flexDirection: "column", gap: "2rem" },

  img: { "object-fit": "cover", borderRadius: "15px" },

  textField: { position: "relative" },
};

export default UserSettingsModal;
