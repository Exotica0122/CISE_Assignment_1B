import { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import Box from '@mui/material/Box';
const columns = [
  { id: "title", label: "Title", minWidth: 220 },
  { id: "authors", label: "Authors", minWidth: 100 },
  { id: "source", label: "Source", minWidth: 100 },
  { id: "pubyear", label: "Pub. Year", minWidth: 50 },
  { id: "doi", label: "DOI", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 75 },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const createData = (
  id,
  title,
  authors,
  source,
  pubyear,
  doi,
  claim,
  evidence
) => {
  return { id, title, authors, source, pubyear, doi, claim, evidence };
};

const ModeratorTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = props.articles.map((article) => {
    const { _id, title, authors, source, pubyear, doi, claim, evidence } =
      article;
    return createData(
      _id,
      title,
      authors,
      source,
      pubyear,
      doi,
      claim,
      evidence
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChecked = (articleId) => {
    const updateArticle = { status: "Checked" };
    axios
      .post(`http://localhost:8082/api/articles/update/${articleId}`, updateArticle)
      .then((res) => {
        alert("Article has been moderated!");
        window.location.reload(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error with accepting article!");
      });
  }

  const handleReject = (articleId) => {
    const updateArticle = { status: "Rejected" };
    axios
      .post(`http://localhost:8082/api/articles/update/${articleId}`, updateArticle)
      .then((res) => {
        alert("Article has been rejected!");
        window.location.reload(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error with rejecting article!");
      });
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "action") {
                        return (
                          <>
                            <Box
                              m={1}
                              display="flex"
                              alignItems="center"
                            >
                              <Button variant="contained" color="success" onClick={() => { if (window.confirm('Are you sure you want to moderate this article?')) { handleChecked(row.id) }; }}>Accept</Button>
                              <Button variant="outlined" color="error" onClick={() => { if (window.confirm('Are you sure you want to reject this article?')) { handleReject(row.id) }; }}>Reject</Button>
                            </Box>
                          </>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ModeratorTable;
