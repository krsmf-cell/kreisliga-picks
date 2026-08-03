import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { PredictionResult } from "../../types/prediction";
import TeamPanel from "./TeamPanel";
import PredictionButtons from "./predictionButtons";


interface Props {
  matchId: number;

  homeTeam: string;
  awayTeam: string;

  homeLogo?: string;
  awayLogo?: string;

  date: string;

  prediction?: PredictionResult;

  disabled?: boolean;

  homeChance?: number;
  drawChance?: number;
  awayChance?: number;

  homeOdds?: number;
  drawOdds?: number;
  awayOdds?: number;

  homePoints?: number;
drawPoints?: number;
awayPoints?: number;
  
  saving?: boolean;
  saved?: boolean;
  locked?: boolean;
  points?: number;
  communityHome?: number;
  communityDraw?: number;
  communityAway?: number;
homeLastFive?: ("W" | "D" | "L")[];
awayLastFive?: ("W" | "D" | "L")[];
  onPrediction: (
    matchId: number,
    prediction: PredictionResult,
  ) => void;
}

const buttonStyle = {
  minWidth: 72,
  height: 46,

  "&.Mui-selected": {
    backgroundColor: "#2e7d32",
    color: "#fff",
    fontWeight: 700,
  },

  "&.Mui-selected:hover": {
    backgroundColor: "#1b5e20",
  },
};
export default function MatchCard({
  matchId,
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  date,
  prediction,

  homeChance = 0,
  drawChance = 0,
  awayChance = 0,

  homeOdds,
  drawOdds,
  awayOdds,

  homePoints,
drawPoints,
awayPoints,

  communityHome = 0,
  communityDraw = 0,
  communityAway = 0,
  homeLastFive = [],
  awayLastFive = [],
  disabled = false,
  saved = false,
  locked = false,
  onPrediction,
}: Props) {
  return (
    <Card
  sx={{
    mb: 3,
    borderRadius: 5,

    background:
"rgba(255,255,255,.88)",

backdropFilter:
"blur(12px)",

    border: "1px solid #e4e9ef",

    boxShadow: "0 10px 30px rgba(0,0,0,.12)",

    transition: ".25s",

    position: "relative",

    overflow: "hidden",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 18px 40px rgba(0,0,0,.18)",
    },
  }}
>
      <CardContent>
<Box
  sx={{
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.04,
  }}
>
  {/* Mittellinie */}
  <Box
    sx={{
      position: "absolute",
      left: "50%",
      top: 0,
      bottom: 0,
      width: 2,
      bgcolor: "#2e7d32",
      transform: "translateX(-50%)",
    }}
  />

  {/* Mittelkreis */}
  <Box
    sx={{
      position: "absolute",
      width: 160,
      height: 160,
      border: "2px solid #2e7d32",
      borderRadius: "50%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
    }}
  />

  {/* Linker Strafraum */}
  <Box
    sx={{
      position: "absolute",
      left: 0,
      top: "25%",
      width: 90,
      height: "50%",
      border: "2px solid #2e7d32",
      borderLeft: 0,
    }}
  />

  {/* Rechter Strafraum */}
  <Box
    sx={{
      position: "absolute",
      right: 0,
      top: "25%",
      width: 90,
      height: "50%",
      border: "2px solid #2e7d32",
      borderRight: 0,
    }}
  />
</Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
        </Typography>
        <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>

  <Typography
    variant="caption"
    color="text.secondary"
    sx={{ fontWeight: 600 }}
  >
    {date}
  </Typography>

  {locked ? (

    <Chip
      size="small"
      color="error"
      label="Gesperrt"
    />

  ) : saved ? (

    <Chip
      size="small"
      color="success"
      label="Gespeichert"
    />

  ) : (

    <Chip
      size="small"
      color="warning"
      label="Offen"
    />

  )}

</Box>
<Box
  sx={{
    height: 4,
    width: "100%",
    borderRadius: 2,
    background:
      "linear-gradient(90deg,#2e7d32,#66bb6a)",
    mt: 1,
    mb: 2,
  }}
/>
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 3,
          }}
        >

          {/* Heim */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TeamPanel
    team={homeTeam}
    logo={homeLogo}
    form={homeLastFive}
    favorite={
        homeChance > awayChance
    }
/>
          </Box>

          {/* Mitte */}

          <PredictionButtons
  value={prediction}
  disabled={disabled}
  onChange={(value) =>
    onPrediction(matchId, value)
  }
/>

          {/* Gast */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TeamPanel
    team={awayTeam}
    logo={awayLogo}
    form={awayLastFive}
    favorite={
        awayChance > homeChance
    }
/>
          </Box>

        </Box>

{/* Quoten */}

        <Box sx={{ mt: 4 }}>

          <Typography
            variant="subtitle2"
            fontWeight={700}
          >
            💰 Quoten
          </Typography>

          <Stack
  direction="row"
  spacing={2}
  justifyContent="center"
  sx={{ mt: 1 }}
>

  <Chip
    color="success"
    label={`${homeOdds?.toFixed(2) ?? "-"} • ${homePoints ?? "-"} P`}
  />

  <Chip
    color="warning"
    label={`${drawOdds?.toFixed(2) ?? "-"} • ${drawPoints ?? "-"} P`}
  />

  <Chip
    color="error"
    label={`${awayOdds?.toFixed(2) ?? "-"} • ${awayPoints ?? "-"} P`}
  />

</Stack>

        </Box>


        {/* KI */}

        <Box sx={{ mt: 4 }}>

          <Typography
            variant="subtitle2"
            fontWeight={700}
          >
            🤖 KI-Prognose
          </Typography>

          <Stack spacing={1} sx={{ mt: 1 }}>

            <Typography variant="caption">
              Heimsieg ({homeChance}%)
            </Typography>

            <LinearProgress
              variant="determinate"
              value={homeChance}
              color="success"
            />

            <Typography variant="caption">
              Unentschieden ({drawChance}%)
            </Typography>

            <LinearProgress
              variant="determinate"
              value={drawChance}
              color="warning"
            />

            <Typography variant="caption">
              Auswärtssieg ({awayChance}%)
            </Typography>

            <LinearProgress
              variant="determinate"
              value={awayChance}
              color="error"
            />

          </Stack>

        </Box>

        

        {/* Community */}

        <Box sx={{ mt: 4 }}>

  <Typography
    variant="subtitle2"
    fontWeight={700}
  >
    👥 Community
  </Typography>

  <Stack spacing={1} sx={{ mt: 1 }}>

    <Typography variant="caption">
      Heimsieg ({communityHome}%)
    </Typography>

    <LinearProgress
      variant="determinate"
      value={communityHome}
      color="success"
    />

    <Typography variant="caption">
      Unentschieden ({communityDraw}%)
    </Typography>

    <LinearProgress
      variant="determinate"
      value={communityDraw}
      color="warning"
    />

    <Typography variant="caption">
      Auswärtssieg ({communityAway}%)
    </Typography>

    <LinearProgress
      variant="determinate"
      value={communityAway}
      color="error"
    />

  </Stack>

</Box>
            <Typography
  sx={{
    position: "absolute",
    right: 25,
    bottom: 10,
    fontSize: 120,
    opacity: .03,
    userSelect: "none",
  }}
>
⚽
</Typography>
      </CardContent>
    </Card>
  );
}