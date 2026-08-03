import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

interface Props {
  onCreate?: () => void;
  title?: string;
  buttonText?: string;
}

export default function AdminToolbar({
  onCreate,
  title = "Teams",
  buttonText = "Neues Team",
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4">
        {title}
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        {buttonText}
      </Button>
    </Box>
  );
}