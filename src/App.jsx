import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ChampionDetails from "./Pages/ChampionDetails";
import ItemsPage from "./Pages/ItemsPage";
import ItemDetails from "./Pages/ItemDetails";
import ChampionsByTag from "./Pages/ChampionsByTag";
import ChampionsPage from "./Pages/ChampionsPage";
import Game from "./Pages/Game";
import { ToastContainer } from 'react-toastify';

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
        <Route path="/game" element={<Game />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
