// src/components/admin/PortfolioManager.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusCircle, Trash2, Edit, PackageX, Loader2 } from "lucide-react";
import { AdminForm } from "./AdminForm";
import { PortfolioImage, CurrentFormState, FormDataType } from "@/types";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Define the base URL for your API from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// This component no longer needs props as it is self-contained.
interface PortfolioManagerProps {}

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-xl p-4 space-y-3 animate-pulse">
    <div className="h-40 bg-gray-200 rounded-lg"></div>
    <div className="space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

export const PortfolioManager = (props: PortfolioManagerProps) => {
  // --- STATE MANAGEMENT ---
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [currentForm, setCurrentForm] = useState<CurrentFormState>({ type: null, data: {}, isEditing: false });
  const [isLoading, setIsLoading] = useState(true); // For initial fetch and delete operations
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission (create/update)

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchPortfolioImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/portfolio/images`);
        if (!response.ok) throw new Error("Failed to fetch portfolio images.");
        const data = await response.json();
        setPortfolioImages(data);
      } catch (error) {
        console.error("Error fetching portfolio images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolioImages();
  }, []);

  // --- IMAGE URL HELPER ---
  const getPortfolioImageUrl = (imagePath?: string) => {
    if (!imagePath) return "https://via.placeholder.com/300x200?text=No+Image";
    if (imagePath.startsWith('http')) return imagePath;
    // The property from the database should be 'image', not 'src' to match the form field
    // Assuming the database returns a field named 'image' with the path
    return `${API_BASE_URL}/${imagePath}`;
  };

  // --- HANDLER FUNCTIONS ---
  const openForm = (type: string, data: FormDataType = {}, isEditing = false) => {
    setCurrentForm({ type, data, isEditing });
  };

  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: {}, isEditing: false });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setCurrentForm(prev => ({ ...prev, data: { ...prev.data, image: file } }));
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/portfolio/images/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error("Failed to delete image.");
        setPortfolioImages(portfolioImages.filter(img => img._id !== id));
      } catch (error) {
        console.error("Error deleting image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { data, isEditing } = currentForm;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const url = isEditing
      ? `${API_BASE_URL}/api/portfolio/images/${data._id}`
      : `${API_BASE_URL}/api/portfolio/images`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error("Form submission failed.");
      
      const savedImage = await response.json();
      if (isEditing) {
        setPortfolioImages(portfolioImages.map(img => img._id === savedImage._id ? savedImage : img));
      } else {
        setPortfolioImages([...portfolioImages, savedImage]);
      }
      handleCancelForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // --- FORM FIELDS DEFINITION ---
  const portfolioImageFields = [
    { name: 'title', label: 'Image Title', placeholder: 'Enter image title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter image description' },
    { name: 'image', label: 'Upload Image', type: 'file', placeholder: '' },
  ];

  // --- RENDER LOGIC ---
  const renderPortfolioGrid = () => {
    if (isLoading && portfolioImages.length === 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      );
    }

    if (!isLoading && portfolioImages.length === 0) {
      return (
        <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <PackageX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">No Portfolio Images Found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first portfolio image.</p>
          <Button onClick={() => openForm('portfolio/images')} className="mt-6" disabled={isLoading}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Image
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolioImages.map(image => (
          <Card key={image._id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-purple-500/50">
            <div className="relative">
              {/* Corrected image source using the helper function */}
              <img src={getPortfolioImageUrl(image.src)} alt={image.title} className="h-56 w-full object-cover bg-gray-200" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="outline" size="sm" onClick={() => openForm('portfolio/images', image, true)} className="text-white bg-black/50 border-white/50 hover:bg-white hover:text-black" disabled={isLoading}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete('portfolio/images', image._id!)} disabled={isLoading}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-gray-800 truncate">{image.title}</h3>
              <p className="text-sm text-gray-600 mt-1 h-10 overflow-hidden text-ellipsis">{image.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white border rounded-xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Portfolio</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or delete portfolio images from here.</p>
        </div>
        <Button onClick={() => openForm('portfolio/images')} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white mt-4 sm:mt-0 self-start sm:self-center" disabled={isLoading}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Image
        </Button>
      </div>

      <Dialog open={currentForm.type === 'portfolio/images'} onOpenChange={(isOpen) => !isOpen && handleCancelForm()}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {currentForm.isEditing ? 'Edit Portfolio Image' : 'Add New Portfolio Image'}
              {isSubmitting && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </DialogTitle>
            <DialogDescription>
              {currentForm.isEditing ? "Update the details for this image." : "Fill in the details for the new image."}
              {isSubmitting && <span className="block mt-1 text-purple-600 font-medium">Submitting...</span>}
            </DialogDescription>
          </DialogHeader>
          <AdminForm
            fields={portfolioImageFields}
            formData={currentForm.data}
            setFormData={(d) => setCurrentForm(prev => ({ ...prev, data: d }))}
            onFileChange={handleFileChange}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            isEditing={currentForm.isEditing}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
      
      {renderPortfolioGrid()}
    </div>
  );
};