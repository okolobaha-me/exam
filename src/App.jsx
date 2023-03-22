import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "./Componentse/TablePanel/TablePanel";
import { Way } from "./Componentse/Way/Way";
import { Answers } from "./Componentse/Answers/Answers";

function App() {
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Way" {...a11yProps(0)} />
          <Tab label="Answers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Way />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Answers />
      </TabPanel>
    </>
  );
}

export default App;
