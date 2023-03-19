import React, {useState, useEffect} from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DataTable from "../../components/dataTable";

import { useGetMutation, useStoreMutation } from "../../utilities/redux/services/api.service";

function Modal({name = "", email = ""}) {
    const [companyName, setCompanyName] = useState(name);
    const [companyEmail, setCompanyEmail] = useState(email);

    const [storeData] = useStoreMutation();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        storeData({url: "companies", body: {email: companyEmail, name: companyName}}).then(response => {
            if (response.data && response.data.message) {
                alert(response.data.message);
            } else {
                alert("Error message still should be proceeded");
            }
        });
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

    const [rows, SetRows] = useState([]);
    const [editableInfo, SetEditableInfo] = useState({name: "", email: ""});

    const [getData] = useGetMutation();

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

    useEffect(() => {
        getData({url: "companies"}).then(response => SetRows(response.data.companies));
    }, []);

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
