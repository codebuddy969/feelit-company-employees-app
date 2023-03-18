import React from "react";
import {Box} from "@mui/material";
import DataTable from "../../components/dataTable";

function Roles() {
    return (
        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>
            <DataTable tableName="Roles" />
        </Box>
    );
}

export default Roles;
