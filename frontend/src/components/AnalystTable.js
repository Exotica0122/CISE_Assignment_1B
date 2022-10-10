import { useState } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
    Modal,
    Box,
    Typography,
    Button,
    FormControl,
    TextField,
} from "@mui/material";
import axios from "axios";

const columns = [
    { id: "title", label: "Title", minWidth: 220 },
    { id: "authors", label: "Authors", minWidth: 100 },
    { id: "source", label: "Source", minWidth: 100 },
    { id: "pubyear", label: "Pub. Year", minWidth: 50 },
    { id: "doi", label: "DOI", minWidth: 100 },
    { id: "claim", label: "Claim", minWidth: 75 },
    { id: "evidence", label: "Evidence", minWidth: 75 },
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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const AnalystTable = (props) => {
    const [claim, setClaim] = useState("");
    const [evidence, setEvidence] = useState("");

    const [id, setId] = useState();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = (articleId) => {
        setId(articleId);
        setOpen(true);
    };
    const handleClose = () => {
        setId(undefined);
        setOpen(false);
    };

    // history
    const history = useHistory();

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

    const handleReject = (articleId) => {
        const updateArticle = { status: "Rejected" };
        axios
            .post(
                `http://localhost:8082/api/articles/update/${articleId}`,
                updateArticle
            )
            .then((res) => {
                alert("Article has been rejected!");
                window.location.reload(false);
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error with rejecting article!");
            });
    };

    const claimChangeHandler = (event) => {
        setClaim(event.target.value);
    };
    const evidenceChangeHandler = (event) => {
        setEvidence(event.target.value);
    };

    const claimAndEvidenceSubmitHandler = (event) => {
        event.preventDefault();

        axios
            .post(`http://localhost:8082/api/articles/analyst/${id}`, {
                claim,
                evidence,
            })
            .then((response) => {
                console.log(response);
                history.push("/SEPractice");
            })
            .catch((err) => console.log(err));
    };

    const modal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h4">Add Claim and Evidence</Typography>

                <form onSubmit={claimAndEvidenceSubmitHandler}>
                    <FormControl>
                        <TextField
                            id="outlined-claim-input"
                            label="Claim"
                            variant="outlined"
                            margin="normal"
                            value={claim}
                            onChange={claimChangeHandler}
                        />
                        <TextField
                            id="outlined-evidence-input"
                            label="Evidence"
                            variant="outlined"
                            margin="normal"
                            value={evidence}
                            onChange={evidenceChangeHandler}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            margin="normal"
                            sx={{ my: 2 }}
                        >
                            Upload
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            margin="normal"
                            sx={{ my: 2 }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Modal>
    );

    return (
        <>
            {modal}
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
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === "action") {
                                                    return (
                                                        <>
                                                            <Box
                                                                m={2}
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    onClick={() =>
                                                                        handleOpen(
                                                                            row.id
                                                                        )
                                                                    }
                                                                >
                                                                    Accept
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm(
                                                                                "Are you sure you want to reject this article?"
                                                                            )
                                                                        ) {
                                                                            handleReject(
                                                                                row.id
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </Box>
                                                        </>
                                                    );
                                                }
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format &&
                                                            typeof value ===
                                                            "number"
                                                            ? column.format(
                                                                value
                                                            )
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
        </>
    );
};

export default AnalystTable;
