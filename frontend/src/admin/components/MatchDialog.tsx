import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  createMatch,
  updateMatch,
} from "../../services/match.service";

import { getMatchdays } from "../../services/matchday.service";
import { getTeams } from "../../services/team.service";

import type {
  Match,
  Matchday,
  Team,
} from "../../types";

import type {
  CreateMatchDto,
  UpdateMatchDto,
} from "../../dto";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  match?: Match | null;
}

export default function MatchDialog({
  open,
  onClose,
  onSaved,
  match,
}: Props) {

  const [matchdays, setMatchdays] = useState<Matchday[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const [matchdayId, setMatchdayId] = useState("");
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");

  const [kickoff, setKickoff] = useState("");

  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);

  const [status, setStatus] = useState("scheduled");

  const [location, setLocation] = useState("");

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  useEffect(() => {

    if (!match) {
      setMatchdayId("");
      setHomeTeamId("");
      setAwayTeamId("");
      setKickoff("");
      setHomeGoals(0);
      setAwayGoals(0);
      setStatus("scheduled");
      setLocation("");
      return;
    }

    setMatchdayId(String(match.matchday.id));
    setHomeTeamId(String(match.homeTeam.id));
    setAwayTeamId(String(match.awayTeam.id));
    setKickoff(match.kickoff.substring(0,16));
    setHomeGoals(match.homeGoals);
    setAwayGoals(match.awayGoals);
    setStatus(match.status);
    setLocation(match.location ?? "");

  }, [match]);

  async function loadData() {
    const [matchdays, teams] = await Promise.all([
      getMatchdays(),
      getTeams(),
    ]);

    setMatchdays(matchdays);
    setTeams(teams);
  }

  async function save() {

    if (
      !matchdayId ||
      !homeTeamId ||
      !awayTeamId ||
      !kickoff
    ) {
      return;
    }

    if (homeTeamId === awayTeamId) {
      alert("Heim- und Gastteam dürfen nicht identisch sein.");
      return;
    }

    const dto: CreateMatchDto | UpdateMatchDto = {
      matchdayId: Number(matchdayId),
      homeTeamId: Number(homeTeamId),
      awayTeamId: Number(awayTeamId),
      kickoff,
      homeGoals,
      awayGoals,
      status,
      location,
    };

    if (match) {
      await updateMatch(match.id, dto);
    } else {
        console.log("FRONTEND DTO:", dto);
      await createMatch(dto);
    }

    onSaved?.();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>
        {match ? "Spiel bearbeiten" : "Neues Spiel"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>

          <FormControl fullWidth>

            <InputLabel>Spieltag</InputLabel>

            <Select
              value={matchdayId}
              label="Spieltag"
              onChange={(e) =>
                setMatchdayId(String(e.target.value))
              }
            >
              {matchdays.map((m) => (
                <MenuItem
                  key={m.id}
                  value={m.id}
                >
                  {m.number}. Spieltag
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <FormControl fullWidth>

            <InputLabel>Heimteam</InputLabel>

            <Select
              value={homeTeamId}
              label="Heimteam"
              onChange={(e) =>
                setHomeTeamId(String(e.target.value))
              }
            >
              {teams.map((team) => (
                <MenuItem
                  key={team.id}
                  value={team.id}
                >
                  {team.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <FormControl fullWidth>

            <InputLabel>Gastteam</InputLabel>

            <Select
              value={awayTeamId}
              label="Gastteam"
              onChange={(e) =>
                setAwayTeamId(String(e.target.value))
              }
            >
              {teams.map((team) => (
                <MenuItem
                  key={team.id}
                  value={team.id}
                >
                  {team.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <TextField
            label="Anstoß"
            type="datetime-local"
            value={kickoff}
            onChange={(e) =>
              setKickoff(e.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Heimtore"
            type="number"
            value={homeGoals}
            onChange={(e) =>
              setHomeGoals(Number(e.target.value))
            }
            fullWidth
          />

          <TextField
            label="Gasttore"
            type="number"
            value={awayGoals}
            onChange={(e) =>
              setAwayGoals(Number(e.target.value))
            }
            fullWidth
          />

          <FormControl fullWidth>

            <InputLabel>Status</InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                setStatus(String(e.target.value))
              }
            >
              <MenuItem value="scheduled">Geplant</MenuItem>
              <MenuItem value="live">Live</MenuItem>
              <MenuItem value="finished">Beendet</MenuItem>
              <MenuItem value="postponed">Verlegt</MenuItem>
              <MenuItem value="cancelled">Abgesagt</MenuItem>
            </Select>

          </FormControl>

          <TextField
            label="Spielort"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            fullWidth
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