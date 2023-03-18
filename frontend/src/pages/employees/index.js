import React from "react";
import {Box} from "@mui/material";
import DataTable from "../../components/dataTable";

function Employees() {
    const headCells = [
        {
            id: "name",
            numeric: false,
            disablePadding: true,
            label: "Dessert (100g serving)",
        },
        {
            id: "calories",
            numeric: true,
            disablePadding: false,
            label: "Calories",
        },
        {
            id: "fat",
            numeric: true,
            disablePadding: false,
            label: "Fat (g)",
        },
        {
            id: "carbs",
            numeric: true,
            disablePadding: false,
            label: "Carbs (g)",
        },
        {
            id: "protein",
            numeric: true,
            disablePadding: false,
            label: "Protein (g)",
        },
    ];
    return (
        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>
            <DataTable tableName="Employees" headCells={headCells} />
        </Box>
    );
}

export default Employees;
