"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSent(true);
        setIsLoading(false);
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Forgot your password? Typical."
        >
            {!isSent ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email Address</label>
                        <input
                            type="email"
                            placeholder="johndoe@gmail.com"
                            className="w-full input-pill"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary mt-4 disabled:opacity-50" disabled={isLoading}>
                        {isLoading ? "Sending Link..." : "Send Reset Link"}
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-4">
                        Remembered it?{" "}
                        <Link href="/login" className="text-pink-500 hover:text-pink-400 font-semibold">
                            Log in
                        </Link>
                    </p>
                </form>
            ) : (
                <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                        <p className="text-gray-400">
                            We've sent a password reset link to <span className="text-white">{email}</span>.
                            <br />If you don't see it, check your spam/junk folder.
                        </p>
                    </div>
                    <Link href="/login" className="block w-full btn-primary text-center">
                        Back to Login
                    </Link>
                </div>
            )}
        </AuthLayout>
    );
}
