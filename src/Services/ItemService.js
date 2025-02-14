import axios from "axios";

function fetchItems() {
    return axios.get('https://ddragon.leagueoflegends.com/cdn/11.6.1/data/fr_FR/item.json?limit=50000');
}

function fetchItemsByName (name) {
    return axios.get(`https://ddragon.leagueoflegends.com/cdn/11.6.1/data/fr_FR/item/${name}.json`);
}

export default {
    fetchItems,
    fetchItemsByName
}