"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSessionStorage } from "@/hooks/useSessionStorage";

type User = {
  id: string;
  name: string;
  email: string;
};

type GoogleCredentialResponse = {
  credential: string;
};

// Extend window with Google type safely
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID =
  "70733404385-37hlp9345cueck7bc99nl15cdje278qc.apps.googleusercontent.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setUser] = useSessionStorage<User | null>("user", null);
  const [error, setError] = useState("");

  // Load Google script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup returns void
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Dummy frontend login
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const dummyUser: User = {
      id: "1",
      name: "Test User",
      email,
    };
    setUser(dummyUser);
    router.push("/");
  };

  // Frontend-only Google login
  const handleGoogleLogin = () => {
    if (!window.google) {
      setError("Google API not loaded yet");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        try {
          const decoded = JSON.parse(
            atob(response.credential.split(".")[1])
          ) as { sub: string; name: string; email: string };

          setUser({
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
          });
          router.push("/");
        } catch {
          setError("Failed to parse Google response");
        }
      },
    });

    window.google.accounts.id.prompt();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-brand">
          Welcome Back
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand"
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
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-brand"
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

          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-lg hover:bg-brand-dark transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-800 hover:bg-gray-100 transition"
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

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-brand hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
