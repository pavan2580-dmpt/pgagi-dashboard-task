"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl backdrop-blur-lg bg-white/10 shadow-xl">
        <div className="p-8">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold text-white">Welcome back</h2>
          <p className="mb-6 text-center text-sm text-gray-300">Sign in to your account to continue</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200" htmlFor="password">
                  Password
                </label>
                <Link className="text-xs text-blue-400 hover:text-blue-300" href="#">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  id="password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button
              className={`w-full rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
        <div className="bg-white/5 p-4 text-center text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-blue-400 hover:text-blue-300" href="/register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

