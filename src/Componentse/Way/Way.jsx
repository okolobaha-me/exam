import { Dot } from "../Dot/Dot";
import { Box, Button, Grid, List, TextField, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chart } from "../Chart/Chart";
import { useWay } from "../../hooks/useWay";

export const Way = () => {
  const [
    getChartData,
    getTargetLine,
    dots,
    handleMeasureChange,
    handleAddDotClick,
    reset,
    recalculate,
    handleChangeStartPoint,
    targetMeasures,
  ] = useWay();

  return (
    <Grid container spacing={1}>
      <Grid item xs={7.5}>
        <Chart chartData={getChartData()} targetLine={getTargetLine()} />
        <Typography fontSize={21}>
          Am to target = {targetMeasures.angle}
        </Typography>
        <Typography fontSize={21}>
          Distance to target = {targetMeasures.dist}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Box sx={{ paddingTop: "20px" }}>
          <TextField
            sx={{ width: "70px", marginRight: "20px" }}
            id="x"
            label="X"
            value={dots[0].coordinates.x}
            variant={"standard"}
            onChange={(e) => {
              handleChangeStartPoint("x", e.currentTarget.value);
            }}
          />
          <TextField
            sx={{ width: "70px" }}
            id="y"
            label="y"
            value={dots[0].coordinates.y}
            variant={"standard"}
            onChange={(e) => {
              handleChangeStartPoint("y", e.currentTarget.value);
            }}
          />
        </Box>
        <Box sx={{ width: "max-content", textAlign: "center" }}>
          <List
            sx={{
              display: "grid",
              gap: "15px",
              width: "max-content",
            }}
          >
            {dots.map(({ id, coordinates, measures }, index) => (
              <Dot
                key={id}
                values={measures}
                coordinates={coordinates}
                id={id}
                setValues={handleMeasureChange}
                buttonAction={
                  index === dots.length - 1
                    ? handleAddDotClick
                    : () => recalculate(index)
                }
                last={index === dots.length - 1}
              />
            ))}
          </List>
          <Button
            onClick={reset}
            size={"large"}
            color={"error"}
            variant={"outlined"}
          >
            Reset
          </Button>
          <ToastContainer position="top-center" autoClose={1700} />
        </Box>
      </Grid>
    </Grid>
  );
};
