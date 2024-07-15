const searchButton = document.getElementById("search-button");
const myModal = document.getElementById("myModal");
const modalClose = document.getElementById("modalClose");
// added modal to base
// added read history to add local storage for searched items
function readHistory() {
  let searches = JSON.parse(localStorage.getItem("searches"));
  if (!searches) {
    // added array for searches and to return them to array
    searches = [];
  }
  return searches;
}
//added if the search for the movie search is empty the modal will open
// added modal to base
searchButton.addEventListener("click", function () {
  const apiKey = "14fdd1f2";
  const searchInput = document.getElementById("movie-search").value;
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`; //added s to https
  if (document.getElementById("movie-search").value === "") {
    myModal.classList.add("is-active");
  }
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
      displayResults(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  // added if to make sure the search bar is not empty. If empty search then it wont show in local storage
  if (searchInput.trim() !== "") {
    let searches = readHistory();
    // added code to push searchInput and to stringify searches into array
    searches.push(searchInput);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
});
modalClose.addEventListener("click", () => {
  myModal.classList.remove("is-active");
});
// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === myModal) {
    myModal.classList.remove("is-active");
  }
});

// Displays the search results on the page
function displayResults(results) {
  $("#search-results").empty();

  if (!results.Search || results.Search.length === 0) {
    $("#search-results").text("No results found");
    return;
  }

  for (let i = 0; i < results.Search.length; i++) {
    const resultId = results.Search[i].imdbID;

    const resultColumn = $("<div>").addClass("column is-12");

    const resultCard = $("<a>")
      .addClass("box")
      .attr("href", `./result.html?i=${resultId}`);

    const resultH3 = $("<h3>").text(
      `${results.Search[i].Title} (${results.Search[i].Year})`
    );

    resultCard.append(resultH3);
    resultColumn.append(resultCard);
    $("#search-results").append(resultColumn);
  }
}

// Handles three category buttons: 'Movie', 'Show' and 'Episode'
const categoryButtonHandler = function (event) {
  const category = event.target.getAttribute("data-category");
  if (category) {
    getCategoryResults(category);
  }
};

// Fetch the information for the button selected
const getCategoryResults = function (category) {
  let searchInput = document.getElementById("movie-search").value;

  if (searchInput === "") {
    const currentUrl = document.location.search;
    if (currentUrl.includes("q=")) {
      searchInput = currentUrl.split("=")[1];
    }
  }
  const apiKey = "14fdd1f2";
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}&type=${category}`;
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

// will call the API only when redirected back to the page
const reSearchApi = function () {
  const currentUrl = document.location.search;
  if (currentUrl.includes("q=")) {
    const newSearch = currentUrl.split("=")[1];
    const apiKey = "14fdd1f2";
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${newSearch}`;

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
        displayResults(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
};

// Event listener for each Button
$(document).ready(function () {
  $(".category-button").on("click", categoryButtonHandler);
  reSearchApi();
});
