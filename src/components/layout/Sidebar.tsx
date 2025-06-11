import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, BarChart2, Users, Settings } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  isOpen?: boolean; // For mobile responsive sidebar
  onLinkClick?: () => void; // To close sidebar on mobile after click
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/products', label: 'Products', icon: ShoppingCart }, // Re-using icon, ideally distinct
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/settings', label: 'Settings', icon: Settings }, // Example additional link
];

const Sidebar: React.FC<SidebarProps> = ({ className, isOpen, onLinkClick }) => {
  console.log("Rendering Sidebar, isOpen:", isOpen);

  const baseClasses = "bg-muted/40 border-r flex-col space-y-2 p-4 transition-all duration-300 ease-in-out";
  // For mobile: fixed, full height, shown/hidden by isOpen
  // For desktop: part of the flex layout
  const responsiveClasses = isOpen !== undefined // if isOpen is passed, it's likely for mobile
    ? `fixed inset-y-0 left-0 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 flex`
    : 'hidden md:flex w-64'; // Default desktop behavior

  return (
    <aside className={cn(baseClasses, responsiveClasses, className)}>
      <nav className="flex-grow">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Optional: Footer section in sidebar */}
      <div className="mt-auto p-2 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Admin
      </div>
    </aside>
  );
};

export default Sidebar;