import React from "react";
import { Typography, Grid, Divider, useTheme } from "@mui/material";
import { sxMbSpacing } from "../../constants/constants";
import { LinkStyled } from "../../components";

const Verification = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="flex-start"
      margin={"2rem 0"}
      flex={{ xs: 1 }}
    >
      <Grid item xs={10} sm={8} md={7} lg={5}>
        <Typography
          variant="h4"
          fontWeight={600}
          letterSpacing="0.1rem"
          mb={sxMbSpacing}
        >
          Потвърждение на имейл
        </Typography>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Typography fontWeight={600} letterSpacing="0.1rem" mb={sxMbSpacing}>
          Изпратихме верификационно писмо на посоченоия от вас имейл, моля
          потвърдете имейла си!
        </Typography>
        <Typography fontWeight={600} letterSpacing="0.1rem" mb={sxMbSpacing}>
          В случай, че не сте получили имейл, до няколко минути, проверете
          вашата "СПАМ" (SPAM) папка.
        </Typography>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Typography fontWeight={600} letterSpacing="0.1rem" mb={sxMbSpacing}>
          Ако вече сте потвърдили имейла си, можете се впишете от менюто 'Вход'
          или да кликнете
          <LinkStyled
            to={"/login"}
            sx={{
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
              textShadow: `1px 1px 1px ${theme.palette.primary.main}`,
            }}
          >
            ТУК
          </LinkStyled>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Verification;
