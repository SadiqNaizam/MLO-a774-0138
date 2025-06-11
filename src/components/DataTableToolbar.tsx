import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListFilter, Download } from 'lucide-react'; // Example icons
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // For filter options

interface DataTableToolbarProps<TData> { // TData could be used for column definitions
  onSearch?: (searchTerm: string) => void;
  onAddNew?: () => void;
  onExport?: () => void;
  // Placeholder for filter state and handling
  // Example: filterableColumns, activeFilters, onFilterChange
  searchPlaceholder?: string;
  canAddNew?: boolean;
  canExport?: boolean;
}

const DataTableToolbar = <TData,>({
  onSearch,
  onAddNew,
  onExport,
  searchPlaceholder = "Search...",
  canAddNew = true,
  canExport = false,
}: DataTableToolbarProps<TData>) => {
  console.log("Rendering DataTableToolbar");

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  // Dummy state for filter dropdown - replace with actual logic
  const [showStatusFilter, setShowStatusFilter] = React.useState(true);
  const [showTypeFilter, setShowTypeFilter] = React.useState(false);


  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex flex-1 items-center space-x-2">
        {onSearch && (
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-9 w-full max-w-xs" // Adjusted width
          />
        )}
        {/* Example Filter Dropdown - expand with actual filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 ml-auto">
              <ListFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Replace with actual filterable column names */}
            <DropdownMenuCheckboxItem
              checked={showStatusFilter}
              onCheckedChange={setShowStatusFilter}
            >
              Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showTypeFilter}
              onCheckedChange={setShowTypeFilter}
            >
              Type
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-2">
        {onExport && canExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
        {onAddNew && canAddNew && (
          <Button size="sm" onClick={onAddNew} className="h-9">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataTableToolbar;