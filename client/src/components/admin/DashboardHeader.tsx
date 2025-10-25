// --- START OF FILE src/components/admin/DashboardHeader.tsx ---

import { Button } from "@/components/ui/button";
import { Home, LogOut, Menu, User } from "lucide-react";
import { useLocation } from "react-router-dom";

interface DashboardHeaderProps {
  setIsMobileOpen: (open: boolean) => void;
  onLogout: () => void;
}

// Function to generate a user-friendly title from the URL pathname
const getTitleFromPathname = (pathname: string) => {
  const lastSegment = pathname.split('/').pop() || 'overview';
  return lastSegment.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
};

export const DashboardHeader = ({ setIsMobileOpen, onLogout }: DashboardHeaderProps) => {
  const location = useLocation();
  const title = getTitleFromPathname(location.pathname);

  return (
    <header className="bg-white border-b border-gray-200 lg:border-l px-6 py-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{title}</h1>
            <p className="text-gray-600 text-sm">Manage your {title.toLowerCase()} content</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Buttons remain the same */}
        </div>
      </div>
    </header>
  );
};