import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white p-6 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Gradient Text Title */}
        <h2 className="font-bold">
          Pet Gallery
        </h2>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="button">Home</Link>
            </li>
            <li>
              <Link to="/about" className="button">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
