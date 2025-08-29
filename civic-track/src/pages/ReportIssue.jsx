import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReportIssue = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('contact', contact);
    photos.forEach((photo) => formData.append('photos', photo));

    try {
      await axios.post('http://localhost:5000/api/issues', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Issue reported successfully!');
      setCategory('');
      setDescription('');
      setAddress('');
      setContact('');
      setPhotos([]);
    } catch (err) {
      console.error(err);
      alert('Failed to report issue');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      
      <h2 className="text-3xl font-bold text-center text-[#124E66] mb-6">📢 Report a Local Issue</h2>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-[#124E66]"
        >
          <option value="">Select Category</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Electricity">Electricity</option>
          <option value="Public Safety">Public Safety</option>
          <option value="Garbage Dump">Garbage Dump</option>
          <option value="Street Light">Street Light</option>
          <option value="Traffic Signal">Traffic Signal</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Drainage Block">Drainage Block</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-[#124E66]"
          placeholder="Describe the issue..."
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Location Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-[#124E66]"
          placeholder="e.g., Street name, area, city"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Contact Number</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-[#124E66]"
          placeholder="e.g., 9876543210"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">Upload Photos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#124E66] text-white font-semibold py-2 rounded hover:bg-opacity-90 transition"
      >
        Submit Issue
      </button>
    </form> 

  );
};

export default ReportIssue;
