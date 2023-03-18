import React from "react";
import {Box} from "@mui/material";
import DataTable from "../../components/dataTable";

function Employees() {
    return (
        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>
            <DataTable tableName="Employees" />
        </Box>
    );
}

export default Employees;
