# vue-weather-app-exercises

The purpose of this project is to try the different parts in VueJS and in the same time build something useful.
In these exercises we will go through the most used concepts in VueJS.
This project will be based on a number of steps and in the end the result will be a weather app. There are also branch which you can checkout to see the result of each exercise.

## Pre steps

* Go to https://openweathermap.org/api and sign up for an account.
* clone project and run npm install

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

## Exercies 4, integrate twoards the weather api

In this exercies we will fetch the weather from openweatherapi and store that in our component state instead of just a city name. The Api integration is already created, what you need to do is first to add a Keys.js in the util folder. Then we need to fetch the weather for the city once we add a new city in our GUI.

Openweatherapi gives us more the just the current weather, so we will store all the information from the API response in our state for now, you can later decide what to remove and what to save.

### After completion

* The method that adds a new city to the city array, should now first make a request to openweatherapi and when getting a response should save that information in the city array

* Now that we have the current weather for the cities in our city list, also show the current temperature in the list.

### Tips

Use method 

## Exercies 5, save the list and load on update

In this exercise we will save the city list to localstorage, so we get the same list when we leave the page and come back or during reloads. The localstorage integration is already created




## Step 6, click clicking on a city, route to a new page

## Step 7, weather page should display specific weather for the clicked city

Things to touch

data,
computed,
watch
state
scoped CSS
component structure
lifecycle methods


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
