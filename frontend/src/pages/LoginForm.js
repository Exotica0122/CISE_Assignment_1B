import React, { useState, useEffect } from "react";
import { Box, Button, TextField, FormControl } from "@mui/material";
import axios from "axios";

function LoginForm({ onLogin, currentUser }) {
    const users = [
        {
            email: "moderator@test.com",
            password: "moderator",
            type: "moderator",
        },
        {
            email: "analyst@test.com",
            password: "analyst",
            type: "analyst",
        },
    ];

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [qtyPendingItem, setQtyPendingItem] = useState(0);
    const [qtyPendingItemAnalyst, setQtyPendingItemAnalyst] = useState(0);

    const logOff = () => {
        setDetails({ name: "", email: "", password: "" });
        setRefresh(!refresh);
        onLogin("", "");
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const selectedUser = users.find(
            (h) => h.email === details.email && h.password === details.password
        );

        if (selectedUser !== null) {
            if (selectedUser.type === "moderator") {
                setErrorMsg("");
                onLogin(selectedUser.name, selectedUser.type, qtyPendingItem);
            } else {
                setErrorMsg("");
                onLogin(
                    selectedUser.name,
                    selectedUser.type,
                    qtyPendingItemAnalyst
                );
            }
        } else {
            setErrorMsg("Details do not match");
        }
    };

    useEffect(() => {
        console.log("effect");
        axios
            .get("http://localhost:8082/api/articles")
            .then((res) => {
                const total = res.data.filter((article) =>
                    article.status.includes("Unchecked")
                );
                setQtyPendingItem(total.length);
                const totalanalyst = res.data.filter((article) =>
                    article.status.includes("Checked")
                );
                setQtyPendingItemAnalyst(totalanalyst.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [refresh]);

    if (currentUser.type !== "") {
        return (
            <Box>
                <Button
                    type="submit"
                    margin="normal"
                    variant="contained"
                    color="primary"
                    onClick={logOff}
                >
                    Log Out
                </Button>
            </Box>
        );
    }

    return (
        <form onSubmit={submitHandler}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <FormControl fullWidth sx={{ m: 1, width: "65ch" }}>
                    <h1 className="content-center" data-testid="title">
                        Login
                    </h1>
                    {errorMsg !== "" ? (
                        <div className="error">{errorMsg}</div>
                    ) : (
                        ""
                    )}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Name"
                        onChange={(e) =>
                            setDetails({ ...details, name: e.target.value })
                        }
                        value={details.name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Email"
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        }
                        value={details.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Password"
                        type="password"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                        value={details.password}
                    />
                    <Button
                        type="submit"
                        margin="normal"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </FormControl>
            </Box>
        </form>
    );
}

export default LoginForm;
