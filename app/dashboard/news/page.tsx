"use client";

import { useEffect, useState } from "react";
import { Clock, ExternalLink, Globe, Search } from "lucide-react";
import { motion } from "framer-motion";



interface Article {
  title: string;
  description: string;
  source: { name: string };
  urlToImage?: string;
  publishedAt: string;
  url: string;
}

export default function NewsPage() {
  const NEW_API_KEY = process.env.NEXT_PUBLIC_NEW_API_KEY;
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<{
    topStories: {
      id: number;
      title: string;
      summary: string;
      source: string;
      category: string;
      image: string;
      publishedAt: string;
      url: string;
    }[];
    recentNews: {
      id: number;
      title: string;
      summary: string;
      source: string;
      category: string;
      image: string; 
      publishedAt: string;
      url: string;
    }[];
    categories: string[];
  } | null>(null);

  useEffect(() => {
    const url =`https://newsapi.org/v2/everything?q=${selectedCategory||"Apple"}&from=2025-04-01&sortBy=popularity&apiKey=${NEW_API_KEY}`;
    setIsLoading(true)
    setNewsData(null); // Clear previous data
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const articles = data.articles || [];
        setNewsData({
          topStories: articles.slice(0, 3).map((article: Article, index: number) => ({
            id: index + 1,
            title: article.title,
            summary: article.description,
            source: article.source.name,
            category: selectedCategory || "All",
            image: article.urlToImage ,
            publishedAt: new Date(article.publishedAt).toLocaleString(),
            url: article.url,
          })),
          recentNews: articles.slice(3, 14).map((article: Article, index:number) => ({
            id: index + 4,
            title: article.title,
            summary: article.description,
            image: article.urlToImage ,
            source: article.source.name,
            category: selectedCategory || "All",
            publishedAt: new Date(article.publishedAt).toLocaleString(),
            url: article.url,
          })),
          categories: [
            "Technology",
            "Business",
            "Politics",
            "Health",
            "Science",
            "Sports",
            "Entertainment",
            "Environment",
          ],
        });
      })
      .catch((error) => console.error("Error fetching news:", error));
      setIsLoading(false);

  }, [selectedCategory]);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Business:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Politics: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    Health:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Science: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    Sports:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    Entertainment:
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    Environment:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    Finance:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };


  const filteredNews = newsData
  ? [...newsData.topStories, ...newsData.recentNews].filter((news) => {
      const matchesSearch =
        searchQuery === "" ||
        (news.title && news.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (news.summary && news.summary.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === null || news.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
  : [];


  return (
    <>
      
        
        <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">News Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white w-full sm:w-64"
              />
            </div>
          </div>
        </div>
  
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {newsData?.categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
  
        {/* Featured News */}
        {!searchQuery && selectedCategory === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {newsData?.topStories.map((story) => (
              <div
                key={story.id}
                className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800"
              >
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <div className="mb-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        categoryColors[story.category]
                      }`}
                    >
                      {story.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    {story.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {story.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Globe className="mr-1 h-4 w-4" />
                      <span>{story.source}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{story.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
  
        {/* News List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            {searchQuery || selectedCategory ? "Search Results" : "Recent News"}
          </h2>
          <div className="space-y-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6 last:border-0 dark:border-gray-700"
                >
                  {news.image && (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="h-40 w-full sm:h-24 sm:w-40 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-grow">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          categoryColors[news.category]
                        }`}
                      >
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {news.source}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      {news.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{news.publishedAt}</span>
                      </div>
                      <a
                        href={news.url}
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Read more
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No news found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
    </>
  )
  ;
}
