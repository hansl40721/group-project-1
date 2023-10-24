const nytKey = 'l0OYvX9jhHcrYsBafJAYDjT66E0qCkLN';
const articleSearchButton = document.getElementById('articleSearchButton');
const articleSearch = document.getElementById('articleSearch');
var articleButtonContainerEl = document.getElementById('articleButtonContainer');
var previousSearchEl = document.getElementById('previousSearch');
var clearButton = document.getElementById('clearBtn');
const container = document.getElementById('forModal');

var articleSearched = [];

function storeSearch() {
    // Saving to local storage
    localStorage.setItem("articleSearched", JSON.stringify(articleSearched));
  }
  
  function init() {
    var storedSearch = JSON.parse(localStorage.getItem("articleSearched"));
  
    if (storedSearch !== null) {
      articleSearched = storedSearch;
    }
    renderStoredSearches();
  }
  
  function renderStoredSearches() {
    for (var i = 0; i < articleSearched.length; i++) {
      var searchedMovie = articleSearched[i];
  
      var articleSearchButton = document.createElement("div");
      articleSearchButton.setAttribute("class", "col-3");
      articleSearchButton.innerHTML = `<button type="button" class="btn btn-secondary 
      btn-block mt-1">${searchedMovie}</button>`;
  
      articleButtonContainerEl.append(articleSearchButton);
      articleSearchButton.addEventListener("click", articleSearchHandler);
    }
  }

function articleSearchHandler(event) {
    let value;
    if(event.target.matches("#articleSearchButton") || event.target.matches("#articleSearchIcon")) {
        value = articleSearch.value;
    } else {
        value = "";
    }

    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&fq=type_of_material:("Review")&api-key=${nytKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status === "OK") {

            articleResults.innerHTML = "";

            data.response.docs.forEach(article => {
                if (article.news_desk.includes("Movies") || article.headline.main.includes("Review")) {
                    const articleElement = document.createElement("div");
                    articleElement.setAttribute("class", "col-8");
                    articleElement.innerHTML = `
                        <div class ="card mt 3">
                            <div class="card-body">
                            <h5 class="card-title mx-auto justify-content-center align-content-center">${article.headline.main}</h5>
                                <p>${article.snippet}</p>
                                <button type="button" class="card-button">
                                    <a href="${article.web_url}">Read Full Article</a>
                                </button>
                            </div>
                        </div>
                    `;
                    articleResults.appendChild(articleElement);
                }
            });
        } else {
            articleResults.innerHTML = "<p>No results found.</p>"
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

function previousSearch(data) {
    console.log(data);
    // If this search already exists, don't append again.
    if (articleSearched.includes(value)) {
      return;
    } else {
      var previousSearchButton = document.createElement("div");
      previousSearchButton.setAttribute("class", "col-3");
      previousSearchButton.innerHTML = `<button type="button" class="btn btn-secondary 
    btn-block mt-1" id="previous">${value}</button>`;
      previousSearchEl.append(previousSearchButton);
      console.log(buttonContainerEl);
      previousSearchButton.addEventListener("click", searchHandler);
  
      articleSearched.push(value);
      storeSearch();
      console.log(articleSearched);
    }
  }

  function clearButtonHandler() {
    console.log("Ran");
    // Clears local storage
    window.localStorage.clear();
  
    // Clears the buttons
    articleButtonContainerEl.innerHTML = "";
    previousSearchEl.innerHTML = "";
    // location.reload();
  
    articleSearched = [];
  }


articleSearchButton.addEventListener("click", articleSearchHandler);
clearButton.addEventListener('click', clearButtonHandler);

init();