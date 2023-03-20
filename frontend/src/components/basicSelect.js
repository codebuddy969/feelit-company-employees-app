import React, {useState} from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({label, rows = [], selected, onChange}) {
    const [selection, setSelection] = useState(selected);

    const handleChange = (event) => {
        onChange(event.target.value);
        setSelection(event.target.value);
    };

    return (
        <Box sx={{mt: 2}}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">{label}</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={selection}
                    label={label}
                    onChange={handleChange}
                >
                    {rows.map((row) => {
                        return <MenuItem key={row.id} value={row.id}>
                            {row.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
