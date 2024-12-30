import React, { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [articles, setArticles] = useState([]);
  const API_KEY = "YOUR_NEWSAPI_KEY";

  useEffect(() => {
    axios
      .get("https://newsapi.org/v2/everything", {
        params: {
          q: "cryptocurrency",
          sortBy: "publishedAt",
          apiKey: API_KEY,
        },
      })
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cryptocurrency News</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
