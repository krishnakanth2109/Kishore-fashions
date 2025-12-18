// src/components/admin/ContactManager.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Phone, Mail, MapPin, MessageCircle, AlertCircle, CheckCircle } from "lucide-react";
import { ContactInfo } from "@/types";
import { FormEvent, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

interface ContactManagerProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
}

export const ContactManager = ({ contactInfo, setContactInfo }: ContactManagerProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<{
    phone1?: string;
    phone2?: string;
    whatsappNumber?: string;
    email1?: string;
    email2?: string;
  }>({});
  const [touched, setTouched] = useState<{
    phone1?: boolean;
    phone2?: boolean;
    whatsappNumber?: boolean;
    email1?: boolean;
    email2?: boolean;
  }>({});

  // Validation functions
  const validatePhone = (phone: string, fieldName: string): string => {
    if (!phone) return ""; // Allow empty for optional fields
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) return "Phone number must be at least 10 digits";
    if (cleanedPhone.length > 15) return "Phone number cannot exceed 15 digits";
    if (!/^[+\d][\d\s\-()]+$/.test(phone)) return "Enter a valid phone number format";
    return "";
  };

  const validateEmail = (email: string, fieldName: string): string => {
    if (!email) return ""; // Allow empty for optional fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (email.length > 100) return "Email cannot exceed 100 characters";
    return "";
  };

  const validateAllFields = (): boolean => {
    const newErrors: typeof errors = {};
    let isValid = true;

    // Validate phone1 (primary phone - required)
    if (!contactInfo.phone1) {
      newErrors.phone1 = "Primary phone number is required";
      isValid = false;
    } else {
      const phone1Error = validatePhone(contactInfo.phone1, 'phone1');
      if (phone1Error) {
        newErrors.phone1 = phone1Error;
        isValid = false;
      }
    }

    // Validate phone2 (optional)
    if (contactInfo.phone2) {
      const phone2Error = validatePhone(contactInfo.phone2, 'phone2');
      if (phone2Error) {
        newErrors.phone2 = phone2Error;
        isValid = false;
      }
    }

    // Validate whatsappNumber (optional)
    if (contactInfo.whatsappNumber) {
      const whatsappError = validatePhone(contactInfo.whatsappNumber, 'whatsappNumber');
      if (whatsappError) {
        newErrors.whatsappNumber = whatsappError;
        isValid = false;
      }
    }

    // Validate email1 (primary email - required)
    if (!contactInfo.email1) {
      newErrors.email1 = "Primary email is required";
      isValid = false;
    } else {
      const email1Error = validateEmail(contactInfo.email1, 'email1');
      if (email1Error) {
        newErrors.email1 = email1Error;
        isValid = false;
      }
    }

    // Validate email2 (optional)
    if (contactInfo.email2) {
      const email2Error = validateEmail(contactInfo.email2, 'email2');
      if (email2Error) {
        newErrors.email2 = email2Error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate on contactInfo change
  useEffect(() => {
    // Only validate fields that have been touched
    const newErrors: typeof errors = {};
    
    if (touched.phone1) {
      if (!contactInfo.phone1) {
        newErrors.phone1 = "Primary phone number is required";
      } else {
        const error = validatePhone(contactInfo.phone1, 'phone1');
        if (error) newErrors.phone1 = error;
      }
    }

    if (touched.phone2 && contactInfo.phone2) {
      const error = validatePhone(contactInfo.phone2, 'phone2');
      if (error) newErrors.phone2 = error;
    }

    if (touched.whatsappNumber && contactInfo.whatsappNumber) {
      const error = validatePhone(contactInfo.whatsappNumber, 'whatsappNumber');
      if (error) newErrors.whatsappNumber = error;
    }

    if (touched.email1) {
      if (!contactInfo.email1) {
        newErrors.email1 = "Primary email is required";
      } else {
        const error = validateEmail(contactInfo.email1, 'email1');
        if (error) newErrors.email1 = error;
      }
    }

    if (touched.email2 && contactInfo.email2) {
      const error = validateEmail(contactInfo.email2, 'email2');
      if (error) newErrors.email2 = error;
    }

    setErrors(newErrors);
  }, [contactInfo, touched]);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      phone1: true,
      phone2: true,
      whatsappNumber: true,
      email1: true,
      email2: true
    });

    // Validate all fields before submission
    if (!validateAllFields()) {
      toast({ 
        title: 'Validation Error', 
        description: 'Please fix the validation errors before saving.',
        variant: 'destructive' 
      });
      return;
    }

    // ✅ FIXED: Check sessionStorage instead of localStorage
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      toast({ title: 'Error', description: 'Authentication required.', variant: 'destructive' });
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/api/contact/info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // ✅ FIXED: Removed Authorization header (no longer needed)
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

  const handleFieldChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  // Helper function to get input className based on validation state
  const getInputClassName = (fieldName: string, hasError?: boolean, isValid?: boolean) => {
    const baseClass = "w-full border-gray-300 focus:ring-blue-500 transition-all duration-200 rounded-xl py-6";
    
    if (touched[fieldName as keyof typeof touched] && hasError) {
      return `${baseClass} border-red-500 focus:border-red-500`;
    } else if (touched[fieldName as keyof typeof touched] && isValid) {
      return `${baseClass} border-green-500 focus:border-green-500`;
    }
    
    return baseClass;
  };

  // Helper function to get email input className
  const getEmailInputClassName = (fieldName: string, hasError?: boolean, isValid?: boolean) => {
    const baseClass = "w-full border-gray-300 focus:ring-green-500 transition-all duration-200 rounded-xl py-6";
    
    if (touched[fieldName as keyof typeof touched] && hasError) {
      return `${baseClass} border-red-500 focus:border-red-500`;
    } else if (touched[fieldName as keyof typeof touched] && isValid) {
      return `${baseClass} border-green-500 focus:border-green-500`;
    }
    
    return baseClass;
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
              {/* Primary Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Primary Phone *
                </label>
                <div className="relative">
                  <Input 
                    value={contactInfo.phone1 || ''} 
                    onChange={e => handleFieldChange('phone1', e.target.value)}
                    onBlur={() => handleBlur('phone1')}
                    placeholder="+1 (555) 123-4567" 
                    className={getInputClassName('phone1', !!errors.phone1, !errors.phone1 && touched.phone1)}
                  />
                  {/* Validation indicators */}
                  {touched.phone1 && errors.phone1 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {touched.phone1 && !errors.phone1 && contactInfo.phone1 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {/* Error message and help text */}
                {touched.phone1 && errors.phone1 ? (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.phone1}</span>
                  </div>
                ) : touched.phone1 && !errors.phone1 && contactInfo.phone1 ? (
                  <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Valid phone number</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Required. Format: +1 (555) 123-4567 (10-15 digits)
                  </p>
                )}
              </div>

              {/* Secondary Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Secondary Phone
                </label>
                <div className="relative">
                  <Input 
                    value={contactInfo.phone2 || ''} 
                    onChange={e => handleFieldChange('phone2', e.target.value)}
                    onBlur={() => handleBlur('phone2')}
                    placeholder="+1 (555) 123-4568" 
                    className={getInputClassName('phone2', !!errors.phone2, !errors.phone2 && touched.phone2 && contactInfo.phone2)}
                  />
                  {/* Validation indicators */}
                  {touched.phone2 && errors.phone2 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {touched.phone2 && !errors.phone2 && contactInfo.phone2 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {/* Error message and help text */}
                {touched.phone2 && errors.phone2 && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.phone2}</span>
                  </div>
                )}
                {touched.phone2 && !errors.phone2 && contactInfo.phone2 && (
                  <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Valid phone number</span>
                  </div>
                )}
                {!touched.phone2 && !contactInfo.phone2 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Optional. Format: +1 (555) 123-4568
                  </p>
                )}
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
              {/* Primary Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Primary Email *
                </label>
                <div className="relative">
                  <Input 
                    value={contactInfo.email1 || ''} 
                    onChange={e => handleFieldChange('email1', e.target.value)}
                    onBlur={() => handleBlur('email1')}
                    placeholder="contact@example.com" 
                    type="email" 
                    className={getEmailInputClassName('email1', !!errors.email1, !errors.email1 && touched.email1)}
                  />
                  {/* Validation indicators */}
                  {touched.email1 && errors.email1 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {touched.email1 && !errors.email1 && contactInfo.email1 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {/* Error message and help text */}
                {touched.email1 && errors.email1 ? (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.email1}</span>
                  </div>
                ) : touched.email1 && !errors.email1 && contactInfo.email1 ? (
                  <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Valid email address</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Required. Format: name@example.com
                  </p>
                )}
              </div>

              {/* Secondary Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Secondary Email
                </label>
                <div className="relative">
                  <Input 
                    value={contactInfo.email2 || ''} 
                    onChange={e => handleFieldChange('email2', e.target.value)}
                    onBlur={() => handleBlur('email2')}
                    placeholder="support@example.com" 
                    type="email" 
                    className={getEmailInputClassName('email2', !!errors.email2, !errors.email2 && touched.email2 && contactInfo.email2)}
                  />
                  {/* Validation indicators */}
                  {touched.email2 && errors.email2 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {touched.email2 && !errors.email2 && contactInfo.email2 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {/* Error message and help text */}
                {touched.email2 && errors.email2 && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.email2}</span>
                  </div>
                )}
                {touched.email2 && !errors.email2 && contactInfo.email2 && (
                  <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Valid email address</span>
                  </div>
                )}
                {!touched.email2 && !contactInfo.email2 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Optional. Format: name@example.com
                  </p>
                )}
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
                onChange={e => handleFieldChange('address', e.target.value)} 
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
              <div className="relative">
                <Input 
                  value={contactInfo.whatsappNumber || ''} 
                  onChange={e => handleFieldChange('whatsappNumber', e.target.value)}
                  onBlur={() => handleBlur('whatsappNumber')}
                  placeholder="+1 (555) 123-4567" 
                  className={getInputClassName('whatsappNumber', !!errors.whatsappNumber, !errors.whatsappNumber && touched.whatsappNumber && contactInfo.whatsappNumber)}
                />
                {/* Validation indicators */}
                {touched.whatsappNumber && errors.whatsappNumber && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
                {touched.whatsappNumber && !errors.whatsappNumber && contactInfo.whatsappNumber && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              {/* Error message and help text */}
              {touched.whatsappNumber && errors.whatsappNumber ? (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.whatsappNumber}</span>
                </div>
              ) : touched.whatsappNumber && !errors.whatsappNumber && contactInfo.whatsappNumber ? (
                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Valid WhatsApp number</span>
                </div>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  Optional. Format: +1 (555) 123-4567 (10-15 digits)
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">Customers can click to message you directly on WhatsApp</p>
            </div>
          </div>

          {/* Validation summary */}
          {Object.keys(errors).filter(key => errors[key as keyof typeof errors]).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
                <AlertCircle className="w-5 h-5" />
                <span>Please fix the following validation errors:</span>
              </div>
              <ul className="text-sm text-red-500 ml-6 list-disc">
                {errors.phone1 && <li>Primary Phone: {errors.phone1}</li>}
                {errors.phone2 && <li>Secondary Phone: {errors.phone2}</li>}
                {errors.whatsappNumber && <li>WhatsApp Number: {errors.whatsappNumber}</li>}
                {errors.email1 && <li>Primary Email: {errors.email1}</li>}
                {errors.email2 && <li>Secondary Email: {errors.email2}</li>}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={Object.keys(errors).some(key => errors[key as keyof typeof errors])}
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
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