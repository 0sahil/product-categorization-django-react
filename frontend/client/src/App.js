import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// relative pathing being done beacuse of jsconfig.json
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import DashboardPage from "containers/DashboardPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  </Router>
);

export default App;