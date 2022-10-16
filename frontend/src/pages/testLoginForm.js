import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
} from "@mui/material";
import axios from "axios";


function TestLoginForm({ onLogin, currentUser }) {
    const users = [{
        email: "admin@test.com",
        password: "admin",
        type: 'moderator'
    }, {
        email: "analyst@test.com",
        password: "admin",
        type: 'analyst'
    }]

    const [details, setDetails] = useState({ name: "", email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [qtyPendingItem, setQtyPendingItem] = useState(0);

    const logOff = () => {
        setDetails({ name: "", email: "", password: "" });
        setRefresh(!refresh);
        onLogin('', '');
    }

    const submitHandler = e => {
        e.preventDefault();

        const selectedUser = users.find(h => h.email === details.email && h.password === details.password);

        if (selectedUser !== null) {
            setErrorMsg("");
            onLogin(selectedUser.name, selectedUser.type, qtyPendingItem);
        } else {
            setErrorMsg("Details do not match");
        }
    }

    useEffect(() => {
        console.log('effect')
        axios
            .get("http://localhost:8082/api/articles")
            .then((res) => {
                const total = res.data.filter(article => article.status.includes('Unchecked'));
                setQtyPendingItem(total.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [refresh]);



    if (currentUser.type !== '') {
        return (
            <Box>
                <Button
                    type="submit"
                    margin="normal"
                    variant="contained"
                    color="primary"
                    onClick={logOff}>Logoff</Button>
            </Box>
        );
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {(errorMsg !== "") ? (<div className="error">{errorMsg}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' id='name' onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name='email' id='email' onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name='password' id='password' onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>
                <input type="submit" value="Login"></input>

            </div>
        </form>

    )
}

export default TestLoginForm;