import { useState, useEffect } from "react";
import ModeratorTable from "../components/ModeratorTable";

import axios from "axios";

const Moderator = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://yung-blad-articles.herokuapp.com/api/articles")
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
    <div>
      <h2>Approve Articles Submitted by Users</h2>
      {dataColumn}
    </div>
  );
};

export default Moderator;
