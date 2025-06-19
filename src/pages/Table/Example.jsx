import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";
import "./tableStyles.css"; // Ensure this file contains the appropriate CSS

const Example = ({ data, columns, rowsPerPageOptions = [5, 10, 25] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [filters, setFilters] = useState({}); // Store filter values for each column

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value.toLowerCase(),
    }));
  };

  // Apply filters to the data
  const filteredData = data.filter((row) =>
    columns.every((column) =>
      filters[column.field]
        ? String(row[column.field]).toLowerCase().includes(filters[column.field])
        : true
    )
  );

  return (
    <TableContainer component={Paper} className="table-container">
      <MuiTable>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                sx={{ lineHeight: "initial", fontSize: "11px", padding: "5px 5px" }}
                key={column.field}
              >
                <strong>{column.headerName}</strong>
                {/* Filter Input */}
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder={`Filter ${column.headerName}`}
                  onChange={(e) => handleFilterChange(column.field, e.target.value)}
                  style={{ marginTop: "5px", width: "100%", }}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice data for current page
              .map((row, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ lineHeight: "initial", fontSize: "12px", padding: "5px 5px" }}
                      key={column.field}
                    >
                      {column.renderCell ? column.renderCell(row) : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No matching records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>

      {/* Pagination */}
      {/* <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        aria-label="Table Pagination"
      /> */}
    </TableContainer>
  );
};

export default Example;
