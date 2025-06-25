import React, { useState, useEffect } from "react";
import Example from "./Example";
import api from "../../component/api";
import { useAuth } from "../../component/AuthContext";

const FreshLead = () => {
  const [filters, setFilters] = useState({
    teamLeader: "",
    agent: "",
    leadSource: "",
    project: "",
    customer: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "newest"
  });

  const [data, setData] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (page = 1) => {
    try {
      const payload = {
        lead_status: "0",
        page
        //Add filters if needed
      };

      const res = await api.post("/get-lead-data", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      if (res?.status === 200 && Array.isArray(res?.data?.data?.data)) {
        const mapped = res?.data?.data?.data?.map((item) => ({
          id: item.id,
          customerId: item.cust_id,
          enterDate: item.created_at?.split("T")[0],
          contactPerson: item.name,
          contactNumber: item.contact,
          leadSource: item.lead_source,
          teamLeader: item.team_leader,
          agent: item.agent,
          project: item.project,
          followUp: "N.A.",
          archivedReason: item.archived_reason,
          lastUpdate: item.updated_at?.split("T")[0],
          observation: item.remark
        }));

        setData(mapped);
        setSelectedLeads([]); // Reset selection on new data
        setCurrentPage(res?.data?.data?.current_page);
        setTotalPages(res?.data?.data?.last_page);
        setTotalRecords(res?.data?.data?.total);
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

  const handlePageChange = (newPage) => {
    handleSearch(newPage);
  };

  const handleTransfer = async () => {
    try {
      console.log(filters.teamLeader, filters.agent)
      const payload = {

        lead_id: selectedLeads,
        tl_id: filters.teamLeader,
        project_id: "56",
        agent_id: filters.agent,
      };

      const res = await api.post("/assign-lead", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.status === 200) {
        console.log(res.data)
        alert("Leads transferred successfully!");
        setSelectedLeads([]);
        handleSearch(currentPage);
      } else {
        alert("Transfer failed.");
      }
    } catch (error) {
      console.error("Transfer Error:", error);
      alert("An error occurred while transferring leads.");
    }
  };

  const columns = [
    {
      field: "select",
      headerName: (
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedLeads(data.map((row) => row.id));
            } else {
              setSelectedLeads([]);
            }
          }}
          checked={data.length > 0 && selectedLeads.length === data.length}
        />
      ),
      align: "center",
      renderCell: (row) => (
        <input
          type="checkbox"
          checked={selectedLeads.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedLeads((prev) => [...prev, row.id]);
            } else {
              setSelectedLeads((prev) => prev.filter((id) => id !== row.id));
            }
          }}
        />
      )
    },
    { field: "id", headerName: "#", align: "center" },
    { field: "customerId", headerName: "Customer ID", align: "center" },
    { field: "enterDate", headerName: "Enter Date", align: "center" },
    { field: "contactPerson", headerName: "Contact Person", align: "left" },
    { field: "contactNumber", headerName: "Contact Number", align: "center" },
    { field: "leadSource", headerName: "Lead Source", align: "left" },
    { field: "teamLeader", headerName: "Team Leader", align: "left" },
    { field: "agent", headerName: "Agent", align: "left" },
    { field: "project", headerName: "Project", align: "left" },
    { field: "followUp", headerName: "Follow Up", align: "center" },
    { field: "archivedReason", headerName: "Archived Reason", align: "left" },
    { field: "lastUpdate", headerName: "Last Update", align: "center" },
    { field: "observation", headerName: "Observation", align: "left" }
  ];

  function getPageNumbers(currentPage, totalPages) {
    const pageNumbers = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  console.log(selectedLeads)
  return (
    <div>
      {/* Filter Section */}
      <div
        style={{
          marginBottom: "20px",
          background: "#c1c1c1",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "rgb(0 0 0 / 56%) 0px 3px 8px"
        }}
      >
        <form
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center"
          }}
        >
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
          <button type="button" onClick={() => handleSearch(1)}>Search</button>
        </form>
      </div>

      {/* Table Section */}
      <Example data={data} columns={columns} rowsPerPageOptions={[10]} />

      {/* Transfer Button */}
      {selectedLeads.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            onClick={handleTransfer}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Transfer Selected Leads
          </button>
        </div>
      )}

      {/* Pagination Section */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage <= 1 ? "#e0e0e0" : "#003961",
            color: currentPage <= 1 ? "#888" : "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage <= 1 ? "not-allowed" : "pointer"
          }}
        >
          Prev
        </button>

        {getPageNumbers(currentPage, totalPages).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              padding: "6px 12px",
              backgroundColor: page === currentPage ? "#ff0000" : "#003961",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px"
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage >= totalPages ? "#e0e0e0" : "#003961",
            color: currentPage >= totalPages ? "#888" : "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FreshLead;
