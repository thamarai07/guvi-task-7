import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import MainRouter from "./components/Routes";

function App() {
  return (
    <div>
      <Navbar />
      <MainRouter />
      <Outlet />
    </div>
  );
}
export default App;
