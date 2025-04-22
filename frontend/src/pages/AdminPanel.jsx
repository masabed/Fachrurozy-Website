import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // For redirecting
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../AdminPanel.scss'; // Optional custom styles

function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // For redirecting to login

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Check if user is authenticated on mount
  useEffect(() => {
    if (!token) {
      history.push('/login'); // Redirect to login if no token
    }
  }, [token, history]);

  // Fetch users from API when "Users" section is selected
  useEffect(() => {
    if (activeSection === 'users' && token) {
      setLoading(true);
      fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch users or unauthorized');
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          setLoading(false);
          if (error.message.includes('unauthorized')) {
            localStorage.removeItem('token'); // Clear invalid token
            localStorage.removeItem('role');
            history.push('/login'); // Redirect to login
          }
        });
    }
  }, [activeSection, token, history]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in header
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear localStorage and redirect on success
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      history.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Optionally handle logout failure (e.g., show an error message)
      localStorage.removeItem('token'); // Force logout even if API fails
      localStorage.removeItem('role');
      history.push('/login');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Dashboard Overview</h5>
              <p className="card-text">Add your widgets, charts, or data here.</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div>
            <h3>Users</h3>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <MDBTable striped hover>
                <MDBTableHead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Roles</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td>{user.roles.join(', ')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            )}
          </div>
        );
      case 'blogs':
        return <p>Blogs management section coming soon!</p>;
      case 'settings':
        return <p>Settings section coming soon!</p>;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  // If no token, don't render anything (redirect will handle it)
  if (!token) return null;

  return (
    <MDBContainer fluid className="p-0">
      <MDBRow className="m-0">
        <MDBCol
          md="3"
          lg="2"
          className={`bg-light vh-100 p-3 sidebar ${isSidebarOpen ? 'open' : ''}`}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="m-0">Admin Panel</h4>
            <MDBBtn color="link" className="d-md-none p-0" onClick={toggleSidebar}>
              <MDBIcon fas icon="times" />
            </MDBBtn>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                href="#dashboard"
                className={`nav-link text-dark ${activeSection === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('dashboard');
                }}
              >
                <MDBIcon fas icon="tachometer-alt" className="me-2" />
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#users"
                className={`nav-link text-dark ${activeSection === 'users' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('users');
                }}
              >
                <MDBIcon fas icon="users" className="me-2" />
                Users
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#blogs"
                className={`nav-link text-dark ${activeSection === 'blogs' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('blogs');
                }}
              >
                <MDBIcon fas icon="blog" className="me-2" />
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#settings"
                className={`nav-link text-dark ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('settings');
                }}
              >
                <MDBIcon fas icon="cog" className="me-2" />
                Settings
              </a>
            </li>
            <li className="nav-item mt-auto">
              <a
                href="/login"
                className="nav-link text-dark"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout(); // Call logout function
                }}
              >
                <MDBIcon fas icon="sign-out-alt" className="me-2" />
                Logout
              </a>
            </li>
          </ul>
        </MDBCol>

        <MDBCol
          md="9"
          lg="10"
          className="ml-md-auto p-4"
          style={{ marginLeft: 'auto' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Welcome to the Admin Panel</h2>
            <MDBBtn color="primary" className="d-md-none" onClick={toggleSidebar}>
              <MDBIcon fas icon="bars" />
            </MDBBtn>
          </div>
          <div className="content">{renderContent()}</div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AdminPanel;