import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import type { PredictionResult } from "../../types/prediction";

interface Props {

  value?: PredictionResult;

  disabled?: boolean;

  onChange: (
    prediction: PredictionResult,
  ) => void;

}

const buttonStyle = {

  minWidth: 95,

  height: 52,

  fontWeight: 700,

  fontSize: 15,

  borderRadius: 3,

  "&.Mui-selected": {

    backgroundColor: "#2e7d32",

    color: "#fff",

  },

  "&.Mui-selected:hover": {

    backgroundColor: "#1b5e20",

  },

};

export default function PredictionButtons({

  value,

  disabled,

  onChange,

}: Props) {

  return (

    <ToggleButtonGroup

      exclusive

      value={value ?? null}

      disabled={disabled}

      onChange={(_, newValue) => {

        if (!newValue) return;

        onChange(newValue);

      }}

    >

      <ToggleButton
        value="HOME"
        sx={buttonStyle}
      >
        🏠 Heim
      </ToggleButton>

      <ToggleButton
        value="DRAW"
        sx={buttonStyle}
      >
        🤝 X
      </ToggleButton>

      <ToggleButton
        value="AWAY"
        sx={buttonStyle}
      >
        ✈ Gast
      </ToggleButton>

    </ToggleButtonGroup>

  );

}