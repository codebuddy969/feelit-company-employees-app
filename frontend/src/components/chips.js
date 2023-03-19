import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({theme}) => ({
    margin: theme.spacing(0.5),
}));

export default function Chips({chips = [], onDelete}) {

    const handleDelete = (chipToDelete) => () => {
        onDelete(chips.filter((chip) => chip.id !== chipToDelete.id));
    };

    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "left",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                mt: 2,
            }}
            component="ul"
        >
            {chips.map((data) => {
                return (
                    <ListItem key={data.id}>
                        <Chip
                            label={data.name}
                            onDelete={handleDelete(data)}
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}
