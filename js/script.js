document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-stories");
  const trendingList = document.getElementById("trending-list");
  const dateRangeSelect = document.getElementById("trending-date-range");

  function fetchNewsArticles(feedUrls) {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    Promise.all(feedUrls.map((feedUrl) => fetchRssFeed(feedUrl)))
      .then((allArticles) => {
        const articles = allArticles.flat();
        const sortedArticles = sortArticlesByDate(articles);

        // Filter articles based on user input
        const filteredArticles = filterArticles(sortedArticles);

        // Display filtered articles
        displayNewsArticles(filteredArticles, newsContainer);

        spinner.style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
        spinner.style.display = "none";
      });
  }

  function filterArticles(articles) {
    const sourceFilter = document.getElementById("source-filter").value;
    const categoryFilter = document.getElementById("category-filter").value;
    const dateFilter = document.getElementById("date-filter").value;

    return articles.filter((article) => {
      let include = true;

      if (sourceFilter && article.source !== sourceFilter) {
        include = false;
      }

      if (categoryFilter && !article.categories.includes(categoryFilter)) {
        include = false;
      }

      if (dateFilter && Date.now() - new Date(article.pubDate) > dateFilter * 3600 * 1000) {
        include = false;
      }

      return include;
    });
  }

  function sortArticles(articles) {
    const newestButton = document.getElementById("sort-newest");
    const oldestButton = document.getElementById("sort-oldest");
    const relevanceButton = document.getElementById("sort-relevance");

    newestButton.addEventListener("click", () => {
      const sortedArticles = sortArticlesByDate(articles, true);
      const filteredArticles = filterArticles(sortedArticles);
      displayNewsArticles(filteredArticles, newsContainer);
    });

    oldestButton.addEventListener("click", () => {
      const sortedArticles = sortArticlesByDate(articles, false);
      const filteredArticles = filterArticles(sortedArticles);
      displayNewsArticles(filteredArticles, newsContainer);
    });

    relevanceButton.addEventListener("click", () => {
      // Implement sorting by relevance here
      alert("Sorting by relevance coming soon!");
    });
  }

  function displayNewsArticles(articles, container) {
    container.innerHTML = "";

    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");

      if (article.imageUrl) {
        const imgElement = document.createElement("img");
        imgElement.src = article.imageUrl;
        imgElement.alt = article.title;
        articleElement.appendChild(imgElement);
      }

      const titleElement = document.createElement("h3");
      titleElement.textContent = article.title;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = article.description;

      articleElement.appendChild(titleElement);
      articleElement.appendChild(descriptionElement);
      container.appendChild(articleElement);
    });
  }

  function sortArticlesByDate(articles, descending = true) {
    return articles.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      return descending ? dateB - dateA : dateA - dateB;
    });
  }

  fetchNewsArticles([
  "http://rssfeeds.northjersey.com/northjerseynews",
  "http://rssfeeds.app.com/asburypark/home",
  "https://njbiz.com/feed/?cat=630,231,275,232,216,217,233,276,219,218",
  "https://www.roi-nj.com/feed/",
  "https://pressofatlanticcity.com/search/?q=",
  "https://www.70and73.com/",
  "https://www.njspotlightnews.org/news/feed/",
  "https://www.nj.com/arc/outboundfeeds/rss/?outputType=xml",
]);

function filterArticles(articles) {
  const sourceFilter = document.getElementById("source-filter").value;
  const categoryFilter = document.getElementById("category-filter").value;
  const dateFilter = document.getElementById("date-filter").value;

  return articles.filter((article) => {
    let include = true;

    if (sourceFilter && article.source !== sourceFilter) {
      include = false;
    }

    if (categoryFilter && !article.categories.includes(categoryFilter)) {
      include = false;
    }

    if (dateFilter && Date.now() - new Date(article.pubDate) > dateFilter * 3600 * 1000) {
      include = false;
    }

    return include;
  });
}

function sortArticlesByDate(articles, descending = true) {
  return articles.sort((a, b) => {
    const dateA = new Date(a.pubDate);
    const dateB = new Date(b.pubDate);
    return descending ? dateB - dateA : dateA - dateB;
  });
}
  
