const nytKey = 'l0OYvX9jhHcrYsBafJAYDjT66E0qCkLN';
const articleSearchButton = document.getElementById('articleSearchButton');
const articleSearch = document.getElementById('articleSearch');
export {articleSearchHandler};

function articleSearchHandler(event) {
    let value;
    if(event.target.matches("#articleSearchButton") || event.target.matches(".bi-search")) {
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


articleSearchButton.addEventListener("click", articleSearchHandler);