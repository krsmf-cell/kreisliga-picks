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
  createSeason,
  updateSeason,
} from "../../services/season.service";

import { getLeagues } from "../../services/league.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  season?: any;
}

export default function SeasonDialog({
  open,
  onClose,
  onSaved,
  season,
}: Props) {

  const [name, setName] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [active, setActive] = useState(true);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [leagues, setLeagues] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      loadLeagues();
    }
  }, [open]);

  useEffect(() => {
    if (!season) {
      setName("");
      setLeagueId("");
      setActive(true);
      setStartDate("");
      setEndDate("");
      return;
    }

    setName(season.name ?? "");
    setLeagueId(String(season.league?.id ?? ""));
    setStartDate(season.startDate?.substring(0, 10) ?? "");
    setEndDate(season.endDate?.substring(0, 10) ?? "");
    setActive(season.active ?? true);

  }, [season]);

  async function loadLeagues() {
    const data = await getLeagues();
    setLeagues(data);
  }

  async function save() {

    if (!name || !leagueId || !startDate || !endDate) {
  return;
}

    const dto = {
  name,
  leagueId: Number(leagueId),
  startDate,
  endDate,
  active,
};

    if (season) {
      await updateSeason(season.id, dto);
    } else {
      await createSeason(dto);
    }

    onSaved?.();
    onClose();

    setName("");
    setLeagueId("");
    setActive(true);
    setStartDate("");
    setEndDate("");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {season ? "Saison bearbeiten" : "Neue Saison"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>

          <TextField
            label="Bezeichnung"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            fullWidth
          />

          <FormControl fullWidth>

            <InputLabel>Liga</InputLabel>

            <Select
              value={leagueId}
              label="Liga"
              onChange={(e) =>
                setLeagueId(String(e.target.value))
              }
            >
              {leagues.map((league) => (
                <MenuItem
                  key={league.id}
                  value={league.id}
                >
                  {league.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
<TextField
  label="Startdatum"
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  slotProps={{
  inputLabel: {
    shrink: true,
  },
}}
  fullWidth
/>

<TextField
  label="Enddatum"
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
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