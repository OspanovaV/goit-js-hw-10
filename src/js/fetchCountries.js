const BASE_URL = 'https://restcountries.com/v3.1/name/'; 
const URLSearchParams = '?fields=name,capital,population,flags,languages';
export function fetchCountries(name) {  
    return fetch(`${BASE_URL}${name}${URLSearchParams}`) 
        .then(response => {  
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
    });
}