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
       displayResults(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
})

function displayResults(results) {
    $('#search-results').empty();
    
    if (!results.Search || results.Search.length === 0) {
        $('#search-results').text('No results found');
        return;
    } 

    for (let i = 0; i < results.Search.length; i++) {
        const resultColumn = $('<div>')
        .addClass('column is-12');
        
        const resultCard = $('<div>')
            .addClass('box');

        const resultH3 = $('<h3>')
            .text(`${results.Search[i].Title}`);

        resultCard.append(resultH3);
        resultColumn.append(resultCard);
        $('#search-results').append(resultColumn);
    }
}
// Handles three category buttons: 'Movie', 'Show' and 'Episode'
const categoryButtonHandler = function (event) {
    const category = event.target.getAttribute('data-category');
    if (category) {
        getCategoryResults(category);
      repoContainerEl.textContent = '';
    }
  };

// Fetch the information for the button selected
  const getCategoryResults = function (category) {
    const searchInput = document.getElementById('movie-search').value;
    const apiKey = '14fdd1f2';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}&type=${category}`;
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayResults(data);
        });
      } else {
        alert(`Error: Cannot get response...!`);
      }
    });
  };

  // Event listener for each Button
  $(".category-button").on("click", categoryButtonHandler);