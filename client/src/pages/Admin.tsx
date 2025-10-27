// src/pages/Admin.tsx

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

// Import types
import { Product, PortfolioImage, PortfolioVideo, ContactInfo, CurrentFormState, FormDataType } from "@/types";

// Import components
import { Sidebar } from "@/components/admin/Sidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { VideosManager } from "@/components/admin/VideosManager";
import { ContactManager } from "@/components/admin/ContactManager";

const API_URL = "http://localhost:5000/api";

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});

  const [currentForm, setCurrentForm] = useState<CurrentFormState>({ type: null, data: {}, isEditing: false });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const fetchData = async () => {
    try {
      const [productsRes, imagesRes, videosRes, contactRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/portfolio/images`),
        fetch(`${API_URL}/portfolio/videos`),
        fetch(`${API_URL}/contact/info`),
      ]);
      setProducts(await productsRes.json());
      setPortfolioImages(await imagesRes.json());
      setVideos(await videosRes.json());
      const contactData = await contactRes.json();
      setContactInfo(contactData || {});
    } catch (error) {
      toast({ title: "Error", description: "Could not load data from the server.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('authToken');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        className: "bg-blue-50 text-blue-800 border-blue-200"
      });
      setTimeout(() => { window.location.href = '/login'; }, 1000);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { type, data, isEditing } = currentForm;
    if (!type) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast({ title: "Authentication Error", description: "You are not logged in.", variant: 'destructive' });
      return;
    }

    const endpoint = isEditing ? `${API_URL}/${type}/${(data as any)._id}` : `${API_URL}/${type}`;
    const method = isEditing ? 'PUT' : 'POST';

    let headers: HeadersInit = { 'Authorization': `Bearer ${token}` };
    let body: BodyInit;

    if (selectedFile) {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== '_id' && key !== '__v' && key !== 'image' && key !== 'src') {
          formData.append(key, (data as any)[key]);
        }
      });
      formData.append('image', selectedFile);
      body = formData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    try {
      const response = await fetch(endpoint, { method, headers, body });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Failed to ${isEditing ? 'update' : 'create'} item.`);
      }
      toast({ title: "Success!", description: `Item has been ${isEditing ? 'updated' : 'created'}.`, className: "bg-green-50 text-green-800 border-green-200" });
      setCurrentForm({ type: null, data: {}, isEditing: false });
      setSelectedFile(null);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast({ title: "Authentication Error", description: "You are not logged in.", variant: 'destructive' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to delete item.");
      toast({ title: "Success!", description: "Item has been deleted.", className: "bg-green-50 text-green-800 border-green-200" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    }
  };

  const openForm = (type: string, data: FormDataType = {}, isEditing = false) => {
    setCurrentForm({ type, data, isEditing });
    setSelectedFile(null);
  };

  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: {}, isEditing: false });
    setSelectedFile(null);
  };

  const renderContent = () => {
    const commonProps = {
      currentForm,
      openForm,
      setCurrentForm,
      handleFileChange,
      handleFormSubmit,
      handleCancelForm,
      handleDelete,
    };

    switch (activeTab) {
      case 'products':
        return <ProductsManager products={products} {...commonProps} />;
      case 'portfolio':
        return <PortfolioManager portfolioImages={portfolioImages} {...commonProps} />;
      case 'videos':
        return <VideosManager videos={videos} {...commonProps} />;
      case 'contact':
        return <ContactManager contactInfo={contactInfo} setContactInfo={setContactInfo} />;
      default:
        return <DashboardOverview products={products} portfolioImages={portfolioImages} videos={videos} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 `}>
        <DashboardHeader
          activeTab={activeTab}
          setIsMobileOpen={setIsMobileOpen}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;