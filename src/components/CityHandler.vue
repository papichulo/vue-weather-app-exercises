<script>
import { getWeatherForecast } from "../util/Api";
import { formatTime, getDayFromDateString } from "../util/DateHelper";

export default {
  name: "cityHandler",
  data: () => ({
    cityName: "",
    weatherList: [],
    selectedWeather: {}
  }),
  computed: {
    getForecastsByDay() {
      const sortedWeather = [];
      for (const weather of this.weatherList) {
        const dateString = weather.dt_txt.split(" ")[0];
        const dayObject = sortedWeather.find(x => x.dateString === dateString);
        const weatherWithTime = weather;
        weatherWithTime.time = formatTime(weather.dt);
        if (dayObject) {
          dayObject.list.push(weather);
        } else {
          const day = getDayFromDateString(weather.dt_txt);
          sortedWeather.push({ day, dateString, list: [weather] });
        }
      }
      return sortedWeather;
    }
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
};
</script>

<template>
  <div class="city-handler">
    <router-link class="header-link" to="/">Back</router-link>
    <h1 class="header-title">{{ this.cityName }}</h1>
    <div class="selected-weather">
      <p>{{ selectedWeather.dt_txt.split(" ")[0] }}</p>
      <p>{{ selectedWeather.time }}</p>
      <div v-if="selectedWeather.main">{{ Math.round(selectedWeather.main.temp) }}</div>
      <p>{{ selectedWeather.weather[0].description }}</p>
    </div>
    <div class="forecast-days">
      <div v-for="dayForecast in getForecastsByDay" :key="dayForecast.dateString">
        <span>{{dayForecast.day}}</span>
        <div class="forecast-list">
          <button
            v-for="weather in dayForecast.list"
            :key="weather.dt"
            @click="onSelect(weather)"
            class="forecast-button"
          >
            <span>{{ weather.time }}</span>
            <span>{{ Math.round(weather.main.temp) }}°</span>
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
.selected-weather p {
  font-size: 14px;
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
</style>
