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
import { PlusCircle, Trash2, Edit, PackageX, Loader2, CheckCircle, Upload, Image as ImageIcon, AlertCircle, X } from "lucide-react";
import { AdminForm } from "./AdminForm";
import { PortfolioImage, CurrentFormState, FormDataType } from "@/types";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";

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
  const [hasImageAttached, setHasImageAttached] = useState(false); // Track if image is attached
  const [selectedFileName, setSelectedFileName] = useState<string>(""); // Track selected file name
  const [imageError, setImageError] = useState<string>(""); // Validation error for image
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

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
    // Check if we're editing and the portfolio image has an existing image
    const hasExistingImage = isEditing && data.src;
    setHasImageAttached(!!hasExistingImage);
    setImageError(""); // Clear any previous errors
    setImagePreview(null); // Clear preview
    
    if (hasExistingImage && typeof data.src === 'string') {
      setSelectedFileName(data.src.split('/').pop() || "Existing image");
      setImagePreview(getPortfolioImageUrl(data.src)); // Set preview for existing image
    } else {
      setSelectedFileName("");
    }
    setCurrentForm({ type, data, isEditing });
  };

  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: {}, isEditing: false });
    setHasImageAttached(false);
    setSelectedFileName("");
    setImageError("");
    setImagePreview(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setCurrentForm(prev => ({ ...prev, data: { ...prev.data, image: file } }));
      setHasImageAttached(true);
      setSelectedFileName(file.name);
      setImageError(""); // Clear error when file is selected
      
      // Create preview URL for the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setHasImageAttached(false);
      setSelectedFileName("");
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setHasImageAttached(false);
    setSelectedFileName("");
    setImagePreview(null);
    setCurrentForm(prev => ({ ...prev, data: { ...prev.data, image: undefined } }));
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
    
    // Validate image field
    if (!currentForm.isEditing && !hasImageAttached) {
      setImageError("Portfolio image is required");
      return;
    }
    
    setIsSubmitting(true);
    setImageError(""); // Clear any previous errors

    const { data, isEditing } = currentForm;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
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
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
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
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Title</label>
              <input
                type="text"
                value={currentForm.data.title || ""}
                onChange={(e) => setCurrentForm(prev => ({ 
                  ...prev, 
                  data: { ...prev.data, title: e.target.value } 
                }))}
                placeholder="Enter image title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={currentForm.data.description || ""}
                onChange={(e) => setCurrentForm(prev => ({ 
                  ...prev, 
                  data: { ...prev.data, description: e.target.value } 
                }))}
                placeholder="Enter image description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Image Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Upload Image *</label>
                {hasImageAttached && (
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Image attached</span>
                  </div>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="portfolio-image-upload"
                  ref={fileInputRef}
                />
                <label
                  htmlFor="portfolio-image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  {hasImageAttached ? (
                    <>
                      <ImageIcon className="w-8 h-8 text-green-500" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          ✓ {selectedFileName}
                        </p>
                        <p className="text-xs text-gray-500">Click to change image</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload portfolio image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Show image preview at bottom */}
              {imagePreview && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-32 max-w-full rounded-md object-contain border border-gray-300"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center truncate">
                    {selectedFileName}
                  </p>
                </div>
              )}

              {/* Show existing image URL when editing */}
              {currentForm.isEditing && currentForm.data.src && typeof currentForm.data.src === 'string' && !hasImageAttached && !imagePreview && (
                <div className="mt-2 p-3 bg-purple-50 rounded border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    <p className="text-sm font-medium text-purple-800">Current image:</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img 
                      src={getPortfolioImageUrl(currentForm.data.src)} 
                      alt="Current portfolio" 
                      className="w-10 h-10 object-cover rounded border"
                    />
                    <p className="text-xs text-gray-600 truncate">{currentForm.data.src}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the current one</p>
                </div>
              )}

              {/* Image validation error */}
              {imageError && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{imageError}</span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelForm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {currentForm.isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {currentForm.isEditing ? 'Update Image' : 'Add Image'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {renderPortfolioGrid()}
    </div>
  );
};