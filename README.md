# Movie Searching App

This is a ReactJS application that allows users to search for movies and get details about a specific movie.

## Components

### ContextProvider.jsx

This component provides the context for the application. It contains the state for the application, including the data, search query, loading state, error state, API key, page number, and type of search.

### NavBar.jsx

This component renders the navigation bar of the application. It contains a search form, a link to the homepage, and a link to the movie details page.

### Footer.jsx

This component renders the footer of the application. It displays the copyright information and a link to the homepage.

## Pages

### Home.jsx

This page renders the homepage of the application. It displays a search form, a list of movies, and pagination buttons.

### MovieDetail.jsx

This page renders the movie details page. It displays the movie title, year, plot, and poster.

### PageNotFound.jsx

This page renders a 404 page not found page. It displays a message indicating that the page was not found.



## How to use

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Start the development server by running `npm run dev`.

## Features

- Search for movies by title or type
- Get details about a specific movie
- Paginate through search results
- Display a 404 page not found page if the page is not found

## Technologies used

- ReactJS
- Vite
- Tailwind CSS
- Flowbite
- Axios
- React Router DOM

