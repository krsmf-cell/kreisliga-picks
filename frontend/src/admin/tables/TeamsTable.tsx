import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Team } from "../../types/team";
import {
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  rows: Team[];
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
}

export default function TeamsTable({
  rows,
  onEdit,
  onDelete,
}: Props) {

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "shortName",
      headerName: "Kürzel",
      width: 120,
    },
    {
      field: "league",
      headerName: "Liga",
      flex: 2,
      valueGetter: (_, row) => row.league?.name ?? "",
    },
    {
      field: "active",
      headerName: "Aktiv",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Chip
            label="Aktiv"
            color="success"
            size="small"
          />
        ) : (
          <Chip
            label="Inaktiv"
            size="small"
          />
        ),
    },
    {
      field: "actions",
      headerName: "Aktionen",
      width: 140,
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