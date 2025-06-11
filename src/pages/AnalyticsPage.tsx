import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ChartContainer from '@/components/ChartContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Placeholder data for charts
const monthlySalesData = [
  { name: 'Jan', revenue: 12000, profit: 3000 }, { name: 'Feb', revenue: 15000, profit: 4500 },
  { name: 'Mar', revenue: 10000, profit: 2000 }, { name: 'Apr', revenue: 18000, profit: 6000 },
  { name: 'May', revenue: 16000, profit: 5000 }, { name: 'Jun', revenue: 22000, profit: 8000 },
];

const trafficSourceData = [
  { name: 'Organic Search', visitors: 1200 }, { name: 'Direct', visitors: 900 },
  { name: 'Referral', visitors: 600 }, { name: 'Social Media', visitors: 450 },
  { name: 'Paid Ads', visitors: 300 },
];

const conversionFunnelData = [
  { stage: 'Homepage Visits', count: 10000 }, { stage: 'Product Views', count: 6000 },
  { stage: 'Add to Cart', count: 2500 }, { stage: 'Checkout Initiated', count: 1500 },
  { stage: 'Purchase Completed', count: 1000 },
];

const AnalyticsPage = () => {
  console.log('AnalyticsPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('last_30_days');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onLinkClick={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Analytics</h1>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_quarter">Last Quarter</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-6">
             <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Overview for {selectedTimeRange.replace('_', ' ')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">$125,670.50</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">3.45%</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Average Order Value</p>
                    <p className="text-2xl font-bold">$85.20</p>
                </div>
              </CardContent>
            </Card>
             <ChartContainer
              title="Revenue vs Profit"
              description={`Monthly performance for ${selectedTimeRange.replace('_', ' ')}`}
              data={monthlySalesData}
              xAxisKey="name"
              dataKeys={[
                { key: 'revenue', color: '#8884d8', name: 'Revenue' },
                { key: 'profit', color: '#82ca9d', name: 'Profit' }
              ]}
              chartType="line"
            />
            <ChartContainer
              title="Traffic Sources"
              description={`Visitor distribution by source`}
              data={trafficSourceData}
              xAxisKey="name"
              dataKeys={[{ key: 'visitors', color: '#ff7300', name: 'Visitors' }]}
              chartType="bar"
            />
          </section>
          
          <section className="mb-6">
             <ChartContainer
              title="Sales Conversion Funnel"
              description="Customer journey from visit to purchase"
              data={conversionFunnelData}
              xAxisKey="stage"
              dataKeys={[{ key: 'count', color: '#4CAF50', name: 'Count' }]}
              chartType="bar"
            />
          </section>
          
          {/* Placeholder for more charts or data tables */}
          <Card>
            <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Based on sales volume</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Product performance table or list would go here.</p>
                {/* Example simple list */}
                <ul className="mt-2 space-y-1 text-sm">
                    <li>1. Product Alpha - 500 units</li>
                    <li>2. Product Beta - 350 units</li>
                    <li>3. Product Gamma - 200 units</li>
                </ul>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;