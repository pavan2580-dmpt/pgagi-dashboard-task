"use client"

import { useEffect, useState } from "react"
import { Code, GitBranch, GitPullRequest, Star, Users } from "lucide-react"
import { motion } from "framer-motion"
import {fetchGitHubProfile,GitHubData} from "./fetch"

// Placeholder GitHub data
// const githubData = {
//   user: {
//     username: "johndoe",
//     name: "John Doe",
//     avatar: "/placeholder.svg?height=200&width=200",
//     followers: 245,
//     following: 123,
//     bio: "Full-stack developer passionate about web technologies and open source.",
//   },
//   repositories: [
//     {
//       name: "next-analytics-dashboard",
//       description: "A comprehensive analytics dashboard built with Next.js and TypeScript",
//       language: "TypeScript",
//       stars: 128,
//       forks: 32,
//       issues: 5,
//       lastUpdated: "2 days ago",
//     },
//     {
//       name: "react-component-library",
//       description: "A collection of reusable React components with TypeScript support",
//       language: "TypeScript",
//       stars: 87,
//       forks: 21,
//       issues: 3,
//       lastUpdated: "1 week ago",
//     },
//     {
//       name: "tailwind-ui-templates",
//       description: "Beautiful UI templates built with Tailwind CSS",
//       language: "CSS",
//       stars: 215,
//       forks: 45,
//       issues: 2,
//       lastUpdated: "3 days ago",
//     },
//     {
//       name: "node-api-starter",
//       description: "A starter template for Node.js APIs with Express and MongoDB",
//       language: "JavaScript",
//       stars: 64,
//       forks: 18,
//       issues: 1,
//       lastUpdated: "2 weeks ago",
//     },
//   ],
//   commits: [
//     {
//       repo: "next-analytics-dashboard",
//       message: "Fix theme toggle functionality",
//       date: "2 hours ago",
//       hash: "a1b2c3d",
//     },
//     {
//       repo: "next-analytics-dashboard",
//       message: "Add GitHub page implementation",
//       date: "5 hours ago",
//       hash: "e4f5g6h",
//     },
//     {
//       repo: "react-component-library",
//       message: "Update button component styles",
//       date: "1 day ago",
//       hash: "i7j8k9l",
//     },
//     {
//       repo: "tailwind-ui-templates",
//       message: "Add new dashboard template",
//       date: "3 days ago",
//       hash: "m1n2o3p",
//     },
//     {
//       repo: "node-api-starter",
//       message: "Implement JWT authentication",
//       date: "1 week ago",
//       hash: "q4r5s6t",
//     },
//   ],
//   pullRequests: [
//     {
//       title: "Fix theme toggle in dashboard",
//       repo: "next-analytics-dashboard",
//       status: "Open",
//       date: "1 day ago",
//     },
//     {
//       title: "Add new chart components",
//       repo: "react-component-library",
//       status: "Merged",
//       date: "3 days ago",
//     },
//     {
//       title: "Update documentation",
//       repo: "node-api-starter",
//       status: "Closed",
//       date: "1 week ago",
//     },
//   ],
// }


// Language color mapping
const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  CSS: "bg-purple-500",
  HTML: "bg-orange-500",
  Python: "bg-green-500",
  Java: "bg-red-500",
}

export default function GitHubPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [githubData, setGitHubData] = useState<GitHubData | null>(null)

  
useEffect(() => {
  const fetchData = async () => {
    const data = await fetchGitHubProfile();
    setGitHubData(data);
  };
  fetchData();
}, []);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">GitHub Dashboard</h1>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={githubData?.user?.avatar || "/placeholder.svg"}
              alt={githubData?.user.name}
              className="h-24 w-24 rounded-full border-2 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{githubData?.user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">@{githubData?.user.username}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{githubData?.user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{githubData?.user.followers}</span> followers
                </span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{githubData?.user.following}</span> following
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Repositories</h2>
        <div className="space-y-4">
          {githubData?.repositories.map((repo) => (
            <div key={repo.name} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">{repo.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{repo.description}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center">
                    <GitBranch className="mr-1 h-4 w-4" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <span
                    className={`mr-2 h-3 w-3 rounded-full ${languageColors[repo?.language ?? ""] || "bg-gray-500"}`}
                  ></span>
                  <span className="text-gray-700 dark:text-gray-300">{repo.language}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">Updated {repo.lastUpdated}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Commits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Recent Commits</h2>
          <div className="space-y-4">
            {githubData?.commits.map((commit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
              >
                <Code className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{commit.message}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{commit.repo}</span>
                    <span>•</span>
                    <span>{commit.date}</span>
                    <span>•</span>
                    <span className="font-mono">{commit.hash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pull Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Pull Requests</h2>
          <div className="space-y-4">
            {githubData?.pullRequests.map((pr, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
              >
                <GitPullRequest className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <div className="flex-grow">
                  <p className="font-medium text-gray-900 dark:text-white">{pr.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{pr.repo}</span>
                    <span>•</span>
                    <span>{pr.date}</span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    pr.status === "Open"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : pr.status === "Merged"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {pr.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

