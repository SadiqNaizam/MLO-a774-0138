import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, UserCircle, Menu } from 'lucide-react'; // Example icons

interface HeaderProps {
  onToggleSidebar?: () => void; // Optional: for mobile sidebar toggle
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  console.log("Rendering Header");
  return (
    <header className="bg-background border-b sticky top-0 z-30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Mobile Menu Toggle */}
          <div className="flex items-center">
            {onToggleSidebar && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2" // Hide on medium and larger screens
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <Link to="/" className="flex-shrink-0 font-bold text-xl text-primary">
              Admin Panel
            </Link>
          </div>

          {/* Right Side: Actions/User Menu */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="User Account">
              <UserCircle className="h-6 w-6" />
            </Button>
            {/* Placeholder for User Dropdown Menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;