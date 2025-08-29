import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GeneralDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div style={layoutStyle}>
      <Header />
      <main style={mainContentStyle}>
        {/* User Info */}
        <div style={userInfoStyle}>
          <FaUserCircle size={48} color="#124E66" />
          <div style={{ marginLeft: '1rem' }}>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
              Welcome, {user.username || "General User"}
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              Role: {user.role || "general_user"}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={cardContainerStyle}>
          <div style={cardStyle}>
            <h2 style={cardTitle}>📢 Report a New Issue</h2>
            <p style={cardText}>Let authorities know about problems in your area.</p>
            <Link to="/report">
              <button style={buttonStyle}>Report Issue</button>
            </Link>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitle}>📄 My Reported Issues</h2>
            <p style={cardText}>View the list and status of issues you've reported.</p>
            <button style={buttonStyle} onClick={() => navigate('/my-issues')}>
              View Issues
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Layout
const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: '#eef2f5',
  fontFamily: '"Segoe UI", sans-serif',
};

const mainContentStyle = {
  flex: 1,
  padding: '2rem 1.5rem',
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2rem',
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '2rem',
};

const cardStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  width: '300px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const cardTitle = {
  fontSize: '1.4rem',
  fontWeight: '600',
  marginBottom: '0.5rem',
  color: '#124E66',
};

const cardText = {
  marginBottom: '1.5rem',
  color: '#555',
  fontSize: '0.95rem',
};

const buttonStyle = {
  background: '#124E66',
  color: 'white',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};

export default GeneralDashboard;
