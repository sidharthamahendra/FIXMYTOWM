import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#124E66] text-white p-6 text-center text-sm">
      © {new Date().getFullYear()} CivicTrack. All rights reserved.
    </footer>
  );
};

export default Footer;
