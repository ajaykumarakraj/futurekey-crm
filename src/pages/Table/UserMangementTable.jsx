import React, { useState, useEffect } from "react";
import Example from "../Table/Example";
import api from "../../component/api";
import { useNavigate } from "react-router-dom";

const UserManagementTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPageURL, setNextPageURL] = useState(null);
    const [prevPageURL, setPrevPageURL] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (url = "/user-list") => {
        try {
            setLoading(true);
            let res;
            if (url.startsWith("https")) {
                res = await fetch(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }).then(r => r.json());
            } else {
                res = await api.get(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }).then(r => r.data);
            }

            if (res?.data && Array.isArray(res?.data)) {
                const mapped = res.data.map(item => ({
                    id: item.user_id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    role: item.role,
                    assign_team_leader: item.assign_team_leader
                }));

                setData(mapped);
                setCurrentPage(res?.meta?.current_page || 1);
                setTotalPages(res?.meta?.last_page || 1);
                setTotalRecords(res?.meta?.total || 0);
                setNextPageURL(res?.meta?.next_page_url || null);
                setPrevPageURL(res?.meta?.prev_page_url || null);
            } else {
                console.error('API did not return expected format');
                setData([]);
            }
        } catch (error) {
            console.error("Fetching Error", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        handleSearch(`/user-list?page=${page}`);
    };

    useEffect(() => {
        handleSearch("/user-list");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (row) => {
        navigate(`/user/update/${row.id}`);
    };

    const columns = [
        { field: "id", headerName: "User ID", align: "center" },
        { field: "name", headerName: "Name", align: "left" },
        { field: "email", headerName: "Email", align: "left" },
        { field: "phone", headerName: "Contact Number", align: "center" },
        { field: "role", headerName: "Role", align: "center" },
        { field: "assign_team_leader", headerName: "Team Leader", align: "center" },
        {
            headerName: "Actions",
            align: "center",
            renderCell: (row) => (
                <button
                    style={{
                        padding: "6px 12px",
                        backgroundColor: "#FFA500",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                    onClick={() => handleEdit(row)}
                >
                    Edit
                </button>
            )
        }
    ];

    return (
        <div>
            {/* Show total records */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
                Total Records: {totalRecords}
            </p>

            {/* Table Section */}
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
            ) : (
                <Example data={data} columns={columns} rowsPerPageOptions={[20]} />
            )}

            {/* Pagination Section */}
            <div style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
            }}>
                {/* Prev Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!prevPageURL}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: !prevPageURL ? "#e0e0e0" : "#003961",
                        color: !prevPageURL ? "#888" : "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: !prevPageURL ? "not-allowed" : "pointer"
                    }}
                >
                    Prev
                </button>

                {/* Show only 5 page numbers */}
                {(() => {
                    const pageNumbers = [];
                    let start = Math.max(1, currentPage - 2);
                    let end = Math.min(totalPages, currentPage + 2);

                    if (end - start < 4) {
                        if (start === 1) {
                            end = Math.min(totalPages, start + 4);
                        } else if (end === totalPages) {
                            start = Math.max(1, end - 4);
                        }
                    }

                    for (let i = start; i <= end; i++) {
                        pageNumbers.push(i);
                    }

                    return pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={currentPage === page}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: currentPage === page ? "#003961" : "#e0e0e0",
                                color: currentPage === page ? "#ffffff" : "#000",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            {page}
                        </button>
                    ));
                })()}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!nextPageURL}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: !nextPageURL ? "#e0e0e0" : "#003961",
                        color: !nextPageURL ? "#888" : "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: !nextPageURL ? "not-allowed" : "pointer"
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserManagementTable;
