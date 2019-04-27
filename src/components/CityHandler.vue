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
      return 'city-handler--sun';
    },
    getForecastsByDay() {
      const sortedWeather = [];
      for(const weather of this.weatherList) {
        const dateString = weather.dt_txt.split(' ')[0];

        const dayObject = sortedWeather.find(x => x.dateString === dateString)
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
    <div class="forecast-list">
      <div v-for="dayForecast in getForecastsByDay" :key="dayForecast.dateString">
        <span>{{dayForecast.day}}</span>
        <div v-for="weather in dayForecast.list" :key="weather.dt">
          <button @click="onSelect(weather)">
            {{ Math.round(weather.main.temp) }}
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


.forecast-list {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row: 3;
  display: flex;
  justify-content: space-between;

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
