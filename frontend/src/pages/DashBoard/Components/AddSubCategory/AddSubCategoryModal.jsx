import React, { useState } from "react";

import api from "../../../../services/axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const AddSubCategoryModal = ({ open, onClose, categories, onSuccess }) => {
  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async () => {
    if (!name.trim() || !category) {
      setToast({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });

      return;
    }

    try {
      setLoading(true);

      await api.post("/subcategories", {
        name,
        category,
      });

      setToast({
        open: true,
        message: "Sub Category added successfully",
        severity: "success",
      });

      setName("");
      setCategory("");

      if (onSuccess) {
        await onSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white w-[400px] rounded-2xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-[20px] font-semibold mb-8">
            Add Sub Category
          </h2>

          <input
            type="text"
            placeholder="Sub Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 border rounded-xl px-4 mb-4"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-12 border rounded-xl px-4 mb-5"
          >
            <option value="">Select Category</option>

            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#F4A911] text-white px-6 py-2 rounded-lg min-w-[100px]"
            >
              {loading ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "ADD"
              )}
            </button>

            <button
              onClick={onClose}
              className="bg-[#ECECEC] px-6 py-2 rounded-lg"
            >
              DISCARD
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() =>
          setToast({
            ...toast,
            open: false,
          })
        }
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddSubCategoryModal;
