import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import DataTableHead from "./dataTableHead";
import DataTableToolbar from "./dataTableToolbar";
import DataTableModal from "./dataTableModal";

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
    return Object.keys(row).map(
        (key) => key !== "id" && <TableCell key={key}>{row[key]}</TableCell>
    );
}

export default function DataTable({
    tableName,
    headCells = [],
    rows = [],
    modalContent,
    onSelectingRowForEdit,
}) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [modalInfo, setModalInfo] = React.useState({
        opened: false,
        title: "Modal",
    });

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

    return (
        <Box sx={{width: "100%"}}>
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
                            onSelectingRowForEdit(rows[selected[0]]);
                            setModalInfo({opened: true, title: "Edit Record"});
                        } else {
                            alert("Only one item should be selected");
                        }
                    }}
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
                    {modalContent}
                </DataTableModal>
            </Paper>
        </Box>
    );
}
