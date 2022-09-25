import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import SEPractices from "../dummydata/SEPractices";

const optionItems = SEPractices.map((SEPractice) => (
  <MenuItem key={SEPractice.practice} value={SEPractice.practice}>
    {SEPractice.practice}
  </MenuItem>
));

const SubmissionForm = () => {
  const history = useHistory();

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:8082/api/articles", data)
      .then((res) => {
        history.push("/SEPractice");
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel id="practice-label">Practice</InputLabel>
        <Select
          labelId="practice-label"
          id="practice-label-select"
          label="Practice"
          defaultValue=""
          onChange={(e) => setValue("sepractice", e.target.value)}
          {...register("sepractice", { required: true })}
        >
          {optionItems}
        </Select>
        <TextField
          variant="outlined"
          margin="normal"
          label="Title"
          {...register("title", { required: true })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Authors"
          {...register("authors", { required: true })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Source"
          {...register("source", { required: true })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Pub. Year"
          {...register("pubyear", { required: true })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="DOI"
          {...register("doi", { required: true })}
        />
        <Button
          type="submit"
          margin="normal"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default SubmissionForm;
