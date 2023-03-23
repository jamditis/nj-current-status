document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "c3a1e9c543ac4cdb9162bdc8f3c644d1";
  const newsContainer = document.getElementById("news-stories");
  const trendingList = document.getElementById("trending-list");
  const dateRangeSelect = document.getElementById("trending-date-range");

  function fetchTopHeadlines() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&q=New%20Jersey&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const sortedArticles = sortArticlesByDate(data.articles);
        displayNewsArticles(sortedArticles, newsContainer);
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
      });
  }

  function displayNewsArticles(articles, container) {
    container.innerHTML = "";

    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");

      const imgElement = document.createElement("img");
      imgElement.src = article.urlToImage;
      imgElement.alt = article.title;

      const titleElement = document.createElement("h3");
      titleElement.textContent = article.title;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = article.description;

      articleElement.appendChild(imgElement);
      articleElement.appendChild(titleElement);
      articleElement.appendChild(descriptionElement);
      container.appendChild(articleElement);
    });
  }

function sortArticlesByDate(articles, descending = true) {
    return articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return descending ? dateB - dateA : dateA - dateB;
    });
  }

  function filterArticlesBySource(articles, sourceId) {
    return articles.filter((article) => article.source.id === sourceId);
  }

  fetchTopHeadlines();
});
