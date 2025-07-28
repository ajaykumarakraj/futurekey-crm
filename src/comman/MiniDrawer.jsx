import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../component/AuthContext'
import imgad from "../assets/images/hacker.png"
export default function MiniDrawer() {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMasterOpen, setMasterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLeadsClick = () => setIsLeadsOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = "/sign-in";
  };
  console.log(user)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Top Bar */}
      <div style={{
        height: '60px', background: '#1e1e1e', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '15px 20px', boxShadow: '0 2px 5px 0px #000'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* <button
            onClick={() => setIsOpen((prev) => (!prev))}
            style={{ background: 'none', color: 'white', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            ☰
          </button> */}
          <h1 style={{ margin: '0', fontSize: '1.5rem' }}>
            FUTUREKEY HOMES PVT LTD.</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* User Profile or icon can go here */}
          <span style={{ fontSize: '15px', cursor: 'pointer' }}><img src={imgad} style={{ height: "22px" }} />{user.name}  ({user.role})</span>
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
                  background: location.pathname === "/dashboard" ? "#003961" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/dashboard" ? "#003961" : "none"}
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
                  background: isLeadsOpen ? "#003961" : "none",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = isLeadsOpen ? "#003961" : "none"}
              >
                Leads <span>{isLeadsOpen ? '▾' : '▸'}</span>
              </button>

              {isLeadsOpen && (
                <ul style={{
                  listStyle: 'none', padding: '10px 20px', margin: '0',
                  background: 'rgba(0, 0, 0, 0.3)', borderRadius: '5px'
                }}>
                  <Link to="/leads/create" style={{ color: 'white', textDecoration: 'none' }}> <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px',

                  }}>
                    Create New
                  </li></Link>
                  <Link to="/leads/bulk-upload" style={{ color: 'white', textDecoration: 'none' }}><li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    Bulk Upload
                  </li></Link>
                  <Link to="/leads/table" style={{ color: 'white', textDecoration: 'none' }}>   <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    Leads Table
                  </li></Link>

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
                  background: isProjectsOpen ? "#003961" : "none",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = isProjectsOpen ? "#003961" : "none"}
              >
                User Management <span>{isProjectsOpen ? '▾' : '▸'}</span>
              </button>

              {isProjectsOpen && (
                <ul style={{
                  listStyle: 'none', padding: '10px 20px', margin: '0',
                  background: 'rgba(0, 0, 0, 0.3)', borderRadius: '5px'
                }}>
                  <Link to="/user/form"

                    style={{ color: 'white', textDecoration: 'none' }}> <li style={{
                      marginBottom: '10px', padding: '8px 12px',
                      borderLeft: '4px solid #003961',
                      background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                    }}>
                      Add New User
                    </li></Link>
                  <Link to="user/table" style={{ color: 'white', textDecoration: 'none' }}
                  >   <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'

                  }}>
                      View All User
                    </li></Link>
                  {/* <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/projects/analytics" style={{ color: 'white', textDecoration: 'none' }}>Project Analytics</Link>
                  </li> */}
                </ul>
              )}

            </li>
            {/* Master setting Menu */}
            {/* <li style={{ marginBottom: '15px' }}>
              <button
                onClick={() => setMasterOpen((prev) => !prev)}
                style={{
                  color: 'white',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px',
                  borderRadius: '5px',
                  background: isMasterOpen ? "#003961" : "none",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = isMasterOpen ? "#003961" : "none"}
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
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/projects/create" style={{ color: 'white', textDecoration: 'none' }}>Create New </Link>
                  </li>
                  <li style={{
                    marginBottom: '10px', padding: '8px 12px',
                    borderLeft: '4px solid #003961',
                    background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px'
                  }}>
                    <Link to="/projects/list" style={{ color: 'white', textDecoration: 'none' }}>View All User</Link>
                  </li>

                </ul>
              )}

            </li> */}
            {/* Master Setting */}
            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/mastersetting"
                style={{
                  color: 'white', textDecoration: 'none',
                  display: 'flex', alignItems: 'center',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/mastersetting" ? "#003961" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/mastersetting" ? "#003961" : "none"}
              >
                Master Setting
              </Link>
            </li>
            {/* Table Menu */}
            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/table"
                style={{
                  color: 'white', textDecoration: 'none',
                  display: 'flex', alignItems: 'center',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/table" ? "#003961" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/table" ? "#003961" : "none"}
              >
                Table
              </Link>
            </li>
            {/* Table Menu */}
            <li style={{ marginBottom: '15px' }}>
              <Link
                to="/support"
                style={{
                  color: 'white', textDecoration: 'none',
                  display: 'flex', alignItems: 'center',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/support" ? "#003961" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/support" ? "#003961" : "none"}
              >
                Contact Support
              </Link>
            </li>
            {/* Setting Section */}
            {/* <li style={{ marginBottom: '15px' }}>
              <Link
                to="/change-password"
                style={{
                  color: 'white', textDecoration: 'none',
                  padding: '10px', borderRadius: '5px',
                  background: location.pathname === "/change-password" ? "#003961" : "none",
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = "#003961"}
                onMouseOut={(e) => e.target.style.background = location.pathname === "/change-password" ? "#003961" : "none"}
              >
                Change Password
              </Link>
            </li> */}



            <button
              onClick={handleLogout}
              style={{
                color: 'white',
                // background: 'none', color: 'white',
                border: 'none', width: '100%', textAlign: 'left',
                padding: '10px', borderRadius: '5px',
                background: 'rgba(0, 222, 155, 0.05)',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.background = "#003961"}
              onMouseOut={(e) => e.target.style.background = "rgba(45, 4, 106, 0.05)"}
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

