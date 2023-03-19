import React, {useState, useEffect} from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DataTable from "../../components/dataTable";
import {useNavigate} from "react-router-dom";

import {
    useStoreMutation,
    useUpdateMutation,
} from "../../utilities/redux/services/api.service";

function Modal({name = "", email = ""}) {
    const [employeeName, setEmployeeName] = useState(name);
    const [employeeEmail, setEmployeeEmail] = useState(email);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically make an API call to authenticate the user
        // console.log("Useremail:", employeeName);
        // console.log("Password:", employeeEmail);
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto"}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Employee name"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="input"
                />
                <TextField
                    label="Employee email"
                    value={employeeEmail}
                    onChange={(e) => setEmployeeEmail(e.target.value)}
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

function Employees() {

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

    return (

        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>
            <DataTable
                tableName="Employees"
                headCells={headCells}
                requestInfo={{url: "employees", dataName: "users"}}
                onSelectingRowForEdit={(info) =>
                    SetEditableInfo(info ?? {name: "", email: "", id: null})
                }
                modalContent={
                    <Modal
                        name={editableInfo.name}
                        email={editableInfo.email}
                        id={editableInfo.id}
                    />
                }
            />
        </Box>
    );
}

export default Employees;
