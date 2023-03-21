import React, {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import BasicSelect from "../../components/basicSelect";
import MultipleSelectCheckmarks from "../../components/multipleSelectCheckmarks";
import {useGetMutation} from "../../utilities/redux/services/api.service";

let modalFormDirty = false;

export default function Modal({
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
        modalFormDirty = true;
    };

    useEffect(() => {
        if (modalFormDirty) {
            onEditFields({
                name: employeeName,
                email: employeeEmail,
                password: employeePassword,
                roles: employeeRoles,
                company_id: employeeCompany,
                id,
            });
        }
    }, [
        employeeName,
        employeeEmail,
        employeePassword,
        employeeRoles,
        employeeCompany,
    ]);

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
                onChange={(e) =>
                    onFieldChanged(() => setEmployeeName(e.target.value))
                }
                fullWidth
                margin="normal"
                className="input"
            />
            <TextField
                label="Employee email"
                value={employeeEmail}
                onChange={(e) =>
                    onFieldChanged(() => setEmployeeEmail(e.target.value))
                }
                fullWidth
                margin="normal"
                type="text"
            />
            <TextField
                label="Employee password"
                value={employeePassword}
                onChange={(e) =>
                    onFieldChanged(() => setEmployeePassword(e.target.value))
                }
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
                    employeeRoles.forEach((role) => names.push(role.name));
                    return names;
                }}
                onSelect={(info) =>
                    onFieldChanged(() => setEmployeeRoles(info))
                }
            />
        </>
    );
}
