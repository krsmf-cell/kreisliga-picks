import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import {
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  rows: any[];
  onEdit: (league: any) => void;
  onDelete: (league: any) => void;
}

export default function LeaguesTable({
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
      field: "code",
      headerName: "Kürzel",
      width: 120,
    },
    {
      field: "isPublic",
      headerName: "Öffentlich",
      width: 140,
      renderCell: (params) =>
        params.value ? (
          <Chip
            label="Ja"
            color="success"
            size="small"
          />
        ) : (
          <Chip
            label="Nein"
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