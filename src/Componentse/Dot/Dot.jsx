import {IconButton, ListItem, Stack, TextField, Typography,} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const Dot = ({
  coordinates,
  setValues,
  values,
  id,
  buttonAction,
  last,
}) => {
  const { am, d } = values;
  const { x, y } = coordinates;

  return (
    <ListItem
      sx={{
        border: "solid 1px #3b3b3b",
        minWidth: "395px",
        padding: "20px 25px",
        display: "flex",
        gap: "20px",
        borderRadius: "5px",
      }}
    >
      <Stack spacing={0.3}>
        <Typography>X: {x}</Typography>
        <Typography>Y: {y}</Typography>
      </Stack>
      <Stack spacing={3} direction="row">
        <TextField
          sx={{ width: "70px" }}
          id="am"
          label="Am"
          value={am}
          variant={"standard"}
          onChange={(e) => setValues(id, "am", e.currentTarget.value)}
        />
        <TextField
          sx={{ width: "70px" }}
          id="d"
          label="Distance"
          value={d}
          variant={"standard"}
          onChange={(e) => setValues(id, "d", e.currentTarget.value)}
        />
      </Stack>
      <IconButton
        onClick={buttonAction}
        sx={{ marginRight: "0", marginLeft: "auto" }}
      >
        {last && (
          <AddCircleOutlineIcon
            fontSize="large"
            fill="success"
            color="success"
          />
        )}
      </IconButton>
    </ListItem>
  );
};
