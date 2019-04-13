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


## Step 3, save the list and load on update

Now we want to save the list of elements and use the same list on enter or reloads of the page

## Step 4, get weather for a city

## Step 5, show weather information

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
