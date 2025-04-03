import axios from "axios";

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

interface ChartData {
  date: string;
  value: number;
}

interface AssetData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isPositive: boolean;
  chartData: ChartData[];
}

interface AssetSummary {
  value: number;
  change: number;
  isPositive: boolean;
}

interface Overview {
  portfolio: AssetSummary;
  stocks: AssetSummary;
  crypto: AssetSummary;
  cash: AssetSummary;
}

interface FinanceData {
  overview: Overview;
  stocks: AssetData[];
  crypto: AssetData[];
  portfolioHistory: ChartData[];
}

const fetchStockData = async (symbol: string): Promise<AssetData | null> => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const timeSeries = response.data["Time Series (Daily)"];
    if (!timeSeries) return null;

    const dates = Object.keys(timeSeries).slice(0, 5).reverse();
    const chartData: ChartData[] = dates.map((date) => ({
      date,
      value: parseFloat(timeSeries[date]["4. close"]),
    }));

    const latestPrice = chartData[chartData.length - 1]?.value || 0;
    const previousPrice = chartData[chartData.length - 2]?.value || latestPrice;
    const change = parseFloat((latestPrice - previousPrice).toFixed(2));

    return {
      symbol,
      name: symbol, // You could fetch actual company names dynamically
      price: latestPrice,
      change,
      isPositive: change >= 0,
      chartData,
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
};

export const getFinanceData = async (
  stockSymbols: string[],
  cryptoData: AssetData[],
  cashBalance: number
): Promise<FinanceData> => {
  try {
    const stockData = await Promise.all(stockSymbols.map(fetchStockData));
    const validStockData = stockData.filter((stock): stock is AssetData => stock !== null);

    const portfolioValue =
      validStockData.reduce((sum, stock) => sum + stock.price, 0) +
      cryptoData.reduce((sum, crypto) => sum + crypto.price, 0) +
      cashBalance;

    const overview: Overview = {
      portfolio: { value: portfolioValue, change: 2.34, isPositive: true },
      stocks: { value: validStockData.reduce((sum, stock) => sum + stock.price, 0), change: 3.21, isPositive: true },
      crypto: { value: cryptoData.reduce((sum, crypto) => sum + crypto.price, 0), change: -1.45, isPositive: false },
      cash: { value: cashBalance, change: 0, isPositive: true },
    };

    const portfolioHistory: ChartData[] = Array.from({ length: 12 }, (_, i) => ({
      date: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
      value: portfolioValue - i * 1000,
    }));

    return {
      overview,
      stocks: validStockData,
      crypto: cryptoData,
      portfolioHistory,
    };
  } catch (error) {
    console.error("Error fetching finance data:", error);
    throw new Error("Failed to fetch finance data");
  }
};
