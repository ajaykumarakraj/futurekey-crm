import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import axios from "axios";

import api from "../component/api";
import imgad from "../assets/images/delete.png"
const MasterSetting = () => {
    const [category, setCategory] = useState("");
    const [value, setValue] = useState("");
    const [measurements, setMeasurements] = useState([]);
    const [leadSources, setLeadSources] = useState([]);
    const [project, setProject] = useState([]);
    const [archivedReasons, setArchivedReasons] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await api.get("/view-master-setting", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.data.status === 200) {
                const allData = res.data.data;

                setMeasurements(allData.filter(item => item.cat_name === "Require Measurement"));
                setLeadSources(allData.filter(item => item.cat_name === "Lead Source"));
                setArchivedReasons(allData.filter(item => item.cat_name === "Archived Reason"));
                setProject(allData.filter(item => item.cat_name === "Project"));
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const delres = await api.get(`/delete-master-setting/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (delres.data.status === 200) {
                        toast.error(delres.data.message);
                        getData();
                    }
                } catch (error) {
                    toast.error("Something went wrong.");
                }
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || !value) return alert("Please select a category and enter a value.");

        try {
            const res = await api.post(
                "/add-master-setting",
                {
                    category_name: category,
                    category_value: value,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.status === 200) {
                // alert(res.data.message);
                toast.success(res.data.message);
                setValue("");
                getData();
            } else {
                toast.error("Failed to add master setting.");
            }
        } catch (error) {
            // console.error("Submit error:", error);
            toast.error("Something went wrong.");
        }
    };

    const renderTable = (title, data) => (
        <div style={styles.tableWrapper}>
            <h3 style={styles.sectionTitle}>{title}</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {/* <th style={styles.th}>ID</th> */}
                        <th style={styles.th}>Value</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} style={styles.tr}>
                            {/* <td style={styles.td}>{item.id}</td> */}
                            <td style={styles.td}>{item.cat_value}</td>
                            <td style={styles.td} ><img onClick={() => handleDelete(item.id)} style={styles.imgcur} src={imgad} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Master Settings</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Select Category:</label>
                    <select className="p-0"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">-- Choose --</option>
                        <option value="Require Measurement">Require Measurement</option>
                        <option value="Lead Source">Lead Source</option>
                        <option value="Archived Reason">Archived Reason</option>
                        <option value="Project">Project</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Enter Value:</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter value"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={{ marginTop: "12px" }}>
                    <button type="submit" style={styles.button}>Add</button>
                </div>
            </form>

            {renderTable("Require Measurement", measurements)}
            {renderTable("Lead Source", leadSources)}
            {renderTable("Archived Reason", archivedReasons)}
            {renderTable("Project", project)}
            <ToastContainer />
        </div>

    );
};

export default MasterSetting;
const styles = {
    container: {
        maxWidth: "900px",
        margin: "auto",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f7f9fc",
    },
    header: {
        fontSize: "28px",
        textAlign: "center",
        marginBottom: "30px",
        color: "#2c3e50",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        marginBottom: "40px",
        justifyContent: "space-evenly",
        display: "flex",
        alignItems: "center"
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        fontWeight: "600",
        marginBottom: "8px",
        color: "#333",
    },
    select: {
        // width: "",
        padding: "12px",
        fontSize: "15px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    input: {
        // width: "100%",
        padding: "12px",
        fontSize: "15px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#003961",
        color: "#fff",
        padding: "5px 20px",
        fontSize: "16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    sectionTitle: {
        fontSize: "20px",
        color: "#2c3e50",
        marginBottom: "15px",
    },
    tableWrapper: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "30px",
    },
    table: {
        textAlign: "center",
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        backgroundColor: "#f2f2f2",
        padding: "12px",
        textAlign: "left",
        fontWeight: "600",
        borderBottom: "1px solid #ddd",
        textAlign: "center",
    },
    tr: {
        borderBottom: "1px solid #eee",
    },
    td: {
        padding: "12px",
        fontSize: "14px",
    },
    imgcur: {
        cursor: "pointer",
    }
};
