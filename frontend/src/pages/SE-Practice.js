import { useState, useEffect } from "react";
// import articles from "../dummydata/articles.js";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
import Dropdown from "../components/Dropdown.js";
import CustomizedTables from "../components/StyledTable";
import StyledPaginationTable from "../components/StyledPaginationTable";

import axios from "axios";

const SEPractice = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const dataColumn =
  //   articles.length > 0 ? (
  //     <Styles>
  //       <Table data={articles} columns={tablecolumns} />
  //     </Styles>
  //   ) : (
  //     <p>Loading articles</p>
  //   );

  //   const dataColumn =
  //     articles.length > 0 ? (
  //       <CustomizedTables articles={articles} />
  //     ) : (
  //       <p>Loading articles</p>
  //     );

  const dataColumn =
    articles.length > 0 ? (
      <StyledPaginationTable articles={articles} />
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
