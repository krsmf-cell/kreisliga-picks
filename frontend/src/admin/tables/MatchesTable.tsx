import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import {
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Match } from "../../types";

interface Props {
  rows: Match[];
  onEdit: (match: Match) => void;
  onDelete: (match: Match) => void;
}

export default function MatchesTable({
  rows,
  onEdit,
  onDelete,
}: Props) {

  const columns: GridColDef[] = [

    {
      field: "kickoff",
      headerName: "Datum",
      width: 170,
      valueGetter: (_, row) =>
        new Date(row.kickoff).toLocaleString("de-DE"),
    },

    {
      field: "matchday",
      headerName: "Spieltag",
      width: 110,
      valueGetter: (_, row) =>
        row.matchday.number,
    },

    {
      field: "homeTeam",
      headerName: "Heim",
      flex: 1,
      valueGetter: (_, row) =>
        row.homeTeam.name,
    },

    {
      field: "awayTeam",
      headerName: "Gast",
      flex: 1,
      valueGetter: (_, row) =>
        row.awayTeam.name,
    },

    {
      field: "result",
      headerName: "Ergebnis",
      width: 100,
      valueGetter: (_, row) =>
        `${row.homeGoals} : ${row.awayGoals}`,
    },

    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          color={
            params.value === "finished"
              ? "success"
              : params.value === "live"
              ? "warning"
              : "default"
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "Aktionen",
      width: 120,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => onEdit(params.row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },

  ];

  return (
    <Paper sx={{ height: 650 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}