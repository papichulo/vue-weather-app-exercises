const localStorageCities = 'weather-cities';

export function getCities() {
  return JSON.parse(localStorage.getItem(localStorageCities) || '[]');
}

export function addCity(city) {
  const cities = getCities();
  cities.push(city);
  localStorage.setItem(localStorageCities, JSON.stringify(cities));
}

export function removeCity(cityId) {
  const cities = getCities();
  const filteredCities = cities.filter(x => x.id !== cityId);
  localStorage.setItem(localStorageCities, JSON.stringify(filteredCities));
}
