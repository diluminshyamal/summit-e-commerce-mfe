import App from "./App";
import { BrowserRouter } from "react-router-dom";

export default function Root(props) {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
