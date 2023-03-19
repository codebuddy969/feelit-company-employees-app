import React, {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import DataTable from "../../components/dataTable";
import Chips from "../../components/chips";
import SelectComponent from "../../components/select";
import {useGetMutation} from "../../utilities/redux/services/api.service";

function Modal({
    name = "",
    email = "",
    password = "",
    roles = [],
    companies = [],
    id = null,
    onEditFields,
}) {
    const [employeeCompanies, setEmployeeCompanies] = useState(companies);
    const [employeeRoles, setEmployeeRoles] = useState(roles);
    const [employeeName, setEmployeeName] = useState(name);
    const [employeeEmail, setEmployeeEmail] = useState(email);
    const [employeePassword, setEmployeePassword] = useState(password);

    const [getAction] = useGetMutation();

    useEffect(() => {
        onEditFields({
            name: employeeName,
            email: employeeEmail,
            password: employeePassword,
            roles: employeeRoles,
            companies: employeeCompanies,
            id,
        });
    }, [
        employeeName,
        employeeEmail,
        employeePassword,
        employeeRoles,
        employeeCompanies,
    ]);

    useEffect(() => {
        getAction({url: "roles"}).then((response) => {
            response.data &&
                response.data.data &&
                setEmployeeRoles(response.data.data);
        });

        getAction({url: "companies"}).then((response) => {
            response.data &&
                response.data.data &&
                setEmployeeCompanies(response.data.data);
        });
    }, []);

    return (
        <>
            <TextField
                label="Employee name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                fullWidth
                margin="normal"
                className="input"
            />
            <TextField
                label="Employee email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                fullWidth
                margin="normal"
                type="text"
            />
            <TextField
                label="Employee password"
                value={employeePassword}
                onChange={(e) => setEmployeePassword(e.target.value)}
                fullWidth
                margin="normal"
                type="password"
            />
            <SelectComponent companies={employeeCompanies} />
            <Chips
                chips={employeeRoles}
                onDelete={(chips) => setEmployeeRoles(chips)}
            />
        </>
    );
}

function Employees() {
    const defaults = {name: "", email: "", password: "", roles: [], id: null};

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
                },
            }}
            onSelectingRowForEdit={(info) => SetEditableInfo(info ?? defaults)}
            modalContent={
                <Modal
                    name={editableInfo.name}
                    email={editableInfo.email}
                    password={editableInfo.password}
                    roles={editableInfo.roles}
                    id={editableInfo.id}
                    onEditFields={(info) => SetEditableInfo(info ?? defaults)}
                />
            }
        />
    );
}

export default Employees;
