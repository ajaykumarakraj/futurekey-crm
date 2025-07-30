import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../component/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../app.css"
import { useParams } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
const UpdateCreateForm = () => {
    const { user, token } = useAuth()
    const { id } = useParams();
    const [name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectCustomer, setSelectCustomer] = useState("");
    // remark note 
    const [getnote, setGetNote] = useState([]);
    const [remark, setRemark] = useState('');
    const [notes, setNotes] = useState("");
    // number 
    const [number, setNumber] = useState("");
    const [altnumber, setAltnumber] = useState("");
    // requirement  
    const [requirement, setRequirement] = useState("");
    const [require, setRequire] = useState([]);
    // lead source 
    const [leadSourceList, setLeadSourceList] = useState([])
    const [leadSource, setLeadSource] = useState("");
    // project 
    const [selectproject, setSelectProject] = useState("");
    const [projectList, setProjectList] = useState([]);
    // team Leader
    const [getteamleader, setGetTeamLeader] = useState("");
    const [teamLeader, setTeamLeader] = useState([]);
    const [teamleaderId, setTeamLeaderId] = useState('');
    // agent
    const [getAgent, setGetAgent] = useState("");
    const [agentid, setAgentId] = useState([]);
    const [agent, setAgent] = useState([]);

    // state
    const [statedata, setState] = useState([])
    const [selectedState, setSelectedState] = useState("");
    const [city, setCity] = useState("");
    const [callStatus, setCallStatus] = useState("");
    const [callAction, setCallAction] = useState("");
    const [leadStatus, setLeadStatus] = useState("");
    const [scheduleSiteDate, setScheduleSiteDate] = useState("");
    const [houseVisitDate, setHouseVisitDate] = useState("");
    const [officeVisitDate, setOfficeVisitDate] = useState("");
    const [midWayDate, setMidWayDate] = useState("");
    const genderData = ["Male", "Female", "Other"];
    const customerTypeData = ["Dealer", "Customer"];
    const callStatusData = ["Connect", "Not Connect"];
    const callActionData = ["Morning", "After Noon", "Evening"];


    useEffect(() => {
        Requirment();
        teamLeaderfn();
        state();
        GetDataFn();
    }, [])
    const state = async () => {
        try {
            const resstate = await axios.get("https://api.almonkdigital.in/api/state-list", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (resstate.status === 200) {
                // console.log("state", resstate.data.data)
                setState(resstate.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const Requirment = async () => {
        try {
            const response = await axios.get('https://api.almonkdigital.in/api/admin/view-master-setting', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 200) {

                const getData = response.data.data
                // console.log(getData)
                setRequire(getData.filter(item => item.cat_name === "Require Measurement"))
                setProjectList(getData.filter(item => item.cat_name === "Project"))
                setLeadSourceList(getData.filter(item => item.cat_name === "Lead Source"))
            }
        } catch (error) {
            toast.error(error);
        }
    }
    const teamLeaderfn = async () => {
        try {
            const teamleaderres = await axios.get("https://api.almonkdigital.in/api/admin/get-team-leader", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (teamleaderres.status === 200) {
                // console.log("team", teamleaderres.data.data)
                setTeamLeader(teamleaderres.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleFilterChange = async (e) => {
        const teamleaderId = e.target.value
        setTeamLeaderId(teamleaderId)

        try {
            const agentRes = await axios.get(`https://api.almonkdigital.in/api/admin/get-agent/${teamleaderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (agentRes.status === 200) {

                setAgent(agentRes.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleAgentId = (e) => {
        const AgentId = e.target.value
        console.log("AgentId", AgentId)
        setAgentId(AgentId)
    }

    // get data api
    const GetDataFn = async () => {

        try {
            const res = await axios.get(`https://api.almonkdigital.in/api/admin/fetch-lead-data/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.status === 200) {
                console.log("fetchdata", res.data.notes)
                const fetchdata = res.data.data

                setName(fetchdata.name)
                setNumber(fetchdata.contact)
                setAltnumber(fetchdata.alt_contact)
                setSelectedGender(fetchdata.gender)
                setSelectedState(fetchdata.state)
                setCity(fetchdata.city)
                setSelectCustomer(fetchdata.customer_type)
                setRequirement(fetchdata.requirement)
                setLeadSource(fetchdata.lead_source)
                setSelectProject(fetchdata.project_id)
                setGetTeamLeader(res.data.tl_name)
                setGetAgent(res.data.agent_name)
                setGetNote(res.data.notes)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // submit update api 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !number || !selectedGender || !selectedState || !leadSource || !selectproject) {
            toast.error("Please fill all required fields.");
            return;
        }

        const formData = {
            user_id: user.user_id,
            id: id,
            name,
            contact: number,
            alt_contact: altnumber,
            gender: selectedGender,
            state: selectedState,
            city,
            requirement,
            lead_source: leadSource,
            customer_type: selectCustomer,
            project: selectproject,
            remark,
            team_leader: teamleaderId,
            agent: agentid,
            notes: notes,
            site_visit: scheduleSiteDate,
            house_visit: houseVisitDate,
            office_visit: officeVisitDate,
            mid_way_visit: midWayDate,
            call_status: callStatus,

            last_call_action: callAction,
            lead_status: leadStatus,
        };
        console.log("post for update", formData)
        try {
            const res = await api.post("https://api.almonkdigital.in/api/admin/update-lead", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.status === 200) {
                toast.success("Client Update successfully!");
                setNotes("")
            }
        } catch (error) {
            toast.error("Failed to add client. Try again.");
        }
    };
    console.log("check", user.user_id)
    console.log("check", getnote)
    return (
        <div className="container">
            <h2 className="mb-4 text-center textsize">Update Lead</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white ">

                <div className="formstart">
                    {/* Personal Details Section */}
                    <div className="border rounded p-3 mb-4">
                        <h5 className="mb-3">Personal Details</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Full Name</label>
                                <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Gender</label>
                                <select className="form-select" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                                    <option value="">Select Gender *</option>
                                    {genderData.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Number</label>
                                <input className="form-control" type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Mobile No. *" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Alt Number</label>
                                <input className="form-control" type="text" value={altnumber} onChange={(e) => setAltnumber(e.target.value)} placeholder="Alt Mobile No." />
                            </div>
                        </div>
                    </div>
                    {/* Assign Lead Section */}
                    <div className="border rounded p-3 mb-4">
                        <h5 className="mb-3">Address</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Select State</label>
                                <select className="form-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                                    <option value="">Select State *</option>
                                    {Array.isArray(statedata) && statedata.map((v, key) => (
                                        <option value={v.state} key={key}>{v.state}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>City</label>
                                <input className="form-control" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                            </div>
                        </div>



                    </div>

                    {/* Lead Details Section */}
                    <div className="border rounded p-3 mb-4">
                        <h5 className="mb-3">Lead Details</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Customer Type</label>
                                <select className="form-select" value={selectCustomer} onChange={(e) => setSelectCustomer(e.target.value)}>
                                    <option value="">Customer Type</option>
                                    {customerTypeData.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Requirement</label>
                                <select className="form-select" value={requirement} onChange={(e) => setRequirement(e.target.value)}>
                                    <option value="">Requirement</option>
                                    {require.map((r) => (
                                        <option key={r.id} value={r.cat_value}>
                                            {r.cat_value}
                                        </option>))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Lead Source *</label>
                                <select className="form-select" value={leadSource} onChange={(e) => setLeadSource(e.target.value)}>
                                    <option value="">Lead Source *</option>

                                    {leadSourceList.map((r) => (
                                        <option key={r.id} value={r.cat_value}>
                                            {r.cat_value}
                                        </option>))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Project *</label>
                                <select className="form-select" value={selectproject} onChange={(e) => setSelectProject(e.target.value)}>
                                    <option value="">Project *</option>
                                    {projectList.map((r) => (
                                        <option key={r.id} value={r.cat_value}>
                                            {r.cat_value}
                                        </option>))
                                    }

                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Select Team Leader</label>
                                <select className="form-select" onChange={handleFilterChange} >
                                    <option value=''>{getteamleader || "Select Team Leader"}</option>
                                    {

                                        Array.isArray(teamLeader) && teamLeader.map((value, key) =>
                                            <option key={key} value={value.user_id}>{value.name}</option>
                                        )
                                    }


                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Select Agent</label>
                                <select className="form-select" onChange={handleAgentId} >
                                    {/* <option value="">{}</option> */}
                                    <option value=''>{getAgent || "Select Agent"}</option>
                                    {
                                        Array.isArray(agent) && agent.map((v, k) =>
                                            <option key={k} value={v.id}>{v.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Last Call Status</label>
                                <select className="form-select" value={callStatus} onChange={(e) => setCallStatus(e.target.value)}>
                                    <option value="">Last Call Status</option>
                                    {callStatusData.map(lt => <option key={lt} value={lt}>{lt}</option>)}

                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Last Call Action</label>
                                <select className="form-select" value={callAction} onChange={(e) => setCallAction(e.target.value)}>
                                    <option value="">Last Call Action</option>
                                    {callActionData.map(ct => <option key={ct} value={ct}>{ct}</option>)}

                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Lead Status</label>
                                <select className="form-select" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
                                    <option value="">Lead Status</option>
                                    <option value="1">New Lead</option>
                                    <option value="2">In Progress</option>
                                    <option value="3">Hot Lead</option>
                                    <option value="4">Archived</option>
                                    <option value="5">Converted</option>

                                </select>
                            </div>





                            <div className="col-md-3 mb-3">
                                <label style={{ display: "block" }}>Schedule Site Visit</label>
                                <input type="date" style={{
                                    padding: "8px 12px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    backgroundColor: "#f9f9f9",
                                    color: "#333",
                                    cursor: "pointer",
                                }} min={new Date().toISOString().split("T")[0]} value={scheduleSiteDate} onChange={(e) => setScheduleSiteDate(e.target.value)} />

                            </div>
                            <div className="col-md-3 mb-3">
                                <label style={{ display: "block" }}>House Visit Complete</label>
                                <input type="date" style={{
                                    padding: "8px 12px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    backgroundColor: "#f9f9f9",
                                    color: "#333",
                                    cursor: "pointer",
                                }} min={new Date().toISOString().split("T")[0]} value={houseVisitDate} onChange={(e) => setHouseVisitDate(e.target.value)} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label style={{ display: "block" }}>Office Visit Completed</label>
                                <input type="date" style={{
                                    padding: "8px 12px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    backgroundColor: "#f9f9f9",
                                    color: "#333",
                                    cursor: "pointer",
                                }} min={new Date().toISOString().split("T")[0]} value={officeVisitDate} onChange={(e) => setOfficeVisitDate(e.target.value)} />

                            </div>
                            <div className="col-md-5 mb-3">
                                <label style={{ display: "block" }}>Mid Way Visit completed</label>
                                <input type="date" style={{
                                    padding: "8px 12px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    backgroundColor: "#f9f9f9",
                                    color: "#333",
                                    cursor: "pointer",
                                }}
                                    min={new Date().toISOString().split("T")[0]}
                                    value={midWayDate}
                                    onChange={(e) => setMidWayDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="border rounded p-3 mb-4">
                        <h5 className="mb-3">Notes</h5>
                        <div className="row">

                            <div className="col-12 mb-3">
                                <div className="notediv">
                                    {getnote.map((v, k) => (
                                        <div key={k} className="pstyle">
                                            <p>{v.notes || ""}</p>
                                            <p> {v.lead_status || ""}</p>
                                            <p> {v.call_status || ""}</p>
                                            <p> {v.last_call_action || ""}</p>
                                            <p> {v.office_visit || ""}</p>
                                            <p> {v.house_visit || ""}</p>
                                            <p> {v.midmid_way_visit || ""}</p>
                                            <p> {v.site_visit || ""}</p>
                                            <p> {v.by || ""}</p>
                                        </div>
                                    ))}

                                </div>
                                <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Type Here..." rows="3" />
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary " type="submit">Save</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateCreateForm;
