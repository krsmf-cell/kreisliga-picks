import { Box, Stack } from "@mui/material";

interface Props {
  form: ("W" | "D" | "L")[];
}

export default function FormBadges({
  form,
}: Props) {

  return (

    <Stack
      direction="row"
      spacing={0.6}
      justifyContent="center"
      sx={{ mt: 1 }}
    >

      {form.map((result, index) => {

        const color =
          result === "W"
            ? "#2e7d32"
            : result === "D"
            ? "#f9a825"
            : "#c62828";

        return (

          <Box
            key={index}
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              bgcolor: color,
              border: "2px solid white",
              boxShadow: 1,
            }}
          />

        );

      })}

    </Stack>

  );

}