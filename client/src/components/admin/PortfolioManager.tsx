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
import { ChangeEvent, FormEvent } from "react";

interface PortfolioManagerProps {
  portfolioImages: PortfolioImage[];
  currentForm: CurrentFormState;
  isLoading: boolean;
  openForm: (type: string, data?: FormDataType, isEditing?: boolean) => void;
  setCurrentForm: (form: CurrentFormState) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent) => void;
  handleCancelForm: () => void;
  handleDelete: (type: string, id: string) => void;
}

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

export const PortfolioManager = ({ 
  portfolioImages, 
  currentForm, 
  isLoading,
  openForm, 
  setCurrentForm, 
  handleFileChange, 
  handleFormSubmit, 
  handleCancelForm, 
  handleDelete 
}: PortfolioManagerProps) => {
  const portfolioImageFields = [
    { name: 'title', label: 'Image Title', placeholder: 'Enter image title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter image description' },
    { name: 'image', label: 'Upload Image', type: 'file', placeholder: '' },
  ];

  const renderPortfolioGrid = () => {
    // Show skeleton loaders on initial fetch
    if (isLoading && portfolioImages.length === 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      );
    }

    // Show empty state if there are no portfolio images
    if (!isLoading && portfolioImages.length === 0) {
      return (
        <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <PackageX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">No Portfolio Images Found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first portfolio image.</p>
          <Button 
            onClick={() => openForm('portfolio/images')} 
            className="mt-6"
            disabled={isLoading}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Image
          </Button>
        </div>
      );
    }

    // Display the grid of portfolio image cards
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolioImages.map(image => (
          <Card key={image._id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-purple-500/50">
            <div className="relative">
              <img src={image.src} alt={image.title} className="h-56 w-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openForm('portfolio/images', image, true)} 
                  className="text-white bg-black/50 border-white/50 hover:bg-white hover:text-black"
                  disabled={isLoading}
                >
                  {isLoading && currentForm.isEditing && currentForm.data?._id === image._id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Edit className="w-4 h-4 mr-2" />
                  )}
                  {isLoading && currentForm.isEditing && currentForm.data?._id === image._id ? 'Editing...' : 'Edit'}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete('portfolio/images', image._id!)}
                  disabled={isLoading}
                >
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
        <Button 
          onClick={() => openForm('portfolio/images')} 
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white mt-4 sm:mt-0 self-start sm:self-center"
          disabled={isLoading}
        >
          {isLoading && !currentForm.isEditing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4 mr-2" />
          )}
          {isLoading && !currentForm.isEditing ? 'Creating...' : 'Add New Image'}
        </Button>
      </div>

      {/* --- MODAL DIALOG FOR ADD/EDIT FORM --- */}
      <Dialog open={currentForm.type === 'portfolio/images'} onOpenChange={(isOpen) => !isOpen && handleCancelForm()}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {currentForm.isEditing ? 'Edit Portfolio Image' : 'Add New Portfolio Image'}
              {isLoading && (
                <Loader2 className="w-4 h-4 ml-2 inline animate-spin" />
              )}
            </DialogTitle>
            <DialogDescription>
              {currentForm.isEditing
                ? "Update the details of your portfolio image here. Click save when you're done."
                : "Fill in the details for the new portfolio image. Click save to add it to your portfolio."
              }
              {isLoading && (
                <span className="block mt-1 text-purple-600">
                  {currentForm.isEditing ? 'Updating image...' : 'Creating image...'}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <AdminForm
            fields={portfolioImageFields}
            formData={currentForm.data}
            setFormData={(d) => setCurrentForm({ ...currentForm, data: d })}
            onFileChange={handleFileChange}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            isEditing={currentForm.isEditing}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>
      {/* --- END MODAL DIALOG --- */}

      {renderPortfolioGrid()}
    </div>
  );
};