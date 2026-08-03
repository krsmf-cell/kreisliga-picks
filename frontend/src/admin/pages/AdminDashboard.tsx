import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { resetSeason } from "../../services/admin.service";

export default function AdminDashboard() {

  async function handleReset() {

    const ok = window.confirm(
      "Soll wirklich die komplette Saison zurückgesetzt werden?"
    );

    if (!ok) {
      return;
    }

    await resetSeason();

    alert("✅ Saison wurde zurückgesetzt.");

  }

  return (

    <Box p={4}>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Admin Dashboard
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 500,
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Entwickler
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          Werkzeuge zum Testen der Saison.
        </Typography>

        <Button
          color="error"
          variant="contained"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          Saison komplett zurücksetzen
        </Button>

      </Paper>

    </Box>

  );

}