import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import SEPractices from "../dummydata/SEPractices";

const optionItems = SEPractices.map((SEPractice) => (
  <MenuItem key={SEPractice.practice} value={SEPractice.practice}>
    {SEPractice.practice}
  </MenuItem>
));

const Dropdown = () => {
  const [practices, setPractices] = React.useState("");

  const handleChange = (event) => {
    setPractices(event.target.value);
  };

  return (
    <FormControl style={{ minWidth: 240 }}>
      <InputLabel id="demo-simple-select-label">Practices</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={practices}
        label="Practices"
        onChange={handleChange}
      >
        {optionItems}
      </Select>
    </FormControl>
  );
};
export default Dropdown;
