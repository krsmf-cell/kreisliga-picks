import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { importSchedule } from "../../services/import.service";

export default function ImportSchedule() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function handleImport() {

    try {

      setLoading(true);

      await importSchedule(url);

      setSuccess(true);

    } catch (err) {

      console.error(err);

      alert("Import fehlgeschlagen");

    } finally {

      setLoading(false);

    }

  }

  return (

    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 900,
      }}
    >

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Spielplan importieren
      </Typography>

      <Typography
        color="text.secondary"
        mb={3}
      >
        Füge einfach den Spielplan-Link von
        FUSSBALL.DE ein.
      </Typography>

      <TextField
        fullWidth
        label="FUSSBALL.DE-Link"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
      />

      <Box mt={3}>

        <Button
          variant="contained"
          size="large"
          startIcon={<CloudDownloadIcon />}
          onClick={handleImport}
          disabled={loading}
        >
          {loading
            ? "Importiere..."
            : "Importieren"}
        </Button>

      </Box>

      {success && (

        <Alert
          severity="success"
          sx={{ mt: 3 }}
        >

          Spielplan erfolgreich geladen.

        </Alert>

      )}

    </Paper>

  );

}