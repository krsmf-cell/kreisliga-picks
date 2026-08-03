import { useEffect, useState } from "react";

import {
  Alert,
  Paper,
  Typography,
} from "@mui/material";

import MainLayout from "../components/layout/MainLayout";
import PicksView from "../components/picks/PicksView";

import { getCurrentMatchday } from "../services/matchday.service";

import type { Matchday } from "../types/matchday";

export default function Dashboard() {

  const [matchday, setMatchday] =
    useState<Matchday | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const current =
      await getCurrentMatchday();

    setMatchday(current);

    setLoading(false);

  }

  if (loading) {

    return (
      <MainLayout>

        <Typography>
          Lade...
        </Typography>

      </MainLayout>
    );

  }

  if (!matchday) {

    return (
      <MainLayout>

        <Alert severity="info">

          Kein offener Spieltag vorhanden.

        </Alert>

      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          ⚽ Spieltag {matchday.number}
        </Typography>

        <Typography color="text.secondary">

          Tippfrist bis{" "}

          {new Date(
            matchday.deadline,
          ).toLocaleString("de-DE")}

        </Typography>

      </Paper>

      <PicksView
        matchdayId={matchday.id}
      />

    </MainLayout>

  );

}