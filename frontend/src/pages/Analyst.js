import { useState, useEffect, useReducer } from "react";
import AnalystTable from "../components/AnalystTable";
import '../index.css';
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
} from "@mui/material";

const Analyst = ({ onLogin, currentUser }) => {
    const [articles, setArticles] = useState([]);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [qtyPendingAna, setQtyPendingAna] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:8082/api/articles")
            .then((res) => {
                setArticles(
                    res.data.filter((article) => article.status === "Checked")
                );
                const totalanaCount = res.data.filter(article => article.status.includes('Checked'));
                setQtyPendingAna(totalanaCount.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reducerValue]);

    function updateNotification() {
        onLogin("", "analyst", qtyPendingAna);
    }

    const dataColumn =
        articles.length > 0 ? (
            <AnalystTable articles={articles} />
        ) : (
            <p>Loading articles</p>
        );
    if (currentUser.type !== 'analyst') {
        return <h1>Sorry. You dont have access to this page</h1>
    }
    return (
        <div className="content-center">
            <h1>Analyse Articles</h1>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <FormControl fullWidth sx={{ m: 1, width: '25ch' }}>
                    <Button
                        type="submit"
                        margin="normal"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            forceUpdate();
                            updateNotification();
                        }}
                    >
                        Refresh Table
                    </Button>
                </FormControl>
            </Box>
            {dataColumn}
        </div>
    );
};

export default Analyst;
