import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ChampionService from "../Services/ChampionService";

const ChampionDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [champion, setChampion] = useState({});

  const fetchChampionByName = async (name) => {
    try {
      const response = await ChampionService.fetchChampionByName(name);
      setChampion(response.data.data[name]);
      console.log(response.data.data[name]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChampionByName(name);
  }, [name]);

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <h1>{champion.name}</h1>
        <div className="d-flex justify-content-between w-100">
          {/* Section gauche avec l'image */}
          <div className="col-6">
            <div className="champion-image">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                alt={champion.name}
                width={500}
                className="img-fluid"
                style={{ borderRadius: "25px" }}
              />
            </div>
            <div className="champion-stats mt-4">
              <h3>Statistiques</h3>
              <div className="d-flex flex-column gap-2">
                <div className="stat-item">
                  <span className="fw-bold">Attaque:</span>
                  <div className="progress" style={{ width: "50%" }}>
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: `${champion.info?.attack * 10}%` }}
                    >
                      {champion.info?.attack}
                    </div>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="fw-bold">Défense:</span>
                  <div className="progress" style={{ width: "50%" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${champion.info?.defense * 10}%` }}
                    >
                      {champion.info?.defense}
                    </div>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="fw-bold">Magie:</span>
                  <div className="progress" style={{ width: "50%" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${champion.info?.magic * 10}%` }}
                    >
                      {champion.info?.magic}
                    </div>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="fw-bold">Difficulté:</span>
                  <div className="progress" style={{ width: "50%" }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${champion.info?.difficulty * 10}%` }}
                    >
                      {champion.info?.difficulty}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section droite avec description et compétences */}
          <div className="col-6 d-flex flex-column">
            <div className="mb-4">
              <h3>Description</h3>
              <p>{champion.blurb}</p>
            </div>
            <div className="skills-section">
              <h3>Compétences Actives</h3>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {champion.spells?.map((spell, index) => (
                  <div key={index} className="skill-card text-center">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${spell.image.full}`}
                      alt={spell.name}
                      className="mb-2"
                    />
                    <p className="mb-0">{spell.name}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-4"> Compétence passives</h3>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <div className="skill-card text-center">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/passive/${champion.passive?.image.full}`}
                    alt={champion.passive?.name}
                    className="mb-2"
                  />
                  <p className="mb-0">{champion.passive?.name}</p>
                </div>
              </div>
              <h3 className="mt-4">Tags</h3>
                <div className="d-flex flex-wrap gap-3 mt-3">
                    {champion.tags?.map((tag, index) => (
                    <div key={index} className="skill-card text-center">
                       <Button 
                       variant="primary"
                       onClick={() => navigate(`/champions/tag/${tag}`)}>
                        {tag}
                       </Button>
                    </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ChampionDetails;
