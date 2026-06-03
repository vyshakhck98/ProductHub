import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

const HeaderSection = ({ onWishlistOpen, onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(search);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-[#004B73] h-[90px] px-16 flex items-center justify-between">
      <div className="flex items-center mx-auto w-[520px]">
        <input
          type="text"
          value={search}
          placeholder="Search any things"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 h-[42px] bg-white px-5 rounded-l-full outline-none text-sm"
        />
        <button
          onClick={handleSearch}
          className="h-[42px] px-8 bg-[#F4A911] text-white rounded-r-full text-sm font-medium"
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-8 text-white text-sm">
        <div
          onClick={onWishlistOpen}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FavoriteBorderIcon sx={{ fontSize: 18 }} />
          <span>Wishlist</span>
        </div>

        <span onClick={handleLogout} className="cursor-pointer hover:text-[#F4A911] transition-colors">
          Logout
        </span>

        <div className="flex items-center gap-2 cursor-pointer">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Cart</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;