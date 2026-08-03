import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";

import {
  createMatchday,
  updateMatchday,
} from "../../services/matchday.service";

import { getSeasons } from "../../services/season.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  matchday?: any;
}

export default function MatchdayDialog({
  open,
  onClose,
  onSaved,
  matchday,
}: Props) {

  const [number, setNumber] = useState(1);
  const [seasonId, setSeasonId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [active, setActive] = useState(true);

  const [seasons, setSeasons] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      loadSeasons();
    }
  }, [open]);

  useEffect(() => {

    if (!matchday) {
      setNumber(1);
      setSeasonId("");
      setDeadline("");
      setActive(true);
      return;
    }

    setNumber(matchday.number ?? 1);
    setSeasonId(String(matchday.season?.id ?? ""));
    setDeadline(
      matchday.deadline
        ? matchday.deadline.substring(0, 16)
        : ""
    );
    setActive(matchday.active ?? true);

  }, [matchday]);

  async function loadSeasons() {
    const data = await getSeasons();
    setSeasons(data);
  }

  async function save() {

    if (!seasonId || !deadline) {
      return;
    }

    const dto = {
      number,
      seasonId: Number(seasonId),
      deadline,
      active,
    };

    if (matchday) {
      await updateMatchday(matchday.id, dto);
    } else {
      await createMatchday(dto);
    }

    onSaved?.();
    onClose();

    setNumber(1);
    setSeasonId("");
    setDeadline("");
    setActive(true);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {matchday
          ? "Spieltag bearbeiten"
          : "Neuer Spieltag"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>

          <TextField
            label="Spieltag"
            type="number"
            value={number}
            onChange={(e) =>
              setNumber(Number(e.target.value))
            }
            fullWidth
          />

          <FormControl fullWidth>

            <InputLabel>Saison</InputLabel>

            <Select
              value={seasonId}
              label="Saison"
              onChange={(e) =>
                setSeasonId(String(e.target.value))
              }
            >
              {seasons.map((season) => (
                <MenuItem
                  key={season.id}
                  value={season.id}
                >
                  {season.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <TextField
            label="Deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
          />

          <FormControlLabel
            label="Aktiv"
            control={
              <Switch
                checked={active}
                onChange={(e) =>
                  setActive(e.target.checked)
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