import { Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";

function App() {
  const store = useHabitStore();
  console.log(store);
  return (
    <Container maxWidth="md">
      <Typography component={"h1"} variant="h2" align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
      {/* <HabitStats /> */}
    </Container>
  );
}

export default App;
