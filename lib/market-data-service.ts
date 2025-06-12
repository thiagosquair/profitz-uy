export interface MarketData {
  symbol: string
  timestamp: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface MarketContext {
  symbol: string
  timeframe: string
  priceData: MarketData[]
  volatility: {
    value: number
    isHigh: boolean
    percentile: number
  }
  trend: {
    direction: "up" | "down" | "sideways"
    strength: number // 0-100
    duration: number // in candles
  }
  keyLevels: {
    type: "support" | "resistance" | "pivot"
    price: number
    strength: number // 0-100
    distance: number // % from current price
  }[]
  movingAverages: {
    period: number
    value: number
    relation: "above" | "below" | "crossing"
  }[]
  indicators: {
    name: string
    value: number | string
    interpretation: string
  }[]
  marketEvents?: {
    type: string
    description: string
    impact: "high" | "medium" | "low"
    time: Date
  }[]
}

export interface MarketOverview {
  marketType: "forex" | "stocks" | "crypto" | "commodities" | "indices"
  overallSentiment: "bullish" | "bearish" | "neutral" | "mixed"
  volatilityIndex: number // 0-100
  majorIndices: {
    name: string
    change: number
    percentChange: number
  }[]
  correlatedAssets: {
    symbol: string
    correlation: number // -1 to 1
    performance: number // percent change
  }[]
}

export class MarketDataService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.ALPHA_VANTAGE_API_KEY || ""
    if (!this.apiKey) {
      console.warn("Alpha Vantage API key not found. Market data features will be limited.")
    }
  }

  async getHistoricalData(symbol: string, timeframe: string, startDate: Date, endDate: Date): Promise<MarketData[]> {
    try {
      // In a real implementation, this would call the Alpha Vantage API
      // For this demo, we'll return simulated data
      if (!this.apiKey) {
        return this.getSimulatedHistoricalData(symbol, timeframe, startDate, endDate)
      }

      // Convert timeframe to Alpha Vantage interval
      const interval = this.convertTimeframeToInterval(timeframe)

      // Determine function to call based on asset type
      const function_name = this.isForex(symbol) ? "FX_INTRADAY" : "TIME_SERIES_INTRADAY"

      const url = `https://www.alphavantage.co/query?function=${function_name}&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}&outputsize=full`

      const response = await fetch(url)
      const data = await response.json()

      // Process and return the data
      return this.processAlphaVantageData(data, symbol, startDate, endDate)
    } catch (error) {
      console.error("Error fetching historical data:", error)
      return this.getSimulatedHistoricalData(symbol, timeframe, startDate, endDate)
    }
  }

  async getMarketContext(symbol: string, timeframe: string, tradeDate: Date): Promise<MarketContext> {
    // Get historical data around the trade date
    const startDate = new Date(tradeDate)
    startDate.setDate(startDate.getDate() - 30) // Get 30 days before trade

    const endDate = new Date(tradeDate)
    endDate.setDate(endDate.getDate() + 1) // Include trade date

    const historicalData = await this.getHistoricalData(symbol, timeframe, startDate, endDate)

    // Calculate market context metrics
    const volatility = this.calculateVolatility(historicalData)
    const trend = this.analyzeTrend(historicalData)
    const keyLevels = this.identifyKeyLevels(historicalData)
    const movingAverages = this.calculateMovingAverages(historicalData)
    const indicators = this.calculateIndicators(historicalData)
    const marketEvents = await this.getMarketEvents(symbol, tradeDate)

    return {
      symbol,
      timeframe,
      priceData: historicalData,
      volatility,
      trend,
      keyLevels,
      movingAverages,
      indicators,
      marketEvents,
    }
  }

  async getMarketOverview(
    date: Date,
    marketType: "forex" | "stocks" | "crypto" | "commodities" | "indices" = "forex",
  ): Promise<MarketOverview> {
    // In a real implementation, this would fetch market overview data
    // For this demo, we'll return simulated data
    return {
      marketType,
      overallSentiment: "bullish",
      volatilityIndex: 65,
      majorIndices: [
        { name: "S&P 500", change: 23.45, percentChange: 0.67 },
        { name: "NASDAQ", change: 78.12, percentChange: 0.89 },
        { name: "Dow Jones", change: 156.78, percentChange: 0.45 },
        { name: "VIX", change: -1.23, percentChange: -5.67 },
      ],
      correlatedAssets: [
        { symbol: "EURUSD", correlation: 0.78, performance: 0.45 },
        { symbol: "XAUUSD", correlation: -0.65, performance: 1.23 },
        { symbol: "USDJPY", correlation: -0.82, performance: -0.34 },
        { symbol: "USOIL", correlation: 0.32, performance: 2.45 },
      ],
    }
  }

  // Helper methods
  private convertTimeframeToInterval(timeframe: string): string {
    const timeframeMap: { [key: string]: string } = {
      "1m": "1min",
      "5m": "5min",
      "15m": "15min",
      "30m": "30min",
      "1H": "60min",
      "4H": "60min", // Alpha Vantage doesn't have 4H, use 60min
      Daily: "daily",
      Weekly: "weekly",
    }
    return timeframeMap[timeframe] || "60min"
  }

  private isForex(symbol: string): boolean {
    // Simple check for common forex pairs
    return /^[A-Z]{3}[A-Z]{3}$/.test(symbol)
  }

  private processAlphaVantageData(data: any, symbol: string, startDate: Date, endDate: Date): MarketData[] {
    // In a real implementation, this would process the Alpha Vantage response
    // For this demo, we'll return simulated data
    return this.getSimulatedHistoricalData(symbol, "1H", startDate, endDate)
  }

  private getSimulatedHistoricalData(symbol: string, timeframe: string, startDate: Date, endDate: Date): MarketData[] {
    const data: MarketData[] = []
    const currentDate = new Date(startDate)
    let basePrice = this.getBasePrice(symbol)
    const volatility = this.getVolatility(symbol)

    while (currentDate <= endDate) {
      // Skip weekends for forex and stocks
      const day = currentDate.getDay()
      if (day !== 0 && day !== 6) {
        // Generate random price movement
        const change = (Math.random() - 0.5) * volatility * basePrice
        const open = basePrice
        const close = basePrice + change
        const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5
        const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5
        const volume = Math.floor(Math.random() * 10000) + 1000

        data.push({
          symbol,
          timestamp: new Date(currentDate),
          open,
          high,
          low,
          close,
          volume,
        })

        // Update base price for next candle
        basePrice = close
      }

      // Increment date based on timeframe
      this.incrementDate(currentDate, timeframe)
    }

    return data
  }

  private getBasePrice(symbol: string): number {
    // Return a realistic base price for the symbol
    const basePrices: { [key: string]: number } = {
      EURUSD: 1.08,
      GBPUSD: 1.25,
      USDJPY: 150.0,
      AUDUSD: 0.65,
      USDCAD: 1.35,
      XAUUSD: 1900.0,
      BTCUSD: 35000.0,
      AAPL: 180.0,
      MSFT: 350.0,
      GOOGL: 140.0,
      AMZN: 130.0,
    }
    return basePrices[symbol] || 100.0
  }

  private getVolatility(symbol: string): number {
    // Return a realistic volatility for the symbol (as a decimal)
    const volatilities: { [key: string]: number } = {
      EURUSD: 0.0015,
      GBPUSD: 0.0018,
      USDJPY: 0.002,
      AUDUSD: 0.0022,
      USDCAD: 0.0016,
      XAUUSD: 0.0035,
      BTCUSD: 0.025,
      AAPL: 0.018,
      MSFT: 0.016,
      GOOGL: 0.017,
      AMZN: 0.019,
    }
    return volatilities[symbol] || 0.01
  }

  private incrementDate(date: Date, timeframe: string): void {
    switch (timeframe) {
      case "1m":
        date.setMinutes(date.getMinutes() + 1)
        break
      case "5m":
        date.setMinutes(date.getMinutes() + 5)
        break
      case "15m":
        date.setMinutes(date.getMinutes() + 15)
        break
      case "30m":
        date.setMinutes(date.getMinutes() + 30)
        break
      case "1H":
        date.setHours(date.getHours() + 1)
        break
      case "4H":
        date.setHours(date.getHours() + 4)
        break
      case "Daily":
        date.setDate(date.getDate() + 1)
        break
      case "Weekly":
        date.setDate(date.getDate() + 7)
        break
      default:
        date.setHours(date.getHours() + 1)
    }
  }

  private calculateVolatility(data: MarketData[]): {
    value: number
    isHigh: boolean
    percentile: number
  } {
    if (data.length < 2) {
      return { value: 0, isHigh: false, percentile: 0 }
    }

    // Calculate Average True Range (ATR) as a volatility measure
    let atr = 0
    for (let i = 1; i < data.length; i++) {
      const tr = Math.max(
        data[i].high - data[i].low,
        Math.abs(data[i].high - data[i - 1].close),
        Math.abs(data[i].low - data[i - 1].close),
      )
      atr += tr
    }
    atr /= data.length - 1

    // Calculate as percentage of price
    const avgPrice = data.reduce((sum, d) => sum + d.close, 0) / data.length
    const volatilityValue = (atr / avgPrice) * 100

    // Determine if volatility is high (above 75th percentile)
    // In a real implementation, this would compare to historical volatility
    const isHigh = volatilityValue > 0.8
    const percentile = Math.min(Math.round((volatilityValue / 1.5) * 100), 100)

    return {
      value: Number.parseFloat(volatilityValue.toFixed(2)),
      isHigh,
      percentile,
    }
  }

  private analyzeTrend(data: MarketData[]): {
    direction: "up" | "down" | "sideways"
    strength: number
    duration: number
  } {
    if (data.length < 5) {
      return { direction: "sideways", strength: 0, duration: 0 }
    }

    // Simple trend analysis using linear regression
    const xValues = Array.from({ length: data.length }, (_, i) => i)
    const yValues = data.map((d) => d.close)

    const { slope, r2 } = this.linearRegression(xValues, yValues)

    // Determine trend direction
    let direction: "up" | "down" | "sideways" = "sideways"
    if (slope > 0.0001) direction = "up"
    else if (slope < -0.0001) direction = "down"

    // Calculate trend strength (0-100) based on R-squared value
    const strength = Math.round(r2 * 100)

    // Calculate trend duration (in candles)
    let duration = 0
    if (direction === "up") {
      for (let i = data.length - 2; i >= 0; i--) {
        if (data[i].close < data[i + 1].close) duration++
        else break
      }
    } else if (direction === "down") {
      for (let i = data.length - 2; i >= 0; i--) {
        if (data[i].close > data[i + 1].close) duration++
        else break
      }
    }

    return {
      direction,
      strength,
      duration,
    }
  }

  private linearRegression(x: number[], y: number[]): { slope: number; intercept: number; r2: number } {
    const n = x.length
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXX = 0
    let sumYY = 0

    for (let i = 0; i < n; i++) {
      sumX += x[i]
      sumY += y[i]
      sumXY += x[i] * y[i]
      sumXX += x[i] * x[i]
      sumYY += y[i] * y[i]
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n
    const r = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))
    const r2 = r * r

    return { slope, intercept, r2 }
  }

  private identifyKeyLevels(data: MarketData[]): {
    type: "support" | "resistance" | "pivot"
    price: number
    strength: number
    distance: number
  }[] {
    if (data.length < 10) return []

    const levels: {
      type: "support" | "resistance" | "pivot"
      price: number
      strength: number
      distance: number
    }[] = []

    const currentPrice = data[data.length - 1].close

    // Find potential support levels (recent lows)
    const lows = data.map((d) => d.low)
    const potentialSupports = this.findKeyPriceLevels(lows, "support")

    // Find potential resistance levels (recent highs)
    const highs = data.map((d) => d.high)
    const potentialResistances = this.findKeyPriceLevels(highs, "resistance")

    // Combine and sort by strength
    const allLevels = [...potentialSupports, ...potentialResistances]
    allLevels.forEach((level) => {
      // Calculate distance as percentage from current price
      level.distance = Number.parseFloat((((level.price - currentPrice) / currentPrice) * 100).toFixed(2))
    })

    // Sort by absolute distance (closest first)
    allLevels.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance))

    // Return top 5 levels
    return allLevels.slice(0, 5)
  }

  private findKeyPriceLevels(
    prices: number[],
    type: "support" | "resistance",
  ): { type: "support" | "resistance" | "pivot"; price: number; strength: number; distance: number }[] {
    const levels: { type: "support" | "resistance" | "pivot"; price: number; strength: number; distance: number }[] = []
    const tolerance = 0.001 // 0.1% tolerance for price clustering

    // Group similar price levels
    const priceClusters: { price: number; count: number }[] = []

    prices.forEach((price) => {
      // Check if price is close to an existing cluster
      const existingCluster = priceClusters.find((cluster) => Math.abs(cluster.price - price) / price < tolerance)

      if (existingCluster) {
        existingCluster.count++
        // Update cluster price to average
        existingCluster.price = (existingCluster.price * (existingCluster.count - 1) + price) / existingCluster.count
      } else {
        priceClusters.push({ price, count: 1 })
      }
    })

    // Convert clusters to levels
    priceClusters
      .filter((cluster) => cluster.count >= 2) // At least 2 touches
      .forEach((cluster) => {
        levels.push({
          type,
          price: Number.parseFloat(cluster.price.toFixed(5)),
          strength: Math.min(cluster.count * 10, 100), // Scale strength 0-100
          distance: 0, // Will be calculated later
        })
      })

    return levels
  }

  private calculateMovingAverages(data: MarketData[]): {
    period: number
    value: number
    relation: "above" | "below" | "crossing"
  }[] {
    if (data.length < 50) return []

    const currentPrice = data[data.length - 1].close
    const periods = [20, 50, 100, 200]
    const mas: { period: number; value: number; relation: "above" | "below" | "crossing" }[] = []

    periods.forEach((period) => {
      if (data.length >= period) {
        // Calculate simple moving average
        const maValues = data.slice(data.length - period).map((d) => d.close)
        const ma = maValues.reduce((sum, price) => sum + price, 0) / period
        const maValue = Number.parseFloat(ma.toFixed(5))

        // Determine relation to price
        let relation: "above" | "below" | "crossing" = "crossing"
        const threshold = currentPrice * 0.001 // 0.1% threshold for crossing

        if (currentPrice > maValue + threshold) {
          relation = "above"
        } else if (currentPrice < maValue - threshold) {
          relation = "below"
        }

        mas.push({ period, value: maValue, relation })
      }
    })

    return mas
  }

  private calculateIndicators(data: MarketData[]): {
    name: string
    value: number | string
    interpretation: string
  }[] {
    if (data.length < 14) return []

    const indicators: { name: string; value: number | string; interpretation: string }[] = []

    // Calculate RSI (14)
    const rsi = this.calculateRSI(data, 14)
    let rsiInterpretation = "neutral"
    if (rsi > 70) rsiInterpretation = "overbought"
    else if (rsi < 30) rsiInterpretation = "oversold"

    indicators.push({
      name: "RSI(14)",
      value: Number.parseFloat(rsi.toFixed(2)),
      interpretation: rsiInterpretation,
    })

    // Calculate MACD
    const macd = this.calculateMACD(data)
    let macdInterpretation = "neutral"
    if (macd.histogram > 0 && macd.histogram > macd.previousHistogram)
      macdInterpretation = "bullish momentum increasing"
    else if (macd.histogram > 0 && macd.histogram < macd.previousHistogram)
      macdInterpretation = "bullish momentum decreasing"
    else if (macd.histogram < 0 && macd.histogram < macd.previousHistogram)
      macdInterpretation = "bearish momentum increasing"
    else if (macd.histogram < 0 && macd.histogram > macd.previousHistogram)
      macdInterpretation = "bearish momentum decreasing"

    indicators.push({
      name: "MACD",
      value: `${macd.macd.toFixed(5)} (${macd.histogram > 0 ? "+" : ""}${macd.histogram.toFixed(5)})`,
      interpretation: macdInterpretation,
    })

    // Calculate Average True Range (ATR)
    const atr = this.calculateATR(data, 14)
    const avgPrice = data[data.length - 1].close
    const atrPercentage = (atr / avgPrice) * 100

    let atrInterpretation = "moderate volatility"
    if (atrPercentage > 1.5) atrInterpretation = "high volatility"
    else if (atrPercentage < 0.5) atrInterpretation = "low volatility"

    indicators.push({
      name: "ATR(14)",
      value: Number.parseFloat(atr.toFixed(5)),
      interpretation: atrInterpretation,
    })

    return indicators
  }

  private calculateRSI(data: MarketData[], period: number): number {
    if (data.length <= period) return 50

    let gains = 0
    let losses = 0

    // Calculate initial average gain and loss
    for (let i = data.length - period - 1; i < data.length - 1; i++) {
      const change = data[i + 1].close - data[i].close
      if (change >= 0) {
        gains += change
      } else {
        losses -= change
      }
    }

    const avgGain = gains / period
    const avgLoss = losses / period

    // Calculate RSI
    const rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss) // Avoid division by zero
    const rsi = 100 - 100 / (1 + rs)

    return rsi
  }

  private calculateMACD(data: MarketData[]): {
    macd: number
    signal: number
    histogram: number
    previousHistogram: number
  } {
    const fastPeriod = 12
    const slowPeriod = 26
    const signalPeriod = 9

    if (data.length <= slowPeriod + signalPeriod) {
      return { macd: 0, signal: 0, histogram: 0, previousHistogram: 0 }
    }

    // Calculate EMAs
    const fastEMA = this.calculateEMA(
      data.map((d) => d.close),
      fastPeriod,
    )
    const slowEMA = this.calculateEMA(
      data.map((d) => d.close),
      slowPeriod,
    )

    // Calculate MACD line
    const macdLine = fastEMA - slowEMA

    // Calculate signal line (EMA of MACD line)
    const macdValues = []
    for (let i = 0; i < data.length - slowPeriod; i++) {
      const fastEMA = this.calculateEMA(
        data.slice(0, slowPeriod + i + 1).map((d) => d.close),
        fastPeriod,
      )
      const slowEMA = this.calculateEMA(
        data.slice(0, slowPeriod + i + 1).map((d) => d.close),
        slowPeriod,
      )
      macdValues.push(fastEMA - slowEMA)
    }

    const signalLine = this.calculateEMA(macdValues, signalPeriod)

    // Calculate histogram
    const histogram = macdLine - signalLine

    // Calculate previous histogram for momentum
    let previousHistogram = 0
    if (macdValues.length >= 2) {
      const prevMacd = macdValues[macdValues.length - 2]
      const prevSignal = this.calculateEMA(macdValues.slice(0, -1), signalPeriod)
      previousHistogram = prevMacd - prevSignal
    }

    return {
      macd: macdLine,
      signal: signalLine,
      histogram,
      previousHistogram,
    }
  }

  private calculateEMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1]

    // Start with SMA
    let sum = 0
    for (let i = 0; i < period; i++) {
      sum += prices[i]
    }
    let ema = sum / period

    // Calculate multiplier
    const multiplier = 2 / (period + 1)

    // Calculate EMA
    for (let i = period; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema
    }

    return ema
  }

  private calculateATR(data: MarketData[], period: number): number {
    if (data.length <= period) return 0

    // Calculate true ranges
    const trueRanges = []
    for (let i = 1; i < data.length; i++) {
      const tr = Math.max(
        data[i].high - data[i].low,
        Math.abs(data[i].high - data[i - 1].close),
        Math.abs(data[i].low - data[i - 1].close),
      )
      trueRanges.push(tr)
    }

    // Calculate ATR as simple average of true ranges
    let sum = 0
    for (let i = trueRanges.length - period; i < trueRanges.length; i++) {
      sum += trueRanges[i]
    }
    return sum / period
  }

  private async getMarketEvents(
    symbol: string,
    date: Date,
  ): Promise<
    {
      type: string
      description: string
      impact: "high" | "medium" | "low"
      time: Date
    }[]
  > {
    // In a real implementation, this would fetch economic calendar events
    // For this demo, we'll return simulated events
    const events = []

    // Add a simulated event if it's a major forex pair
    if (["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"].includes(symbol)) {
      const eventTime = new Date(date)
      eventTime.setHours(eventTime.getHours() - Math.floor(Math.random() * 12))

      const eventTypes = ["Interest Rate Decision", "GDP Release", "NFP", "CPI Data", "Retail Sales"]
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]

      const impacts = ["high", "medium", "low"] as const
      const impact = impacts[Math.floor(Math.random() * impacts.length)]

      events.push({
        type: eventType,
        description: `${symbol.substring(0, 3)} ${eventType}`,
        impact,
        time: eventTime,
      })
    }

    return events
  }
}
