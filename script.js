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
                         movieElement.innerHTML = `
                <h2>${movie.Title}</h2>
                     <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                            <p>IMDb ID: ${movie.imdbID}</p>
                           `;
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