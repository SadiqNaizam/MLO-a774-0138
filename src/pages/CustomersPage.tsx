import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DataTableToolbar from '@/components/DataTableToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Placeholder data for customers
const sampleCustomers = [
  { id: 'CUST001', name: 'Eleanor Vance', email: 'eleanor@example.com', joined: '2023-01-15', totalOrders: 5, totalSpent: '$350.00', avatarUrl: 'https://via.placeholder.com/40/FF0000/FFFFFF?Text=EV' },
  { id: 'CUST002', name: 'Marcus Cole', email: 'marcus@example.com', joined: '2023-02-20', totalOrders: 2, totalSpent: '$120.50', avatarUrl: 'https://via.placeholder.com/40/00FF00/FFFFFF?Text=MC' },
  { id: 'CUST003', name: 'Lena Petrova', email: 'lena@example.com', joined: '2023-03-10', totalOrders: 8, totalSpent: '$780.25', avatarUrl: 'https://via.placeholder.com/40/0000FF/FFFFFF?Text=LP' },
  { id: 'CUST004', name: 'Kenji Tanaka', email: 'kenji@example.com', joined: '2023-04-05', totalOrders: 1, totalSpent: '$45.99', avatarUrl: 'https://via.placeholder.com/40/FFFF00/000000?Text=KT' },
];

type Customer = typeof sampleCustomers[0];

const CustomersPage = () => {
  console.log('CustomersPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onLinkClick={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-6">Customers</h1>
          <DataTableToolbar
            searchPlaceholder="Search by Name, Email..."
            onSearch={(term) => console.log('Searching customers:', term)}
            canAddNew={false} // Typically no "Add New Customer" from this table directly
          />
          <div className="border rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.joined}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(customer)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                           <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
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
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>

          {selectedCustomer && (
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Customer Profile: {selectedCustomer.name}</DialogTitle>
                  <DialogDescription>Details for {selectedCustomer.email}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                  <p><strong>Customer ID:</strong> {selectedCustomer.id}</p>
                  <p><strong>Joined:</strong> {selectedCustomer.joined}</p>
                  <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                  <p><strong>Total Spent:</strong> {selectedCustomer.totalSpent}</p>
                  <h4 className="font-semibold mt-2">Recent Order History (Placeholder):</h4>
                  <ul className="list-disc list-inside pl-4 text-sm">
                    <li>Order #ORDXYZ - $50.00 - Shipped</li>
                    <li>Order #ORDABC - $75.20 - Delivered</li>
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

export default CustomersPage;