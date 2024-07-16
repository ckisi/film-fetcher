const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function () {
  const apiKey = "14fdd1f2";
  const searchInput = document.getElementById("movie-search").value;
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data received from the API
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const queryString = `./index.html?q=${searchInput}`;

  window.location.href = queryString;
});

// Gets the imdbID from the url
function getId() {
  const queryString = document.location.search;
  const filmId = queryString.split("=")[1];
  getFilmDetails(filmId);
}

// Calls the Movie of the Night API with the ID
function getFilmDetails(id) {
  const apiKey = "c915d76c2emsh5807295d7e091e0p12591ajsn9cc36b90575c";
  const url = `https://streaming-availability.p.rapidapi.com/shows/${id}`;

  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Call the display results function here
      displayDetailedResult(data);
      displayFilmDetails(data); //added to display film details
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

// Display Detailed Result fetched --> Testing
function displayDetailedResult(data) {
  // Just displaying a poster from a fixed source, only...^^.
  // Once Cole finishes the display function, it will be updated.
  // *** Create a new img element
  const imgElement = document.createElement("img");
  // *** Set the scr attribute to the URL of the image
  // imgElement.src = "https://m.media-amazon.com/images/M/MV5BMDQwOWQ0OGItNjJjYi00YzVjLTk4NmUtYzQ0NzUwZGY3NDZjXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg";
  imgElement.src = data.imageSet.verticalPoster.w360;
  // *** Get the container element where you want to display the image
  const container = document.getElementById("movie-poster");
  // *** Append the img element to the container
  container.appendChild(imgElement);

  // Display detailed contents
}
// Display the movie details on the page
function displayFilmDetails(data) {
  const movieDetailsContainer = document.getElementById("detailed-movie-info");
  const streamingData = data.streamingOptions.us;

  if (data.showType === "movie") {
    var movieDetailsContent = `
      <h2 class="title is-2 mb-6">${data.title}</h2>
      <p class="content is-size-4 has-margin-bottom-5">${data.overview}</p>
      <p class="content is-size-4 has-margin-bottom-5">Release Year: ${data.releaseYear}</p>
      <p class="content is-size-4 has-margin-bottom-5">Rating: ${data.rating}%</p>
      <p class="content is-size-4 has-margin-bottom-5">Runtime: ${data.runtime} mins</p>
    `;
  } else if (data.showType === "series") {
    var movieDetailsContent = `
      <h2 class="title is-2 mb-6">${data.title}</h2>
      <p class="content is-size-4 has-margin-bottom-5">${data.overview}</p>
      <p class="content is-size-4 has-margin-bottom-5">Release Year: ${data.firstAirYear}</p>
      <p class="content is-size-4 has-margin-bottom-5">Rating: ${data.rating}%</p>
      <p class="content is-size-4 has-margin-bottom-5">Episodes: ${data.episodeCount}</p>
    `;
  }

  let subscriptionDiv = document.createElement("div");

  for (let i = 0; i < streamingData.length; i++) {
    if (streamingData[i].type === "subscription") {
      // create element here with streamingData[i].service.name to get the name of the streaming service
      const streamingServiceElement = document.createElement("p");
      streamingServiceElement.innerHTML = `Streaming Service: ${streamingData[i].service.name}`;
      subscriptionDiv.append(streamingServiceElement);
    }
  }
  // console.log(parentDiv);
  movieDetailsContainer.innerHTML = movieDetailsContent;
  // Append movie details content to the container without overwriting existing content
  movieDetailsContainer.append(subscriptionDiv);
}

// Waits until the page is fully loaded
$(document).ready(function () {
  getId();
});
