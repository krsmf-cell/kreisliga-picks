import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";

import {
  createLeague,
  updateLeague,
} from "../../services/league.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  league?: any;
}

export default function LeagueDialog({
  open,
  onClose,
  onSaved,
  league,
}: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    if (!league) {
      setName("");
      setCode("");
      setIsPublic(true);
      return;
    }

    setName(league.name ?? "");
    setCode(league.code ?? "");
    setIsPublic(league.isPublic ?? true);
  }, [league]);

  async function save() {

    if (!name || !code) {
      return;
    }

    const dto = {
      name,
      code,
      isPublic,
    };

    if (league) {
      await updateLeague(league.id, dto);
    } else {
      await createLeague(dto);
    }

    onSaved?.();

    onClose();

    setName("");
    setCode("");
    setIsPublic(true);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {league ? "Liga bearbeiten" : "Neue Liga"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Kürzel"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
          />

          <FormControlLabel
            label="Öffentlich"
            control={
              <Switch
                checked={isPublic}
                onChange={(e) =>
                  setIsPublic(e.target.checked)
                }
              />
            }
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Abbrechen
        </Button>

        <Button
          variant="contained"
          onClick={save}
        >
          Speichern
        </Button>

      </DialogActions>
    </Dialog>
  );
}