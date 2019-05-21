const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '794fd1eb804018f71fb274449e212c02';

export function getCurrentWeather(city) {
  return fetch(`${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
}

export function getCurrentWeatherForPosition(lat, lon) {
  return fetch(`${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
}

export function getWeatherForecastForPosition(lat, lon) {
  return fetch(`${baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
}

export function getCurrentWeathers(ids) {
  return fetch(`${baseUrl}group?id=${ids}&appid=${apiKey}&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
}

export function getWeatherForecast(id) {
  return fetch(`${baseUrl}forecast?id=${id}&appid=${apiKey}&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
}
