<script>
  import {getCurrentWeather} from "../util/Api.js";
  import {addCity, removeCity, getCities} from "../util/Store.js";

  export default {
    name: 'listHandler',
    data: () => ({
      cityName:"",
      cities:[],
      errorMessage:"",
    }),
    methods: {
      async onAddCity() {
        this.errorMessage = "";
        if (this.cityName!=="" 
            && this.cities.find(x => x.name.toLowerCase()===this.cityName.toLowerCase())===undefined) {
          try {
            var weather = await getCurrentWeather(this.cityName);
            this.cities.push(weather);   
            addCity(weather);         
          } catch (error) {
            this.errorMessage = "City not found, please try again...";
          }
        }
        this.cityName = "";
        this.$refs.cityNameInput.focus();
      },
      onRemoveCity(city) {
        this.cities = this.cities.filter(x => x.name!==city.name);
        removeCity(city);
      }
    },
    mounted() {
      this.cities = getCities();
      this.$refs.cityNameInput.focus();
    }
  }
</script>

<template>
  <div id="app">
    <h2>Weather App</h2>
    <input type="text" v-model="cityName" ref="cityNameInput" @keydown.enter="onAddCity"/>
    <button @click="onAddCity">Add city</button>
    <div v-show="errorMessage">{{errorMessage}}</div>
    <ol>
      <li v-for="city in cities" :key="city.name">
        <router-link :to="`/city/${city.id}`">
          {{ city.name }}
        </router-link>
        {{city.main.temp}}
        {{city.weather[0].description}}
        <button @click="onRemoveCity(city)">Delete</button>
      </li>
    </ol>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
