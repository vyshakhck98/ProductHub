import { useState, useEffect, useCallback } from "react";
import api from "../../../../../services/axios";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(null); 
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId) => {
    try {
      const res = await api.post(`/wishlist/${productId}`);
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      throw error; // let caller handle toast
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      throw error;
    }
  };

  const clearWishlist = async () => {
    try {
      const res = await api.delete("/wishlist");
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
      throw error;
    }
  };

  const isInWishlist = (productId) =>
    wishlist?.products?.some((p) => (p._id || p) === productId) ?? false;

  return {
    wishlist,
    loading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };
};
