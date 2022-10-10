import { useState, useEffect } from "react";
import AnalystTable from "../components/AnalystTable";
import '../index.css';
import axios from "axios";

const Analyst = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/articles")
            .then((res) => {
                setArticles(
                    res.data.filter((article) => article.status === "Checked")
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const dataColumn =
        articles.length > 0 ? (
            <AnalystTable articles={articles} />
        ) : (
            <p>Loading articles</p>
        );

    return (
        <div className="content-center">
            <h1>Analyse Articles</h1>
            {dataColumn}
        </div>
    );
};

export default Analyst;
