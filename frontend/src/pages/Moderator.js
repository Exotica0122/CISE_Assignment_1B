import { useState, useEffect } from "react";
import ArticlesTable from "../components/ArticlesTable";
import ModeratorTable from "../components/ModeratorTable";

import axios from "axios";

const Moderator = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/articles")
      .then((res) => {
        setArticles(
          res.data.filter((article) => article.status === "Unchecked")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dataColumn =
    articles.length > 0 ? (
      <ModeratorTable articles={articles} />
    ) : (
      <p>Loading articles</p>
    );

  return (
    <div>
      <h2>Approve Articles Submitted by Users</h2>
      {dataColumn}
    </div>
  );
};

export default Moderator;
