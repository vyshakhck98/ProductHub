import { useState, useEffect } from "react";
import api from "../../../../../services/axios";

export function useProducts(search, subcategory, page) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", {
        params: {
          search,
          subcategory,
          page,
          limit: 10,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.totalProducts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, subcategory, page]);

  return { products, totalPages, total, loading };
}
