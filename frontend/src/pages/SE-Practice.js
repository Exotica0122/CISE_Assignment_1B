import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown.js";
import ArticlesTable from "../components/ArticlesTable";

import axios from "axios";

const SEPractice = () => {
  const [articles, setArticles] = useState([]);

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

  const dataColumn =
    articles.length > 0 ? (
      <ArticlesTable articles={articles} />
    ) : (
      <p>Loading articles</p>
    );

  return (
    <div>
      <h2>Select SE Practice to get evidence for the claimed benefits</h2>
      <Dropdown />
      {dataColumn}
    </div>
  );
};

export default SEPractice;
