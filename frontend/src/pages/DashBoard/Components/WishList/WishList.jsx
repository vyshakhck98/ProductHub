import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useWishlist } from "./Hooks/useWishlist";

const FALLBACK = "https://pngimg.com/uploads/laptop/laptop_PNG101816.png";

const getImageUrl = (images) =>
  images?.length > 0 ? `http://localhost:5000${images[0]}` : FALLBACK;

const WishlistSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { wishlist, loading, removeFromWishlist, clearWishlist } =
    useWishlist();

  const products = wishlist?.products || [];

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
    } catch {
      // silently fail — could add toast here
    }
  };

  const handleClear = async () => {
    try {
      await clearWishlist();
    } catch {
      // silently fail
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[320px] bg-white z-50 shadow-2xl
          transition-transform duration-300 ease-in-out flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="bg-[#004B73] h-[90px] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <FavoriteBorderIcon sx={{ fontSize: 20, color: "#004B73" }} />
            </div>
            <span className="text-xl">
              Wishlist {products.length > 0 && `(${products.length})`}
            </span>
          </div>
          <button onClick={onClose} className="text-white text-xl">
            ❯
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress sx={{ color: "#F4A911" }} />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2">
              <FavoriteBorderIcon sx={{ fontSize: 40 }} />
              <p className="text-sm">Your wishlist is empty</p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="flex gap-4 py-4 border-b cursor-pointer"
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  onClose();
                }}
              >
                <div className="w-[85px] h-[85px] border rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={getImageUrl(product.images)}
                    alt={product.name}
                    className="w-[70px] h-[70px] object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-[#004B73] text-sm font-medium">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {product.subCategory?.name}
                  </p>
                  <p className="font-semibold mt-2 text-sm">
                    {product.variants?.[0]?.price
                      ? `₹${product.variants[0].price}`
                      : "—"}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(product._id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition self-start pt-1"
                >
                  <CloseIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            ))
          )}
        </div>

        {products.length > 0 && (
          <div className="p-5 border-t shrink-0">
            <button
              onClick={handleClear}
              className="w-full py-2 border border-red-400 text-red-400 rounded-lg text-sm hover:bg-red-50 transition"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistSidebar;
