import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import DataTable from "../../components/dataTable";

function Modal({name = "", email = "", id = null, onEditFields}) {
    const [companyName, setCompanyName] = useState(name);
    const [companyEmail, setCompanyEmail] = useState(email);

    useEffect(() => {
        onEditFields({name: companyName, email: companyEmail, id});
    }, [companyName, companyEmail]);

    return (
        <>
            <TextField
                label="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
                margin="normal"
                className="input"
            />
            <TextField
                label="Company email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                fullWidth
                margin="normal"
                type="text"
            />
        </>
    );
}

function Companies() {
    const [editableInfo, SetEditableInfo] = useState({
        name: "",
        email: "",
        id: null,
    });

    const headCells = [
        {
            id: "name",
            label: "Name",
        },
        {
            id: "email",
            label: "Email",
        },
    ];

    return (
        <DataTable
            tableName="Companies"
            headCells={headCells}
            requestInfo={{
                id: editableInfo.id,
                url: "companies",
                body: {name: editableInfo.name, email: editableInfo.email},
            }}
            onSelectingRowForEdit={(info) =>
                SetEditableInfo(info ?? {name: "", email: "", id: null})
            }
            modalContent={
                <Modal
                    name={editableInfo.name}
                    email={editableInfo.email}
                    id={editableInfo.id}
                    onEditFields={(info) =>
                        SetEditableInfo(info ?? {name: "", email: "", id: null})
                    }
                />
            }
        />
    );
}

export default Companies;
