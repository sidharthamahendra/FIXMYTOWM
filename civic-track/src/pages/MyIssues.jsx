import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';


const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/issues/my-issues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIssues(response.data);
        setFilteredIssues(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = issues.filter(
      issue =>
        issue.category.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term)
    );
    setFilteredIssues(filtered);
  }, [searchTerm, issues]);

  if (loading) return <div className="text-center text-lg p-6">Loading issues...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (issues.length === 0) return <div className="text-center text-gray-600">No issues reported yet.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 style={{ color: '#124E66' }} className="text-3xl font-bold mb-6 text-center text-gray-800">📋 My Reported Issues</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by category or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ul className="space-y-6">
        {filteredIssues.map((issue) => (
          <li
            key={issue._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{issue.category}</h3>
            <p className="text-gray-600 mb-3">{issue.description}</p>

            {issue.photos?.length > 0 && (
              <div className="flex gap-3 flex-wrap mb-3">
                {issue.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${photo}`}
                    alt="Issue"
                    width="150"
                    className="rounded-md border"
                  />
                ))}
              </div>
            )}

            {issue.address && (
              <p className="text-sm text-gray-500">
                <strong>📍 Address:</strong> {issue.address}
              </p>
            )}

            {issue.contact && (
              <p className="text-sm text-gray-500">
                <strong>📞 Contact:</strong> {issue.contact}
              </p>
            )}

            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span><strong>Status:</strong> {issue.status}</span>
              <span><strong>Reported:</strong> {new Date(issue.createdAt).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyIssues;
