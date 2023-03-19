import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {TextField, Button, Box} from "@mui/material";

import { useStoreMutation } from "../../utilities/redux/services/api.service";

function LoginPage() {
    const [useremail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [loginData] = useStoreMutation();

    const handleSubmit = (event) => {
        event.preventDefault();
        loginData({url: "login", body: {email: useremail, password: password}}).then(response => {
            localStorage.setItem('bearerToken', response.data.token);
            navigate("/companies");
        });
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto", mt: 10}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Useremail"
                    value={useremail}
                    onChange={(event) => setUserEmail(event.target.value)}
                    fullWidth
                    margin="normal"
                    className="input"
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    fullWidth
                    margin="normal"
                    type="password"
                    sx={{color: "white"}}
                />
                <Button type="submit" variant="contained" sx={{mt: 3}}>
                    Login
                </Button>
            </form>
        </Box>
    );
}

export default LoginPage;
