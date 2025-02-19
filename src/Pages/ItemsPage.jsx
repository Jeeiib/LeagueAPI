import { use, useEffect, useState } from "react";
import ItemService from "../Services/ItemService";
import { Container, Form } from "react-bootstrap";
import ItemCard from "../Components/ItemCard";

const ItemsPage = () => {
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
const [searchValue, setSearchValue] = useState("");

const fetchItems = async () => {
    try {
        const response = await ItemService.fetchItems();
        const ItemsArray = Object.values(response.data.data);
        setItems(ItemsArray);
        setFilteredItems(ItemsArray);
    } catch (error) {
        console.error(error);
    }
};

const handleChange = (event) => {
    setSearchValue(event.target.value);
};


useEffect(() => {
    fetchItems();
}, []);

useEffect(() => {
    const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredItems(filteredItems);
}, [searchValue]);

console.log(items);

    return <>
    <Container className="d-flex flex-column align-items-center">
        <h1 className="mt-4" style={{ fontSize: "4rem" }}>Objets</h1>
        <Form className="col-10 m-2 mb-4">
            <Form.Control
                type="text"
                placeholder="Rechercher un objet"
                onChange={handleChange}
            />
        </Form>
        <div className="d-flex flex-wrap justify-content-around gap-3">
            {filteredItems.map((item, index) => {
                return <ItemCard key={index} item={item} />
            })}
        </div>
    </Container>
    </>;
}
 
export default ItemsPage
