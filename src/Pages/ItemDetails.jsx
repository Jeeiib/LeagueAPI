import { use, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState({});
  const [itemsList, setItemsList] = useState({});

  const fetchhAllItems = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/item.json?limit=50000"
      );
      const data = await response.json();
      console.log(data);
      setItemsList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchhAllItems();
  }, []);

  useEffect(() => {
    // Si location.state est présent, on l'utilise, sinon on garde item vide ou on pourra fetch par ID
    if (location.state) {
      setItem(location.state);
    }
  }, [location.state]);
  console.log(item);

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <h1>{item.name}</h1>
        <div className="d-flex justify-content-between w-100">
          {/* Section gauche avec l'image */}
          <div className="col-6">
            <div className="champion-image">
              <img
                src={
                  item.image &&
                  `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${item.image.full}`
                }
                alt={item.name}
                width={64}
                className="img-fluid"
                style={{ borderRadius: "25px" }}
              />
            </div>
          </div>

          {/* Section droite avec les informations */}
          <div className="col-6 d-flex flex-column">
            <div>
              <h3>Description</h3>
              <p dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
            <div className="champion-stats mt-4">
              <h3>Prix</h3>
              <div className="d-flex flex-column gap-2">
                <div className="stat-item">
                  <span>{item.gold && item.gold.total} pièces d'or</span>
                </div>
              </div>
            </div>
            {item.into && (
              <div className="mt-4">
                <h3>Se transforme en</h3>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  {item.into.map((itemId, index) => (
                    <div
                      key={index}
                      className="skill-card text-center"
                      onClick={() => {
                        // Récupération des détails de l'item cliqué depuis itemsList et passage en state
                        const clickedItem = itemsList[itemId];
                        if (clickedItem) {
                          navigate(`/item/${itemId}`, { state: clickedItem });
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${itemId}.png`}
                        alt={`Item ${itemId}`}
                        className=" item-transform mb-2"
                        style={{ width: "64px", height: "64px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ItemDetails;
