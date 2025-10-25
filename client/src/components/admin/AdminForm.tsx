// src/components/admin/AdminForm.tsx

import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Image } from "lucide-react";
import { FormDataType } from "@/types";

interface AdminFormProps {
  fields: { name: string; label: string; type?: string; placeholder: string }[];
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const AdminForm = ({ fields, formData, setFormData, onFileChange, onSubmit, onCancel, isEditing }: AdminFormProps) => (
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
              <label htmlFor={`file-${field.name}`} className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Image className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload {field.label.toLowerCase()}</span>
                  <span className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</span>
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
      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
        <Save className="w-4 h-4 mr-2" />
        {isEditing ? 'Update Changes' : 'Create Item'}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel} className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
        Cancel
      </Button>
    </div>
  </form>
);