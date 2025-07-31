import React, { useState, useEffect } from "react";
import Example from "./Example";
import api from "../../component/api";
import moment from "moment";
import { useAuth } from "../../component/AuthContext";

const InProgressLead = () => {
  const [filters, setFilters] = useState({
    teamLeader: "",
    agent: "",
    leadSource: "",
    project: "",
    customer: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "newest",
  });
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const rowsPerPage = 50;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (page = 1) => {
    try {
      const payload = {
        lead_status: "2",
        page,
        ...filters,
      };
      const res = await api.post("/get-lead-data", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res?.status === 200 && Array.isArray(res?.data?.data)) {
        const mapped = res.data.data.map((item, index) => ({
          id: (page - 1) * rowsPerPage + index + 1,
          customerId: item.id,
          enterDate: moment(item.created_at).utcOffset("+05:30").format("DD/MM/YYYY, hh:mm A"),
          contactPerson: item.name,
          contactNumber: item.contact,
          leadSource: item.lead_source,
          city: item.city,
          Agentassign: moment(item.assign_time).utcOffset("+05:30").format("DD/MM/YYYY, hh:mm A"),
          teamLeader: item.team_leader,
          agent: item.agent,
          leadstatus: item.lead_status,
          project: item.form_name,
          followUp: item.follow_ups,
          archivedReason: item.archived_reason,
          lastUpdate: moment(item.updated_at).utcOffset("+05:30").format("DD/MM/YYYY, hh:mm A"),
          observation: item.remark,
        }));
        setData(mapped);
        setCurrentPage(res.data.meta.current_page);
        setTotalPages(res.data.meta.last_page);
        setTotalRecords(res.data.meta.total);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Fetching Error", error);
    }
  };

  useEffect(() => {
    handleSearch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      handleSearch(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const columns = [
    { field: "id", headerName: "#", align: "center" },
    { field: "enterDate", headerName: "Entry Date", align: "center" },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      align: "left",
      renderCell: (row) => (
        <a
          href={`/lead-update/${row.customerId}`}
          style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
        >
          {row.contactPerson}
        </a>
      ),
    },
    { field: "city", headerName: "City" },
    { field: "contactNumber", headerName: "Contact Number", align: "center" },
    { field: "leadSource", headerName: "Lead Source", align: "left" },
    { field: "Agentassign", headerName: "Agent Assignment", align: "left" },
    { field: "teamLeader", headerName: "Team Leader", align: "left" },
    { field: "agent", headerName: "Agent", align: "left" },
    { field: "project", headerName: "Project", align: "left" },
    { field: "followUp", headerName: "Follow Up", align: "center" },
    { field: "archivedReason", headerName: "Archived Reason", align: "left" },
    { field: "lastUpdate", headerName: "Last Update", align: "center" },
    { field: "leadstatus", headerName: "Lead Status", align: "center" },
    { field: "observation", headerName: "Observation", align: "left" },
  ];

  return (
    <div>
      <h2 className="mb-2 text-center textsize headingstyle">In Progress Leads</h2>
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

          <input type="text" name="customer" placeholder="Customer ID" onChange={handleFilterChange} value={filters.customer} />
          <input type="date" name="dateFrom" onChange={handleFilterChange} value={filters.dateFrom} />
          <input type="date" name="dateTo" onChange={handleFilterChange} value={filters.dateTo} />

          <select name="sortBy" onChange={handleFilterChange} value={filters.sortBy}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button type="button" onClick={() => handleSearch(1)}>Search</button>
        </form>
      </div>

      <Example data={data} columns={columns} rowsPerPageOptions={[50]} />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Prev
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              backgroundColor: page === currentPage ? "#f00" : "#003961",
              color: "#fff",
              padding: "6px 12px",
            }}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default InProgressLead;
