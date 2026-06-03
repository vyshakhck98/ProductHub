import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { useProducts } from "./hooks/useProducts";
import { useWishlist } from "../WishList/Hooks/useWishlist";

const FALLBACK = "https://pngimg.com/uploads/laptop/laptop_PNG101816.png";
const getImageUrl = (images) =>
  images?.length > 0 ? `http://localhost:5000${images[0]}` : FALLBACK;

const ProductGrid = ({ subcategory, query }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever query or subcategory changes
  useEffect(() => {
    setPage(1);
  }, [query, subcategory]);

  const { products, totalPages, total, loading } = useProducts(
    query,
    subcategory,
    page,
  );
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();
    try {
      if (isInWishlist(productId)) await removeFromWishlist(productId);
      else await addToWishlist(productId);
    } catch {
      // silently fail
    }
  };

  return (
    <div className="flex-1">
      {loading && (
        <div className="flex justify-center items-center h-48">
          <CircularProgress sx={{ color: "#F4A911" }} />
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-400 py-10 text-sm">
          No products found.
        </p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => {
            const wished = isInWishlist(product._id);
            return (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white border border-gray-200 rounded-2xl p-4 relative cursor-pointer hover:shadow-lg transition-all"
              >
                <button
                  onClick={(e) => handleWishlistToggle(e, product._id)}
                  className="absolute right-4 top-4 transition"
                >
                  {wished ? (
                    <FavoriteIcon sx={{ fontSize: 20, color: "#ef4444" }} />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{ fontSize: 20, color: "#7dd3fc" }}
                    />
                  )}
                </button>

                <img
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  className="h-[130px] mx-auto object-contain"
                />

                <h3 className="text-[#004B73] text-sm font-medium mt-4">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {product.subCategory?.name}
                </p>
                <p className="font-semibold text-sm mt-2">
                  {product.variants?.[0]?.price
                    ? `₹${product.variants[0].price}`
                    : "—"}
                </p>

                <div className="flex mt-2 text-gray-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarBorderIcon key={star} sx={{ fontSize: 16 }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-xs text-gray-500">{total} items total</p>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="warning"
            shape="rounded"
            size="small"
          />
          <p className="text-xs text-gray-500">
            Page <span className="text-[#F4A911]">{page}</span> of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;