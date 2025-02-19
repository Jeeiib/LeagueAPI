import { useEffect, useState } from "react";
import { Button, Carousel, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
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
      <Container fluid className="d-flex flex-column align-items-center" style={{ maxWidth: "90%" }}>
        <h1 className="mt-5 mb-4" style={{ fontSize: "4rem" }}>
          {champion.name}
        </h1>
        <div className="d-flex justify-content-between w-100">
          {/* Section gauche avec l'image */}
          <div className="col-6">
            <div className="champion-image">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                alt={champion.name}
                width={700}
                className="img-fluid"
                style={{ borderRadius: "25px" }}
              />
            </div>
            <div className="champion-stats mt-4 text-center">
              <h3 className="mt-5">Statistiques</h3>
              <div className="d-flex flex-column gap-2">
                <div className="stat-item">
                  <span className="fw-bold">Attaque:</span>
                  <div className="progress mx-auto" style={{ width: "50%" }}>
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
                  <div className="progress mx-auto" style={{ width: "50%" }}>
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
                  <div className="progress mx-auto" style={{ width: "50%" }}>
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
                  <div className="progress mx-auto" style={{ width: "50%" }}>
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
              <p style={{ fontSize: "20px" }}>{champion.lore}</p>
            </div>
            <div className="skills-section">
              <h3>Compétences Actives</h3>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {champion.spells?.map((spell, index) => (
                  <OverlayTrigger
                    key={index}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${index}`}>
                        <strong>{spell.name}</strong>
                        <br />
                        {spell.description}
                      </Tooltip>
                    }
                  >
                    <div key={index} className="skill-card text-center">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/spell/${spell.image.full}`}
                        alt={spell.name}
                        className="mb-2"
                      />
                      <p className="mb-0">{spell.name}</p>
                    </div>
                  </OverlayTrigger>
                ))}
              </div>
              <h3 className="mt-4"> Compétence passives</h3>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-passive">
                      <strong>{champion.passive?.name}</strong>
                      <br />
                      {champion.passive?.description}
                    </Tooltip>
                  }
                >
                  <div className="skill-card text-center">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/passive/${champion.passive?.image.full}`}
                      alt={champion.passive?.name}
                      className="mb-2"
                    />
                    <p className="mb-0">{champion.passive?.name}</p>
                  </div>
                </OverlayTrigger>
              </div>
              <h3 className="mt-4">Tags</h3>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {champion.tags?.map((tag, index) => (
                  <div key={index} className="skill-card text-center">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/champions/tag/${tag}`)}
                    >
                      {tag}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
      <div className="mt-4 d-flex flex-column text-center">
        <h2> Skins </h2>
        <Carousel className="mt-3 mb-5" pause="hover">
          {champion.skins?.map((skin, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                alt={skin.name}
                style={{ borderRadius: "25px" }}
              />
              <Carousel.Caption>
                <h3>{skin.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
          </Carousel>
          </div>
      </Container>
    </>
  );
};

export default ChampionDetails;
