import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import {
  fetchCountries,
  createCountriesListMarkup,
  createCountryInfoMarkup,
} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  const searchText = e.target.value.trim();

  if (searchText === '') {
    clearCountriesList();
    clearCountryInfo();
    return;
  }

  fetchCountries(searchText)
    .then(result => {
      if (result.length > 10) {
        clearCountriesList();
        clearCountryInfo();
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
      } else if (result.length === 1) {
        clearCountriesList();
        renderCountryInfo(result);
      } else if (result.length <= 10) {
        clearCountryInfo();
        renderCountriesList(result);
      }
    })
    .catch(() => {
      clearCountriesList();
      clearCountryInfo();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(countries) {
  refs.countryInfo.innerHTML = createCountryInfoMarkup(countries);
}

function renderCountriesList(countries) {
  refs.countryList.innerHTML = createCountriesListMarkup(countries);
}

function clearCountriesList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
