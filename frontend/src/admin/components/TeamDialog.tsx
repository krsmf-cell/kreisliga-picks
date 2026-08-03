import { useEffect, useState } from "react";
import type { Team, League } from "../../types/index";
import { API_URL } from "../../config/api";
import {
  Avatar,
  CircularProgress,
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
  createTeam,
  updateTeam,
} from "../../services/team.service";

import { getLeagues } from "../../services/league.service";
import { uploadLogo } from "../../services/upload.service";
interface Props {
    open: boolean;
    onClose: () => void;
    onSaved?: () => void;

    team: Team | null;
}

export default function TeamDialog({
  open,
  onClose,
  onSaved,
  team,
}: Props) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [active, setActive] = useState(true);
  const [logo, setLogo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    if (open) {
      loadLeagues();
    }
  }, [open]);

  useEffect(() => {
    if (!team) {
      setName("");
      setShortName("");
      setLeagueId("");
      setLogo("");
      setActive(true);
      return;
    }

    setName(team.name ?? "");
    setShortName(team.shortName ?? "");
    setLeagueId(String(team.league?.id ?? ""));
    setLogo(team.logo ?? "");
    setActive(team.active ?? true);

  }, [team]);

  async function loadLeagues() {
    const data = await getLeagues();
    setLeagues(data);
  }
async function handleLogoUpload(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const file = event.target.files?.[0];

  if (!file) return;

  setUploading(true);

  try {
    const result = await uploadLogo(file);

    setLogo(result.path);
  } finally {
    setUploading(false);
  }
}
  async function save() {

    if (!name || !shortName || !leagueId) {
      return;
    }

    const dto = {
      name,
      shortName,
      leagueId: Number(leagueId),
      active,
      logo,
    };

    if (team) {
      await updateTeam(team.id, dto);
    } else {
      await createTeam(dto);
    }

    onSaved?.();

    onClose();

    setName("");
    setShortName("");
    setLeagueId("");
    setLogo("");
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
        {team ? "Team bearbeiten" : "Neues Team"}
      </DialogTitle>

     <DialogContent>

  <Stack spacing={2} sx={{ mt: 2 }}>

    <TextField
      label="Teamname"
      value={name}
      onChange={(e) => setName(e.target.value)}
      fullWidth
    />

    <TextField
      label="Kürzel"
      value={shortName}
      onChange={(e) => setShortName(e.target.value)}
      fullWidth
    />

    {/* ---------- Logo ---------- */}

    <Stack
      spacing={2}
      alignItems="center"
    >
  <Avatar
  src={
    logo
      ? `${API_URL}${logo}`
      : undefined
  }
  sx={{
    width: 90,
    height: 90,
  }}
/>

      <Button
        component="label"
        variant="outlined"
      >
        Logo auswählen

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
        />
      </Button>

      {uploading && (
        <CircularProgress size={24} />
      )}
    </Stack>

    {/* ---------- Liga ---------- */}

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