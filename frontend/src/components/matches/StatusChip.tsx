import { Chip } from "@mui/material";

interface Props {

  saving?: boolean;

  saved?: boolean;

  locked?: boolean;

  points?: number;

}

export default function StatusChip({

  saving,

  saved,

  locked,

  points,

}: Props) {

  if (locked) {

    return (
      <Chip
        color="error"
        label="🔒 Gesperrt"
        size="small"
      />
    );

  }

  if (saving) {

    return (
      <Chip
        color="info"
        label="💾 Speichert..."
        size="small"
      />
    );

  }

  if (points !== undefined) {

    return (
      <Chip
        color="primary"
        label={`⭐ ${points} Punkte`}
        size="small"
      />
    );

  }

  if (saved) {

    return (
      <Chip
        color="success"
        label="✓ Gespeichert"
        size="small"
      />
    );

  }

  return (
    <Chip
      color="warning"
      label="Offen"
      size="small"
    />
  );

}