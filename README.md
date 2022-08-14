# Helsinki city bike app (Dev Academy pre-assignment)

This application is pre-assignment task for Solita Dev Academy. It's a simple project that fetches some city bike data from backend and displays it.

This application is created using technologies and frameworks such as:

- React
- TypeScript
- ts-node
- express
- Material UI

# Features

- memory-based backend
  - validate csv files and filter out unnesessary journeys
  - pagination and fetching spesific stations implemented into backend to avoid need to send large amounts of data
- fetch and display journey data on a table with pagination
- fetch and display all stations in a virtualized list
- display more information of station on click

# Preview

## Bike city trips table

![Trips table](https://i.postimg.cc/wTMm7CVY/ss2.png)

## Stations

![Stations list](https://i.postimg.cc/y6vR610T/ss1.png)

# How to run

## Prerequisites

You need to have [nodeJS](https://nodejs.org/en/) installed.

Project is developed and tested with:
- node version v16.13.2.
- Windows 10

## Commands to run in terminal

```
git clone git@github.com:Apluri/solita-dev-academy-pre-assignment.git
cd solita-dev-academy-pre-assignment\backend
npm install
npm run dev

now open another terminal (keep previous terminal open and server running)

cd solita-dev-academy-pre-assignment\frontend
npm install
npm start
```
