import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(event) {
  event.preventDefault();
  let valueInput = input.value.trim();
  if (!valueInput) {
    return (list.innerHTML = '');
  }
  fetchCountries(valueInput)
    .then(data => {
      if (data.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (1 > data.length < 10) {
        return createMarkup(data);
      }
    })
    .catch(error => console.log('error => ', error));
}

function createMarkup(arr) {
  if (arr.length === 1) {
    const markup = arr
      .map(
        ({
          flags,
          name,
          capital,
          population,
          languages,
        }) => `<li class = "item">
        <img src="${flags.svg}" alt="${name.official}" width = "50"/>
        <h2>${name.official}</h2>
        <p>Capital: <span>${capital}</span></p>
        <p>Population: <span>${population}</span></p>
        <p>Languages: <span>${Object.values(languages).join(', ')}</span></p>
      </li>`
      )
      .join('');
    list.innerHTML = markup;
  } else {
    const markup = arr
      .map(
        ({ flags, name }) => `<li class = "item-list">
        <img src="${flags.svg}" alt="${name.official}" width = "30"/>
        <h2>${name.official}</h2>
      </li>`
      )
      .join('');
    list.innerHTML = markup;
  }
}
