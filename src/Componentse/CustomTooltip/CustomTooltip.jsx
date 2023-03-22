import { Box, Typography } from "@mui/material";

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ backgroundColor: "black", padding: "10px" }}>
        <Typography>{`y=${label}`}</Typography>
        <Typography>{`x=${payload[0].value}`}</Typography>
      </Box>
    );
  }

  return null;
};
