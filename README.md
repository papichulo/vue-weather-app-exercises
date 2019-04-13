# vue-weather-app-exercises

The purpose of this project is to try the different parts in VueJS and in the same time build something useful.
In these exercises we will go cover:

* how to use component state,
* vue DOM events and calling methods
* use lifecycle methods

This project will be based on a number of steps and in the end the result will be a weather app. There are also branch which you can checkout to see the result of each exercise.

## Pre steps

* Go to https://openweathermap.org/api and sign up for an account.
* clone project and run npm install
* install Vue-cli, its required to do the rounting exercise

## Exercies 1, Creating a city list

First step is to create a list of cities, which we later can fetch weather for.
To create this list, we need an input element with a button to add new cities to the city list and a way to display the list.

### After completion

* we should have a input element and a button
* when the button is clicked the inserted value in the input element is inserted into a list of cities
* this list of cities should be iterated over in the template and show all added cities

### Tips

Use ```v-model```, ```@update```, ```@click``` to finish the exercise.

### Examples

If you get stuck or when you finished the first exercies, the is finished example is [here](examples/step-1.PNG). As well in git branch step-1.

## Exercies 2, remove cities from city list

Now we want to remove cities from the same list, incase we add a city by mistake.
So add a new button in the iteration of elements, so there is one button per city.
When clicking this button the corresponding city should be removed and only that city

### After completion

* There should a added button per city in the city list

* When a remove button is clicked the corresponding element should be removed

### Tips
Use ```filter``` to remove the correct element from the list.

### Examples

If you get stuck or when you finished the exercies, the is finished example is [here](examples/step-2.PNG). As well in git branch step-2.

## Exercies 3, integrate twoards the weather api

In this exercies we will fetch the weather from openweatherapi and store that in our component state instead of just a city name. The Api integration is already created, what you need to do is first to add a Keys.js in the util folder. Then we need to fetch the weather for the city once we add a new city in our GUI.

Openweatherapi gives us more the just the current weather, so we will store all the information from the API response in our state for now, you can later decide what to remove and what to save.

### After completion

* The method that adds a new city to the city array, should now first make a request to openweatherapi and when getting a response should save that information in the city array

* Now that we have the current weather for the cities in our city list, also show the current temperature in the list.

### Tips


Use method ```getCurrentWeather``` from Api.js.

### Example

If you get stuck or when you finished the exercies, the is finished example is [here](examples/step-3.PNG). As well in git branch step-3. Note that I also added some styling in this step.

## Exercies 4, save the list and load on update

In this exercise we will save the city list to localstorage, so we get the same list when we leave the page and come back or during reloads. The localstorage integration is already created.

### After completion

* When adding a new City, the City is also saved in localStorage, ```Store.addCity```

* When removing a city, it is also removed from localStorage, ```Store.removeCity```

* When reloading the page, the city list is populated with the cities saved in localstorage, ```Store.getCities```.
  * This step requires you to use a lifecycle method.

### Tips
I recommend using the mounted lifecycle event.

### Example

If you get stuck or when you finished the exercies, the is finished example is [here](examples/step-4.PNG). As well in git branch step-4. Note that I also added some styling in this step.

## Step 5, click clicking on a city, route to a new page

In this exercise we setup routing for our application.
Start with ```vue add router``` in the terminal. This will add vue-router plus given an example setup of routing.
When I did this in the exercises, it didnt get the setup completly right, since we have written some code in App.vue.
After doing the add router command, the App.vue should look like [this](examples/step-5-app.PNG). In order to get this right, we also need to move all the App.vue code to a new component. I put mine in components/ListHandler.vue. In files structure looks like [this](examples/step-5-structure.PNG) now.

After we have added routing we also need to use the routing, the thought of this exercise is that when selecting a city in the city list, to route to a new page, where we in the next exercise can display a forecast for the selected city.

So add a new component under components, I called mine CityHandler.vue, which can just print out some text for now. Then in router.js, point to the 2 newly added components, so both components can be reached on different URLs.

After this we want to route, not be changing the URL, but by some action in the GUI. From the city list, we want to, when selecting a city, to route to a new page and we want to know which city we selected in the previous page. This can be solved by sending the id in the URL to the routed page. When selecting a city in the city list, we should use the ```router-link``` component, like [this](examples/step-5-list-template.PNG).

### After completion

* App.vue now only handles routing and the code that was in App.vue is located in a new component
* we have created a city component
* We have routing between these 2 components
* the city component gets the id of the clicked city in the city list

### Example

Since its a bit more code in this exercise, it's best if you checkout the step-5 branch to see how the setup of routing can look like.

## Step 6, weather page should display specific weather for the clicked city

This is the final exercise in this project. This is more of a play around with Vue exercise. One thing that you should do is to get the forecast for the city which we get by id from the URL. The you can display the GUI how you want and play around with Vue. To get the weather forecast, use the ```Api.getWeatherForecast()```. Also try to use a computed property, the are getters for the component which are stashed, which are very useful.



## Project setup

```
npm install
```

### Compiles and hot-reloads for development

``` npm
npm run serve
```

### Compiles and minifies for production

``` npm
npm run build
```

### Lints and fixes files

``` npm
npm run lint
```
