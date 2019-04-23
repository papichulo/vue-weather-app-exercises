---
title: An introduction to Vue.js
published: false
description: A brief introduction to VueJS    
tags: VueJs, Javascript
---

# An introduction to Vue.js

This article will briefly go through the basic concepts with VueJS. After reading this article, there is a project with exercise which after completion will be a weather app.

## Pros of Vue

I will not try to compare Vue to other frameworks, like React or Angular, since in my opinion it mostly comes down to developer experience when choosin framework. This paragraph will mostly describe what I think is great about Vue, which may not be specific for Vue.

* Vue is fast as a framework

* Vue has a good learing curve

* Vue handles DOM updates asyncronosly

* Template syntax

## An introduction

Vue is a progressive framework for building user interfaces. It's designed to be adaptable, meaning it's easy to be integrated with other frameworks or in existing libraries. Vue is also perfectly capable of powering sophisticated Single-Page applications. Note that Vue, like React, is all about providing a system where it is easy to create reactive and composable view components. Concerns like routing and global state management is left out of the Vue.js and is included in other libraries, however very easy to integrate with Vue.js.

Vue utilizes a virtual DOM and can thereby decide when to best update the DOM and also perform asynchronous DOM updates.

At the core of Vue.js, it's a system that enables ut to declaratively render data to the DOM using straightforward template syntax. Consider the following example.

``` html
  <div id="app">
    {{ message }}
  </div>
```

```Javascript
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue'
    }
  })
```

```html
  Hello Vue
```

Now we have created our first app, though its a very simple app. Vue does however do a lot under the hood and have now linked the DOM with our component data. Hence when changing our data, the view will also change, making Vue components reactive.

### Components

One key concept of Vue is its component system. An Vue application is built up of small, self-contained and sometimes reusable components. In a SPA view, the application will then be built up of many small components in to a component tree.

![https://vuejs.org/v2/guide/index.html#Composing-with-Components](https://thepracticaldev.s3.amazonaws.com/i/0nc7y6swxzwimnxmsfft.PNG)

 A Vue component is an Vue instance of that component. Meaning we can have several instances of the same component, which are self-contained with their own state.

### HTML, JS and CSS

A vue component consists of 3 parts:

* HTML, defined in the template

* Javascript, defined in the script

* CSS, defined in the style

For example this is app.vue:

``` javascript
  <script>
    export default {
      name: 'app',
      data: () => ({ message: 'Hello Vue!' }),
    }
  </script>

  <template>
    <div class="app" >
      {{ message }}
    </div>
  </template>

  <style scoped>
    .app {
      color: greeen;
    }
  </style>
```

This is a exportable component that can be used by any other component. We never reference Vue directly, but the build script solves that when building the application.

Note the `<style scoped>`, this is something that is included in Vue and makes the style scoped to the current component, leaving no other component classes affected.

## Vue instances

Every Vue application starts by creating a Vue instance with the function `Vue`

``` javascript
  new Vue({
    // options
  })
```

When we create our Vue instance, we pass in our root component, as well as other options or frameworks we want to use like routing. This creates out root Vue instance, containing the whole component tree. In the component tree we can also have several instances of the same component, say we would write:

``` html
<template>
  <vue-component />
  <vue-component />
  <vue-component />
</template>
```

Then each `vue-component` would have its own state and changes to one of the components will not affect the other instances of the same component.

In the previous example in section HTML, JS, and CSS and in the following examples, we will use `export default` and not `new Vue` when creating components. This is because we create the Vue instance only on the root component and since our other component are in that component tree, we can just export the options of our components like `name`, `props`, `computed` and so on to the parent component and in the end they will all be handled as Vue components...

### Data

If we consider the root Vue instance, this instance needs to know when to perform an update on components in the component tree. When the data object changes for one of the components, Vue will check if this component should be updated as well as check if any of its child components should be updated. Vue has smart handling of this under the hood, so this is something that Vue handles by itself and something we as developers don't have to worry about.

``` javascript
  data: function() {
    return { message: '' };
  }
```

If we consider this example, we have a message string in our data object for this component. When message changes, Vue will update the affected components of this change.

### Methods

Methods are where we usually put logic regarding state changes of a component. Consider the following

``` javascript
  <script>
    export default {
      name: 'app',
      data: () => ({
        clicks: 0,
      }),
      methods: {
        onClick() {
          this.clicks = this.clicks + 1;
        },
      },
    }
  </script>

  <template>
    <div>
      <button @click="onClick">click me</button>
      <div>
        You clicked {{ clicks }} times!!
      </div>
    </div>
  </template>
```

This is a simple component that each time we click, we call the onClick method that updates the data of this component. When the clicks data variable updates, Vue will notice a perform a re-render of this component, then displaying the correct value of reflecting the state of this component.

### Lifecycle events

Each instance of a component in the component tree has a life span, in short:

* its created when its inserted into the DOM

* it gets updates during the time it's in the DOM if the props changes

* it gets destroyed when it should be removed from the DOM.

In a view component, we can listen to these events and when they occur decide what to do. For example, one life cycle event is called mounted, it's triggered when the component instance is mounted in the DOM. This event will happen one time during the life span of each component instance and when this event happens, we can decide what to do when our component has mounted. For example:

``` javascript
  mounted() {
    // For example: fetch data from API
  }
```

The most commonly used lifecycle events are:

* created, when the component is created and before it's inserted into the DOM

* mounted, when the component is inserted into the DOM

* updated, when the component will re-render

* destroyed, when the component is destroyed

For a full example of when each lifecycle event is triggered, see the [lifecycle diagram on vues docs](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).

## Template syntax

Vue uses an HTML like templating syntax, that allows writing everything as regular HTML and declaratively bind the rendered DOM elements with the Vue instance data.

Under the hood, Vue compiles all the templates into virtual DOM render functions. This combined with the reactivity system of the components, allows Vue to figure out the minimal DOM manipulations and components re-renders when the state of a component changes.

The most basic type of data binding is the double brackets, to print data to the DOM

``` html
  <div>
    {{ message }}
  </div>
```

### data binding

When we want to bind a certain piece of data to a component or element declaration in the template, we use the v-bind attribute. Like so:

``` html
  <h1 v-on:"title">
    {{ message }}
  </div>
```

Now this `v-on` tells we the `title` is a javascript element, which should be located in the template. The `v-on` has a shorthand that is mostly used, simple `:`

``` html
  <h1 :"title">
    {{ message }}
  </div>
```

### Events

When we want to listen to a DOM event, like click, we listen to this with the `v-on` vue attributes.

``` html
  <button v-on:click="actionOnClick">
    click me
  </button>

  <!-- shorthand -->
  <button @click="actionOnClick">
    click me
  </button>
```

### v-if vs v-show

`v-if` and `v-show` are 2 different ways of deciding if elements should be shown in the UI. They have a key difference in that `v-if` removes the element from the DOM when false, while `v-show` set `display:none`. Both have valid use cases.

``` html
  <div v-if="show" />

  <div v-show="show" />
```

### v-for

For iteration on elements in components. Keys "must" be given, since its the key the Vue uses to decide if an element in the iteration should be updated. Not providing a key, or not having specific keys will result in unnecesary updates of the DOM.

```html
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
```

Dont do this

```html
  <div v-for="(item, index) in items" :key="index">
    {{ item.name }}
  </div>
```

Since the index is not specific for the item but for the iteration, if the elements in the items are would change place, like when sorting or other cases, this would lead to unnecesary updates.

## Component communication

An page in a Vue application is built up of many small components in a component tree, like we saw in the components section. Quite often we want communicate between components in the component tree. There are 2 ways of communcation, up and down. When we communicate down we send data down to the child components, this will in the child component be visible as props. When a child component wants to communicate to the parent component they emit an event.

![https://medium.com/@sky790312/about-vue-2-parent-to-child-props-af3b5bb59829](https://thepracticaldev.s3.amazonaws.com/i/hw0ifrkkuciqgucy9sm6.png)

Lets explain by example

``` javascript
  <script>
    export default {
      name: 'animals',
      data: () => ({
        list: ['dog', 'cat', 'horse']
        selectedAnimal: '',
      }),
      methods: {
        onSelect(animal) {
          this.selectedAnimal = animal;
        },
      },
    }
  </script>

  <template>
    <div>
      <dropdown :list="list" @selected="onSelect">
      <div v-if="selectedAnimal">
        You selected {{ selectedAnimal }}
      </div>
    </div>
  </template>
```

First we have a animal component, this component displays a dropdown and the selected value of that dropdown. We send the list we want the dropdown to display to that component and we also listen for the event `selected`, by which we set the selected animal `data` property.

``` javascript
  <script>
    export default {
      name: 'dropdown',
      props: ['list'],
      methods: {
        onSelect(event) {
          this.$emit('selected', event.target.value);
        }
      }
    }
  </script>

  <template>
    <select @change="onSelect">
      <option v-for="item in list" value="item" :key="item">{{item}}</option>
    <select>
  </template>
```

The dropdown component renders the list given to it by props and emits an event when a value in the dropdown is selected. This shows how data flows down to child components by props and how events can be emitted and listened to by parent components.

## Computed property

Computed are getters in a component instance, their main puropse are to avoid using javascript directly in the template and instead have them as getters in the component. These computed properties are also cached and we only change when then data it relies on changes. These can be used for all data bindings operation as well as to display values in the DOM.

``` javascript
  computed: {
    getMessage() {
      // return stuff
    }
  }
```

## Watch property

In the watch property, we can listen for changes in data, computed or props and when they change have a callback that triggers. Like

```javascript
  watch: {
    message(value) {
      // do stuff
    }
  }
```
