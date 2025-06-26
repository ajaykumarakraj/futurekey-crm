import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../app.css';
import api from "../component/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UpdateUserForm() {

    const { id } = useParams(); // Get user_id from route
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("1");
    const [teamLeaderList, setTeamLeaderList] = useState([]);
    const [selectedTeamLeader, setSelectedTeamLeader] = useState("");
    const [deviceLogin, setDeviceLogin] = useState("1");
    const [crmAccess, setCrmAccess] = useState("1");

    useEffect(() => {
        const loadUserDetails = async () => {
            try {
                const res = await api.get(`/get-user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.data.status === 200 && typeof res.data.data === "object") {
                    // console.log("role data", res.data.data.role)
                    const user = res.data.data;
                    setName(user.name || "");
                    setPhone(user.phone || "");
                    setGender(user.gender || "");
                    setEmail(user.email || "");
                    setRole(String(user.role));
                    setSelectedTeamLeader(user.team_leader_id !== "NA" ? user.team_leader_id : "");
                    setCrmAccess(user.crm_app_access === "Yes" ? "1" : "0");
                    setDeviceLogin(user.login_device?.toString() || "1");
                    setTeamLeaderList(user.all_team_leader || []);
                } else {
                    toast.error("Unexpected user response:", res.data)
                }
            } catch (error) {
                toast.error("Error loading user:", error.response?.data || error.message);
            }
        };

        loadUserDetails();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = {
            user_id: id,
            name,
            email,
            phone,
            gender,
            role,
            teamleader: role === role ? selectedTeamLeader : "",
            crm_app_access: crmAccess === "1" ? "Yes" : "No",
            login_device: deviceLogin,
        };

        try {
            const res = await api.post(`/update-user`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.data.status === 200) {
                toast.success("User updated successfully");

            } else {
                toast.error("Failed to update user");
                // toast.error("Unexpected response:", res.data);
            }
        } catch (error) {
            // console.error("Error submitting form:", error.response?.data || error.message);
            toast.error("Error submitting form");
        }
    };
    // console.log("id data another page", id)

    return (
        <div style={{
            maxWidth: '500px',
            margin: '50px auto',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 0 20px 0px #0003',
            background: '#ffffff'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#334' }}> Edit User</h2>

            <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="phone">Contact Number</label>
                    <input
                        type="text"
                        id="phone"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="role">Login Role</label>
                    <select
                        id="role"
                        value={role}
                        disabled={role === "1"}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    >

                        <option value="2">Team Leader</option>
                        <option value="3">Agent</option>
                    </select>
                </div>

                {role === "3" && (
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="teamLeader">Select Team Leader</label>
                        <select
                            id="teamLeader"
                            value={selectedTeamLeader}
                            onChange={(e) => setSelectedTeamLeader(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                            required
                        >
                            <option value="">Select Team Leader</option>
                            {teamLeaderList.map((leader) => (
                                <option key={leader.team_leader_id} value={leader.team_leader_id}>
                                    {leader.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="crmAccess">CRM/APP Access</label>
                    <select
                        id="crmAccess"
                        value={crmAccess}
                        onChange={(e) => setCrmAccess(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="singleDeviceLogin">Single Device Login Validation</label>
                    <select
                        id="singleDeviceLogin"
                        value={deviceLogin}
                        onChange={(e) => setDeviceLogin(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '10px' }}
                    >
                        Save
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateUserForm;
