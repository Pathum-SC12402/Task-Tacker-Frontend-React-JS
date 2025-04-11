"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import httpRequest from "@/api/request"

const chartConfig = {
  desktop: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ComponentProps {
  height?: number | string
  width?: number | string
}

export function DashboardLineChart({ height = 300, width = "100%" }: ComponentProps) {
  const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([])
  const [trend, setTrend] = useState<{ percentage: number; isUp: boolean } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpRequest.get("/data/get-appUsage")
        const transformedData = res.data.map((entry: any) => ({
          month: entry.month,
          desktop: entry.count,
        }))
        setChartData(transformedData)

        if (transformedData.length >= 2) {
          const last = transformedData[transformedData.length - 1].desktop
          const prev = transformedData[transformedData.length - 2].desktop
          const difference = last - prev
          const percentage = prev === 0 ? 100 : Math.abs((difference / prev) * 100)
          setTrend({ percentage: Math.round(percentage), isUp: difference >= 0 })
        }
      } catch (error) {
        console.error("Error fetching chart data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Usage</CardTitle>
        <CardDescription>Showing application usage for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height, width }}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {trend && (
              <div className="flex items-center gap-2 font-medium leading-none">
                {trend.isUp ? "Trending up" : "Trending down"} by {trend.percentage}%{" "}
                {trend.isUp ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            )}
            {chartData.length > 0 && (
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {chartData[0].month} - {chartData[chartData.length - 1].month}
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
