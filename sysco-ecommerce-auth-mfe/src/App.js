import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUp";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/login/signup" element={<SignUpScreen />} />
    </Routes>
  );
};

export default App;
