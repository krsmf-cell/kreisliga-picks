import { useEffect, useRef, useState } from "react";

import {
  Alert,
  Box,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";

import MatchCard from "../matches/MatchCard";
import { getCommunityPrediction } from "../../services/prediction.service";
import { getMatchesByMatchday } from "../../services/match.service";
import { getPrediction } from "../../services/predictionEngine.service";
import {
  getMyPredictions,
  savePredictions,
} from "../../services/prediction.service";

import type { Match } from "../../types/match";
import type {
  Prediction,
  PredictionResult,
} from "../../types/prediction";
import type { MatchPrediction } from "../../types/predictionEngine";

interface Props {
  matchdayId: number;
}

interface PredictionEngineMap {
  [matchId: number]: MatchPrediction;
}

interface PredictionsMap {
  [matchId: number]: PredictionResult;
}

export default function PicksView({
  matchdayId,
}: Props) {

  const [loading, setLoading] =
    useState<boolean>(true);

  const [matches, setMatches] =
    useState<Match[]>([]);

  const [predictions, setPredictions] =
    useState<PredictionsMap>({});

  const [predictionEngine, setPredictionEngine] =
    useState<PredictionEngineMap>({});

const [community, setCommunity] =
  useState<PredictionEngineMap>({});

    const [saving, setSaving] =
  useState(false);

    const [saved, setSaved] =
  useState(false);

const saveTimeout = useRef<number | null>(null);

  useEffect(() => {

    load();

  }, [matchdayId]);
useEffect(() => {

    return () => {

        if (saveTimeout.current !== null) {
  clearTimeout(saveTimeout.current);
}

    };

}, []);
  async function load(): Promise<void> {

    setLoading(true);

    const [matches, tips]: [Match[], Prediction[]] =
      await Promise.all([

        getMatchesByMatchday(matchdayId),

        getMyPredictions(matchdayId),

      ]);

    setMatches(matches);

    const predictionMap: PredictionEngineMap = {};
const communityMap: PredictionEngineMap = {};

await Promise.all(

  matches.map(async (match) => {

    const [engine, communityPrediction] =
      await Promise.all([

        getPrediction(match.id),

        getCommunityPrediction(match.id),

      ]);

    predictionMap[match.id] = engine;

    communityMap[match.id] = communityPrediction;

  }),

);

setPredictionEngine(predictionMap);
setCommunity(communityMap);

    const map:
      PredictionsMap = {};

    tips.forEach(
      (tip: Prediction) => {

        map[tip.match.id] =
          tip.choice;

      },
    );

    setPredictions(map);

    setLoading(false);

  }

  async function handlePrediction(
  matchId: number,
  prediction: PredictionResult,
) {

  const next = {

    ...predictions,

    [matchId]: prediction,

  };

  setPredictions(next);

  if (saveTimeout.current !== null) {
  clearTimeout(saveTimeout.current);
}

  saveTimeout.current =
    window.setTimeout(async () => {

      try {
        setSaved(false);
        setSaving(true);

        await savePredictions(
  Object.entries(next).map(([id, choice]) => ({
    matchId: Number(id),
    choice,
  })),
);

// Community neu laden
const communityMap = { ...community };

await Promise.all(
  matches.map(async (match) => {
    communityMap[match.id] =
      await getCommunityPrediction(match.id);
  }),
);

setCommunity(communityMap);

setSaving(false);

setSaved(true);

      } catch (err) {

        console.error(err);

        setSaving(false);

      }

    }, 300);

}

  if (loading) {

    return (
      <LinearProgress />
    );

  }

  return (

    <>

      {matches.map((match) => (

        <MatchCard

          key={match.id}

          matchId={match.id}

          homeTeam={
            match.homeTeam.name
          }

          awayTeam={
            match.awayTeam.name
          }

          homeLogo={
            match.homeTeam.logo
          }

          awayLogo={
            match.awayTeam.logo
          }

          date={new Date(
            match.kickoff,
          ).toLocaleString("de-DE", {

            weekday: "long",

            hour: "2-digit",

            minute: "2-digit",

          })}

          prediction={
            predictions[match.id]
          }

          homeChance={
            predictionEngine[match.id]
              ?.homeChance
          }

          drawChance={
            predictionEngine[match.id]
              ?.drawChance
          }

          awayChance={
            predictionEngine[match.id]
              ?.awayChance
          }

          homeOdds={
            predictionEngine[match.id]
              ?.homeOdds
          }

          drawOdds={
            predictionEngine[match.id]
              ?.drawOdds
          }

          awayOdds={
            predictionEngine[match.id]
              ?.awayOdds
          }
            homePoints={
  predictionEngine[match.id]?.homePoints
}

drawPoints={
  predictionEngine[match.id]?.drawPoints
}

awayPoints={
  predictionEngine[match.id]?.awayPoints
}
          communityHome={
    community[match.id]?.homeChance
}

communityDraw={
    community[match.id]?.drawChance
}

communityAway={
    community[match.id]?.awayChance
}

          homeLastFive={
            predictionEngine[match.id]
              ?.homeLastFive
          }

          awayLastFive={
            predictionEngine[match.id]
              ?.awayLastFive
          }

          onPrediction={
            handlePrediction
          }

        />

      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >

      </Box>

      <Snackbar
    open={saved}
    autoHideDuration={1500}
    onClose={() => setSaved(false)}
>

    <Alert
        severity="success"
        variant="filled"
    >

        ✓ Tipp gespeichert

    </Alert>

</Snackbar>

    </>

  );

}