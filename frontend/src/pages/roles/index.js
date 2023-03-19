import React, {useState, useEffect} from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DataTable from "../../components/dataTable";

import { useGetMutation } from "../../utilities/redux/services/api.service";

function Modal({name = ""}) {
    const [roleName, setRoleName] = useState(name);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically make an API call to authenticate the user
        console.log("Useremail:", roleName);
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto"}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Role name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="input"
                />
                <Button type="submit" variant="contained" sx={{mt: 3}}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

function Roles() {

    const [rows, SetRows] = useState([]);

    const [editableInfo, SetEditableInfo] = useState({name: ""});

    const [getData] = useGetMutation();

    const headCells = [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: "Name",
        }
    ];

    useEffect(() => {
        getData({url: "roles"}).then(response => SetRows(response.data.roles));
    }, []);

    return (
        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>
            <DataTable
                tableName="Roles"
                headCells={headCells}
                rows={rows}
                onSelectingRowForEdit={(info) => SetEditableInfo(info ?? {name: ""})}
                modalContent={<Modal name={editableInfo.name} />}
            />
        </Box>
    );
}

export default Roles;
