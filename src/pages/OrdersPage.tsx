import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DataTableToolbar from '@/components/DataTableToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Placeholder data for orders
const sampleOrders = [
  { id: 'ORD789', customer: 'Alice Smith', email: 'alice@example.com', date: '2023-10-01', total: '$120.50', status: 'Shipped', items: [{ name: 'Product A', qty: 2 }, { name: 'Product B', qty: 1 }] },
  { id: 'ORD790', customer: 'Bob Johnson', email: 'bob@example.com', date: '2023-10-02', total: '$85.00', status: 'Processing', items: [{ name: 'Product C', qty: 1 }] },
  { id: 'ORD791', customer: 'Carol Williams', email: 'carol@example.com', date: '2023-10-02', total: '$250.75', status: 'Delivered', items: [{ name: 'Product D', qty: 3 }] },
  { id: 'ORD792', customer: 'David Brown', email: 'david@example.com', date: '2023-10-03', total: '$45.99', status: 'Pending', items: [{ name: 'Product E', qty: 1 }] },
];

type Order = typeof sampleOrders[0];

const OrdersPage = () => {
  console.log('OrdersPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'default'; // Using 'default' as 'success' might not exist
      case 'processing': return 'secondary'; // Using 'secondary' as 'warning' might not exist
      case 'delivered': return 'default';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onLinkClick={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-6">Orders</h1>
          <DataTableToolbar
            searchPlaceholder="Search by Order ID, Customer..."
            onSearch={(term) => console.log('Searching orders:', term)}
            canAddNew={false} // No "Add New" for orders typically
          />
          <div className="border rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>

          {selectedOrder && (
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                  <DialogDescription>Customer: {selectedOrder.customer} ({selectedOrder.email})</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Total:</strong> {selectedOrder.total}</p>
                  <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedOrder.status) as any}>{selectedOrder.status}</Badge></p>
                  <h4 className="font-semibold mt-2">Items:</h4>
                  <ul className="list-disc list-inside pl-4">
                    {selectedOrder.items.map(item => <li key={item.name}>{item.name} (Qty: {item.qty})</li>)}
                  </ul>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;