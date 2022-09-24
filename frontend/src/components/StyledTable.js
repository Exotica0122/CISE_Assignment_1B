import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(title, authors, source, pubyear, doi, claim, evidence) {
  return { title, authors, source, pubyear, doi, claim, evidence };
}

export default function CustomizedTables(props) {
  const articles = props.articles;

  const rows = articles.map((article) => {
    const { title, authors, source, pubyear, doi, claim, evidence } = article;
    return createData(title, authors, source, pubyear, doi, claim, evidence);
  });

  console.log(rows);

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Authors</StyledTableCell>
            <StyledTableCell align="right">Source</StyledTableCell>
            <StyledTableCell align="right">Pub. Year</StyledTableCell>
            <StyledTableCell align="right">DOI</StyledTableCell>
            <StyledTableCell align="right">Claimed Benefit</StyledTableCell>
            <StyledTableCell align="right">Level of Evidence</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.authors}</StyledTableCell>
              <StyledTableCell align="right">{row.source}</StyledTableCell>
              <StyledTableCell align="right">{row.pubyear}</StyledTableCell>
              <StyledTableCell align="right">{row.doi}</StyledTableCell>
              <StyledTableCell align="right">{row.claim}</StyledTableCell>
              <StyledTableCell align="right">{row.evidence}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
