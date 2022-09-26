import React, { useState } from "react";
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

const Dropdown = (props) => {
  const [practices, setPractices] = useState("");

  const handleChange = (event) => {
    setPractices(event.target.value);
    props.setPractice(event.target.value);
  };

  return (
    <FormControl style={{ minWidth: 240 }} margin="normal">
      <InputLabel id="demo-simple-select-label">Practices</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={practices}
        label="Practices"
        onChange={handleChange}
      >
        <MenuItem key="none" value="none">
          None
        </MenuItem>
        {optionItems}
      </Select>
    </FormControl>
  );
};
export default Dropdown;
