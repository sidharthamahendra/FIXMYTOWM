import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthApp = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token, role) => {
    setToken(token);
    setRole(role);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, your role is: {role}</h2>
      <button onClick={logout}>Logout</button>
      {/* Here you can render your app after login */}
    </div>
  );
};

export default AuthApp;
