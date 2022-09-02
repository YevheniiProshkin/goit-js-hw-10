const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  const properties = ['name', 'capital', 'population', 'flags', 'languages'];

  return fetch(`${URL}${name}?fields=${properties.join(',')}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

// MARKUP ------------------------------------------------------------------

export function createCountriesListMarkup(cuntries) {
  return cuntries.reduce((acc, country) => {
    const {
      name: { common: name },
      flags: { svg: flag },
    } = country;
    return `${acc} <li class="country-item"><img class="country-flag" src="${flag}" alt="flag of ${name}"><span class="county-name">${name}</span></li>`;
  }, '');
}

export function createCountryInfoMarkup(countries) {
  const country = countries[0];
  const {
    name: { common: name },
    capital,
    population,
    flags: { svg: flag },
    languages,
  } = country;
  const capitalsList = capital.join(', ');
  const languagesList = Object.values(languages).join(', ');

  return `
    <p class="country-name"><img src="${flag}" alt="flag of ${name}" class="country-flag" /><span">${name}</span></p>
    <p class="capital"><span class="info-type">Capital: </span>${capitalsList}</p>
    <p class="population"><span class="info-type">Population: </span>${population}</p>
    <p class="languages"><span class="info-type">Languages: </span>${languagesList}</p>
    `;
}
