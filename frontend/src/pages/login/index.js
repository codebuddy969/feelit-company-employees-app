import React, {useState} from "react";
import {TextField, Button, Box} from "@mui/material";

function LoginPage() {
    const [useremail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically make an API call to authenticate the user
        console.log("Useremail:", useremail);
        console.log("Password:", password);
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto", mt: 10}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Useremail"
                    value={useremail}
                    onChange={handleUserEmailChange}
                    fullWidth
                    margin="normal"
                    className="input"
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
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
