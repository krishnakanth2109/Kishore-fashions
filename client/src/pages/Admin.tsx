import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Trash2, 
  PlusCircle, 
  Package, 
  Image, 
  Video, 
  Contact, 
  Menu, 
  X,
  Home,
  Settings,
  Users,
  BarChart3
} from "lucide-react";
import { Product, PortfolioImage, PortfolioVideo, ContactInfo } from "@/types";

const API_URL = "http://localhost:5000/api";

// Define the shape of our form state and component props
type FormDataType = Product | PortfolioImage | PortfolioVideo | Partial<ContactInfo>;
interface CurrentFormState {
  type: string | null;
  data: FormDataType;
  isEditing: boolean;
}
interface AdminFormProps {
  fields: { name: string; label: string; type?: string; placeholder: string; }[];
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

// Reusable Admin Form Component with proper file handling
const AdminForm = ({ fields, formData, setFormData, onFileChange, onSubmit, onCancel, isEditing }: AdminFormProps) => (
  <form onSubmit={onSubmit} className="space-y-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map(field => (
        <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {field.label}
            <span className="text-red-500 ml-1">*</span>
          </label>
          {field.type === 'textarea' && (
            <Textarea
              name={field.name}
              value={(formData as any)[field.name] || ''}
              onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          )}
          {field.type === 'file' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <Input
                name={field.name}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
                id={`file-${field.name}`}
              />
              <label 
                htmlFor={`file-${field.name}`} 
                className="cursor-pointer block"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Image className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload {field.label.toLowerCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 10MB
                  </span>
                </div>
              </label>
            </div>
          )}
          {(!field.type || ['text', 'number'].includes(field.type)) && (
            <Input
              name={field.name}
              type={field.type || 'text'}
              value={(formData as any)[field.name] || ''}
              onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          )}
        </div>
      ))}
    </div>
    <div className="flex gap-3 pt-4 border-t border-gray-100">
      <Button 
        type="submit" 
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <Save className="w-4 h-4 mr-2" />
        {isEditing ? 'Update Changes' : 'Create Item'}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
      >
        Cancel
      </Button>
    </div>
  </form>
);

// Sidebar Navigation Component
const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'contact', label: 'Contact Info', icon: Contact },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-2">Manage your website content</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-200 font-medium
                    ${activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  
  const [currentForm, setCurrentForm] = useState<CurrentFormState>({ type: null, data: {}, isEditing: false });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { type, data, isEditing } = currentForm;
    if (!type) return;

    const submissionData = new FormData();
    Object.keys(data).forEach(key => {
        if (key !== '_id' && key !== '__v' && key !== 'image' && key !== 'src') {
             submissionData.append(key, (data as any)[key]);
        }
    });
    if (selectedFile) {
        submissionData.append('image', selectedFile);
    }

    const endpoint = isEditing ? `${API_URL}/${type}/${(data as any)._id}` : `${API_URL}/${type}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: submissionData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Failed to ${isEditing ? 'update' : 'create'} item.`);
      }
      
      toast({ 
        title: "Success!", 
        description: `Item has been ${isEditing ? 'updated' : 'created'}.`,
        className: "bg-green-50 text-green-800 border-green-200"
      });
      setCurrentForm({ type: null, data: {}, isEditing: false });
      setSelectedFile(null);
      fetchData();
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
    try {
      const response = await fetch(`${API_URL}/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
      });
      if (!response.ok) throw new Error("Failed to delete item.");
      toast({ 
        title: "Success!", 
        description: "Item has been deleted.",
        className: "bg-green-50 text-green-800 border-green-200"
      });
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    }
  };

  const openForm = (type: string, data: FormDataType = {}, isEditing = false) => {
    setCurrentForm({ type, data, isEditing });
    setSelectedFile(null);
  };
  
  const productFields = [
    { name: 'title', label: 'Product Name', placeholder: 'Enter product name' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description' },
    { name: 'price', label: 'Price', type: 'number', placeholder: '2999' },
    { name: 'image', label: 'Product Image', type: 'file', placeholder: '' },
  ];

  const portfolioImageFields = [
    { name: 'title', label: 'Image Title', placeholder: 'Enter image title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter image description' },
    { name: 'image', label: 'Upload Image', type: 'file', placeholder: '' },
  ];

  const videoFields = [
    { name: 'title', label: 'Video Title', placeholder: 'Enter video title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter video description' },
    { name: 'embedUrl', label: 'YouTube Embed URL', placeholder: 'https://www.youtube.com/embed/...' },
  ];
  
  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: {}, isEditing: false });
    setSelectedFile(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800">Manage Products</CardTitle>
                <Button 
                  onClick={() => openForm('products')}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white mt-4 sm:mt-0"
                >
                  <PlusCircle className="w-4 h-4 mr-2"/>
                  Add New Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {currentForm.type === 'products' && (
                <AdminForm 
                  fields={productFields} 
                  formData={currentForm.data} 
                  setFormData={(d) => setCurrentForm({...currentForm, data: d})} 
                  onFileChange={handleFileChange} 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCancelForm} 
                  isEditing={currentForm.isEditing} 
                />
              )}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Existing Products ({products.length})</h3>
                <div className="grid gap-4">
                  {products.map(product => (
                    <div key={product._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{product.title}</h4>
                          <p className="text-sm text-gray-600">${product.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openForm('products', product, true)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete('products', product._id!)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'portfolio':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800">Portfolio Images</CardTitle>
                <Button 
                  onClick={() => openForm('portfolio/images')}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white mt-4 sm:mt-0"
                >
                  <PlusCircle className="w-4 h-4 mr-2"/>
                  Add New Image
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {currentForm.type === 'portfolio/images' && (
                <AdminForm 
                  fields={portfolioImageFields} 
                  formData={currentForm.data} 
                  setFormData={(d) => setCurrentForm({...currentForm, data: d})} 
                  onFileChange={handleFileChange} 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCancelForm} 
                  isEditing={currentForm.isEditing} 
                />
              )}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Images ({portfolioImages.length})</h3>
                <div className="grid gap-4">
                  {portfolioImages.map(image => (
                    <div key={image._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={image.src} 
                          alt={image.title} 
                          className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{image.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{image.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openForm('portfolio/images', image, true)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete('portfolio/images', image._id!)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'videos':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800">Manage Videos</CardTitle>
                <Button 
                  onClick={() => openForm('portfolio/videos')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mt-4 sm:mt-0"
                >
                  <PlusCircle className="w-4 h-4 mr-2"/>
                  Add New Video
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {currentForm.type === 'portfolio/videos' && (
                <AdminForm 
                  fields={videoFields} 
                  formData={currentForm.data} 
                  setFormData={(d) => setCurrentForm({...currentForm, data: d})} 
                  onFileChange={handleFileChange} 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCancelForm} 
                  isEditing={currentForm.isEditing} 
                />
              )}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Videos ({videos.length})</h3>
                <div className="grid gap-4">
                  {videos.map(video => (
                    <div key={video._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-28 bg-gray-100 rounded-lg flex items-center justify-center border">
                          <Video className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{video.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{video.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openForm('portfolio/videos', video, true)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete('portfolio/videos', video._id!)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'contact':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
              <CardTitle className="text-2xl font-bold text-gray-800">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch(`${API_URL}/contact/info`, { 
                    method: 'PUT', 
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }, 
                    body: JSON.stringify(contactInfo) 
                  });
                  if (!res.ok) throw new Error("Failed to update contact information.");
                  toast({ 
                    title: 'Success', 
                    description: 'Contact information updated successfully.',
                    className: "bg-green-50 text-green-800 border-green-200"
                  });
                } catch (error: any) {
                  toast({ title: 'Error', description: error.message, variant: 'destructive' });
                }
              }} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number 1</label>
                    <Input 
                      value={contactInfo.phone1 || ''} 
                      onChange={e => setContactInfo({...contactInfo, phone1: e.target.value})} 
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number 2</label>
                    <Input 
                      value={contactInfo.phone2 || ''} 
                      onChange={e => setContactInfo({...contactInfo, phone2: e.target.value})} 
                      placeholder="+1 (555) 123-4568"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address 1</label>
                    <Input 
                      value={contactInfo.email1 || ''} 
                      onChange={e => setContactInfo({...contactInfo, email1: e.target.value})} 
                      placeholder="contact@example.com"
                      type="email"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address 2</label>
                    <Input 
                      value={contactInfo.email2 || ''} 
                      onChange={e => setContactInfo({...contactInfo, email2: e.target.value})} 
                      placeholder="support@example.com"
                      type="email"
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <Textarea 
                      value={contactInfo.address || ''} 
                      onChange={e => setContactInfo({...contactInfo, address: e.target.value})} 
                      placeholder="Enter your complete address"
                      rows={3}
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                    <Input 
                      value={contactInfo.whatsappNumber || ''} 
                      onChange={e => setContactInfo({...contactInfo, whatsappNumber: e.target.value})} 
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2"/>
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
              <CardTitle className="text-2xl font-bold text-gray-800">Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Products</p>
                      <p className="text-3xl font-bold mt-2">{products.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Portfolio Images</p>
                      <p className="text-3xl font-bold mt-2">{portfolioImages.length}</p>
                    </div>
                    <Image className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Videos</p>
                      <p className="text-3xl font-bold mt-2">{videos.length}</p>
                    </div>
                    <Video className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setActiveTab('products')}
                    className="flex flex-col items-center justify-center p-4 h-24 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 rounded-xl"
                  >
                    <Package className="w-6 h-6 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Add Product</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('portfolio')}
                    className="flex flex-col items-center justify-center p-4 h-24 border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200 rounded-xl"
                  >
                    <Image className="w-6 h-6 text-green-500 mb-2" />
                    <span className="text-sm font-medium">Add Image</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('videos')}
                    className="flex flex-col items-center justify-center p-4 h-24 border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 rounded-xl"
                  >
                    <Video className="w-6 h-6 text-purple-500 mb-2" />
                    <span className="text-sm font-medium">Add Video</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('contact')}
                    className="flex flex-col items-center justify-center p-4 h-24 border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 rounded-xl"
                  >
                    <Contact className="w-6 h-6 text-orange-500 mb-2" />
                    <span className="text-sm font-medium">Update Contact</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 lg:border-l px-6 py-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h1>
                <p className="text-gray-600 text-sm">Manage your {activeTab} content</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
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