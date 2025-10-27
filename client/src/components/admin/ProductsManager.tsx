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
import { ChangeEvent, FormEvent, useState } from "react";

// Add isLoading to the component's props
interface ProductsManagerProps {
  products: Product[];
  currentForm: CurrentFormState;
  isLoading: boolean;
  openForm: (type: string, data?: FormDataType, isEditing?: boolean) => void;
  setCurrentForm: (form: CurrentFormState) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent) => void;
  handleCancelForm: () => void;
  handleDelete: (type: string, id: string) => void;
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

export const ProductsManager = ({
  products,
  currentForm,
  isLoading,
  openForm,
  setCurrentForm,
  handleFileChange,
  handleFormSubmit,
  handleCancelForm,
  handleDelete
}: ProductsManagerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productFields = [
    { name: 'title', label: 'Product Name', placeholder: 'Enter product name' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description' },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'e.g., 29.99' },
    { name: 'image', label: 'Product Image', type: 'file', placeholder: '' },
  ];

  // Enhanced form submit handler with loading state
  const handleFormSubmitWithLoading = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleFormSubmit(e);
    } finally {
      // The parent component should handle setting isLoading to false when the operation completes
      // This local state will be reset when the form closes or operation completes
    }
  };

  // Enhanced cancel handler to reset loading state
  const handleCancelWithLoading = () => {
    setIsSubmitting(false);
    handleCancelForm();
  };

  const renderProductGrid = () => {
    // Show skeleton loaders on initial fetch
    if (isLoading && products.length === 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      );
    }

    // Show empty state if there are no products
    if (!isLoading && products.length === 0) {
      return (
        <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <PackageX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">No Products Found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
          <Button 
            onClick={() => openForm('products')} 
            className="mt-6"
            disabled={isLoading}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>
      );
    }

    // Display the grid of product cards
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Card key={product._id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-blue-500/50">
            <div className="relative">
              <img src={product.image} alt={product.title} className="h-56 w-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openForm('products', product, true)} 
                  className="text-white bg-black/50 border-white/50 hover:bg-white hover:text-black"
                  disabled={isLoading}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete('products', product._id!)}
                  disabled={isLoading}
                >
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
        <Button 
          onClick={() => openForm('products')} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white mt-4 sm:mt-0 self-start sm:self-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Loading...' : 'Add New Product'}
        </Button>
      </div>

      {/* --- MODAL DIALOG FOR ADD/EDIT FORM --- */}
      <Dialog open={currentForm.type === 'products'} onOpenChange={(isOpen) => !isOpen && handleCancelWithLoading()}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {currentForm.isEditing ? 'Edit Product' : 'Add New Product'}
              {(isLoading || isSubmitting) && (
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              )}
            </DialogTitle>
            <DialogDescription>
              {currentForm.isEditing
                ? "Update the details of your product here. Click save when you're done."
                : "Fill in the details for the new product. Click save to add it to your catalog."
              }
              {(isLoading || isSubmitting) && (
                <span className="block mt-1 text-blue-600 font-medium">
                  {currentForm.isEditing ? 'Updating product...' : 'Creating product...'}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <AdminForm
            fields={productFields}
            formData={currentForm.data}
            setFormData={(d) => setCurrentForm({ ...currentForm, data: d })}
            onFileChange={handleFileChange}
            onSubmit={handleFormSubmitWithLoading}
            onCancel={handleCancelWithLoading}
            isEditing={currentForm.isEditing}
            isLoading={isLoading || isSubmitting}
          />
        </DialogContent>
      </Dialog>
      {/* --- END MODAL DIALOG --- */}

      {renderProductGrid()}
    </div>
  );
};