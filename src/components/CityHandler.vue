<template>
  <div>
    <h1>Hello City handler {{ $route.params.id }}</h1>
    <router-link to="/">Back</router-link>
  </div>
</template>

<style scoped>
h1, a {
  color: black;
}
</style>
