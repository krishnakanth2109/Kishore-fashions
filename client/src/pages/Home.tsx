import { Link } from "react-router-dom";
import { Scissors, Award, Users, Heart } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Scissors,
    title: "Expert Training",
    description: "Learn from experienced professionals with years of boutique design expertise",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Receive recognized certificates upon completion of our comprehensive courses",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a vibrant community of passionate tailoring enthusiasts and professionals",
  },
  {
    icon: Heart,
    title: "Passion-Driven",
    description: "Transform your love for fashion into a rewarding and creative career",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <HeroCarousel />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect blend of tradition and innovation in tailoring education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 hover-lift border-border shadow-soft"
            >
              <CardContent className="pt-6 space-y-4">
                <div className="inline-flex p-4 bg-secondary rounded-full">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-pink py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of women who have transformed their passion into a thriving career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-gold hover-lift shadow-gold">
                View Our Designs
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="hover-lift border-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
