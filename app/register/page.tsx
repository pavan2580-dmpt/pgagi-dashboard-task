"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, User } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
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

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl backdrop-blur-lg bg-white/10 shadow-xl">
        <div className="p-8">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold text-white">Create an account</h2>
          <p className="mb-6 text-center text-sm text-gray-300">Sign up to get started with Analytics Dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
              <label className="text-sm font-medium text-gray-200" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
              className={`w-full rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
        <div className="bg-white/5 p-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link className="font-medium text-purple-400 hover:text-purple-300" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

