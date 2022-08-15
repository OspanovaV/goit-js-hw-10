import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { countryСardTeemplate, countryListTemplate } from './js/markup-template';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
  const countryName = refs.searchBox.value.trim();
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  if (countryName === '') {    
    return;
  }

  fetchCountries(countryName)
    .then(countrys => {
      if (countrys.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (countrys.length > 1 && countrys.length <= 10) {
        refs.countryList.innerHTML = countrys.map(country => countryListTemplate(country)).join('');
      } else if (countrys.length === 1) {
        refs.countryInfo.innerHTML = countrys.map(country => countryСardTeemplate(country)).join('');
      }
    })
    .catch(error => {
      if (error.message === '404') {
        Notify.failure('Oops, there is no country with that name');
      } else {
        return console.log(error);
      }
    });    
}