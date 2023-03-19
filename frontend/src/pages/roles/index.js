import React, {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import DataTable from "../../components/dataTable";

function Modal({name = "", id = null, onEditFields}) {
    const [roleName, setRoleName] = useState(name);

    useEffect(() => {
        onEditFields({name: roleName, id});
    }, [roleName]);

    return (
        <>
            <TextField
                label="Role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                fullWidth
                margin="normal"
                className="input"
            />
        </>
    );
}

function Roles() {
    const [editableInfo, SetEditableInfo] = useState({name: ""});

    return (
        <DataTable
            tableName="Roles"
            headCells={[
                {
                    id: "name",
                    label: "Name",
                },
            ]}
            requestInfo={{
                id: editableInfo.id,
                url: "roles",
                body: {name: editableInfo.name},
            }}
            onSelectingRowForEdit={(info) =>
                SetEditableInfo(info ?? {name: ""})
            }
            modalContent={
                <Modal
                    name={editableInfo.name}
                    id={editableInfo.id}
                    onEditFields={(info) =>
                        SetEditableInfo(info ?? {name: "", id: null})
                    }
                />
            }
        />
    );
}

export default Roles;
