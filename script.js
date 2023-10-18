
const searchButton = document.getElementById('searchButton');
        const movieSearch = document.getElementById('movieSearch');
        const movieResults = document.getElementById('movieResults');

        searchButton.addEventListener('click', () => {

            const apiKey = '820b9eeb';
            

            fetch(`https://www.omdbapi.com/?s=${movieSearch.value}&apikey=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === "True") {
                        console.log(data);

                        movieResults.innerHTML = '';
                        
                        data.Search.forEach(movie => {
                            const movieElement = document.createElement('div');
                         movieElement.innerHTML = `<div class="col-12 col-lg-2">
                         <div class="card">
                         <div class="card-body">
                         <h5 class="card-title">${movie.Title}</h5>
                             <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title} Poster">
                             <p class="card-text">${movie.Year}</p>
                             <p class="card-text">${movie.Type}</p>
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
        });
