// src/components/admin/ContactManager.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactInfo } from "@/types";
import { FormEvent } from "react";

const API_URL = "http://localhost:5000/api";

interface ContactManagerProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
}

export const ContactManager = ({ contactInfo, setContactInfo }: ContactManagerProps) => {
  const { toast } = useToast();

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast({ title: 'Error', description: 'Authentication required.', variant: 'destructive' });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/contact/info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Contact Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleContactSubmit} className="space-y-8 max-w-4xl">
          {/* Phone Numbers Section */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <Phone className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Phone Numbers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Primary Phone
                </label>
                <Input 
                  value={contactInfo.phone1 || ''} 
                  onChange={e => setContactInfo({ ...contactInfo, phone1: e.target.value })} 
                  placeholder="+1 (555) 123-4567" 
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 rounded-xl py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Secondary Phone
                </label>
                <Input 
                  value={contactInfo.phone2 || ''} 
                  onChange={e => setContactInfo({ ...contactInfo, phone2: e.target.value })} 
                  placeholder="+1 (555) 123-4568" 
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 rounded-xl py-6"
                />
              </div>
            </div>
          </div>

          {/* Email Addresses Section */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <Mail className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Email Addresses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Primary Email
                </label>
                <Input 
                  value={contactInfo.email1 || ''} 
                  onChange={e => setContactInfo({ ...contactInfo, email1: e.target.value })} 
                  placeholder="contact@example.com" 
                  type="email" 
                  className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 rounded-xl py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Secondary Email
                </label>
                <Input 
                  value={contactInfo.email2 || ''} 
                  onChange={e => setContactInfo({ ...contactInfo, email2: e.target.value })} 
                  placeholder="support@example.com" 
                  type="email" 
                  className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 rounded-xl py-6"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Store Address</h3>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Complete Address
              </label>
              <Textarea 
                value={contactInfo.address || ''} 
                onChange={e => setContactInfo({ ...contactInfo, address: e.target.value })} 
                placeholder="Enter your complete address including street, city, state, and zip code" 
                rows={4} 
                className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200 rounded-xl resize-none py-4"
              />
            </div>
          </div>

          {/* WhatsApp Section */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">WhatsApp Business</h3>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                WhatsApp Number
              </label>
              <Input 
                value={contactInfo.whatsappNumber || ''} 
                onChange={e => setContactInfo({ ...contactInfo, whatsappNumber: e.target.value })} 
                placeholder="+1 (555) 123-4567" 
                className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 rounded-xl py-6"
              />
              <p className="text-xs text-gray-500 mt-2">Customers can click to message you directly on WhatsApp</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex items-center space-x-2">
                <Save className="w-5 h-5" />
                <span>Save Contact Information</span>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl group-hover:border-white/30 transition-all duration-300"></div>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
};