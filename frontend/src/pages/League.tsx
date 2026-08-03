import { useEffect, useState } from "react";
import {
  getFixtures,
  getPredictionTable,
} from "../services/predictionLeague.service";

import type { PredictionTable } from "../types/predictionTable";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import MainLayout from "../components/layout/MainLayout";

import type { PredictionFixture } from "../types/predictionFixture";

export default function League() {

  const [fixtures, setFixtures] =
    useState<PredictionFixture[]>([]);
  const [table, setTable] =
  useState<PredictionTable[]>([]);
  useEffect(() => {
    load();
  }, []);

  async function load() {

  const [
    fixtures,
    table,
  ] = await Promise.all([

    getFixtures(),

    getPredictionTable(),

  ]);

  setFixtures(fixtures);

  setTable(table);

}

  const grouped =
    fixtures.reduce((acc, fixture) => {

      const key =
        fixture.matchday.number;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(fixture);

      return acc;

    }, {} as Record<number, PredictionFixture[]>);

  return (

    <MainLayout>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
        }}
      >
        🏆 Liga
      </Typography>
<TableContainer
  component={Paper}
  sx={{
    mb: 5,
    borderRadius: 4,
  }}
>

  <Table>

    <TableHead>

      <TableRow>

        <TableCell>#</TableCell>

        <TableCell>Spieler</TableCell>

        <TableCell>Sp</TableCell>

        <TableCell>S</TableCell>

        <TableCell>U</TableCell>

        <TableCell>N</TableCell>

        <TableCell>Tore</TableCell>

        <TableCell>Diff</TableCell>

        <TableCell align="right">
          Punkte
        </TableCell>

      </TableRow>

    </TableHead>

    <TableBody>

      {table.map((player, index) => (

        <TableRow
          key={player.id}
          hover
        >

          <TableCell>

            {index === 0
              ? "🥇"
              : index === 1
              ? "🥈"
              : index === 2
              ? "🥉"
              : index + 1}

          </TableCell>

          <TableCell>

            <strong>
              {player.user.username}
            </strong>

          </TableCell>

          <TableCell>
            {player.games}
          </TableCell>

          <TableCell>
            {player.wins}
          </TableCell>

          <TableCell>
            {player.draws}
          </TableCell>

          <TableCell>
            {player.losses}
          </TableCell>

          <TableCell>

            {player.goalsFor}:
            {player.goalsAgainst}

          </TableCell>

          <TableCell>

            {player.goalDifference > 0
              ? `+${player.goalDifference}`
              : player.goalDifference}

          </TableCell>

          <TableCell
            align="right"
          >

            <Chip
              color="success"
              label={player.points}
            />

          </TableCell>

        </TableRow>

      ))}

    </TableBody>

  </Table>

</TableContainer>
      {Object.entries(grouped).map(
        ([matchday, games]) => (

          <Paper
            key={matchday}
            sx={{
              mb: 4,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >

            <Box
              sx={{
                background:
                  "linear-gradient(90deg,#1b5e20,#43a047)",
                color: "white",
                p: 2,
              }}
            >

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                Spieltag {matchday}
              </Typography>

            </Box>

            <Stack
              spacing={2}
              sx={{ p: 3 }}
            >

              {games.map((game) => (

                <Paper
                  key={game.id}
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    transition: ".2s",

                    "&:hover": {
                      transform:
                        "translateY(-2px)",
                    },
                  }}
                >

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr auto 1fr",
                      alignItems: "center",
                    }}
                  >

                    <Typography
                      align="center"
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      👤 {game.homeUser.username}
                    </Typography>

                    <Box
                      sx={{
                        px: 4,
                      }}
                    >

                      <Typography
                        variant="h4"
                        align="center"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {game.played
                          ? `${game.homeGoals}:${game.awayGoals}`
                          : "VS"}
                      </Typography>

                      <Chip
                        label={
                          game.played
                            ? "BEENDET"
                            : "OFFEN"
                        }
                        color={
                          game.played
                            ? "success"
                            : "warning"
                        }
                        size="small"
                        sx={{
                          mt: 1,
                          width: "100%",
                        }}
                      />

                    </Box>

                    <Typography
                      align="center"
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      {game.awayUser.username} 👤
                    </Typography>

                  </Box>

                </Paper>

              ))}

            </Stack>

          </Paper>

        ),
      )}

    </MainLayout>

  );

}