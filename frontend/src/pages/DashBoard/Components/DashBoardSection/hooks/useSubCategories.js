import { useState, useEffect } from "react";
import api from "../../../../../services/axios";

export const useSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchSubCategories = async () => {
    try {
      const response = await api.get("/subcategories");

      setSubCategories(response.data.subCategories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return {
    subCategories,
    loading,
    fetchSubCategories,
  };
};
