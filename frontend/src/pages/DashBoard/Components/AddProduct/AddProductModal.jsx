import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [variantForm, setVariantForm] = useState({
    ram: "",
    price: "",
    quantity: "",
  });
  const [variants, setVariants] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch subcategories when modal opens
  useEffect(() => {
    if (!open) return;
    api
      .get("/subcategories")
      .then((res) => {
        setSubCategories(res.data.subCategories || []);
      })
      .catch(() => {
        setSubCategories([]);
      });
  }, [open]);

  const handleAddVariant = () => {
    if (!variantForm.ram || !variantForm.price || !variantForm.quantity) return;
    setVariants([
      ...variants,
      {
        ram: variantForm.ram,
        price: Number(variantForm.price),
        quantity: Number(variantForm.quantity),
      },
    ]);
    setVariantForm({ ram: "", price: "", quantity: "" });
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const resetForm = () => {
    setTitle("");
    setVariantForm({ ram: "", price: "", quantity: "" });
    setVariants([]);
    setSubCategory("");
    setDescription("");
    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !subCategory || !description.trim()) {
      setToast({
        open: true,
        message: "Title, Sub Category and Description are required.",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("subCategory", subCategory);
      formData.append("variants", JSON.stringify(variants));
      images.forEach((file) => formData.append("images", file));

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({
        open: true,
        message: "Product added successfully",
        severity: "success",
      });

      resetForm();
      onSuccess?.();

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || "Failed to add product.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <div
          className="bg-white w-full max-w-[760px] rounded-xl px-6 py-5 shadow-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <h2 className="text-center text-2xl font-semibold mb-6">
            Add Product
          </h2>

          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-[140px] text-sm text-gray-500">Title :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="HP AMD Ryzen 3"
              className="flex-1 border rounded-md h-10 px-3 text-sm outline-none"
            />
          </div>

          {/* Variants */}
          <div className="flex gap-4 mb-4">
            <label className="w-[140px] text-sm text-gray-500 pt-7">
              Variants :
            </label>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ram</p>
                  <input
                    type="text"
                    value={variantForm.ram}
                    onChange={(e) =>
                      setVariantForm({ ...variantForm, ram: e.target.value })
                    }
                    className="w-[100px] h-10 border rounded-md px-3 text-sm"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Price</p>
                  <input
                    type="text"
                    value={variantForm.price}
                    onChange={(e) =>
                      setVariantForm({ ...variantForm, price: e.target.value })
                    }
                    className="w-[120px] h-10 border rounded-md px-3 text-sm"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Qty</p>
                  <input
                    type="number"
                    value={variantForm.quantity}
                    onChange={(e) =>
                      setVariantForm({
                        ...variantForm,
                        quantity: e.target.value,
                      })
                    }
                    className="w-[80px] h-10 border rounded-md px-3 text-sm"
                  />
                </div>
                <button
                  onClick={handleAddVariant}
                  className="bg-[#2F2F2F] text-white px-4 h-10 rounded-md text-sm"
                >
                  Add Variant
                </button>
              </div>

              {variants.length > 0 && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-2">RAM</th>
                        <th className="text-left p-2">Price</th>
                        <th className="text-left p-2">Qty</th>
                        <th className="text-left p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((variant, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{variant.ram}</td>
                          <td className="p-2">{variant.price}</td>
                          <td className="p-2">{variant.quantity}</td>
                          <td className="p-2">
                            <button
                              onClick={() => handleRemoveVariant(index)}
                              className="text-red-400 text-xs hover:text-red-600"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sub Category — populated from DB */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-[140px] text-sm text-gray-500">
              Sub Category :
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="flex-1 border rounded-md h-10 px-3 text-sm"
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((sc) => (
                <option key={sc._id} value={sc._id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex gap-4 mb-4">
            <label className="w-[140px] text-sm text-gray-500 pt-2">
              Description :
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 border rounded-md p-3 text-sm resize-none outline-none"
            />
          </div>

          {/* Upload */}
          <div className="flex gap-4 mb-6">
            <label className="w-[140px] text-sm text-gray-500 pt-2">
              Upload Image :
            </label>
            <div className="flex gap-3 flex-wrap">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="w-[65px] h-[65px] border rounded-md overflow-hidden"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              <label className="w-[65px] h-[65px] border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer text-xl text-gray-400">
                +
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#F4A911] text-white px-6 py-2 rounded-md text-sm disabled:opacity-60 min-w-[80px] flex items-center justify-center"
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: "#fff" }} />
              ) : (
                "ADD"
              )}
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-200 px-6 py-2 rounded-md text-sm"
            >
              DISCARD
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddProductModal;
