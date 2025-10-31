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
import { PlusCircle, Trash2, Edit, PackageX, Loader2 } from "lucide-react";
import { AdminForm } from "./AdminForm";
import { Product, CurrentFormState, FormDataType } from "@/types";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Define the base URL for your API, loaded from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// This component no longer needs props as it manages its own data and state.
interface ProductsManagerProps {
   _id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
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
    setIsSubmitting(true);

    const { data, isEditing } = currentForm;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

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
    { name: 'image', label: 'Product Image', type: 'file', placeholder: '' },
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
            <div className="relative">
              <img src={product.image} alt={product.title} className="h-56 w-full object-cover" />
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
        <DialogContent className="sm:max-w-[650px]">
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
          <AdminForm
            fields={productFields}
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

      {renderProductGrid()}
    </div>
  );
};