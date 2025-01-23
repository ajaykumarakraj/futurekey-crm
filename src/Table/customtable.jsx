import React, { useState } from "react";
import Example from "../Table/Example"; // Adjust the path based on your file structure

const CustomTable = () => {
  const [filters, setFilters] = useState({
    teamLeader: "",
    agent: "",
    leadSource: "",
    project: "",
    customer: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "newest",
    search: "",
  });

  const data = [
    {
      id: 1,
      name: "John Doe",
      age: 28,
      occupation: "Engineer",
      customerId: "C001",
      enterDate: "2023-01-01",
      contactPerson: "Jane",
      contactNumber: "123-456-7890",
      leadSource: "Referral",
      teamLeader: "Tom",
      agentAssignment: "Agent 1",
      agent: "Agent X",
      project: "Project 1",
      followUp: "Yes",
      archivedReason: "N/A",
      lastUpdate: "2023-01-15",
      observation: "Good",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 34,
      occupation: "Designer",
      customerId: "C002",
      enterDate: "2023-02-01",
      contactPerson: "John",
      contactNumber: "987-654-3210",
      leadSource: "Social Media",
      teamLeader: "Bob",
      agentAssignment: "Agent 2",
      agent: "Agent Y",
      project: "Project 2",
      followUp: "No",
      archivedReason: "N/A",
      lastUpdate: "2023-01-18",
      observation: "Satisfactory",
    },
    // Add more rows here
  ];

  const columns = [
    { field: "id", headerName: "#", align: "center" },
    { field: "customerId", headerName: "Customer ID", align: "center" },
    { field: "enterDate", headerName: "Enter Date", align: "center" },
    { field: "contactPerson", headerName: "Contact Person", align: "left" },
    { field: "contactNumber", headerName: "Contact Number", align: "center" },
    { field: "leadSource", headerName: "Lead Source", align: "left" },
    { field: "teamLeader", headerName: "Team Leader", align: "left" },
    { field: "agentAssignment", headerName: "Agent Assignment", align: "left" },
    { field: "agent", headerName: "Agent", align: "left" },
    { field: "project", headerName: "Project", align: "left" },
    { field: "followUp", headerName: "Follow Up", align: "center" },
    { field: "archivedReason", headerName: "Archived Reason", align: "left" },
    { field: "lastUpdate", headerName: "Last Update", align: "center" },
    { field: "observation", headerName: "Observation", align: "left" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Filters applied: ", filters);
    // Implement the filtering logic here
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", background: "#c1c1c1", padding: "20px", borderRadius: "5px", boxShadow: "rgb(0 0 0 / 56%) 0px 3px 8px" }}>
        <form style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          <select name="teamLeader" onChange={handleFilterChange} value={filters.teamLeader}>
            <option value="">Select Team Leader</option>
            <option value="Tom">Tom</option>
            <option value="Bob">Bob</option>
          </select>
          <select name="agent" onChange={handleFilterChange} value={filters.agent}>
            <option value="">Select Agent</option>
            <option value="Agent X">Agent X</option>
            <option value="Agent Y">Agent Y</option>
          </select>
          <select name="leadSource" onChange={handleFilterChange} value={filters.leadSource}>
            <option value="">Select Lead Source</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
          </select>
          <select name="project" onChange={handleFilterChange} value={filters.project}>
            <option value="">All Projects</option>
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select>
          <input
            type="text"
            name="customer"
            placeholder="Customer ID"
            onChange={handleFilterChange}
            value={filters.customer}
          />
          <input
            type="date"
            name="dateFrom"
            placeholder="Date From"
            onChange={handleFilterChange}
            value={filters.dateFrom}
          />
          <input
            type="date"
            name="dateTo"
            placeholder="Date To"
            onChange={handleFilterChange}
            value={filters.dateTo}
          />
          <select name="sortBy" onChange={handleFilterChange} value={filters.sortBy}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <button type="button" onClick={handleSearch} style={{ padding: "5px 15px" }}>
            Search
          </button>
        </form>
      </div>

      <Example data={data} columns={columns} rowsPerPageOptions={[5, 10]} />
    </div>
  );
};

export default CustomTable;
