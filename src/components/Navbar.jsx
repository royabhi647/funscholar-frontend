import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Navbar() {
  const navigate = useNavigate();
  const { loading, error, data } = useFetch(`${import.meta.env.VITE_API_URL}/api/navbars?populate=*`);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("isAuthenticated", isAuthenticated);
  const [userName, setUserName] = useState('');

  // Check authentication status
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem("loggedInUser"));
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication details
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(`${targetId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return console.log(error);

  return (
    <nav className="bg-gradient-to-r from-pink-200 via-orange-100 to-yellow-100 py-4 px-28">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          {/* <img src={`${import.meta.env.VITE_API_URL}${data?.data[0]?.logo?.url}`} alt="Logo" /> */}
          <img src={data?.data[0]?.logo?.url} alt="Logo" />
        </div>

        <div className="bg-[#FFFFFF] shadow rounded-3xl px-8 py-2 space-x-10 flex">
          {data?.data[0]?.menuItems.length > 0 &&
            data?.data[0]?.menuItems.map((menu, index) => (
              <a
                key={index}
                href={menu?.slug}
                onClick={(e) => handleScroll(e, menu?.slug)}
                className="text-[#4B2220] font-medium text-[18px]"
              >
                {menu?.menuName}
              </a>
            ))}
        </div>

        <button className="bg-custom-gradient text-white text-[16px] py-1 px-3 rounded-md font-semibold flex items-center gap-x-2">
          <img src={data?.data[0]?.calendarIcon?.url} className="w-5 h-5" />
          Book a FREE Trial
        </button>

        {/* Authentication Section */}
        <div className="flex gap-x-5 items-center">
          {isAuthenticated ? (
            // Profile Dropdown
            <div className="relative">
              <button className="bg-custom-gradient text-white text-[16px] py-1 px-3 rounded-md font-semibold">
                {userName}
              </button>
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[#F15A29] font-medium text-[16px] border border-custom-border py-1 px-3 rounded-md"
            >
              {data?.data[0]?.loginBtn || "Login"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;