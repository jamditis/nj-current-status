document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-stories");
  const trendingList = document.getElementById("trending-list");
  const dateRangeSelect = document.getElementById("trending-date-range");

  function fetchRssFeed(feedUrl) {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const url = proxyUrl + encodeURIComponent(feedUrl);

    return fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const items = xml.querySelectorAll("item");
        const articles = [];

        items.forEach((item) => {
          const title = item.querySelector("title").textContent;
          const link = item.querySelector("link").textContent;
          const description = item.querySelector("description").textContent;
          const pubDate = item.querySelector("pubDate").textContent;
          const imageUrl = item.querySelector("media\\:content, content")?.getAttribute("url") || "";

          articles.push({
            title,
            link,
            description,
            pubDate,
            imageUrl,
          });
        });

        return articles;
      });
  }

  function fetchNewsArticles(feedUrls) {
    Promise.all(feedUrls.map((feedUrl) => fetchRssFeed(feedUrl)))
      .then((allArticles) => {
        const articles = allArticles.flat();
        const sortedArticles = sortArticlesByDate(articles);
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
      imgElement.src = article.imageUrl;
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

function sortArticlesByDate(articles, descending = true) {
  return articles.sort((a, b) => {
    const dateA = new Date(a.pubDate);
    const dateB = new Date(b.pubDate);
    return descending ? dateB - dateA : dateA - dateB;
  });
}

function displayNewsArticles(articles, container) {
  container.innerHTML = "";

  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");

    const imgElement = document.createElement("img");
    imgElement.src = article.imageUrl;
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

function fetchNewsArticles(feedUrls) {
  Promise.all(feedUrls.map((feedUrl) => fetchRssFeed(feedUrl)))
    .then((allArticles) => {
      const articles = allArticles.flat();
      const sortedArticles = sortArticlesByDate(articles);
      displayNewsArticles(sortedArticles, newsContainer);
    })
    .catch((error) => {
      console.error("Error fetching news articles:", error);
    });
}

function fetchRssFeed(feedUrl) {
  const proxyUrl = "https://api.allorigins.win/raw?url=";
  const url = proxyUrl + encodeURIComponent(feedUrl);

  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const items = xml.querySelectorAll("item");
      const articles = [];

      items.forEach((item) => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const description = item.querySelector("description").textContent;
        const pubDate = item.querySelector("pubDate").textContent;
        const imageUrl = item.querySelector("media\\:content, content")?.getAttribute("url") || "";

        articles.push({
          title,
          link,
          description,
          pubDate,
          imageUrl,
        });
      });

      return articles;
    });
}
