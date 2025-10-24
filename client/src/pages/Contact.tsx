import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactInfo } from "@/types"; // Import the type

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  // Type the state, allowing it to be null initially
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

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
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl text-center font-serif font-bold text-gradient-gold mb-6">Get In Touch</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-serif font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required/>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required/>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required/>
                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={5} required/>
                <Button type="submit" className="w-full bg-gradient-gold">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Add a loading check before rendering */}
            {contactInfo ? (
              <>
                <Card><CardContent className="p-6 flex items-start space-x-4"><Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" /><p>{contactInfo.phone1}<br/>{contactInfo.phone2}</p></CardContent></Card>
                <Card><CardContent className="p-6 flex items-start space-x-4"><Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" /><p>{contactInfo.email1}<br/>{contactInfo.email2}</p></CardContent></Card>
                <Card><CardContent className="p-6 flex items-start space-x-4"><MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" /><p>{contactInfo.address}</p></CardContent></Card>
              </>
            ) : (
              <p>Loading contact information...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;