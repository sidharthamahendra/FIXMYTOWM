import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-lg p-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 style={{ color: '#124E66' }} className="text-3xl font-extrabold tracking-tight">CivicTrack</h1>
      <nav className="space-x-6 text-lg">
        <a href="#about" className="text-gray-700 hover:text-[#124E66] transition duration-300">About</a>
        <a href="#features" className="text-gray-700 hover:text-[#124E66] transition duration-300">Features</a>
        <a href="#contact" className="text-gray-700 hover:text-[#124E66] transition duration-300">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
