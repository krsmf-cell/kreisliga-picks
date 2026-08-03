import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { updateResult } from "../../../services/result.service";

interface Props {
  match: any;
}

export default function ResultRow({
  match,
}: Props) {

  const [homeGoals, setHomeGoals] =
    useState(match.homeGoals);

  const [awayGoals, setAwayGoals] =
    useState(match.awayGoals);

  const [saving, setSaving] =
    useState(false);

  async function save() {

    setSaving(true);

    await updateResult(
      match.id,
      homeGoals,
      awayGoals,
    );

    setSaving(false);

  }

  return (

    <Paper
      sx={{
        p: 2,
        mb: 2,
        display: "grid",
        gridTemplateColumns:
          "1fr 70px 20px 70px 1fr 120px",
        alignItems: "center",
        gap: 2,
      }}
    >

      <Typography
        fontWeight={700}
        align="right"
      >
        {match.homeTeam.name}
      </Typography>

      <TextField
        size="small"
        type="number"
        value={homeGoals}
        onChange={(e)=>
          setHomeGoals(
            Number(e.target.value),
          )
        }
      />

      <Typography
        align="center"
      >
        :
      </Typography>

      <TextField
        size="small"
        type="number"
        value={awayGoals}
        onChange={(e)=>
          setAwayGoals(
            Number(e.target.value),
          )
        }
      />

      <Typography
        fontWeight={700}
      >
        {match.awayTeam.name}
      </Typography>

      <Button
        variant="contained"
        onClick={save}
        disabled={saving}
      >
        💾 Speichern
      </Button>

    </Paper>

  );

}