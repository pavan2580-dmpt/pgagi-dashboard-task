import React from "react";
import { Cloud, Sun, CloudDrizzle, CloudRain, CloudSnow } from "lucide-react";

interface HourlyWeather {
  dt: number;
  temp: number;
  weather: { main: string }[];
}

interface DailyWeather {
  dt: number;
  temp: { max: number; min: number };
  weather: { main: string }[];
}

export interface WeatherData {
    current: {
      temp: number;
      feels_like: number;
      humidity: number;
      wind_speed: number;
      weather: string;
      icon: React.ComponentType;
    };
    hourly: {
      time: string;
      temp: number;
      icon: React.ComponentType;
    }[];
    daily: {
      day: string;
      high: number;
      low: number;
      icon: React.ComponentType;
    }[];
    locations: {
      name: string;
      temp: number;
      weather: string;
      icon: React.ComponentType;
    }[];
  }
 export const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
  
      // Function to get icon component
      const getWeatherIcon = (condition: string) => {
        if (condition.includes("Cloud")) return Cloud;
        if (condition.includes("Rain")) return CloudRain;
        if (condition.includes("Drizzle")) return CloudDrizzle;
        if (condition.includes("Snow")) return CloudSnow;
        if (condition.includes("Clear")) return Sun;
        return Cloud;
      };
  
      const weatherData: WeatherData = {
        current: {
          temp: Math.round(data.current.temp_c),
          feels_like: Math.round(data.current.feelslike_c),
          humidity: data.current.humidity,
          wind_speed: data.current.wind_kph,
          weather: data.current.condition.text,
          icon: getWeatherIcon(data.current.condition.text),
        },
        hourly: data.forecast.forecastday[0].hour.slice(0, 8).map((hour: any) => ({
          time: new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
          temp: Math.round(hour.temp_c),
          icon: getWeatherIcon(hour.condition.text),
        })),
        daily: data.forecast.forecastday.map((day: any) => ({
          day: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
          high: Math.round(day.day.maxtemp_c),
          low: Math.round(day.day.mintemp_c),
          icon: getWeatherIcon(day.day.condition.text),
        })),
        locations: [
          {
            name: data.location.name,
            temp: Math.round(data.current.temp_c),
            weather: data.current.condition.text,
            icon: getWeatherIcon(data.current.condition.text),
          },
        ],
      };
      return weatherData;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };
  