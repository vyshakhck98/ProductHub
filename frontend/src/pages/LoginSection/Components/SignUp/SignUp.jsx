import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../../../services/axios";
import { signupSchema } from "../Validations/authValidation";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/signup", data);

      if (response.data.success) {
        alert("Account created successfully");
        reset();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-md">
      <h2 className="text-5xl font-bold text-amber-500 mb-10">
        Create Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={`w-full px-4 py-4 rounded outline-none border bg-gray-100 ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full px-4 py-4 rounded outline-none border bg-gray-100 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full px-4 py-4 rounded outline-none border bg-gray-100 ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-amber-500 text-white font-semibold py-4 rounded-full hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
