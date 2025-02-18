import { use, useEffect, useState } from "react";
import ChampionCard from "../Components/ChampionCard";
import { useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import ChampionService from "../Services/ChampionService";

const ChampionsByTag = () => {
  const { tag } = useParams();
  const [champions, setChampions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  const fetchChampionsByTag = async () => {
    try {
      const response = await ChampionService.fetchChampions();
      const championsArray = Object.entries(response.data.data).filter((currentTag) => {
        return currentTag[1].tags.includes(tag);
      });
      setChampions(championsArray);
        setFilteredChampions(championsArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetchChampionsByTag();
  }, [tag]);

  useEffect(() => {
    const filteredChampions = champions.filter((champion) => {
      return champion[1].name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredChampions(filteredChampions);
  }, [searchValue, champions]);

  return (
    <> 
      <Container className="d-flex flex-column align-items-center">
        <h1 className="mt-3" style={{ fontSize: "4rem" }}>{tag}</h1>
        <Form className="col-10 m-2 mb-5">
          <Form.Control
            type="text"
            placeholder="Rechercher un champion"
            onChange={handleChange}
          />
        </Form>
        <div className="d-flex flex-wrap justify-content-around gap-3">
          {filteredChampions.map((champion, index) => {
            console.log(champion);
            
            return <ChampionCard key={index} champion={champion[1]} />;
          })}
        </div>
      </Container>
    </>
  );
};

export default ChampionsByTag;
