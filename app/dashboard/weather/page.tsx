"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { motion } from "framer-motion"
import { fetchWeatherData, WeatherData } from "./fetch"




export default function WeatherPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<WeatherData | any>();


  const getUserLocation =() => {
    return new Promise<{ lat: number; lon: number }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const data = await fetchWeatherData(latitude, longitude);
          setWeatherData(data);
          setIsLoading(false);
        });

    });
  };
  
  

  useEffect(() => {
    getUserLocation(); // Start requesting location on mount
  }, []);




  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Weather Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {weatherData?.locations.map((location: { name: string; temp: number; weather: string; icon: React.ComponentType }) => (
                <span key={location.name}>{location.name}</span>
            ))}
          </span>
        </div>
      </div>

      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 p-6 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
          {weatherData?.locations.map((location: any) => (
             <h2 className="text-xl font-medium">{location.name}</h2>
          )) }
           
            <p className="text-blue-100">
              Today, {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center">
            {weatherData?.current?.icon && <weatherData.current.icon className="mr-4 h-16 w-16" />}
            <div>
              <div className="text-5xl font-bold">{weatherData?.current.temp}°</div>
              <p className="text-blue-100">{weatherData?.current.weather}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex items-center rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Thermometer className="mr-3 h-5 w-5" />
            <div>
              <p className="text-xs text-blue-100">Feels Like</p>
              <p className="font-medium">{weatherData?.current.feels_like}°</p>
            </div>
          </div>
          <div className="flex items-center rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Wind className="mr-3 h-5 w-5" />
            <div>
              <p className="text-xs text-blue-100">Wind</p>
              <p className="font-medium">{weatherData?.current.wind_speed} mph</p>
            </div>
          </div>
          <div className="flex items-center rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Droplets className="mr-3 h-5 w-5" />
            <div>
              <p className="text-xs text-blue-100">Humidity</p>
              <p className="font-medium">{weatherData?.current.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Sun className="mr-3 h-5 w-5" />
            <div>
              <p className="text-xs text-blue-100">UV Index</p>
              <p className="font-medium">Moderate</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hourly Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Hourly Forecast</h2>
        <div className="flex space-x-6 overflow-x-auto pb-2">
          {weatherData?.hourly.map((hour: any, index:any) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">{hour.time}</p>
              <hour.icon className="my-2 h-6 w-6 text-blue-500" />
              <p className="font-medium text-gray-900 dark:text-white">{hour.temp}°</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">7-Day Forecast</h2>
        <div className="space-y-4">
          {weatherData?.daily.map((day:any, index:any) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-24">
                <p
                  className={`font-medium ${index === 0 ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}
                >
                  {day.day}
                </p>
              </div>
              <day.icon className="h-6 w-6 text-blue-500" />
              <div className="flex w-24 justify-end space-x-4">
                <span className="font-medium text-gray-900 dark:text-white">{day.high}°</span>
                <span className="text-gray-500 dark:text-gray-400">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

