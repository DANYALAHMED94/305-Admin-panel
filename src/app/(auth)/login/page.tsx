"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin"; // Import custom hook
import Image from "next/image";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { form, mutation, onSubmit } = useLogin();

  return (
    <div className="flex justify-between items-center p-3 min-h-screen">
      <div className="w-[600px] rounded-xl p-8 flex flex-col gap-4 bg-[#222c3b] shadow-lg mx-auto">
        {/* Logo */}
        <div className="flex h-full justify-center items-center">
          <Image
            src="https://ik.imagekit.io/deveoper99/ball-football-icon.svg"
            alt="Gallery"
            width={50}
            height={50}
            className="w-12 object-cover h-12 object-center block bg-white p-1 rounded-md"
          />
        </div>

        <div className="flex flex-col justify-center md:items-start items-center p-2 gap-1 text-gray-300">
          <h1 className="font-semibold text-lg text-white">Admin Login</h1>
          <p className="text-md font-normal">
            Fill up all (<span className="text-red-500">*</span>) required
            fields!
          </p>
        </div>

        {/* ✅ Login Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                {...form.register("password")}
                className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute  right-3 top-3 text-gray-400"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? "🙈" : "👀"}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 rounded transition disabled:bg-gray-600"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
