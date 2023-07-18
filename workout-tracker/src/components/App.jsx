import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Register from './Register'
import Dashboard from './Dashboard';
import WorkoutLogs from "./WorkoutLogs";
import EditWorkouts from "./EditWorkouts";
import LearnExercises from "./LearnExercises";
import NotFound from "./NotFound";
import { ProtectedRoutes } from "./ProtectedRoutes";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-logs" element={<WorkoutLogs />} />
          <Route path="/edit-workouts" element={<EditWorkouts />} />
          <Route path="/learn-exercises" element={<LearnExercises />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
