# Mapty-App

<details>
<summary>Table of content</summary>

- [Description](#description)
- [Features ✨](#features-)
- [Screenshots 🖵](#screenshots-)
- [Project structure](#project-structure)
- [App Architecture](#app-architecture)
- [Flowchart Diagram](#flowchart-diagram)
- [Installation 📥](#installation-)
- [How to use](#how-to-use)
- [API used 🧰](#api-used-)
- [Deployment/Live Demo](#deploymentlive-demo)
- [Screen record](#screen-record)
- [Note](#note)
- [Future Feauters](#future-feauters)

</details>

## Description

A map Application where the goal is to organize and track your workouts(running or cycling), This application is built using Advanced Javascript with Object-Oriented Programming which uses Geolocation APIs, Browser APIs along with some External libraries.

## Features ✨

- Render a map using **leaflet API**.
- The map is rendered on the user's current position using **Real time geolocation API**.
- Ability to log a workout(Running or Cycling) to specific location.
- Ability to log a workout(Running or Cycling) to specific location.
- If running workout then user can set his/her workout distance, duration, cadence ,then application check the data validation and calculate the pace.
- If workout is cycling then user can set his/her workout distance, duration, elevation gain then application check the data validation and calculate the speed.
- All the workout information will appear in a workout list.
- A Map marker will also set on the map for specific workout with date and workout type.
- User can click on a workout in the list to move to the workout on the map.
- All the workouts information will be saved in the localstorage so that application will not lose its state in case browser is loaded.
- The user can delete a specific workout.
- The user can delete all the workouts.

## Screenshots 🖵

<details>
<summary>screenshot-1</summary>

![Screenshot -1](https://user-images.githubusercontent.com/77184432/215296532-e1d37038-81e6-48bc-936c-654f10edc9a5.png)

</details>

<details>
<summary>screenshot-2</summary>

![Screenshot -2](https://user-images.githubusercontent.com/77184432/215296565-7afb3842-550c-4531-84e6-8760a607b27d.png)

</details>

## Project structure

<details>
<summary>Click to expand!</summary>

```bash
## Project Structure
📦Mapty-App
 ┣ 📂css
 ┃ ┗ 📜style.css
 ┣ 📂imgs
 ┃ ┣ 📜icon.png
 ┃ ┣ 📜logo.png
 ┃ ┣ 📜Mapty-architecture-final.png
 ┃ ┣ 📜Mapty-flowchart.png
 ┃ ┣ 📜Screenshot -1.png
 ┃ ┗ 📜Screenshot -2.png
 ┣ 📂src
 ┃ ┣ 📂workout
 ┃ ┃ ┣ 📜Cycling.js
 ┃ ┃ ┣ 📜Running.js
 ┃ ┃ ┗ 📜Workout.js
 ┃ ┗ 📜App.js
 ┣ 📜.gitignore
 ┣ 📜index.html
 ┗ 📜README.md
```

</details>

## App Architecture

<details>
<summary>Click to expand!</summary>

![Mapty-architecture-final](https://user-images.githubusercontent.com/77184432/215296620-7d91a1fa-220c-44ae-96d0-4da3bc272886.png)

</details>

## Flowchart Diagram

<details>
<summary>Click to expand!</summary>

![Mapty-flowchart](https://user-images.githubusercontent.com/77184432/215296649-3baaaa71-065f-43e1-9570-ee8462e696bc.png)

</details>

## Installation 📥

```bash
> git clone https://github.com/AbdelrahmanShaheen/Mapty-App
> cd Mapty-App/
```

## How to use

Use live server extension \
or
install nodejs : [nodejs](https://nodejs.org/en/download/) \
then install live server as an npm package

```bash
> npm install live-server -g
> live-server
```

The application will be running on your localhost.

## API used 🧰

- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)
- [leaflet API](https://leafletjs.com/)

## Deployment/Live Demo

Deployed Website: [Mapty-workout-tracker](https://mapty-workout-tracker1.netlify.app/)

## Screen record

[Mapty-workout-tracker](https://www.youtube.com/watch?v=v79wDGakkZo)

## Note

Not mobile friendly.

## Future Feauters

Make the app responsive.
