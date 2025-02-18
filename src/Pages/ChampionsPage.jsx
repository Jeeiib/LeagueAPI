import { use, useEffect, useState } from "react";
import ChampionService from "../Services/ChampionService";
import { Container, Form } from "react-bootstrap";
import ChampionCard from "../Components/ChampionCard";


const ChampionsPage = () => {
  const [champions, setChampions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  const fetchChampions = async () => {
    try {
      const response = await ChampionService.fetchChampions();
      const ChampionsArray = Object.values(response.data.data);
      setChampions(ChampionsArray);
        setFilteredChampions(ChampionsArray);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetchChampions();
  }, []);

useEffect(() => {
    const filteredChampions = champions.filter((champion) => {
        return champion.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredChampions(filteredChampions);
}, [searchValue]);

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <h1 className="mt-3" style={{ fontSize: "4rem" }}>Champions</h1>
        <Form className="col-10 m-2 mb-5">
          <Form.Control
            type="text"
            placeholder="Rechercher un champion"
            onChange={handleChange}
          />
        </Form>
        <div className="d-flex flex-wrap justify-content-around gap-3">
          {filteredChampions.map((champion, index) => {
            return <ChampionCard key={index} champion={champion} />
          })}
        </div>
      </Container>
    </>
  );
};

export default ChampionsPage;
