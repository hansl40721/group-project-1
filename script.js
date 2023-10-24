
const searchButton = document.getElementById('searchButton');
const movieSearch = document.getElementById('movieSearch');
const movieResults = document.getElementById('movieResults');
const findReviewsButton = document.getElementById('findReviews');
const container = document.getElementById('forModal');
var buttonContainerEl = document.getElementById('buttonContainer');
var clearButton = document.getElementById('clearBtn');
var previousSearchEl = document.getElementById('previousSearch');
const apiKey = '820b9eeb';

var searched = [];
let value;

function storeSearch() {
  // Saving to local storage
  localStorage.setItem("searched", JSON.stringify(searched));
}

function init() {
  var storedSearch = JSON.parse(localStorage.getItem("searched"));

  if (storedSearch !== null) {
    searched = storedSearch;
  }
  renderStoredSearches();
}

function renderStoredSearches() {
  for (var i = 0; i < searched.length; i++) {
    var searchedMovie = searched[i];

    var movieSearchButton = document.createElement("div");
    movieSearchButton.setAttribute("class", "col-3");
    movieSearchButton.innerHTML = `<button type="button" class="btn btn-secondary 
    btn-block mt-1">${searchedMovie}</button>`;

    buttonContainerEl.append(movieSearchButton);
    movieSearchButton.addEventListener("click", searchHandler);
  }
}

function searchHandler(event) {
  if (
    event.target.matches("#searchIcon") ||
    event.target.matches("#searchButton")
  ) {
    value = movieSearch.value.trim();
  } else {
    value = event.target.textContent.trim();
  }

  fetch(`https://www.omdbapi.com/?s=${value}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {

        movieResults.innerHTML = "";

        data.Search.forEach((movie) => {
          const movieElement = document.createElement("div");
          movieElement.setAttribute("class", "col-4");
          movieElement.innerHTML = `
                         <div class="card mt-5">
                         <div class="card-body">
                         <h5 class="card-title">${movie.Title}</h5>
                             <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title} Poster">
                             <p class="card-text">${movie.Year} ${movie.Type}</p>
                             <button type="button" class="card-button" data-toggle="modal" 
                                data-target="#seeMoreModal">See More</button>
                           </div>
                         </div>
                       </div>`;
          movieResults.appendChild(movieElement);
        });
        previousSearch(data);
      } else {
        movieResults.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function movieDetail(event) {
  let value;

  if (event.target.matches("button")) {
    value =
      event.target.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;
    // value = this.textContent;
  } else {
    value = "";
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        console.log(data);

        const seeMoreModal = document.createElement("div");
        seeMoreModal.setAttribute("class", "modal fade");
        seeMoreModal.setAttribute("id", "seeMoreModal");
        seeMoreModal.setAttribute("tabindex", "-1");
        seeMoreModal.setAttribute("role", "dialog");
        seeMoreModal.setAttribute("aria-labelledby", "modalLabel");
        seeMoreModal.setAttribute("aria-hidden", "true");
        seeMoreModal.innerHTML = `<div class="modal-dialog modal-dialog-ceneterd" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h4 class="card-title" id="modalLabel">${data.Title} (${data.Year} ${data.Genre})</h4>
                                </div>
                                <div class="modal-body">
                                    <img class="card-img-top" src="${data.Poster}" alt="${data.Title} Poster">
                                    <p class="card-text">Directed by: ${data.Director}</p>
                                    <p class="card-text">Written by: ${data.Writer}</p>
                                    <p class="card-text">Starring: ${data.Actors}</p>
                                    <p class="card-text">Released: ${data.Released}</p>
                                    <p class="card-text">Rating: ${data.Rated}</p>
                                    <p class="card-text">Box Office: ${data.BoxOffice}</p>
                                    <p class="card-text">Plot: ${data.Plot}</p>
                                    <p class="card-text">IMDb Rating: ${data.imdbRating}</p>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="findReviews">Find Reviews</button>    
                                <button type="button" class="btn btn-secondary" id="closeModalBottom" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                    </div>`;
        container.prepend(seeMoreModal);
        toggleModal();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function toggleModal() {
  $("#seeMoreModal").modal("toggle");
}

function disposeModal(event) {
  if (event.target.matches("#closeModalBottom")) {
    $("#seeMoreModal").remove();
    $(".modal-backdrop").remove();
    $("body").removeClass("modal fade");
    document.querySelector(".modal-open").style.overflow = "scroll";
  }
}

function previousSearch(data) {
  console.log(data);
  // If this search already exists, don't append again.
  if (searched.includes(value)) {
    return;
  } else {
    var previousSearchButton = document.createElement("div");
    previousSearchButton.setAttribute("class", "col-3");
    previousSearchButton.innerHTML = `<button type="button" class="btn btn-secondary 
  btn-block mt-1" id="previous">${value}</button>`;
    previousSearchEl.append(previousSearchButton);
    console.log(buttonContainerEl);
    previousSearchButton.addEventListener("click", searchHandler);

    searched.push(value);
    storeSearch();
    console.log(searched);
  }
}

function clearButtonHandler() {
  console.log("Ran");
  // Clears local storage
  window.localStorage.clear();

  // Clears the buttons
  buttonContainerEl.innerHTML = "";
  previousSearchEl.innerHTML = "";
  // location.reload();

  searched = [];
}

searchButton.addEventListener("click", searchHandler);
movieResults.addEventListener("click", movieDetail);
forModal.addEventListener("click", disposeModal);
clearButton.addEventListener('click', clearButtonHandler);

init();
