import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";

function ErrorBoundaryFallback({ error, resetErrorBoundary }: any) {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      margin={"2rem 0"}
      flex={{ xs: 1 }}
    >
      <Grid item xs={10} sm={8} md={7} lg={5}>
        <SentimentDissatisfied sx={{ width: 150, height: 150 }} color='action' />
        <Box role="alert">
          <Typography variant="h4">Нещо се обърка, уведомени сме за това...</Typography>
          <pre>{error.message}</pre>
          <Button size="large" onClick={resetErrorBoundary}>Обратно</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ErrorBoundaryFallback;
