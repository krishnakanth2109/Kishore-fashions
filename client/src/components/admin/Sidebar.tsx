// src/components/admin/Sidebar.tsx

import { Button } from "@/components/ui/button";
import {
  BarChart3, Package, Image, Video, Contact, LogOut, User, X, ChevronLeft, ChevronRight, FileText
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen, onLogout, isCollapsed, onToggleCollapse }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'contact', label: 'Contact Info', icon: Contact },
    // THE FIX: Changed the ID from 'form' to 'messages' to match Admin.tsx
    { id: 'messages', label: 'Requested form', icon: FileText }, 
  ];

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />}
      <div className={`fixed lg:sticky inset-y-0 left-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-all duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isCollapsed ? 'w-20' : 'w-64'} h-screen top-0`}>
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="flex-shrink-0 p-4 border-b border-gray-700">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              {!isCollapsed && <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">Kishor Botique</h1>}
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                <button onClick={onToggleCollapse} className="hidden lg:flex p-2 hover:bg-gray-700 rounded-lg transition-colors" title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
                  {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {!isCollapsed && <p className="text-gray-400 text-sm mt-2">Manage your website content</p>}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveTab(item.id); setIsMobileOpen(false); }} 
                  className={`w-full flex items-center rounded-xl transition-all duration-200 font-medium ${isCollapsed ? 'justify-center p-3' : 'justify-start space-x-3 px-4 py-3'} ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} 
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Footer Section */}
          <div className="flex-shrink-0 p-4 border-t border-gray-700 mt-auto">
            {!isCollapsed ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Admin User</p>
                    <p className="text-xs text-gray-400 truncate">administrator@example.com</p>
                  </div>
                </div>
                <Button 
                  onClick={onLogout} 
                  variant="outline" 
                  className="w-full justify-start bg-transparent border-gray-600 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <button 
                  onClick={onLogout} 
                  className="w-full flex items-center justify-center p-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200" 
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};