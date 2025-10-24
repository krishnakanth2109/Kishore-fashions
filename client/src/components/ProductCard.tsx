import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard = ({ image, title, description, price }: ProductCardProps) => {
  const [showContact, setShowContact] = useState(false);
  const phoneNumber = "+1-555-123-4567";
  const whatsappNumber = "15551234567";

  return (
    <Card className="group overflow-hidden border-border hover-lift shadow-soft">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-primary mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gradient-gold">{price}</span>
        </div>
        <Button
          onClick={() => setShowContact(!showContact)}
          className="w-full bg-gradient-gold hover-lift shadow-gold"
        >
          Enquire Now
        </Button>
        
        {showContact && (
          <div className="space-y-2 animate-slide-up p-4 bg-accent rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{phoneNumber}</span>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary rounded-full hover-scale"
              >
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
