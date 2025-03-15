import React from "react";
import {
  MessageCircle,
  LayoutGrid,
  Mail,
  Clock,
  CalendarDays,
  FileText,
  LogOut,
} from "lucide-react";
import logo from "../../assets/jiitosachapter_logo.jpeg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login"); // Redirect to the login page or home
  };

  const navItems = [
    {
      icon: <MessageCircle size={20} />,
      label: "Whatsapp",
      path: "/whatsappmessage",
    },
    {
      icon: <LayoutGrid size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: <CalendarDays size={20} />, label: "Events", path: "/events" },
    { icon: <Mail size={20} />, label: "Gmail", path: "/emailmessage" },
    { icon: <Clock size={20} />, label: "History", path: "/history" },
    {
      icon: <FileText size={24} />,
      label: "Optica Forms",
      path: "/optica-forms",
    },
  ];

  return (
    <nav
      className="fixed left-0 top-0 h-full w-16 bg- shadow-lg flex flex-col items-center py-4 space-y-6"
      style={{ backgroundColor: "#F6FAFF" }}
    >
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </Link>

      {/* Navigation Items */}
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors duration-200"
          style={{ color: "#94AEFF" }}
          aria-label={item.label}
        >
          {item.icon}
        </Link>
      ))}

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200"
        aria-label="Logout"
      >
        <LogOut size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
