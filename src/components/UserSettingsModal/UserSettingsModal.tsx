import React, { useContext } from "react";
import LoadingContext from "../../context/LoadingContext";
import { Box, Button, Modal, Paper, TextField, useTheme } from "@mui/material";
import { sxMbSpacing } from "../../constants/constants";
import bgimg from "../../assets/images/patternpad.svg";
import { AccountCircle, Close } from "@mui/icons-material";
import { photoEnlarger } from "../../utils/photoEnlarger";
import { updateUserProfile } from "../../firebase";

interface UserSettingsModalProps {
  open: boolean;
  setModalState: (state: boolean) => void;
  displayName: string | null;
  photoURL: string | null;
}

const UserSettingsModal = ({
  open,
  displayName,
  photoURL,
  setModalState,
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
      .then(() => setIsLoading(false))
      .finally();
  };

  return (
    <Modal
      open={open}
      sx={{ maxWidth: { xs: "350px", md: "500px" }, margin: "6rem auto" }}
    >
      <Paper
        elevation={5}
        sx={{
          position: "absolute",
          border: "2px solid #873F91",
          borderRadius: "15px",
          padding: "3rem 1rem",
          backgroundImage: `url(${bgimg})`,
          marginBottom: sxMbSpacing,
          width: "fill-available",
        }}
      >
        <Close
          color="error"
          fontSize="medium"
          onClick={() => setModalState(false)}
          sx={{
            position: "absolute",
            top: "10px",
            left: { xs: "312px", md: "460px" },
            "&:hover": { transform: "scale(1.2)" },
            transition: "all 200ms",
            cursor: "pointer",
          }}
        />
        <form onSubmit={updateUserProfileHandler}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {photoURL ? (
              <img
                alt="user"
                src={photoEnlarger(photoURL)}
                width={150}
                height={150}
                style={{ objectFit: "cover", borderRadius: "15px" }}
              />
            ) : (
              <AccountCircle
                color="disabled"
                width={150}
                height={150}
                sx={{ width: 150, height: 150 }}
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
              sx={{ position: "relative" }}
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

export default UserSettingsModal;
