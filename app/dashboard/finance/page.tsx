"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Placeholder finance data
const financeData = {
  overview: {
    portfolio: {
      value: 124567.89,
      change: 2.34,
      isPositive: true,
    },
    stocks: {
      value: 87654.32,
      change: 3.21,
      isPositive: true,
    },
    crypto: {
      value: 32456.78,
      change: -1.45,
      isPositive: false,
    },
    cash: {
      value: 4456.79,
      change: 0,
      isPositive: true,
    },
  },
  stocks: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 182.63,
      change: 1.25,
      isPositive: true,
      chartData: [
        { date: "Mon", value: 178.25 },
        { date: "Tue", value: 180.42 },
        { date: "Wed", value: 179.86 },
        { date: "Thu", value: 181.15 },
        { date: "Fri", value: 182.63 },
      ],
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 415.32,
      change: 2.78,
      isPositive: true,
      chartData: [
        { date: "Mon", value: 405.12 },
        { date: "Tue", value: 408.65 },
        { date: "Wed", value: 412.34 },
        { date: "Thu", value: 410.87 },
        { date: "Fri", value: 415.32 },
      ],
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.56,
      change: -0.87,
      isPositive: false,
      chartData: [
        { date: "Mon", value: 144.32 },
        { date: "Tue", value: 143.78 },
        { date: "Wed", value: 144.12 },
        { date: "Thu", value: 143.45 },
        { date: "Fri", value: 142.56 },
      ],
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 178.25,
      change: 1.56,
      isPositive: true,
      chartData: [
        { date: "Mon", value: 175.32 },
        { date: "Tue", value: 176.45 },
        { date: "Wed", value: 177.12 },
        { date: "Thu", value: 176.89 },
        { date: "Fri", value: 178.25 },
      ],
    },
  ],
  crypto: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 63245.78,
      change: -2.34,
      isPositive: false,
      chartData: [
        { date: "Mon", value: 64800.25 },
        { date: "Tue", value: 64200.42 },
        { date: "Wed", value: 63900.86 },
        { date: "Thu", value: 63500.15 },
        { date: "Fri", value: 63245.78 },
      ],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 3456.89,
      change: 1.23,
      isPositive: true,
      chartData: [
        { date: "Mon", value: 3412.32 },
        { date: "Tue", value: 3425.65 },
        { date: "Wed", value: 3440.34 },
        { date: "Thu", value: 3435.87 },
        { date: "Fri", value: 3456.89 },
      ],
    },
  ],
  portfolioHistory: [
    { date: "Jan", value: 105000 },
    { date: "Feb", value: 110000 },
    { date: "Mar", value: 108000 },
    { date: "Apr", value: 112000 },
    { date: "May", value: 118000 },
    { date: "Jun", value: 115000 },
    { date: "Jul", value: 120000 },
    { date: "Aug", value: 122000 },
    { date: "Sep", value: 121000 },
    { date: "Oct", value: 123000 },
    { date: "Nov", value: 122500 },
    { date: "Dec", value: 124567 },
  ],
};

// Time periods for filtering
const timePeriods = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "all" },
];

export default function FinancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTimePeriod, setActiveTimePeriod] = useState("1m");

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Finance Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {timePeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => setActiveTimePeriod(period.value)}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTimePeriod === period.value
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Portfolio Value
            </h3>
            <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(financeData.overview.portfolio.value)}
            </p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                financeData.overview.portfolio.isPositive
                  ? "text-green-600 dark:text-green-500"
                  : "text-red-600 dark:text-red-500"
              }`}
            >
              {financeData.overview.portfolio.isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="ml-1">
                {financeData.overview.portfolio.change}%
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Stocks
            </h3>
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(financeData.overview.stocks.value)}
            </p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                financeData.overview.stocks.isPositive
                  ? "text-green-600 dark:text-green-500"
                  : "text-red-600 dark:text-red-500"
              }`}
            >
              {financeData.overview.stocks.isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="ml-1">
                {financeData.overview.stocks.change}%
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cryptocurrency
            </h3>
            <LineChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(financeData.overview.crypto.value)}
            </p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                financeData.overview.crypto.isPositive
                  ? "text-green-600 dark:text-green-500"
                  : "text-red-600 dark:text-red-500"
              }`}
            >
              {financeData.overview.crypto.isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="ml-1">
                {Math.abs(financeData.overview.crypto.change)}%
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cash
            </h3>
            <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(financeData.overview.cash.value)}
            </p>
            <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Available
            </p>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Portfolio Performance
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={financeData.portfolioHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: any) => [
                  `$${value.toLocaleString()}`,
                  "Value",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Stocks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Stocks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Symbol
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Change
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Chart
                </th>
              </tr>
            </thead>
            <tbody>
              {financeData.stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {stock.symbol}
                  </td>
                  <td className="py-4 text-sm text-gray-500 dark:text-gray-400">
                    {stock.name}
                  </td>
                  <td className="py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(stock.price)}
                  </td>
                  <td
                    className={`py-4 text-right text-sm font-medium ${
                      stock.isPositive
                        ? "text-green-600 dark:text-green-500"
                        : "text-red-600 dark:text-red-500"
                    }`}
                  >
                    <div className="flex items-center justify-end">
                      {stock.isPositive ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4" />
                      )}
                      {stock.change}%
                    </div>
                  </td>
                  <td className="py-4 pl-4">
                    <div className="h-10 w-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={stock.chartData}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={stock.isPositive ? "#10b981" : "#ef4444"}
                            strokeWidth={2}
                            dot={false}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Cryptocurrency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Cryptocurrency
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Symbol
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Change
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Chart
                </th>
              </tr>
            </thead>
            <tbody>
              {financeData.crypto.map((crypto) => (
                <tr
                  key={crypto.symbol}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {crypto.symbol}
                  </td>
                  <td className="py-4 text-sm text-gray-500 dark:text-gray-400">
                    {crypto.name}
                  </td>
                  <td className="py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(crypto.price)}
                  </td>
                  <td
                    className={`py-4 text-right text-sm font-medium ${
                      crypto.isPositive
                        ? "text-green-600 dark:text-green-500"
                        : "text-red-600 dark:text-red-500"
                    }`}
                  >
                    <div className="flex items-center justify-end">
                      {crypto.isPositive ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4" />
                      )}
                      {Math.abs(crypto.change)}%
                    </div>
                  </td>
                  <td className="py-4 pl-4">
                    <div className="h-10 w-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={crypto.chartData}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={crypto.isPositive ? "#10b981" : "#ef4444"}
                            strokeWidth={2}
                            dot={false}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
