import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, type FC } from "react";
import useHabitStore, { type FrequencyType } from "../store/store";

const AddHabitForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<FrequencyType>("daily");

  const { addHabit } = useHabitStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit(name, frequency);
    }
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Habit Name"
          value={name}
          placeholder="Enter habit name"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as FrequencyType)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="success">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
