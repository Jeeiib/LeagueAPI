import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ItemCard = ({item}) => {
    const navigate = useNavigate();


    return  <>
     <Card 
        style={{ width: "18rem" }}
        className="text-center d-flex flex-column align-items-center"
        onClick={() => navigate("/item/" + item.name, { state:  item  })}
      >
        <Card.Img
          className="mt-5"
          variant="top"
          src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${item.image.full}`}
          alt={item.name}
          style={{ width: "64px", height: "64px" }}
        />
        <Card.Body className="d-flex flex-column justify-content-end">
          <Card.Title className="text">{item.name}</Card.Title>
        </Card.Body>
      </Card>
</>;
    
}
 
export default ItemCard;