<script>
import { getWeatherForecast } from '../util/Api';

function getDayFromDateString(unixDateTimeStamp) {
  const date = new Date(unixDateTimeStamp*1000);
  const dayOfWeek = date.getDay();
  if (dayOfWeek === (new Date().getDay())) {
    return 'Today';
  }
  switch (dayOfWeek) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}

function formatTime(unixDateTimeStamp) {
  const formatedDate = new Date(unixDateTimeStamp*1000);
  const time = `${formatedDate.getHours()}`.length === 1 ? `0${formatedDate.getHours()}` : `${formatedDate.getHours()}`;
  return time;
}

export default {
  name: 'cityHandler',
  data: () => ({
    cityName: '',
    weatherList: [],
    selectedWeather: {},
  }),
  computed: {
    backgroundClass() {
      const { selectedWeather } = this;
      const date = new Date(selectedWeather.dt*1000);
      if (19 < date.getHours() || date.getHours() < 6) {
        return 'city-handler--night';
      }
      if (selectedWeather.weather && selectedWeather.weather.length > 0) {
        if (selectedWeather.weather[0].main === 'Sun') {
          return 'city-handler--sun';
        }
        if (selectedWeather.weather[0].main === 'Clear') {
          return 'city-handler--sun';
        }
        if (selectedWeather.weather[0].main === 'Rain') {
          return 'city-handler--rain';
        }
        if (selectedWeather.weather[0].main === 'Snow') {
          return 'city-handler--snow';
        }
        if (selectedWeather.weather[0].main === 'Clouds') {
          return 'city-handler--clouds';
        }
        return 'city-handler--clouds';

      }
      return '';
    },
    getForecastsByDay() {
      const sortedWeather = [];
      for(const weather of this.weatherList) {
        const dateString = weather.dt_txt.split(' ')[0];

        const dayObject = sortedWeather.find(x => x.dateString === dateString);

        const weatherWithTime = weather;
        weatherWithTime.time = formatTime(weather.dt);
        if (dayObject) {
          dayObject.list.push(weather);
        } else {
          const day = getDayFromDateString(weather.dt);
          sortedWeather.push({ day, dateString, list: [weather]});
        }
      }
      return sortedWeather;
    },
  },
  methods: {
    async fetchForecast() {
      if (this.$route.params.id) {
        const res = await getWeatherForecast(this.$route.params.id);
        this.cityName = res.city.name;
        this.weatherList = res.list;
        this.selectedWeather = res.list[0];
      }
    },
    onSelect(weather) {
      this.selectedWeather = weather;
    }
  },
  mounted() {
    this.fetchForecast();
  }
}
</script>

<template>
  <div class="city-handler" :class="backgroundClass">
    <router-link class="header-link" to="/">Back</router-link>
    <h1 class="header-title">{{ this.cityName }}</h1>
    <div class="selected-weather">
      <div v-if="selectedWeather.main">
        {{ Math.round(selectedWeather.main.temp) }}
      </div>
    </div>
    <div class="forecast-days">
      <div v-for="dayForecast in getForecastsByDay" :key="dayForecast.dateString">
        <span>{{dayForecast.day}}</span>
        <div class="forecast-list">
          <button v-for="weather in dayForecast.list" :key="weather.dt" @click="onSelect(weather)" class="forecast-button">
            <span>
              {{ weather.time }}
            </span>
            <span>
              {{ Math.round(weather.main.temp) }}°
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-handler {
  display: grid;
  grid-template-rows: 15% 70% 15%;
  grid-template-columns: 5% 90% 5%;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center;
}

.header-link {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row: 1;
  padding-top: 10px;
  font-size: 25px;
  padding-left: 10px;
}

.forecast-button {
  display: flex;
  flex-direction: column;
  color: white;
}

.header-title {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row: 1;
}


.selected-weather {
  font-size: 40vh;
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 2;
}


.forecast-days {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row: 3;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
}

.forecast-list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-right: 30px;
}

body::after{
  /* preload background images*/
  position:absolute; width:0; height:0; overflow:hidden; z-index:-1;
  content:url('../assets/sunny.jpg') url('../assets/rain.jpg') url('../assets/snow.jpg') url('../assets/clouds.jpg') url('../assets/night.jpg');
}

.city-handler--sun {
  background-image: url('../assets/sunny.jpg');
}
.city-handler--rain {
  background-image: url('../assets/rain.jpg');
}
.city-handler--snow {
  background-image: url('../assets/snow.jpg');
}
.city-handler--clouds {
  background-image: url('../assets/clouds.jpg');
}
.city-handler--night {
  background-image: url('../assets/night.jpg');
}

</style>
