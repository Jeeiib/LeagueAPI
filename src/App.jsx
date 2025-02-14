import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import ChampionDetails from "./Pages/ChampionDetails";


function App() {


  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/champion/:name" element={<ChampionDetails />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
