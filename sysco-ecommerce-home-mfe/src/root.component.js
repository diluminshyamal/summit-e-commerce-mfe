import { BrowserRouter } from "react-router-dom";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";

export default function Root() {
  return (
    <BrowserRouter>
      <App />
      {/* Jii */}
      {/* <HomeScreen /> */}
    </BrowserRouter>
  );
}
