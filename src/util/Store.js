const localStorageCities = 'weather-cities';

export function getCities() {
  return JSON.parse(localStorage.getItem(localStorageCities) || '[]');
}

export function addCity(city) {
  const cities = getCities();
  cities.push(city);
  localStorage.setItem(localStorageCities, JSON.stringify(cities));
}

export function removeCity(city) {
  const cities = getCities();
  const filteredCities = cities.filter(x => x.name.toLowerCase() !== city.name.toLowerCase());
  localStorage.setItem(localStorageCities, JSON.stringify(filteredCities));
}
