import React, {useState} from "react";
import DataTable from "../../components/dataTable";

import Modal from "./modal";

function Employees() {
    const defaults = {
        name: "",
        email: "",
        password: "",
        roles: [],
        company_id: "",
        id: null,
    };

    const [editableInfo, SetEditableInfo] = useState(defaults);

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
            tableName="Employees"
            headCells={headCells}
            requestInfo={{
                id: editableInfo.id,
                url: "employees",
                body: {
                    name: editableInfo.name,
                    email: editableInfo.email,
                    password: editableInfo.password,
                    roles: (() => {
                        const ids = [];
                        editableInfo.roles?.forEach((role) =>
                            ids.push(role.id)
                        );
                        return ids;
                    })(),
                    company_id: editableInfo.company_id,
                },
            }}
            onSelectingRowForEdit={(info) => SetEditableInfo(info ?? defaults)}
            modalContent={
                <Modal
                    name={editableInfo.name}
                    email={editableInfo.email}
                    password={editableInfo.password}
                    roles={editableInfo.roles}
                    company_id={editableInfo.company_id}
                    id={editableInfo.id}
                    onEditFields={(info) => SetEditableInfo(info ?? defaults)}
                />
            }
        />
    );
}

export default Employees;
