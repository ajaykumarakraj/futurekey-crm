import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateForm = () => {
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [number, setNumber] = useState("");
  const [altnumber, setAltnumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectCustomer, setSelectCustomer] = useState("");
  const [requirement, setRequirement] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [project, setProject] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [agent, setAgent] = useState("");

  const genderData = ["Male", "Female", "Other"];
  const cityData = ["Noida", "Delhi", "Aligarh"];
  const customerTypeData = ["Dealer", "Customer"];
  const requirementData = ["100 Sq.Yards", "150 Sq.Yards", "200 Sq.Yards", "50 Sq.Yards", "Flat", "Plot"];
  const leadSourceData = ["Facebook", "Instagram"];
  const projectData = ["Golden Enclave", "Golden Enclave 23k Square", "Golden Home", "Golden Home 3 Lac"];
  const personData = ["Ram", "Shayam", "Vivek", "Rahul"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !number || !selectedGender || !selectedCity || !selectCustomer) {
      toast.error("Please fill all the required fields.");
      return;
    }

    const formData = {
      name,
      contact: number,
      alt_contact: altnumber,
      gender: selectedGender,
      state: selectedCity,
      city: selectedCity,
      requirement,
      lead_source: leadSource,
      customer_type: selectCustomer,
      project: "1",
      remark: "No Remark",
      team_leader: teamLeader,
      agent,
    };

    try {
      const res = await axios.post("https://api.almonkdigital.in/api/create-customer", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // console.log("Success:", res.data);
      toast.success("Client added successfully!");
      setName("")
      setSelectedGender("")
      setAgent("")
      setTeamLeader("")
      setProject("")
      setLeadSource("")
      setRequirement("")
      setSelectCustomer("")
      setSelectedCity("")
      setAltnumber("")
      setNumber("")

    } catch (error) {
      // console.error("Error posting data:", error);
      toast.error("Failed to add client. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={{ margin: 0 }}>Create New Cleint</h1>
        <input style={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

        <select style={styles.select} value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">Select Gender</option>
          {genderData.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        <input style={styles.input} type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Mobile No." />
        <input style={styles.input} type="text" value={altnumber} onChange={(e) => setAltnumber(e.target.value)} placeholder="Alt Mobile No." />

        <select style={styles.select} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Select City</option>
          {cityData.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select style={styles.select} value={selectCustomer} onChange={(e) => setSelectCustomer(e.target.value)}>
          <option value="">Customer Type</option>
          {customerTypeData.map(ct => <option key={ct} value={ct}>{ct}</option>)}
        </select>

        <select style={styles.select} value={requirement} onChange={(e) => setRequirement(e.target.value)}>
          <option value="">Requirement</option>
          {requirementData.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select style={styles.select} value={leadSource} onChange={(e) => setLeadSource(e.target.value)}>
          <option value="">Lead Source</option>
          {leadSourceData.map(ls => <option key={ls} value={ls}>{ls}</option>)}
        </select>

        <select style={styles.select} value={project} onChange={(e) => setProject(e.target.value)}>
          <option value="">Project</option>
          {projectData.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select style={styles.select} value={teamLeader} onChange={(e) => setTeamLeader(e.target.value)}>
          <option value="">Team Leader</option>
          {personData.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select style={styles.select} value={agent} onChange={(e) => setAgent(e.target.value)}>
          <option value="">Agent</option>
          {personData.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <button style={styles.button} type="submit">Save</button>
      </form>
      <ToastContainer />
    </>

  );
};

const styles = {
  form: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  input: {
    padding: "12px 15px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  select: {
    padding: "12px 15px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#fff",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px",
    backgroundColor: "#004080",
    color: "#ffffff",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default CreateForm;
