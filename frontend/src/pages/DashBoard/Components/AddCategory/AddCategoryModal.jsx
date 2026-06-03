import React, { useState } from "react";
import api from "../../../../services/axios";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const AddCategoryModal = ({ open, onClose, onSuccess }) => {
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async () => {
    if (!category.trim()) {
      setToast({
        open: true,
        message: "Category name is required",
        severity: "error",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/categories", {
        name: category,
      });

      setToast({
        open: true,
        message: response.data.message || "Category added successfully",
        severity: "success",
      });

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
        message: error.response?.data?.message || "Failed to add category",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white w-[350px] rounded-2xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-[20px] font-semibold mb-8">
            Add Category
          </h2>

          <input
            type="text"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-12 border rounded-xl px-4 outline-none mb-5"
          />

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
                    color: "#ffffff",
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
        onClose={handleCloseToast}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={handleCloseToast}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCategoryModal;
