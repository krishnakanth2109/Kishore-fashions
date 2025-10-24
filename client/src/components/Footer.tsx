import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-gradient-elegant border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Elegant Stitches" className="h-12 w-12" />
              <span className="text-xl font-serif font-bold text-gradient-gold">
                Elegant Stitches
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
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">info@elegantstitches.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Fashion Street, Design District, NY 10001
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-secondary rounded-full hover-lift transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-3 bg-secondary rounded-full hover-lift transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-3 bg-secondary rounded-full hover-lift transition-all"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-primary" />
              </a>
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
