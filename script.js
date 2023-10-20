
const searchButton = document.getElementById('searchButton');
const movieSearch = document.getElementById('movieSearch');
const movieResults = document.getElementById('movieResults');

function searchHandler(event) {
    const apiKey = '820b9eeb';
    let value
    console.log(event.target);
    if(event.target.matches(".bi-search") || event.target.matches("#searchButton")) {
        value = movieSearch.value;
    } else {
        value = event.target.textContent;
    }
    console.log(value);
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                console.log(data);

                movieResults.innerHTML = '';

                data.Search.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.setAttribute("class", "col-4");
                    movieElement.innerHTML = `
                         <div class="card mt-5">
                         <div class="card-body">
                         <h5 class="card-title">${movie.Title}</h5>
                             <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title} Poster">
                             <p class="card-text">${movie.Year} ${movie.Type} directed by ${movie.Director}</p>
                             <button class="card-button">See More</button>
                           </div>
                         </div>
                       </div>`;
                    movieResults.appendChild(movieElement);
                });
                previousSearch(data);
            } else {
                movieResults.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

searchButton.addEventListener('click', searchHandler);

function movieDetail(event) {
    if (event.target.matches("button")) {
        console.dir(event.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    }
}

function previousSearch(data) {
    // Issue: If button is clicked, another previous search is appended.
    console.log(data);
    var previousSearchButton = document.createElement('div');
    previousSearchButton.setAttribute("class", "col-3");
    previousSearchButton.innerHTML = `<button type="button" class="btn btn-secondary 
  btn-block mt-1" id="previous">${movieSearch.value}</button>`;
  document.body.append(previousSearchButton);
  previousSearchButton.addEventListener("click", searchHandler);
}


localStorage.setItem("movieSearch", "Hulk");
document.getElementById("movieSearch").innerHTML = localStorage.getItem("movieSearch");

movieResults.addEventListener("click", movieDetail);
