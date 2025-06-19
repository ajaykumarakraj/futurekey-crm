import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function MiniDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMasterOpen, setMasterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLeadsClick = () => setIsLeadsOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = "/sign-in";
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Top Bar */}
      <div style={{
        height: '60px', background: '#1e1e1e', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', boxShadow: '0 2px 5px 0px #000'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setIsOpen((prev) => (!prev))}
            style={{ background: 'none', color: 'white', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            ☰
          </button>
          <h1 style={{ margin: '0', fontSize: '1.5rem' }}>My Dashboard</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* User Profile or icon can go here */}
          <span style={{ fontSize: '24px', cursor: 'pointer' }}>👤</span>
        </div>
      </div>

      {/* Main Section */}
      <div style={{ display: 'flex', flex: '1' }}>
        {/* Side Menu */}
        <div
          style={{
            width: isOpen ? 250 : 80,
            background: "#1e1e1e",
            color: 'white',
            transition: 'width 0.3s',
            padding: '20px',
            boxShadow: '2px 0 5px 0px #000'
          }}
        >
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/dashboard"
                style={{
                  color: 'white', textDecoration: 'none',
                  display: 'flex', alignItems: 'center',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/dashboard" ? "#ff9800" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/dashboard" ? "#ff9800" : "none"}
              >
                Dashboard
              </Link>
            </li>

            {/* Leads Menu */}
            <li style={{ marginBottom: '15px' }}>
              <button
                onClick={handleLeadsClick}
                style={{
                  color: 'white',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px',
                  borderRadius: '5px',
                  background: isLeadsOpen ? "#ff9800" : "none",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = isLeadsOpen ? "#ff9800" : "none"}
              >
                Leads <span>{isLeadsOpen ? '▾' : '▸'}</span>
              </button>

              {isLeadsOpen && (
                <ul style={{
                  listStyle: 'none', padding: '10px 20px', margin: '0',
                  background: 'rgba(0, 0, 0, 0.3)', borderRadius: '5px'
                }}>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/leads/create" style={{ color: 'white', textDecoration: 'none' }}>Create New</Link>
                  </li>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/leads/bulk-upload" style={{ color: 'white', textDecoration: 'none' }}>Bulk Upload</Link>
                  </li>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/leads/table" style={{ color: 'white', textDecoration: 'none' }}>Leads Table</Link>
                  </li>

                </ul>
              )}

            </li>
            {/* user management Menu */}
            <li style={{ marginBottom: '15px' }}>
              <button
                onClick={() => setIsProjectsOpen((prev) => !prev)}
                style={{
                  color: 'white',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px',
                  borderRadius: '5px',
                  background: isProjectsOpen ? "#ff9800" : "none",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = isProjectsOpen ? "#ff9800" : "none"}
              >
                User Management <span>{isProjectsOpen ? '▾' : '▸'}</span>
              </button>

              {isProjectsOpen && (
                <ul style={{
                  listStyle: 'none', padding: '10px 20px', margin: '0',
                  background: 'rgba(0, 0, 0, 0.3)', borderRadius: '5px'
                }}>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="user/form" style={{ color: 'white', textDecoration: 'none' }}>Add New User</Link>
                  </li>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="user/table" style={{ color: 'white', textDecoration: 'none' }}>View All User</Link>
                  </li>
                  {/* <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/projects/analytics" style={{ color: 'white', textDecoration: 'none' }}>Project Analytics</Link>
                  </li> */}
                </ul>
              )}

            </li>
            {/* Master setting Menu */}
            <li style={{ marginBottom: '15px' }}>
              <button
                onClick={() => setMasterOpen((prev) => !prev)}
                style={{
                  color: 'white',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px',
                  borderRadius: '5px',
                  background: isMasterOpen ? "#ff9800" : "none",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = isMasterOpen ? "#ff9800" : "none"}
              >
                Master Setting <span>{isMasterOpen ? '▾' : '▸'}</span>
              </button>


              {isMasterOpen && (
                <ul style={{
                  listStyle: 'none', padding: '10px 20px', margin: '0',
                  background: 'rgba(0, 0, 0, 0.3)', borderRadius: '5px'
                }}>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/projects/create" style={{ color: 'white', textDecoration: 'none' }}>Create New </Link>
                  </li>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #ff9800',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/projects/list" style={{ color: 'white', textDecoration: 'none' }}>View All User</Link>
                  </li>

                </ul>
              )}

            </li>
            {/* Table Menu */}
            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/table"
                style={{
                  color: 'white', textDecoration: 'none',
                  display: 'flex', alignItems: 'center',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/table" ? "#ff9800" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/table" ? "#ff9800" : "none"}
              >
                Table
              </Link>
            </li>

            {/* Setting Section */}
            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/change-password"
                style={{
                  color: 'white', textDecoration: 'none',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/change-password" ? "#ff9800" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/change-password" ? "#ff9800" : "none"}
              >
                Change Password
              </Link>
            </li>

            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/support"
                style={{
                  color: 'white', textDecoration: 'none',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/support" ? "#ff9800" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#ff9800"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/support" ? "#ff9800" : "none"}
              >
                Contact Support
              </Link>
            </li>

            <button
              onClick={handleLogout}
              style={{
                background: 'none', color: 'white',
                border: 'none', width: '100%', textAlign: 'left',
                padding: '10px', borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.05)',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
              onMouseOut={(e) => e.target.style.background = "rgba(255, 255, 255, 0.05)"}
            >
              Sign Out
            </button>
          </ul>
        </div>

        {/* Main content */}
        <div style={{ flex: '1', padding: '20px', background: '#f5f5f5' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

