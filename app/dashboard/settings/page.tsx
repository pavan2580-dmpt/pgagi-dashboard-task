"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Moon, Save, Sun, User } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Form states
  const [profileForm, setProfileForm] = useState(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const bioData = localStorage.getItem("bio");
      return {
        name: user.name || "",
        email: user.email || "",
        bio: (() => {
          try {
            return bioData ? JSON.parse(bioData) : "Full-stack developer passionate about web technologies and open source";
          } catch {
            return "Full-stack developer passionate about web technologies and open source";
          }
        })(),
      };
    }
    return { name: "", email: "", bio: "Full-stack developer passionate about web technologies and open source" };
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMounted(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecurityForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call to update profile
    setTimeout(() => {
      alert("Profile updated successfully!")
    }, 500)
  }

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate passwords
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // Simulate API call to update password
    setTimeout(() => {
      alert("Password updated successfully!")
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      {/* Settings Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </button>


        <button
          onClick={() => setActiveTab("appearance")}
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            activeTab === "appearance"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <Sun className="mr-2 h-4 w-4" />
          Appearance
        </button>
      </div>

      {/* Profile Settings */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>

            </div>
           
          </form>
        </motion.div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <form onSubmit={handleSecuritySubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={securityForm.currentPassword}
                  onChange={handleSecurityChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={securityForm.newPassword}
                  onChange={handleSecurityChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={securityForm.confirmPassword}
                  onChange={handleSecurityChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications on your device</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onChange={handleNotificationChange}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Weekly Digest</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive a weekly summary of your activity</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="weeklyDigest"
                  checked={notificationSettings.weeklyDigest}
                  onChange={handleNotificationChange}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new features and offers</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onChange={handleNotificationChange}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Appearance Settings */}
      {activeTab === "appearance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred theme</p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <button
                  onClick={() => mounted && setTheme("light")}
                  className={`flex flex-col items-center justify-center rounded-lg border p-4 ${
                    mounted && theme === "light"
                      ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950"
                      : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                  type="button"
                >
                  <Sun className="mb-2 h-6 w-6 text-gray-900 dark:text-white" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                </button>
                <button
                  onClick={() => mounted && setTheme("dark")}
                  className={`flex flex-col items-center justify-center rounded-lg border p-4 ${
                    mounted && theme === "dark"
                      ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950"
                      : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                  type="button"
                >
                  <Moon className="mb-2 h-6 w-6 text-gray-900 dark:text-white" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                </button>
                <button
                  onClick={() => mounted && setTheme("system")}
                  className={`flex flex-col items-center justify-center rounded-lg border p-4 ${
                    mounted && theme === "system"
                      ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950"
                      : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                  type="button"
                >
                  <div className="mb-2 flex h-6 w-6">
                    <Sun className="h-6 w-6 text-gray-900 dark:text-white" />
                    <Moon className="h-6 w-6 text-gray-900 dark:text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

