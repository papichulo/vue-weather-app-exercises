<script>
  import { getCurrentWeather } from '../util/Api';
  import { getCities, addCity, removeCity } from '../util/Store';

  export default {
    name: 'listHandler',
    data: () => ({
      cities: [],
      cityString: '',
    }),
    methods: {
      updateCityString(e) {
        this.cityString = e.target.value;
      },
      async addCity() {
        if (this.cityString) {
          const response = await getCurrentWeather(this.cityString);
          this.cities.push(response);
          addCity(response);
          this.cityString = '';
        }
      },
      removeCity(cityId) {
        this.cities = this.cities.filter(x => x.id !== cityId);
        removeCity(cityId)
      },
    },
    mounted() {
      const savedCities = getCities();
      this.cities = savedCities;
    },
  }
</script>

<template>
  <div id="app">
    <h2 class="app-header">Weather Apps</h2>
    <div>
      <input type="input" @change="updateCityString" v-model="cityString"/>
      <button type="button" @click="addCity">add</button>
    </div>
    <div v-for="city in cities" :key="city.id" class="cities">
      <div class="city-item">
        <router-link :to="`/city/${city.id}`" class="city-link">
          {{ city.name }}
        </router-link>
        <div>
          {{ city.main.temp }}
          <button type="button" @click="removeCity(city.id)">remove</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
#app {
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #7e7e7e;
}
.city-item {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-bottom: 1px solid white;
  padding: 10px;
}
.app-header {
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 3px solid white;
  font-size: 1.5em;
}

.city-link {
  flex: 1;
  text-align: left;
}

@media(min-width: 768px) {
  .cities {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}


</style>
