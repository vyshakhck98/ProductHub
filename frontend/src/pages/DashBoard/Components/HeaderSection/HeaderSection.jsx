import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const HeaderSection = ({ onWishlistOpen }) => {
  return (
    <header className="bg-[#004B73] h-[90px] px-16 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center mx-auto w-[520px]">
        <input
          type="text"
          placeholder="Search any things"
          className="flex-1 h-[42px] bg-white px-5 rounded-l-full outline-none text-sm"
        />

        <button className="h-[42px] px-8 bg-[#F4A911] text-white rounded-r-full text-sm font-medium">
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

        <span className="cursor-pointer">Sign In</span>

        <div className="flex items-center gap-2 cursor-pointer">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Cart</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
