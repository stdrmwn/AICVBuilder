import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/Loginpage.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Loginpage" element={<LoginPage />} />
    </Routes>
  );
}

export default App;