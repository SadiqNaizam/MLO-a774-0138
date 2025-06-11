import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DataWidget from '@/components/DataWidget';
import ChartContainer from '@/components/ChartContainer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

// Placeholder data for charts and table
const salesData = [
  { name: 'Jan', sales: 4000, orders: 2400 },
  { name: 'Feb', sales: 3000, orders: 1398 },
  { name: 'Mar', sales: 2000, orders: 9800 },
  { name: 'Apr', sales: 2780, orders: 3908 },
  { name: 'May', sales: 1890, orders: 4800 },
  { name: 'Jun', sales: 2390, orders: 3800 },
];

const recentActivities = [
  { id: 'ORD001', customer: 'Alice Wonderland', amount: '$150.00', status: 'Shipped' },
  { id: 'ORD002', customer: 'Bob The Builder', amount: '$75.50', status: 'Processing' },
  { id: 'USER001', customer: 'Charlie Brown', amount: 'New Registration', status: 'Active' },
  { id: 'ORD003', customer: 'Diana Prince', amount: '$299.99', status: 'Delivered' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onLinkClick={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

          {/* Data Widgets Section */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <DataWidget title="Total Revenue" value="$45,231.89" description="+20.1% from last month" Icon={DollarSign} />
            <DataWidget title="New Orders" value="2,350" description="+180 since last week" Icon={ShoppingCart} />
            <DataWidget title="New Customers" value="132" description="+15 this month" Icon={Users} />
            <DataWidget title="Active Users Now" value="78" description="Online" Icon={Activity} />
          </section>

          {/* Charts Section */}
          <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-6">
            <ChartContainer
              title="Sales Overview"
              description="Monthly sales performance"
              data={salesData}
              xAxisKey="name"
              dataKeys={[{ key: 'sales', color: '#8884d8', name: 'Sales' }, { key: 'orders', color: '#82ca9d', name: 'Orders' }]}
              chartType="line"
            />
            <ChartContainer
              title="Product Categories"
              description="Distribution by category"
              data={[
                { name: 'Electronics', value: 400 }, { name: 'Books', value: 300 },
                { name: 'Clothing', value: 300 }, { name: 'Home Goods', value: 200 }
              ]}
              xAxisKey="name"
              dataKeys={[{ key: 'value', color: '#ffc658', name: 'Items Sold'}]}
              chartType="bar"
            />
          </section>

          {/* Recent Activity Table Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Amount/Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.id}</TableCell>
                        <TableCell>{activity.customer}</TableCell>
                        <TableCell>{activity.amount}</TableCell>
                        <TableCell>{activity.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;