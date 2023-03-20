import React, {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import DataTable from "../../components/dataTable";
import BasicSelect from "../../components/basicSelect";
import MultipleSelectCheckmarks from "../../components/multipleSelectCheckmarks";
import {useGetMutation} from "../../utilities/redux/services/api.service";

function Modal({
    name = "",
    email = "",
    password = "",
    roles = [],
    company_id = "",
    id = null,
    onEditFields,
}) {
    const [employeeRoles, setEmployeeRoles] = useState(roles);
    const [employeeCompany, setEmployeeCompany] = useState(company_id);
    const [employeeName, setEmployeeName] = useState(name);
    const [employeeEmail, setEmployeeEmail] = useState(email);
    const [employeePassword, setEmployeePassword] = useState(password);

    const [companiesList, setCompaniesList] = useState([]);
    const [rolesList, setRolesList] = useState([]);

    const [getAction] = useGetMutation();

    const onFieldChanged = (stateModifier) => {
        stateModifier();
        onEditFields({
            name: employeeName,
            email: employeeEmail,
            password: employeePassword,
            roles: employeeRoles,
            company_id: employeeCompany,
            id,
        });
    }

    useEffect(() => {
        getAction({url: "roles"}).then((response) => {
            response.data &&
                response.data.data &&
                setRolesList(response.data.data);
        });

        getAction({url: "companies"}).then((response) => {
            response.data &&
                response.data.data &&
                setCompaniesList(response.data.data);
        });
    }, []);

    return (
        <>
            <TextField
                label="Employee name"
                value={employeeName}
                onChange={(e) => onFieldChanged(() => setEmployeeName(e.target.value))}
                fullWidth
                margin="normal"
                className="input"
            />
            <TextField
                label="Employee email"
                value={employeeEmail}
                onChange={(e) => onFieldChanged(() => setEmployeeEmail(e.target.value))}
                fullWidth
                margin="normal"
                type="text"
            />
            <TextField
                label="Employee password"
                value={employeePassword}
                onChange={(e) => onFieldChanged(() => setEmployeePassword(e.target.value))}
                fullWidth
                margin="normal"
                type="password"
            />
            <BasicSelect
                label="Company"
                rows={companiesList}
                selected={employeeCompany}
                onChange={(id) => onFieldChanged(() => setEmployeeCompany(id))}
            />
            <MultipleSelectCheckmarks
                label="Roles"
                rows={rolesList}
                initialList={() => {
                    const names = [];
                    employeeRoles.forEach(role => names.push(role.name));
                    return names;
                }}
                onSelect={(info) => onFieldChanged(() => setEmployeeRoles(info))}
            />
        </>
    );
}

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
