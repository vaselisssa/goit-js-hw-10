import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_KEFcsZ7BwwxdtSthiDwqiQOso8Ovv3cgwICUAJZYIisvnSedi7wG2cqHzZ00shvL';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.breedSelect.addEventListener('change', onSelectChange);

function onSelectChange(e) {
  refs.loader.hidden = false;
  refs.breedSelect.hidden = true;

  refs.catInfo.innerHTML = '';

  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      refs.catInfo.innerHTML = createMarkup(data);
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      refs.loader.hidden = true;
      refs.breedSelect.hidden = false;
      refs.catInfo.hidden = false;
    });
}

function createOptions() {
  refs.breedSelect.hidden = true;

  fetchBreeds()
    .then(data => {
      const options = data
        .map(({ id, name }) => ` <option value="${id}">${name}</option>`)
        .join('');

      refs.breedSelect.innerHTML = options;

      new SlimSelect({
        select: refs.breedSelect,
      });
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      refs.error.hidden = true;
      refs.loader.hidden = true;
      refs.breedSelect.hidden = false;
    });
}
createOptions();

function createMarkup(array) {
  return array
    .map(({ url, breeds: [{ description, name, temperament }] }) => {
      return `<img class="pfoto-cat" width = "300px" src="${url}" alt="${name}">
      <div class="text-part">
      <h2 class="name-cat">${name}</h2>
      <p class="deskr-cat">${description}</p>
      <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;
    })
    .join('');
}
