import React, {useState} from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

export default function MultipleSelectCheckmarks({label, rows = [], initialList = [], onSelect}) {
    const [rolesList, setRolesList] = useState(initialList);

    const handleChange = (event) => {
        const filtered = [];

        event.target.value.forEach(name => {
            filtered.push(rows.filter((item) => item.name === name)[0]);
        });

        onSelect(filtered);
        setRolesList(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{mt: 2, width: "100%"}}>
                <InputLabel id="multiple-checkbox-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    value={rolesList}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                >
                    {rows.map((row) => (
                        <MenuItem
                            key={row.id}
                            value={row.name}
                        >
                            <Checkbox
                                checked={rolesList.indexOf(row.name) > -1}
                            />
                            <ListItemText primary={row.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
