import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import DataTableHead from "./dataTableHead";
import DataTableToolbar from "./dataTableToolbar";
import DataTableModal from "./dataTableModal";

import {useNavigate, Link} from "react-router-dom";
import {
    useGetMutation,
    useStoreMutation,
    useUpdateMutation,
    useDeleteMutation,
} from "../../utilities/redux/services/api.service";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function TableCells({row}) {
    const hiddenFields = ["id", "password"];
    return Object.keys(row).map(
        (key) => !hiddenFields.includes(key) && <TableCell key={key}>{row[key]}</TableCell>
    );
}

export default function DataTable({
    tableName,
    requestInfo = {url: "", dataName: ""},
    headCells = [],
    modalContent,
    onSelectingRowForEdit,
}) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rows, SetRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalInfo, setModalInfo] = useState({
        opened: false,
        title: "Modal",
    });

    const navigate = useNavigate();

    const [getAction] = useGetMutation();
    const [storeAction] = useStoreMutation();
    const [updateAction] = useUpdateMutation();
    const [deleteAction] = useDeleteMutation();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onClickRow = (selectedIdsList, id) => {
        if (selectedIdsList.includes(id)) {
            selectedIdsList = selectedIdsList.filter((number) => number !== id);
        } else {
            selectedIdsList.push(id);
        }

        setSelected(selectedIdsList);
    };

    const deleteRows = () => {
        deleteAction({
            url: requestInfo.url,
            body: {ids: JSON.stringify(selected)},
        }).then((response) => {
            alert(
                response.data && response.data.message
                    ? response.data.message
                    : "Error not proceeded"
            );
        });
    };

    const formSubmit = (event, id) => {
        event.preventDefault();

        const proceedResponse = (response) => {
            if (response.data && response.data.message) {
                setModalInfo({opened: false});
                alert(response.data.message);
            } else {
                alert("No time to proceed Errors");
            }
        };

        if (!id) {
            storeAction({
                url: requestInfo.url,
                body: requestInfo.body,
            }).then((response) => proceedResponse(response));
        } else {
            updateAction({
                url: `${requestInfo.url}/${requestInfo.id}`,
                body: requestInfo.body,
            }).then((response) => proceedResponse(response));
        }
    };

    useEffect(() => {
        getAction({url: requestInfo.url}).then((response) => {
            response.error && response.error.status === 401 && navigate("/login");
            response.data && response.data.data && SetRows(response.data.data);
        });
    }, []);

    return (
        <Box sx={{maxWidth: 1200, mx: "auto", mt: 10}}>

            {/* Pages Links */}

            <ButtonGroup variant="contained" color="primary">
                <Link to="/companies" className="link">
                    <Button>Companies</Button>
                </Link>
                <Link to="/employees" className="link">
                    <Button>Employees</Button>
                </Link>
                <Link to="/roles" className="link">
                    <Button>Roles</Button>
                </Link>
            </ButtonGroup>


            <Paper sx={{width: "100%", mb: 2}}>

                {/* Toolbar Component */}

                <DataTableToolbar
                    numSelected={selected.length}
                    tableName={tableName}
                    onAdd={() => {
                        onSelectingRowForEdit(null);
                        setModalInfo({opened: true, title: "Add Record"});
                    }}
                    onEdit={() => {
                        if (selected.length === 1) {
                            const row = rows.filter(
                                (row) => row.id === selected[0]
                            );
                            onSelectingRowForEdit(row[0]);
                            setModalInfo({opened: true, title: "Edit Record"});
                        } else {
                            alert("Only one item should be selected");
                        }
                    }}
                    onDelete={deleteRows}
                />

                <TableContainer>
                    <Table sx={{minWidth: 750}}>
                        <DataTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    let selectedIds = [...selected];

                                    return (
                                        <TableRow
                                            key={row.id}
                                            hover
                                            role="checkbox"
                                            selected={selectedIds.includes(
                                                row.id
                                            )}
                                            onClick={() =>
                                                onClickRow(selectedIds, row.id)
                                            }
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={selected.includes(
                                                        row.id
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCells row={row} />
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Component */}

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {/* Shared Modal Component for Adding/Editing Records */}

                <DataTableModal
                    modalInfo={modalInfo}
                    onCloseModal={() => setModalInfo({opened: false})}
                >
                    <Box sx={{maxWidth: 400, mx: "auto"}}>
                        <form
                            onSubmit={(event) =>
                                formSubmit(event, requestInfo.id)
                            }
                        >
                            {modalContent}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3}}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </DataTableModal>
            </Paper>
        </Box>
    );
}
