
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
        value = event;
    }
    
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

localStorage.setItem("movieSearch", "Hulk");
document.getElementById("movieSearch").innerHTML = localStorage.getItem("movieSearch");

movieResults.addEventListener("click", movieDetail);