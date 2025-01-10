

import React from "react";
import Example from "../Table/Example";

const CustomTable = () => {
  const data = [
    { id: 1, name: "John Doe", age: 28, occupation: "Engineer" },
    { id: 2, name: "Jane Smith", age: 34, occupation: "Designer" },
    { id: 3, name: "Sam Wilson", age: 23, occupation: "Developer" },
    { id: 4, name: "Alice Johnson", age: 29, occupation: "Manager" },
    { id: 5, name: "Bob Brown", age: 35, occupation: "Sales" },
    { id: 6, name: "John Doe", age: 28, occupation: "Engineer" },
    { id: 7, name: "Jane Smith", age: 34, occupation: "Designer" },
    { id: 8 , name: "Sam Wilson", age: 23, occupation: "Developer" },
    { id: 9, name: "Alice Johnson", age: 29, occupation: "Manager" },
    { id: 10, name: "Bob Brown", age: 35, occupation: "Sales" },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    { field: "occupation", headerName: "Occupation" },
  ];

  return (
    <div>
      <h1>Reusable Table Example</h1>
      <Example data={data} columns={columns} rowsPerPageOptions={[5, 10]} />
    </div>
  );
};

export default CustomTable;