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
})