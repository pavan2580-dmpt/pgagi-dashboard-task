"use client";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Cloud,
  Github,
  Globe,
  Layers,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import toast from "react-hot-toast";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEW_API_KEY;
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME; 

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to access this page!");
      router.push("/login"); 
    }
  }, []);
  interface WeatherData {
    location: {
      name: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
      };
    };
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<
    { title: string; source: { name: string } }[]
  >([]);
  const [github, setGithub] = useState<
    { type: string; repo: { name: string }; created_at: string }[] | null
  >(null);

  useEffect(() => {
    fetchWeather();
    fetchNews();
    fetchGitHubActivity();
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const fetchWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
          );
          setWeather(response.data);
        } catch (error) {
          console.error("Weather API Error:", error);
        }
      });
    }
  };

  // Fetch Top News Headlines
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
      );
      setNews(response.data.articles.slice(0, 6));
    } catch (error) {
      console.error("News API Error:", error);
    }
  };

  // Fetch GitHub Activity
  const fetchGitHubActivity = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/events`
      );
      setGithub(response.data.slice(0, 3)); // Get the last 3 events
    } catch (error) {
      console.error("GitHub API Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>

     <div className="w-full flex flex-col md:flex-row gap-6">
       {/* Weather Card */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 p-1"
      >
        <div className="h-full rounded-lg bg-white p-5 dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Weather
          </h3>
          {weather ? (
            <div className="mt-4 text-center">
              <p className="text-5xl font-bold text-gray-900 dark:text-white">
                {weather?.current.temp_c}°
              </p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {weather.location.name}
              </p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {weather.current.condition.text}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading weather...</p>
          )}
        </div>
      </motion.div>

      {/* GitHub Activity Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 p-1"
      >
        <div className="h-full rounded-lg bg-white p-5 dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            GitHub Activity
          </h3>
          {github ? (
            github?.map((event, index) => (
              <div key={index} className="mt-4">
                <p className="font-medium text-gray-900 dark:text-white">
                  {event.type} on {event.repo.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(event.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Loading GitHub activity...</p>
          )}
        </div>
      </motion.div>
     </div>

      {/* News Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 p-1"
      >
        <div className="h-full rounded-lg bg-white p-5 dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Latest News
          </h3>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {article?.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {article.source.name}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Loading news...</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
