import React, { useState, useEffect } from "react";
import api from "../../component/api";
import axios from "axios";
import Example from "./Example";
import "../../app.css";

const FreshLead = () => {
  const [data, setData] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    teamLeaderId: "",
    agentId: "",
    projectId: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 50;

  useEffect(() => {
    fetchTeamLeaders();
    fetchProjects();
    fetchLeads(1);
  }, []);

  const fetchTeamLeaders = async () => {
    try {
      const res = await axios.get("https://api.almonkdigital.in/api/admin/get-team-leader", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTeamLeaders(res.data.data);
    } catch (err) {
      console.error("Team Leader fetch error:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://api.almonkdigital.in/api/admin/view-master-setting", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const projectList = res.data.data.filter(item => item.cat_name === "Project");
      setProjects(projectList);
    } catch (err) {
      console.error("Project fetch error:", err);
    }
  };

  const handleTeamLeaderChange = async (e) => {
    const id = e.target.value;
    setFilters({ ...filters, teamLeaderId: id });

    try {
      const res = await axios.get(`https://api.almonkdigital.in/api/admin/get-agent/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAgents(res.data.data);
    } catch (err) {
      console.error("Agent fetch error:", err);
    }
  };

  const handleAgentChange = (e) => {
    setFilters({ ...filters, agentId: e.target.value });
  };

  const handleProjectChange = (e) => {
    setFilters({ ...filters, projectId: e.target.value });
  };

  const fetchLeads = async (page = 1) => {
    try {
      const payload = {
        lead_status: "0",
        page,
        team_leader_id: filters.teamLeaderId,
        agent_id: filters.agentId,
        project_id: filters.projectId
      };

      const res = await api.post("/get-lead-data", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const list = res?.data?.data?.data || [];

      const mapped = list.map((item, index) => ({
        serialNO: (page - 1) * rowsPerPage + index + 1,
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
      setSelectedLeads([]);
      setCurrentPage(res.data.data.current_page);
      setTotalPages(res.data.data.last_page);
    } catch (err) {
      console.error("Lead fetch error:", err);
    }
  };

  const handleTransfer = async () => {
    if (!filters.teamLeaderId) {
      alert("Please select a Team Leader first.");
      return;
    }

    const payload = {
      lead_id: selectedLeads,
      tl_id: filters.teamLeaderId,
      agent_id: filters.agentId,
      project_id: filters.projectId
    };

    try {
      const res = await api.post("/assign-lead", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      if (res?.status === 200) {
        alert("Leads transferred!");
        setSelectedLeads([]);
        fetchLeads(currentPage);
      } else {
        alert("Transfer failed.");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      alert("Something went wrong.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchLeads(page);
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
    {
      field: "select",
      headerName: (
        <input
          type="checkbox"
          checked={data.length && selectedLeads.length === data.length}
          onChange={(e) => setSelectedLeads(e.target.checked ? data.map(row => row.id) : [])}
        />
      ),
      renderCell: (row) => (
        <input
          type="checkbox"
          checked={selectedLeads.includes(row.id)}
          onChange={(e) => {
            setSelectedLeads(prev =>
              e.target.checked ? [...prev, row.id] : prev.filter(id => id !== row.id)
            );
          }}
        />
      )
    },
    { field: "serialNO", headerName: "#" },
    { field: "id", headerName: "Customer ID" },
    { field: "enterDate", headerName: "Enter Date" },
    { field: "contactPerson", headerName: "Contact Person" },
    { field: "contactNumber", headerName: "Contact Number" },
    { field: "leadSource", headerName: "Lead Source" },
    { field: "teamLeader", headerName: "Team Leader" },
    { field: "agent", headerName: "Agent" },
    { field: "project", headerName: "Project" },
    { field: "followUp", headerName: "Follow Up" },
    { field: "archivedReason", headerName: "Archived Reason" },
    { field: "lastUpdate", headerName: "Last Update" },
    { field: "observation", headerName: "Observation" }
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Filters */}
      <div style={{ background: "#eee", padding: 15, borderRadius: 6, marginBottom: 15, gap: "10px", display: "flex", alignItems: "center" }}>
        <select onChange={handleTeamLeaderChange} value={filters.teamLeaderId}>
          <option value="">Select Team Leader</option>
          {teamLeaders.map(tl => (
            <option key={tl.user_id} value={tl.user_id}>{tl.name}</option>
          ))}
        </select>

        <select onChange={handleAgentChange} value={filters.agentId}>
          <option value="">Select Agent</option>
          {agents.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <select onChange={handleProjectChange} value={filters.projectId}>
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p.cat_value} value={p.cat_value}>{p.cat_value}</option>
          ))}
        </select>
        {selectedLeads.length > 0 && (
          <div >
            <button onClick={handleTransfer} style={{ padding: "5px 10px", borderRadius: "5px", background: "#28a745", color: "#fff" }}>
              Transfer Selected Leads
            </button>
          </div>
        )}
        {/* <button onClick={() => fetchLeads(1)} style={{ marginLeft: 10 }}>Search</button> */}
      </div>

      {/* Table */}
      <Example data={data} columns={columns} rowsPerPageOptions={[rowsPerPage]} />

      {/* Transfer Button */}


      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px"
        }}
      >
        {/* Prev Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage <= 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage <= 1 ? "not-allowed" : "pointer"
          }}
        >
          Prev
        </button>

        {/* Page Number Buttons */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              padding: "8px 14px",
              backgroundColor: page === currentPage ? "#dc3545" : "#003961",
              color: "#fff",
              fontWeight: page === currentPage ? "bold" : "normal",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage >= totalPages ? "#ccc" : "#007bff",
            color: "#fff",
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
