// src/components/admin/DashboardOverview.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Image, Video, Contact, TrendingUp, Eye } from "lucide-react";
import { Product, PortfolioImage, PortfolioVideo } from "@/types";

interface DashboardOverviewProps {
  products: Product[];
  portfolioImages: PortfolioImage[];
  videos: PortfolioVideo[];
  setActiveTab: (tab: string) => void;
}

export const DashboardOverview = ({ products, portfolioImages, videos, setActiveTab }: DashboardOverviewProps) => (
  <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white/70 backdrop-blur-sm">
    <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold text-white">Dashboard Overview</CardTitle>
        <div className="flex items-center space-x-2 text-white/90">
      
         
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6">
      {/* Stats Grid with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Products</p>
              <p className="text-3xl font-bold text-gray-800">{products.length}</p>
              <div className="flex items-center mt-2 text-green-500 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+12% growth</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Portfolio Images</p>
              <p className="text-3xl font-bold text-gray-800">{portfolioImages.length}</p>
              <div className="flex items-center mt-2 text-green-500 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+8% growth</span>
              </div>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Image className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Videos</p>
              <p className="text-3xl font-bold text-gray-800">{videos.length}</p>
              <div className="flex items-center mt-2 text-purple-500 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+15% growth</span>
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>

      {/* Quick Actions with Enhanced Design */}
      <div className="bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            onClick={() => setActiveTab('products')} 
            className="group relative flex flex-col items-center justify-center p-6 h-28 bg-white/60 border border-gray-200/60 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white transition-all duration-300 rounded-2xl hover:shadow-lg hover:-translate-y-1"
          >
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300 mb-3">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Add Product</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-300"></div>
          </Button>

          <Button 
            onClick={() => setActiveTab('portfolio')} 
            className="group relative flex flex-col items-center justify-center p-6 h-28 bg-white/60 border border-gray-200/60 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-50 hover:to-white transition-all duration-300 rounded-2xl hover:shadow-lg hover:-translate-y-1"
          >
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300 mb-3">
              <Image className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Add Image</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-2xl transition-all duration-300"></div>
          </Button>

          <Button 
            onClick={() => setActiveTab('videos')} 
            className="group relative flex flex-col items-center justify-center p-6 h-28 bg-white/60 border border-gray-200/60 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-white transition-all duration-300 rounded-2xl hover:shadow-lg hover:-translate-y-1"
          >
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300 mb-3">
              <Video className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Add Video</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-2xl transition-all duration-300"></div>
          </Button>

          <Button 
            onClick={() => setActiveTab('contact')} 
            className="group relative flex flex-col items-center justify-center p-6 h-28 bg-white/60 border border-gray-200/60 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-white transition-all duration-300 rounded-2xl hover:shadow-lg hover:-translate-y-1"
          >
            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors duration-300 mb-3">
              <Contact className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Update Contact</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-2xl transition-all duration-300"></div>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);