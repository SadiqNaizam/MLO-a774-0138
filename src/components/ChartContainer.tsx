import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts'; // Assuming LineChart or BarChart

// Define a generic data type for charts
type ChartDataItem = {
  name: string; // Typically the X-axis label (e.g., date, category)
  [key: string]: string | number; // Other data series
};

interface ChartContainerProps {
  title: string;
  description?: string;
  data: ChartDataItem[];
  chartType?: 'line' | 'bar'; // To switch between chart types
  xAxisKey: string; // Key from data for X-axis
  dataKeys: { key: string; color: string; name?: string }[]; // Data series to plot
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  data,
  chartType = 'line',
  xAxisKey,
  dataKeys,
  className,
}) => {
  console.log("Rendering ChartContainer:", title, "with type:", chartType, "and data points:", data.length);

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          No data available for this chart.
        </CardContent>
      </Card>
    );
  }

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;
  const SeriesComponent = chartType === 'line' ? Line : Bar;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => typeof value === 'number' ? `$${value}` : value} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {dataKeys.map((item) => (
              <SeriesComponent
                key={item.key}
                type="monotone" // For LineChart
                dataKey={item.key}
                stroke={item.color} // For LineChart
                fill={item.color} // For BarChart
                strokeWidth={2} // For LineChart
                dot={{ r: 3 }} // For LineChart
                activeDot={{ r: 5 }} // For LineChart
                name={item.name || item.key}
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;