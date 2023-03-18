import React, {useState} from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DataTable from "../../components/dataTable";

function Modal({name = "", email = ""}) {
    const [companyName, setCompanyName] = useState(name);
    const [companyEmail, setCompanyEmail] = useState(email);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically make an API call to authenticate the user
        console.log("Useremail:", companyName);
        console.log("Password:", companyEmail);
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto"}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="input"
                />
                <TextField
                    label="Company email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="text"
                />
                <Button type="submit" variant="contained" sx={{mt: 3}}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

function Companies() {

    const [editableInfo, SetEditableInfo] = useState({name: "", email: ""});

    const headCells = [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: "Name",
        },
        {
            id: "email",
            numeric: false,
            disablePadding: false,
            label: "Email",
        }
    ];

    const rows = [
        {id: 1, name: "Some company", email: "aompany@company.com"},
        {id: 2, name: "Some company", email: "company@company.com"},
        {id: 3, name: "Some company", email: "company@company.com"},
        {id: 4, name: "Some company", email: "company@company.com"},
        {id: 5, name: "Some company", email: "company@company.com"},
        {id: 6, name: "Some company", email: "company@company.com"},
        {id: 7, name: "Some company", email: "company@company.com"},
        {id: 8, name: "Some company", email: "company@company.com"},
        {id: 9, name: "Some company", email: "company@company.com"},
        {id: 10, name: "Some company", email: "company@company.com"},
        {id: 11, name: "Some company", email: "zompany@company.com"}
    ];

    return (
        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>
            <DataTable
                tableName="Companies"
                headCells={headCells}
                rows={rows}
                onSelectingRowForEdit={(info) => SetEditableInfo(info ?? {name: "", email: ""})}
                modalContent={<Modal name={editableInfo.name} email={editableInfo.email} />}
            />
        </Box>
    );
}

export default Companies;
