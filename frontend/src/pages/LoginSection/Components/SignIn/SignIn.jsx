import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../../../services/axios";
import { loginSchema } from "../Validations/authValidation";

const SignIn = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-cente">
      <div className="w-full max-w-5xl bg-white flex overflow-hidden rounded-lg shadow-lg">
        <div className="w-full flex flex-col items-center justify-center px-12 py-16">
          <h1 className="text-5xl font-bold text-amber-500 text-center mb-10">
            Sign In to <br /> Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full px-4 py-4 rounded outline-none border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full px-4 py-4 rounded outline-none border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-amber-500 text-white py-4 rounded-full font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
