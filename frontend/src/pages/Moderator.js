import { useState, useEffect, useReducer } from "react";
import ModeratorTable from "../components/ModeratorTable";
import {
  Box,
  Button,
  FormControl,
} from "@mui/material";
import axios from "axios";

const Moderator = ({ onLogin, currentUser }) => {
  const [articles, setArticles] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [qtyPendingMod, setQtyPendingMod] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/articles")
      .then((res) => {
        const checkedArticles = res.data;
        setArticles(checkedArticles.filter(article => article.status.includes('Unchecked')))
        const totalmodCount = res.data.filter(article => article.status.includes('Unchecked'));
        setQtyPendingMod(totalmodCount.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reducerValue]);

  function updateNotification() {
    onLogin("", "moderator", qtyPendingMod);
  }
  const dataColumn =
    articles.length > 0 ? (
      <ModeratorTable articles={articles} />
    ) : (
      <p>Loading articles</p>
    );

  if (currentUser.type !== 'moderator') {
    return <h1>Sorry. You dont have access to this page</h1>
  }

  return (
    <div className="content-center">
      <h1>Moderate Articles Proposed by Users</h1>
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

export default Moderator;
