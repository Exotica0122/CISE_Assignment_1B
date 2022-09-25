import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown.js";
import ArticlesTable from "../components/ArticlesTable";

import axios from "axios";

const SEPractice = () => {
  const [articles, setArticles] = useState([]);
  const [practice, setPractice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/articles")
      .then((res) => {
        setArticles(
          res.data.filter((article) => article.status === "Approved")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let filteredArticle = articles;
  if (practice && practice !== "none") {
    filteredArticle = articles.filter(
      (article) => article.sepractice === practice
    );
  }

  let dataColumn =
    articles.length > 0 ? (
      <ArticlesTable articles={filteredArticle} />
    ) : (
      <p>Loading articles</p>
    );

  return (
    <div>
      <h2>Select SE Practice to get evidence for the claimed benefits</h2>
      <Dropdown setPractice={setPractice} />
      {dataColumn}
    </div>
  );
};

export default SEPractice;
