// src/components/admin/ProductsManager.tsx

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
import { Product, CurrentFormState, FormDataType } from "@/types";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";

// Define the base URL for your API, loaded from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// This component no longer needs props as it manages its own data and state.
interface ProductsManagerProps {
   _id?: string;
  title: string;
  description: string;
  price: number;
  mainImage: string;
  additionalImages: string[];
 }

// A simple skeleton card for loading feedback
const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-xl p-4 space-y-3 animate-pulse">
    <div className="h-40 bg-gray-200 rounded-lg"></div>
    <div className="space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-1/4 pt-4"></div>
  </div>
);

export const ProductsManager = (props: Product[]) => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>([]);
  const [currentForm, setCurrentForm] = useState<CurrentFormState>({ type: null, data: {}, isEditing: false });
  const [isLoading, setIsLoading] = useState(true); // Manages loading for fetch/delete
  const [isSubmitting, setIsSubmitting] = useState(false); // Manages loading for form submission
  
  // State for multiple images
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState<string[]>([]);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState<string[]>([]);
  
  const [imageError, setImageError] = useState<string>(""); // Validation error for image
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- HANDLER FUNCTIONS ---
  const openForm = (type: string, data: FormDataType = {}, isEditing = false) => {
    // Reset all image states
    setMainImage(null);
    setMainImagePreview(null);
    setAdditionalImages([]);
    setAdditionalImagesPreviews([]);
    setExistingAdditionalImages([]);
    setImageError("");
    
    if (isEditing && data) {
      // Set main image preview if exists
      if (data.mainImage) {
        setMainImagePreview(data.mainImage);
      }
      
      // Set existing additional images
      if (data.additionalImages && Array.isArray(data.additionalImages)) {
        setExistingAdditionalImages(data.additionalImages);
      }
    }
    
    setCurrentForm({ type, data, isEditing });
  };

  const handleCancelForm = () => {
    setCurrentForm({ type: null, data: {}, isEditing: false });
    setMainImage(null);
    setMainImagePreview(null);
    setAdditionalImages([]);
    setAdditionalImagesPreviews([]);
    setExistingAdditionalImages([]);
    setImageError("");
    
    // Reset file inputs
    if (mainFileInputRef.current) mainFileInputRef.current.value = "";
    if (additionalFileInputRef.current) additionalFileInputRef.current.value = "";
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setMainImage(file);
      setImageError("");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalImages = additionalImages.length + newFiles.length + existingAdditionalImages.length;
      
      if (totalImages > 6) {
        setImageError("Maximum 6 additional images allowed");
        return;
      }
      
      setAdditionalImages(prev => [...prev, ...newFiles]);
      setImageError("");
      
      // Create previews for new files
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalImagesPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
    if (mainFileInputRef.current) mainFileInputRef.current.value = "";
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagesPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingAdditionalImage = (index: number) => {
    setExistingAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDelete = async (type: string, id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsLoading(true); // Show loading feedback
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error("Failed to delete product.");
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate main image
    if (!currentForm.isEditing && !mainImage) {
      setImageError("Main product image is required");
      return;
    }
    
    setIsSubmitting(true);
    setImageError("");

    const { data, isEditing } = currentForm;
    const formData = new FormData();
    
    // Append text fields
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && key !== 'mainImage' && key !== 'additionalImages') {
        formData.append(key, data[key]);
      }
    });
    
    // Append images
    if (mainImage) {
      formData.append('images', mainImage);
    }
    
    // Append additional images
    additionalImages.forEach(image => {
      formData.append('images', image);
    });
    
    // If editing and no new main image but we have existing additional images,
    // we need to handle this differently on the backend
    if (isEditing && !mainImage && mainImagePreview) {
      formData.append('existingMainImage', mainImagePreview);
    }

    const url = isEditing
      ? `${API_BASE_URL}/api/products/${data._id}`
      : `${API_BASE_URL}/api/products`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error("Form submission failed.");

      const savedProduct = await response.json();
      if (isEditing) {
        setProducts(products.map(p => p._id === savedProduct._id ? savedProduct : p));
      } else {
        setProducts([...products, savedProduct]);
      }
      handleCancelForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FORM FIELDS DEFINITION ---
  const productFields = [
    { name: 'title', label: 'Product Name', placeholder: 'Enter product name' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description' },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'e.g., 29.99' },
  ];

  // --- RENDER LOGIC ---
  const renderProductGrid = () => {
    if (isLoading && products.length === 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      );
    }

    if (!isLoading && products.length === 0) {
      return (
        <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <PackageX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">No Products Found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
          <Button onClick={() => openForm('products')} className="mt-6" disabled={isLoading}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Card key={product._id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-blue-500/50">
            <div className="relative bg-gray-100">
              {/* Changed from object-cover to object-contain to show full image */}
              <img 
                src={product.mainImage} 
                alt={product.title} 
                className="h-56 w-full object-contain bg-white"
              />
              {/* Show image count badge */}
              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  +{product.additionalImages.length} more
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="outline" size="sm" onClick={() => openForm('products', product, true)} className="text-white bg-black/50 border-white/50 hover:bg-white hover:text-black" disabled={isLoading}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete('products', product._id!)} disabled={isLoading}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-1 h-10 overflow-hidden text-ellipsis">{product.description}</p>
              <p className="text-xl font-semibold text-blue-600">₹ {product.price}/-</p>
              <div className="mt-2 text-xs text-gray-500">
                {product.additionalImages?.length || 0} additional images
              </div>
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
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or delete product listings from here.</p>
        </div>
        <Button onClick={() => openForm('products')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white mt-4 sm:mt-0 self-start sm:self-center" disabled={isLoading}>
          {isLoading ? (<Loader2 className="w-4 h-4 mr-2 animate-spin" />) : (<PlusCircle className="w-4 h-4 mr-2" />)}
          {isLoading ? 'Loading...' : 'Add New Product'}
        </Button>
      </div>

      <Dialog open={currentForm.type === 'products'} onOpenChange={(isOpen) => !isOpen && handleCancelForm()}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {currentForm.isEditing ? 'Edit Product' : 'Add New Product'}
              {isSubmitting && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </DialogTitle>
            <DialogDescription>
              {currentForm.isEditing ? "Update the details for this product." : "Fill in the details for the new product."}
              {isSubmitting && <span className="block mt-1 text-blue-600 font-medium">Submitting...</span>}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name *</label>
              <input
                type="text"
                value={currentForm.data.title || ""}
                onChange={(e) => setCurrentForm(prev => ({ 
                  ...prev, 
                  data: { ...prev.data, title: e.target.value } 
                }))}
                placeholder="Enter product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <textarea
                value={currentForm.data.description || ""}
                onChange={(e) => setCurrentForm(prev => ({ 
                  ...prev, 
                  data: { ...prev.data, description: e.target.value } 
                }))}
                placeholder="Enter product description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={currentForm.data.price || ""}
                onChange={(e) => setCurrentForm(prev => ({ 
                  ...prev, 
                  data: { ...prev.data, price: parseFloat(e.target.value) || 0 } 
                }))}
                placeholder="e.g., 29.99"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Main Image Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Main Product Image *</label>
                {mainImagePreview && (
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Main image selected</span>
                  </div>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                  ref={mainFileInputRef}
                />
                <label
                  htmlFor="main-image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  {mainImagePreview ? (
                    <>
                      <ImageIcon className="w-8 h-8 text-green-500" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          ✓ Main image selected
                        </p>
                        <p className="text-xs text-gray-500">Click to change main image</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload main product image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Show main image preview */}
              {mainImagePreview && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Main Image Preview:</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveMainImage}
                      className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center bg-white p-2 rounded border border-gray-200">
                    <img
                      src={mainImagePreview}
                      alt="Main preview"
                      className="max-h-48 max-w-full rounded-md object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Show existing main image when editing */}
              {currentForm.isEditing && !mainImagePreview && currentForm.data.mainImage && (
                <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-800">Current main image:</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded border">
                      <img 
                        src={currentForm.data.mainImage} 
                        alt="Current product" 
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Upload a new image to replace</p>
                      <p className="text-xs text-gray-500 mt-1">Main image is required</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Images Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Additional Images (Optional)</label>
                <span className="text-xs text-gray-500">
                  {existingAdditionalImages.length + additionalImagesPreviews.length}/6
                </span>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                  id="additional-images-upload"
                  ref={additionalFileInputRef}
                  multiple
                />
                <label
                  htmlFor="additional-images-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload additional product images
                    </p>
                    <p className="text-xs text-gray-500">Max 6 images total. PNG, JPG, JPEG up to 10MB each</p>
                  </div>
                </label>
              </div>

              {/* Show existing additional images when editing */}
              {existingAdditionalImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Existing Additional Images:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {existingAdditionalImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-24 object-cover rounded border border-gray-200"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExistingAdditionalImage(index)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    These images will be removed. Upload new ones to replace.
                  </p>
                </div>
              )}

              {/* Show new additional images previews */}
              {additionalImagesPreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">New Additional Images:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {additionalImagesPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`New ${index + 1}`}
                          className="w-full h-24 object-cover rounded border border-gray-200"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAdditionalImage(index)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {currentForm.isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {currentForm.isEditing ? 'Update Product' : 'Create Product'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {renderProductGrid()}
    </div>
  );
};