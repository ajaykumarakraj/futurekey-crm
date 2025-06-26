import React, { useState, useEffect } from "react";
import '../app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../component/api";

function UserForm() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("1");
    const [teamLeaderList, setTeamLeaderList] = useState([]); // ✅ for list
    const [selectedTeamLeader, setSelectedTeamLeader] = useState(""); // ✅ for selected leader
    const [deviceLogin, setDeviceLogin] = useState("1");
    const [crmAccess, setCrmAccess] = useState("1");



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            phone,
            gender,
            role,
            teamleader: role === "3" ? selectedTeamLeader : "",
            crm_app_access: crmAccess,
            login_device: deviceLogin,
        };
        // console.log(formData)
        try {
            const res = await api.post(`/add-user`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.data.status === 200) {
                toast.success("User added successfully");

                // Reset form
                setName("");
                setPhone("");
                setGender("");
                setEmail("");
                setRole("1");
                setSelectedTeamLeader("");
                setCrmAccess("1");
                setDeviceLogin("1");
            } else {
                toast.error("Failed to add user");
                // console.warn("Unexpected response:", res.data);
            }
        } catch (error) {
            // console.error("Error submitting form:", error.response?.data || error.message);
            toast.error("Error submitting form");
        }
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '50px auto',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 0 20px 0px #0003',
            background: '#ffffff'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#334' }}>Add  User</h2>

            <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
                    >
                        <option value="1">Admin</option>
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
                            <option value="1">Select Team Leader</option>
                            {teamLeaderList.map((leader) => (
                                <option key={leader.id} value={leader.user_id}>
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
                        type="button"
                        onClick={() => {
                            setName("");
                            setPhone("");
                            setGender("");
                            setEmail("");
                            setRole("1");
                            setSelectedTeamLeader("");
                            setCrmAccess("1");
                            setDeviceLogin("1");
                        }}
                        style={{ padding: '10px 20px', marginRight: '10px', background: '#eee', border: 'none', borderRadius: '10px' }}
                    >
                        Cancel
                    </button>
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

export default UserForm;
