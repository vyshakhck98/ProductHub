import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/axios";
import HeaderSection from "../HeaderSection/HeaderSection";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from "@mui/icons-material/Check";
import { useWishlist } from "../WishList/Hooks/useWishlist";

const FALLBACK = "https://pngimg.com/uploads/laptop/laptop_PNG101816.png";
const getImageUrl = (path) =>
  path ? `http://localhost:5000${path}` : FALLBACK;

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(FALLBACK);

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wished = isInWishlist(id);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const fetchedProduct = response.data.product;
      setProduct(fetchedProduct);
      if (fetchedProduct?.variants?.length > 0)
        setSelectedVariant(fetchedProduct.variants[0]);
      if (fetchedProduct?.images?.length > 0)
        setActiveImage(getImageUrl(fetchedProduct.images[0]));
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      if (wished) await removeFromWishlist(id);
      else await addToWishlist(id);
    } catch {
      // could add toast
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Product Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HeaderSection />

      <div className="max-w-[1350px] mx-auto px-8 py-8">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          className="mb-8"
        >
          <Link
            component="button"
            underline="hover"
            color="inherit"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Link>
          <Link
            component="button"
            underline="hover"
            color="inherit"
            onClick={() => navigate("/dashboard")}
          >
            Products
          </Link>
          <span className="text-[#004B73] font-medium">Product Details</span>
        </Breadcrumbs>

        <div className="grid grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl h-[500px] flex items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                className="h-[280px] object-contain"
              />
            </div>
            {product.images?.length > 0 && (
              <div className="flex gap-4 mt-5 flex-wrap">
                {product.images.map((imgPath, index) => {
                  const url = getImageUrl(imgPath);
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveImage(url)}
                      className={`bg-white border rounded-xl w-[100px] h-[80px] flex items-center justify-center cursor-pointer transition ${
                        activeImage === url
                          ? "border-[#F4A911]"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`thumb-${index}`}
                        className="h-[55px] object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right */}
          <div>
            <h1 className="text-[38px] font-semibold text-[#004B73]">
              {product.name}
            </h1>
            <p className="text-[32px] font-bold mt-3">
              ₹{selectedVariant?.price || 0}
            </p>

            <div className="flex items-center gap-2 mt-6">
              <span className="font-medium">Availability:</span>
              <CheckIcon sx={{ color: "#22C55E", fontSize: 20 }} />
              <span className="text-green-500">In Stock</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Hurry up! only {selectedVariant?.quantity || 0} products left in
              stock!
            </p>

            <hr className="my-8" />

            <div className="mb-5">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">
                {product.subCategory?.category?.name}
              </p>
            </div>
            <div className="mb-5">
              <p className="text-sm text-gray-500">Sub Category</p>
              <p className="font-medium">{product.subCategory?.name}</p>
            </div>
            {product.description && (
              <div className="mb-5">
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm text-gray-700 mt-1">
                  {product.description}
                </p>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-2 border rounded-md transition ${
                      selectedVariant?._id === variant._id
                        ? "bg-[#F4A911] text-white border-[#F4A911]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {variant.ram || variant.name || "Variant"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-10 h-10 border"
                >
                  -
                </button>
                <div className="w-14 h-10 border-t border-b flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button className="bg-[#F4A911] text-white px-10 py-4 rounded-full font-medium">
                Edit Product
              </button>
              <button className="bg-[#F4A911] text-white px-10 py-4 rounded-full font-medium">
                Buy it now
              </button>
              <button
                onClick={handleWishlistToggle}
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center transition hover:bg-red-50"
              >
                {wished ? (
                  <FavoriteIcon sx={{ color: "#ef4444" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
