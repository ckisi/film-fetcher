const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function() {
    const apiKey = '14fdd1f2';
    const searchInput = document.getElementById('movie-search').value;
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the data received from the API
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    const queryString = `./index.html?q=${searchInput}`;

    window.location.href = queryString;
});

// Gets the imdbID from the url
function getId() {
    const queryString = document.location.search;
    const filmId = queryString.split('=')[1];
    getFilmDetails(filmId);
}

// Calls the Movie of the Night API with the ID
function getFilmDetails(id) {
    const apiKey = '51d8fb5913msh3d8b7b25194e55ep1930e9jsnb3c0ed44a727';
    const url = `https://streaming-availability.p.rapidapi.com/shows/${id}`;

    fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Call the display results function here
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
}

// Waits until the page is fully loaded
$(document).ready(function() {
    getId();
});