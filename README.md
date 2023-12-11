# Project Exam - VenueVista

[![Netlify Status](https://api.netlify.com/api/v1/badges/439306e5-4b38-42fb-aae1-64b6dec09eec/deploy-status)](https://app.netlify.com/sites/omk-holidaze/deploys)

## Goal

To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate’s general development capabilities, in addition to visual and technical skills.

## Brief

A newly launched accommodation booking site called Holidaze has approached you to develop a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and an admin-facing side of the website where users can register and manage venues and bookings at those venues.

## Process

1. [x] A user may view a list of Venues
2. [x] A user may search for a specific Venue
3. [x] A user may view a specific Venue page by id
4. [x] A user may view a calendar with available dates for a Venue
5. [x] A user with a stud.noroff.no email may register as a customer
6. [x] A registered customer may create a booking at a Venue
7. [x] A registered customer may view their upcoming bookings
8. [x] A user with a stud.noroff.no email may register as a Venue manager
9. [x] A registered Venue manager may create a Venue
10. [x] A registered Venue manager may update a Venue they manage
11. [x] A registered Venue manager may delete a Venue they manage
12. [x] A registered Venue manager may view bookings for a Venue they manage
13. [x] A registered user may login
14. [x] A registered user may update their avatar
15. [x] A registered user may logout

## Used Resources

- React
- Vite
- Tailwindcss
- npm
- - Helmet
- - react-router-dom
- - react-hook-form
- - react-calendar

## User Testing

### Remote testing

I had two people from the class test my website remotely, give me feedback and adjust my code thereafter.

### In-person testing

I had three different people use and test my webpage in-person while I watched, without trying to guide them on using the webpage.

The following devices was used:

| First user                   | Second user     | Third user      |
| ---------------------------- | --------------- | --------------- |
| Windows 1920x1080 Stationary | MacBook pro 13" | MacBook pro 13" |
| iPhone 13                    | iPhone 14       | iPhone 13       |

First user had difficulties reading on some paragraphs, so I justed fonts.

Second user had a lot of white space between body and footer, also needed a little guiding on how to create a venue

Third user wanted more margin in the description paragraph on the venue page on mac

## Available Scripts

In the project directory, you can run:

1. Clone the repo:

```bash
git clone git@github.com:NoroffFEU/portfolio-1-example.git
```

2. Install the dependencies:

```
npm install
```

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
