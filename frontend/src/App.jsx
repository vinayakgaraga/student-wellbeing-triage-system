import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import CheckIns from "./pages/CheckIns";
import Counselor from "./pages/Counselor";
import Academic from "./pages/Academic";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/checkins" element={<CheckIns />} />
      <Route path="/counselor" element={<Counselor />} />
      <Route path="/academic" element={<Academic />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;