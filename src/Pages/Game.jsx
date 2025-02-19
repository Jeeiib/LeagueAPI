import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ChampionService from "../Services/ChampionService";

import WallPaper2 from "../assets/wallpaper2.png";
import { toast } from "react-toastify";

const Game = () => {
  const [champions, setChampions] = useState([]);
  const [champion, setChampion] = useState({});
  const [spell, setSpell] = useState({});
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);

  // Récupérer tous les champions depuis l'API
  const fetchChampions = async () => {
    try {
      const response = await ChampionService.fetchChampions();
      const ChampionsArray = Object.values(response.data.data);
      setChampions(ChampionsArray);
    } catch (error) {
      console.error(error);
    }
  };

  // Sélectionner un champion aléatoirement
  const selectChampion = () => {
    if (champions.length > 0) {
      const randomChampion =
        champions[Math.floor(Math.random() * champions.length)];
      setChampion(randomChampion);
      console.log(randomChampion);
    }
  };
  // Récupérer les détails complets du champion (incluant les sorts)
  const fetchChampionDetails = async (championKey) => {
    try {
      const response = await ChampionService.fetchChampionByName(championKey);
      const championDetails = response.data.data[championKey];
      if (championDetails.spells && championDetails.spells.length > 0) {
        const randomSpell =
          championDetails.spells[
            Math.floor(Math.random() * championDetails.spells.length)
          ];
        setSpell(randomSpell);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reloadSpell = () => {
    if (champions.length > 0) {
      // Sélectionner un nouveau champion aléatoirement
      const randomChampion =
        champions[Math.floor(Math.random() * champions.length)];
      setChampion(randomChampion);
      console.log(randomChampion);
      // Réinitialiser éventuellement le champ de recherche et le résultat
      setResult("");
      setSearch("");
    }
  };

  // Vérifier la réponse de l'utilisateur
  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.toLowerCase() === champion.name.toLowerCase()) {
      console.log("Bravo");
      setResult("Bravo !");
      toast.success(`Bravo ! Tu as trouvé le champion`);
      reloadSpell();
      setPoints((prevPoints) => prevPoints + 1);
      // Rénitialiser les erreurs en cas de bonne réponse
      setErrors(0);
    } else {
      console.log("Dommage");
      const newErrors = errors + 1;
      setErrors(newErrors);
      if (newErrors >= 3) {
        toast.error(`Game Over : Le champion était ${champion.name}`);
        setErrors(0);
        setPoints(0);
        setResult("");
        setSearch("");
        reloadSpell();
      } else {
        setResult("Dommage !");
        setSearch("");
      }
    }
  };

  useEffect(() => {
    fetchChampions();
  }, []);

  useEffect(() => {
    selectChampion();
  }, [champions]);

  // Dès que le champion est sélectionné, récupérer ses détails complets
  useEffect(() => {
    if (champion && champion.name) {
      fetchChampionDetails(champion.name);
    }
  }, [champion]);

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center"
      style={{
        backgroundImage: `url(${WallPaper2})`,
        backgroundSize: "cover",
        height: "100vh",
        paddingTop: "50px",
      }}
    >
         <div
         className="d-flex flex-column align-items-center mt-5"
      style={{
        backgroundColor: "rgba(8,20,40,0.7)", // fond semi-transparent
        padding: "20px",
        borderRadius: "25px",
        textAlign: "center",
        width: "500px",
        border: "1px solid #C89B3C",
      }}
>
      <h2
        className="text-center mt-4"
        style={{ fontSize: "4rem", textShadow: "2px 2px 4px #000000" }}
      >
        Quizz
      </h2>
      <h3 style={{ textShadow: "2px 2px 4px #000000" }}>
        {" "}
        Devines à quel champion appartient ce spell
      </h3>
      <h4 style={{ color: "red", textShadow: "2px 2px 4px #000000" }}>
        3 erreurs sur un même spell = Game Over{" "}
      </h4>
      <p
        className="mt-2"
        style={{ fontSize: "1.5rem", textShadow: "2px 2px 4px #000000" }}
      >
        Points: {points}
      </p>
      <div
        className="d-flex flex-column align-items-center"
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "25px",
        }}
      >
        {/* Afficher l'image du spell s'il existe */}
        {spell.image && spell.image.full && (
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/spell/${spell.image.full}`}
            alt="Spell"
            style={{
              width: "100px",
              borderRadius: "25px",
              margin: "0 0 20px 0",
              objectFit: "cover",
              border: "2px solid #C89B3C",
            }}
          />
        )}

        {/* Formulaire pour que l'utilisateur propose sa réponse */}
        <Form
          className="mt-2"
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", width: "400px" }}
        >
          <Form.Group>
            <Form.Control
            className="game-placeholder"
              style={{
                backgroundColor: "#081428",
                color: "white",
                height: "50px",
                fontSize: "1.5rem",
              }}
              type="text"
              list="championOptions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Entrez le nom du champion"
            />
            <datalist id="championOptions">
              {champions
                .filter((champ) =>
                  champ.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((champ, index) => (
                  <option key={index} value={champ.name} />
                ))}
            </datalist>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              style={{
                backgroundColor: "#C89B3C", // couleur dorée
                border: "1px solid #a67c00",
                color: "white",
                width: "150px",
                height: "50px",
                fontSize: "1.5rem",
              }}
            >
              Valider
            </Button>
          </div>
        </Form>

        <div className="d-flex justify-content-center">
          <Button
            variant="secondary"
            className="mt-3"
            onClick={reloadSpell}
            style={{ widht: "100px", height: "50px", fontSize: "1.5rem" }}
          >
            Recommencer
          </Button>
        </div>
      </div>

      {/* Afficher le résultat */}
      {result && (
        <p className="mt-3" style={{ fontSize: "1.5rem" }}>
          {result}
        </p>
      )}
      </div>
    </Container>
  );
};

export default Game;
