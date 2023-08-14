import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

hideElement(refs.error);
hideElement(refs.breedSelect);

fetchBreeds()
  .then(breeds => {
    const options = breeds
      .map(({ id, name }) => ` <option value="${id}">${name}</option>`)
      .join('');
    refs.breedSelect.innerHTML = options;

    new SlimSelect({
      select: '.breed-select',
    });

    hideElement(refs.loader);

    showElement(refs.breedSelect);
  })
  .catch(error => {
    console.log(error);

    hideElement(refs.loader);
    Notify.failure(refs.error.textContent);
  });

refs.breedSelect.addEventListener('change', onSelectChange);

function onSelectChange() {
  const breedId = refs.breedSelect.value;
  refs.catInfo.innerHTML = '';
  showElement(refs.loader);
  fetchCatByBreed(breedId)
    .then(catData => {
      createMarkup(catData);
    })
    .catch(error => {
      console.log(error);
      hideElement(refs.loader);

      Notify.failure(refs.error.textContent);
    });
}

function createMarkup(array) {
  console.dir(array);
  const imgUrl = array[0].url;
  const arrBreeds = array[0].breeds[0];
  const title = arrBreeds.name;
  const description = arrBreeds.description;
  const temperament = arrBreeds.temperament;

  hideElement(refs.loader);
  const catCard = array

    .map(
      elem =>
        `<img class="pfoto-cat" width = "300px" src="${imgUrl}" alt="cat ${title}">
        <div>
        <h2>${title}</h2>
        <p>${description}</p>
        <p> <span class="temperament-label">Temperament: </span>${temperament}</p></div>`
    )
    .join('');
  refs.catInfo.insertAdjacentHTML('beforeend', catCard);
}

function showElement(element) {
  element.classList.remove('is-hidden');
}

function hideElement(element) {
  element.classList.add('is-hidden');
}
