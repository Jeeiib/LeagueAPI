import axios from "axios";

function fetchItems() {
  return axios.get(
    "https://ddragon.leagueoflegends.com/cdn/15.3.1/data/fr_FR/item.json?limit=50000"
  );
}

function fetchItemById(id) {
  return axios.get(
    `https://ddragon.leagueoflegends.com/cdn/15.3.1/data/fr_FR/item.json/${id}.json`
  );
}
export default {
  fetchItems,
  fetchItemById,
};
