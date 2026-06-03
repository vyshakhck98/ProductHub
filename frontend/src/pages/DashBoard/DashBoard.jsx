import { useState, useCallback } from "react";
import { useCategories } from "./Components/DashBoardSection/hooks/useCategories";
import { useSubCategories } from "./Components/DashBoardSection/hooks/useSubCategories";
import HeaderSection from "./Components/HeaderSection/HeaderSection";
import WishlistSidebar from "./Components/WishList/WishList";
import CategorySidebar from "./Components/DashBoardSection/CategorySidebar";
import ProductGrid from "./Components/DashBoardSection/ProductGrid";
import AddCategoryModal from "./Components/AddCategory/AddCategoryModal";
import AddSubCategoryModal from "./Components/AddSubCategory/AddSubCategoryModal";
import AddProductModal from "./Components/AddProduct/AddProductModal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";

const Dashboard = () => {
  const { categories, fetchCategories } = useCategories();
  const { subCategories, fetchSubCategories } = useSubCategories();

  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [productRefreshKey, setProductRefreshKey] = useState(0);

  const handleProductAdded = useCallback(() => {
    setProductRefreshKey((k) => k + 1);
  }, []);

  const handleSearch = useCallback((value) => {
    setQuery(value);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA]">
        <HeaderSection
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearch={handleSearch}
        />

        <div className="mx-auto px-8 py-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link
                underline="hover"
                color="inherit"
                href="#"
                sx={{ fontSize: "14px" }}
              >
                Home
              </Link>
              <span className="text-[#004B73] text-sm">Products</span>
            </Breadcrumbs>

            <div className="flex gap-4">
              <button
                onClick={() => setOpenAddCategory(true)}
                className="bg-[#F4A911] text-white px-6 py-3 rounded-full text-sm"
              >
                Add Category
              </button>
              <button
                onClick={() => setOpenAddSubCategory(true)}
                className="bg-[#F4A911] text-white px-6 py-3 rounded-full text-sm"
              >
                Add Sub Category
              </button>
              <button
                onClick={() => setOpenAddProduct(true)}
                className="bg-[#F4A911] text-white px-6 py-3 rounded-full text-sm"
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="flex gap-8">
            <CategorySidebar
              categories={categories}
              subCategories={subCategories}
              selected={selected}
              onSelect={setSelected}
            />
            <ProductGrid
              key={productRefreshKey}
              subcategory={selected}
              query={query}
            />
          </div>
        </div>
      </div>

      <WishlistSidebar
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />

      <AddCategoryModal
        open={openAddCategory}
        onClose={() => setOpenAddCategory(false)}
        onSuccess={fetchCategories}
      />

      <AddSubCategoryModal
        open={openAddSubCategory}
        onClose={() => setOpenAddSubCategory(false)}
        categories={categories}
        onSuccess={fetchSubCategories}
      />

      <AddProductModal
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
        onSuccess={handleProductAdded}
      />
    </>
  );
};

export default Dashboard;