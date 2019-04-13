<script>
  export default {
    name: 'app',
    data: () => ({
      cities: [],
      cityString: '',
    }),
    methods: {
      updateCityString(e) {
        this.cityString = e.target.value;
      },
      addCity() {
        this.cities.push(this.cityString);
        this.cityString = '';
      },
    }
  }
</script>

<template>
  <div id="app">
    <h2>Weather App</h2>
    <div>
      <input type="input" @change="updateCityString" v-model="cityString"/>
      <button type="button" @click="addCity">add</button>
    </div>
    <div v-for="city in cities" :key="city">
      <p>{{city}}</p>
    </div>
  </div>
</template>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
