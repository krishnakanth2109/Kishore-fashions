import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
// import logo from "@/assets/logo.jpg"; // Keeping your original import commented or active as per your project

const Footer = () => {
  return (
    <footer className="bg-gradient-elegant border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-serif font-bold text-gradient-gold">
                Kishor Botique
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering women through the art of tailoring. Learn, create, and excel in boutique design with expert guidance.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">9550458132</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">krstylecorner@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Kphb, Road No. 6, opp. sitara hostel, Dharma Reddy Colony Phase I, Hyderabad, Telangana 500072
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Location Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-primary">Follow Us</h3>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
       
              <a
                href="https://www.instagram.com/kishor_fashions_/"
                className="p-3 bg-secondary rounded-full hover-lift transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://www.youtube.com/@Kishor_fashion_tailoring_class"
                className="p-3 bg-secondary rounded-full hover-lift transition-all"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-primary" />
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-lg overflow-hidden border border-border shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.278452590862!2d78.39385417462931!3d17.494216299719845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91005f467ca7%3A0x8f853db665e184f9!2sKishor%20fashion%20boutique%20training%20center!5e0!3m2!1sen!2sin!4v1766067632405!5m2!1sen!2sin" 
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Kishor Botique Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Elegant Stitches. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;