import Notiflix from 'notiflix';
export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.error('error => ', error);
      return Notiflix.Notify.failure('Error! Please enter correct data.');
    });
}
