import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DataTableToolbar from '@/components/DataTableToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// Assuming Form related components from shadcn/ui if used with react-hook-form
// For this example, a simpler form structure is used directly with state.

// Placeholder data for products
const sampleProducts = [
  { id: 'PROD001', name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', price: '$25.99', stock: 150, status: 'Active' },
  { id: 'PROD002', name: 'Ergonomic Keyboard', sku: 'EK-002', category: 'Electronics', price: '$75.00', stock: 75, status: 'Active' },
  { id: 'PROD003', name: 'Organic Green Tea', sku: 'OGT-003', category: 'Groceries', price: '$12.50', stock: 200, status: 'Inactive' },
  { id: 'PROD004', name: 'Yoga Mat', sku: 'YM-004', category: 'Sports', price: '$30.00', stock: 0, status: 'OutOfStock' },
];

type Product = typeof sampleProducts[0];

const ProductsPage = () => {
  console.log('ProductsPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Basic form state
  const [productName, setProductName] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setProductName('');
    setProductSku('');
    setProductPrice('');
    setProductStock('');
    setProductCategory('');
    setProductDescription('');
    setIsFormDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductSku(product.sku);
    setProductPrice(product.price.replace('$', ''));
    setProductStock(product.stock.toString());
    setProductCategory(product.category);
    setProductDescription(`Description for ${product.name}`); // Placeholder
    setIsFormDialogOpen(true);
  };
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { name: productName, sku: productSku, price: productPrice, stock: productStock, category: productCategory, description: productDescription };
    if (editingProduct) {
      console.log('Updating product:', editingProduct.id, productData);
    } else {
      console.log('Adding new product:', productData);
    }
    setIsFormDialogOpen(false);
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'outofstock': return 'destructive';
      default: return 'outline';
    }
  };


  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onLinkClick={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-6">Products</h1>
          <DataTableToolbar
            searchPlaceholder="Search by Product Name, SKU..."
            onSearch={(term) => console.log('Searching products:', term)}
            onAddNew={handleAddNewProduct}
            canAddNew={true}
          />
          <div className="border rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(product.status) as any}>{product.status}</Badge>
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
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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

          <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? `Update details for ${editingProduct.name}.` : 'Fill in the details for the new product.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitForm} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productName" className="text-right">Name</Label>
                  <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="col-span-3" placeholder="e.g. Awesome T-Shirt" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productSku" className="text-right">SKU</Label>
                  <Input id="productSku" value={productSku} onChange={(e) => setProductSku(e.target.value)} className="col-span-3" placeholder="e.g. TSHIRT-AWESOME-LG" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productPrice" className="text-right">Price ($)</Label>
                  <Input id="productPrice" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="col-span-3" placeholder="e.g. 19.99" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productStock" className="text-right">Stock</Label>
                  <Input id="productStock" type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} className="col-span-3" placeholder="e.g. 100" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productCategory" className="text-right">Category</Label>
                  <Input id="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="col-span-3" placeholder="e.g. Apparel" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="productDescription" className="text-right pt-2">Description</Label>
                  <Textarea id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="col-span-3" placeholder="Brief description of the product." />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsFormDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingProduct ? 'Save Changes' : 'Create Product'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </main>
      </div>
    </div>
  );
};

export default ProductsPage;