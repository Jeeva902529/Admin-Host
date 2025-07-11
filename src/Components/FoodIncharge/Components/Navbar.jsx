import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import MenuIcon from "../Assets/Menu.png";
import Notification from "../Assets/Notification.png";

const Navbar = ({ setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      fetch("http://localhost:5000/api/login/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-red-500 text-white py-1 px-4 flex justify-between items-center">
        <div className="text-sm">Savor the Flavor • Fast & Fresh</div>
        <button className="text-white" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <nav className="bg-white text-black py-5 px-6 flex justify-between items-center border-b border-gray-300">
        <div className="flex items-center pl-5 space-x-4">
          <img
            alt="Corner Crave Logo"
            className="h-10 cursor-pointer"
            height="40"
            src={Logo}
            width="70"
            onClick={() => handleNavigation("/")}
          />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
            { name: "Booking", path: "/booking" },
            { name: "Support", path: "/support" },
          ].map((item, index) => (
            <button
              key={index}
              className={`relative group transition-all duration-300 text-base font-medium px-3 py-1 ${
                location.pathname === item.path ? "text-red-500 font-bold" : "text-black hover:text-red-500"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out ${
                  location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {/* 🔔 Notification Icon */}
          <div className="relative">
            <img alt="Notification" className="w-5 h-5" src={Notification} />
            <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 rounded-full"></span>
          </div>

          {/* 👤 User Icon */}
          <div className="relative">
            <img
              alt="User profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              height="40"
              src="https://storage.googleapis.com/a1aa/image/bDTBrRrJMrYxkzA18vuxixLnH4FwmndSm_FXzMofwcY.jpg"
              width="40"
            />
          </div>

          {/* 🍔 Mobile Menu Icon */}
          <button className="block md:hidden text-black focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img alt="Menu" className="w-5 h-5" src={MenuIcon} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white text-black py-3 px-6">
          <hr />
          <div className="flex flex-col items-center">
            {[
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
              { name: "Booking", path: "/booking" },
              { name: "Support", path: "/support" },
            ].map((item, index) => (
              <button
                key={index}
                className={`relative group text-black transition-all duration-300 py-2 text-base font-medium ${
                  location.pathname === item.path ? "text-red-500 font-bold" : "text-black hover:text-red-500"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </div>
          <hr className="mt-4 border-gray-800" />
        </div>
      )}
    </>
  );
};

export default Navbar;
