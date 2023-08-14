import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_KEFcsZ7BwwxdtSthiDwqiQOso8Ovv3cgwICUAJZYIisvnSedi7wG2cqHzZ00shvL';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(resp => resp.data)
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data)
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}

export { fetchBreeds, fetchCatByBreed };
