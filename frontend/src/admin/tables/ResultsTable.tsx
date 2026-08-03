import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { useState } from "react";

import { updateResult } from "../../services/match.service";

import type { Match } from "../../types";

interface Props {
  rows: Match[];
  onSaved: () => void;
}

export default function ResultsTable({
  rows,
  onSaved,
}: Props) {

  const [results, setResults] =
    useState<Record<number, {
      home: number;
      away: number;
    }>>({});

  async function save(match: Match) {

    const result =
      results[match.id];

    if (!result) return;

    await updateResult(
      match.id,
      result.home,
      result.away,
    );

    onSaved();

  }

  return (

    <Paper>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Datum</TableCell>

            <TableCell>Heim</TableCell>

            <TableCell align="center">
              Ergebnis
            </TableCell>

            <TableCell>Gast</TableCell>

            <TableCell align="center">
              Speichern
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {rows.map((match) => (

            <TableRow key={match.id}>

              <TableCell>

                {new Date(
                  match.kickoff,
                ).toLocaleString("de-DE")}

              </TableCell>

              <TableCell>
                {match.homeTeam.name}
              </TableCell>

              <TableCell>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >

                  <TextField
                    size="small"
                    type="number"
                    sx={{ width: 65 }}
                    defaultValue={match.homeGoals}
                    onChange={(e) =>
                      setResults({
                        ...results,
                        [match.id]: {
                          home: Number(e.target.value),
                          away:
                            results[match.id]?.away ??
                            match.awayGoals,
                        },
                      })
                    }
                  />

                  :

                  <TextField
                    size="small"
                    type="number"
                    sx={{ width: 65 }}
                    defaultValue={match.awayGoals}
                    onChange={(e) =>
                      setResults({
                        ...results,
                        [match.id]: {
                          home:
                            results[match.id]?.home ??
                            match.homeGoals,
                          away: Number(e.target.value),
                        },
                      })
                    }
                  />

                </div>

              </TableCell>

              <TableCell>
                {match.awayTeam.name}
              </TableCell>

              <TableCell align="center">

                <Button
                  variant="contained"
                  onClick={() => save(match)}
                >
                  💾
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>

  );

}