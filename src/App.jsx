import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ChampionDetails from "./Pages/ChampionDetails";
import ItemsPage from "./Pages/ItemsPage";
import ItemDetails from "./Pages/ItemDetails";
import ChampionsByTag from "./Pages/ChampionsByTag";
import ChampionsPage from "./Pages/ChampionsPage";


function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<ChampionsPage />} />
      <Route path="/champion/:name" element={<ChampionDetails />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route path="/champions/tag/:tag" element={<ChampionsByTag />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
