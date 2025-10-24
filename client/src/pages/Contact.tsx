import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactInfo } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredField, setHoveredField] = useState("");

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact/info");
        const data: ContactInfo = await res.json();
        setContactInfo(data);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/contact/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Message failed to send.");

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = contactInfo?.phone1 || "919876543210";
    const message = "Hello! I'm interested in your tailoring and stitching services. Could you please provide more information?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Navbar />
<br />
      <br />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-100 to-rose-100 py-20"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-6"
          >
            Let's Create Magic Together
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-xl text-rose-700 max-w-2xl mx-auto leading-relaxed"
          >
            Get in touch with our master tailors and let's bring your fashion dreams to life with perfect stitching and design.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-6 rounded-full"
          />
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-pink-900">Send Us a Message</h2>
                    <p className="text-pink-600">We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', placeholder: 'Your Beautiful Name', type: 'text' },
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Input
                        name={field.name}
                        type={field.type as any}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg"
                        onMouseEnter={() => setHoveredField(field.name)}
                        onMouseLeave={() => setHoveredField("")}
                      />
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your design ideas, measurements, or any special requirements..."
                      rows={6}
                      required
                      className="w-full px-4 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg resize-none"
                      onMouseEnter={() => setHoveredField("message")}
                      onMouseLeave={() => setHoveredField("")}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-0"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            {/* WhatsApp Quick Action */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-2xl cursor-pointer"
              onClick={handleWhatsAppClick}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Quick Chat on WhatsApp</h3>
                  <p className="text-green-100 opacity-90">Get instant responses for your queries</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <AnimatePresence>
              {contactInfo ? (
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Call Us", content: `${contactInfo.phone1}\n${contactInfo.phone2}`, color: "from-blue-500 to-blue-600" },
                    { icon: Mail, title: "Email Us", content: `${contactInfo.email1}\n${contactInfo.email2}`, color: "from-purple-500 to-purple-600" },
                    { icon: MapPin, title: "Visit Us", content: contactInfo.address, color: "from-rose-500 to-rose-600" },

                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <Card className="border-0 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-serif text-lg font-semibold text-pink-900 mb-2">
                                {item.title}
                              </h3>
                              <p className="text-pink-700 whitespace-pre-line leading-relaxed">
                                {item.content}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                  <p className="text-pink-600">Loading contact information...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Info */}
      
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;