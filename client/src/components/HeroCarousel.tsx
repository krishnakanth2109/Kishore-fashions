import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const slides = [
  {
    image: hero1,
    title: "Master the Art of Tailoring",
    description:
      "Transform your passion into a profession with our expert-led training programs",
  },
  {
    image: hero2,
    title: "Learn from the Best",
    description:
      "Join our community of skilled artisans and create stunning designer pieces",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-elegant">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 z-10" />

          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Text Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl animate-slide-up">
                <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-gradient-gold">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-foreground">
                  {slide.description}
                </p>
                <Button size="lg" className="bg-gradient-gold hover-lift shadow-gold">
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-background/50 hover:bg-background/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
