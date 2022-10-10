import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown.js";
import ArticlesTable from "../components/ArticlesTable";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, IconButton } from "@mui/material";

import axios from "axios";

const SEPractice = () => {
  const [articles, setArticles] = useState([]);
  const [practice, setPractice] = useState("");
  const [search, setSearch] = useState("");

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

  if (search) {
    if (practice === "TDD") {
      filteredArticle = articles.filter(
        (article) => article.sepractice === "TDD" && article.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (practice === "Mob programming") {
      filteredArticle = articles.filter(
        (article) => article.sepractice === "Mob programming" && article.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else {
      filteredArticle = articles.filter(
        (article) => article.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  let dataColumn =
    articles.length > 0 ? (
      <ArticlesTable articles={filteredArticle} />
    ) : (
      <p>Loading articles</p>
    );


  return (
    <div>
      <div className="content-center">
        <h1>View Articles</h1>
      </div>
      <Dropdown setPractice={setPractice} />
      <TextField
        value={search}
        onChange={handleSearchChange}
        margin="normal"
        style={{ textAlign: "right", float: "right" }}
        label="Search Article"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {dataColumn}
    </div>
  );
};

export default SEPractice;
