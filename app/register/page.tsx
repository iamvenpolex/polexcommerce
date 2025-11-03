"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import Image from "next/image";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useSessionStorage<User | null>("user", null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // min 8 chars, 1 uppercase, 1 number
    return regex.test(pwd);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase letter and 1 number"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setUser(data.user);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-brand">
          Create Account
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand text-black"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white py-2 rounded-lg hover:bg-brand-dark transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Or sign up with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-2 rounded-lg text-gray-800 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <Image
              src="/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
              priority
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-brand hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
