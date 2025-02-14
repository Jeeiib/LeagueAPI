import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChampionCard = ({champion}) => {
    const navigate = useNavigate();


    return  <>
     <Card 
        style={{ width: "18rem" }}
        className="text-center d-flex flex-column align-items-center"
        onClick={() => navigate("/champion/" + champion.id)}
      >
        <Card.Img
          className="mt-5"
          variant="top"
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
          style={{ borderRadius: "25px" }}
        />
        <Card.Body className="d-flex flex-column justify-content-end">
          <Card.Title className="text">{champion.name}</Card.Title>
        </Card.Body>
      </Card>
</>;
    
}
 
export default ChampionCard;