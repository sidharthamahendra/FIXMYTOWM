import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VolunteerDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const fetchAssignedIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/issues/assigned', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIssues(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assigned issues:', error);
    }
  };

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  const total = issues.length;
  const resolved = issues.filter(i => i.status === 'Resolved').length;
  const progress = issues.filter(i => i.status === 'In Progress').length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow p-6">
        {/* Welcome Section */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow mb-6">
          <UserCircleIcon className="h-14 w-14 text-[#124E66]" />
          <div>
            <h2 className="text-2xl font-bold text-[#124E66]">
              Welcome, {user.username || "Volunteer"} 👋
            </h2>
            <p className="text-gray-600">Here are the issues assigned to you.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between text-center text-[#124E66] font-semibold">
          <div className="flex-1">
            <p>Total Assigned</p>
            <p className="text-lg">{total}</p>
          </div>
          <div className="flex-1">
            <p>Resolved</p>
            <p className="text-lg">{resolved}</p>
          </div>
          <div className="flex-1">
            <p>In Progress</p>
            <p className="text-lg">{progress}</p>
          </div>
        </div>

        {/* Assigned Issues List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading issues...</p>
        ) : (
          <div className="space-y-4">
            {issues.map(issue => (
              <div key={issue._id} className="border p-4 rounded shadow bg-white hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#124E66]">{issue.title}</h3>
                <p className="text-gray-700">{issue.description}</p>
                <p className="mt-1 text-sm">
                  Status:{" "}
                  <strong className={
                    issue.status === 'Resolved'
                      ? 'text-green-600'
                      : issue.status === 'In Progress'
                      ? 'text-yellow-600'
                      : 'text-red-500'
                  }>
                    {issue.status}
                  </strong>
                </p>
                <p className="text-sm text-gray-600">Category: {issue.category}</p>
                {issue.photos?.[0] && (
                  <img
                    src={`http://localhost:5000${issue.photos[0]}`}
                    alt="Issue"
                    className="mt-2 rounded-lg shadow w-40 border border-[#124E66]"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
