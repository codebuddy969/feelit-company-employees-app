import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function SelectComponent({companies = []}) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        console.log(event.target.value);
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl sx={{mt: 2, width: `100%`}}>
                <InputLabel id="demo-multiple-name-label">Company</InputLabel>
                <Select
                    labelId="demo-name-label"
                    id="demo-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {companies.map((name) => (
                        <MenuItem
                            key={name.id}
                            value={name.id}
                        >
                            {name.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
