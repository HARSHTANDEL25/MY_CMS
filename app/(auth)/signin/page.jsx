"use client";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in. Please try again.", {
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg bg-white shadow-md p-8 flex flex-col items-center gap-5">
        <Anvil className="text-black w-8 h-8" />
        <p className="text-gray-600 text-center">
          Welcome to <strong>My CMS</strong>, please sign in to continue.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded w-full"
          onClick={handleSignin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
