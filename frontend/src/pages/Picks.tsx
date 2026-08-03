import { useEffect, useState } from "react";

import {
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import MainLayout from "../components/layout/MainLayout";
import PicksView from "../components/picks/PicksView";

import { getMatchdays } from "../services/matchday.service";

import type { Matchday } from "../types/matchday";

export default function Picks() {

  const [matchdays, setMatchdays] =
    useState<Matchday[]>([]);

  const [selectedMatchday, setSelectedMatchday] =
    useState<number>();

  useEffect(() => {
    load();
  }, []);

  async function load() {

    const data = await getMatchdays();

    setMatchdays(data);

    const active =
      data.find((m) => m.active);

    if (active) {

      setSelectedMatchday(active.id);

    } else if (data.length > 0) {

      setSelectedMatchday(data[0].id);

    }

  }

  return (

    <MainLayout>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        ⚽ Tipps
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{ mb: 4 }}
      >

        {matchdays.map((matchday) => (

          <Chip
            key={matchday.id}
            clickable
            label={`Spieltag ${matchday.number}`}
            color={
              selectedMatchday === matchday.id
                ? "success"
                : "default"
            }
            onClick={() =>
              setSelectedMatchday(matchday.id)
            }
          />

        ))}

      </Stack>

      {selectedMatchday && (

        <PicksView
          matchdayId={selectedMatchday}
        />

      )}

    </MainLayout>

  );

}