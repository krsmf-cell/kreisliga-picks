import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MainLayout from "../components/layout/MainLayout";

export default function Help() {

  return (

    <MainLayout>

      <Typography
        variant="h4"
        sx={{
          mb:4,
          fontWeight:700,
        }}
      >
        ❓ Hilfe
      </Typography>

      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >

          <Typography>
            Wie funktioniert das Tippspiel?
          </Typography>

        </AccordionSummary>

        <AccordionDetails>

          <Typography>

            Tippe auf Heim-, Unentschieden oder Auswärtssieg.
            Nach Spielende erhältst du abhängig von der Quote Punkte.

          </Typography>

        </AccordionDetails>

      </Accordion>

    </MainLayout>

  );

}