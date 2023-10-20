
const searchButton = document.getElementById('searchButton');
const movieSearch = document.getElementById('movieSearch');
const movieResults = document.getElementById('movieResults');
const container = document.getElementById('forModal');
const apiKey = '820b9eeb';

function searchHandler(event) {

    let value
    if (event.target.matches(".bi-search") || event.target.matches("#searchButton")) {
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
                             <p class="card-text">${movie.Year} ${movie.Type}</p>
                             <button type="button" class="card-button" data-toggle="modal" 
                                data-target="#seeMoreModal">See More</button>
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

function movieDetail(event) {
    let value;

    if (event.target.matches("button")) {
        value = event.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log('hello')
    } else {
        value = "";
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${value}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                console.log(data);

                const seeMoreModal = document.createElement('div');
                seeMoreModal.setAttribute("class", "modal fade");
                seeMoreModal.setAttribute("id", "seeMoreModal");
                seeMoreModal.setAttribute("tabindex", "-1");
                seeMoreModal.setAttribute("role", "dialog");
                seeMoreModal.setAttribute("aria-labelledby", "modalLabel");
                seeMoreModal.setAttribute("aria-hidden", "true");
                seeMoreModal.innerHTML =
                    `<div class="modal-dialog modal-dialog-ceneterd" role="document">
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
                                    <button type="button" class="btn btn-secondary" id="closeModalBottom" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                    </div>`
                container.prepend(seeMoreModal);
                toggleModal();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function toggleModal() {
    $('#seeMoreModal').modal('toggle');
}

function disposeModal(event) {
    if (event.target.matches("#closeModalBottom")) {
        $("#seeMoreModal").remove();
        $('.modal-backdrop').remove();
        $('body').removeClass('modal fade');
        document.querySelector(".modal-open").style.overflow = "scroll";
    }
}

$('.modal').on('hidden.bs.modal', function () {
    console.log('IT IS HIDDEN!')
  }); 


localStorage.setItem("movieSearch", "Hulk");
document.getElementById("movieSearch").innerHTML = localStorage.getItem("movieSearch");

searchButton.addEventListener('click', searchHandler);
movieResults.addEventListener("click", movieDetail);
forModal.addEventListener("click", disposeModal);