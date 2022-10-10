import { useState, useEffect } from "react";
import ModeratorTable from "../components/ModeratorTable";

import axios from "axios";

const Moderator = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/articles")
      .then((res) => {
        const checkedArticles = res.data;
        setArticles(checkedArticles.filter(article => article.status.includes('Unchecked')))
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
    <div className="content-center">
      <h1>Approve Articles Proposed by Users</h1>
      {dataColumn}
    </div>
  );
};

export default Moderator;
