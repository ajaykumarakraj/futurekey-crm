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
} from "@mui/material";

const CustomTable = () => {
  const data = [
    { id: 1, name: "John Doe", age: 28, occupation: "Engineer" },
    { id: 2, name: "Jane Smith", age: 34, occupation: "Designer" },
    { id: 3, name: "Sam Wilson", age: 23, occupation: "Developer" },
    { id: 4, name: "Alice Johnson", age: 29, occupation: "Manager" },
    { id: 5, name: "Bob Brown", age: 35, occupation: "Sales" },
    { id: 6, name: "Charlie Davis", age: 26, occupation: "Developer" },
    { id: 7, name: "David Clark", age: 32, occupation: "Engineer" },
    { id: 8, name: "Eva White", age: 28, occupation: "Designer" },
    { id: 9, name: "Frank Green", age: 40, occupation: "Manager" },
    { id: 10, name: "Grace Harris", age: 25, occupation: "Sales" },
    
  ];

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px", margin: "auto" }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>Occupation</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice data for current page
            .map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.occupation}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </MuiTable>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CustomTable;
