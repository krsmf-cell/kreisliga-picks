import {
  Avatar,
  Box,
  Chip,
  Typography,
} from "@mui/material";

import { API_URL } from "../../config/api";
import FormBadges from "./FormBadges";

interface Props {

  team: string;

  logo?: string;

  form?: ("W" | "D" | "L")[];

  favorite?: boolean;

}

export default function TeamPanel({

  team,

  logo,

  form = [],

  favorite = false,

}: Props) {

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <Avatar
        src={
          logo
            ? `${API_URL}${logo}`
            : undefined
        }
        variant="rounded"
        sx={{
          width: 96,
          height: 96,
          boxShadow: 3,
          bgcolor: "white",
          p: 1,
        }}
      />

      <Typography
        align="center"
        sx={{
          mt: 1.5,
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        {team}
      </Typography>

      {favorite && (

        <Chip
          size="small"
          color="warning"
          label="⭐ Favorit"
          sx={{ mt: 1 }}
        />

      )}

      <FormBadges form={form} />

    </Box>

  );

}