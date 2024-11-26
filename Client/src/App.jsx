import "./App.css";
//import LandingPage from "./components/LandingPage";
//import Login from "./components/login";
import Navbar from "./ui/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Make sure Navbar is rendered here */}
      {/* Your other components go here */}
    </BrowserRouter>
  );
}

export default App;
