import { useState, useEffect } from "react";
// import articles from "../dummydata/articles.js";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumnsmod.js";
import Dropdown from "../components/Dropdown.js";

import axios from "axios";

const Moderator = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/articles`)
            .then((res) => {
                //Filtering articles that are unchecked for moderator
                const checkedArticles = res.data;
                setArticles(checkedArticles.filter(article => article.status.includes('Unchecked')))
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const dataColumn =
        articles.length > 0 ? (
            <Styles>
                <Table data={articles} columns={tablecolumns} />
            </Styles>
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

export default Moderator;
