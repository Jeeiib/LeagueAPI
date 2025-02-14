import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ItemCard = ({item}) => {
    const navigate = useNavigate();


    return  <>
     <Card 
        style={{ width: "18rem" }}
        className="text-center d-flex flex-column align-items-center"
      >
        <Card.Img
          className="mt-5"
          variant="top"
          src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${item.image.full}`}
          alt={item.name}
          style={{ borderRadius: "25px" }}
        />
        <Card.Body className="d-flex flex-column justify-content-end">
          <Card.Title className="text">{item.name}</Card.Title>
        </Card.Body>
      </Card>
</>;
    
}
 
export default ItemCard;