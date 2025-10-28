import { Link } from "react-router-dom";
import { Scissors, Award, Users, Heart, Sparkles, Star, ArrowRight, Play, Instagram, Facebook, Twitter, Zap, Clock, Shield, Phone, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
// import Navbar from './Navbar'; // Import the Navbar component

// Dynamic image imports (replace with your actual images)
const boutiqueImages = {
  hero1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
  hero2: "https://image2url.com/images/1761283351120-d7c6b7a3-63bc-4be8-bdce-5f739d723a0c.png",
  hero3: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop",
  collection1: "https://img1.wsimg.com/isteam/stock/498/:/cr=t:0%25,l:5.63%25,w:88.75%25,h:100%25/rs=w:1240,h:932.3308270676691,cg:true",
  collection2: "https://needlesnthimbles.com/wp-content/uploads/2024/03/15837.jpg",
  collection3: "https://www.aprilblooms.com/cdn/shop/articles/Boutique_Dresses_for_Women.jpg?v=1698055404",
  collection4: "https://www.weddingplz.com/images/portfolio/main/5/18800/Krushita-Tailoring-Shop-8453-1-weddingplz.jpg",
  about: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&h=700&fit=crop",
  workshop: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=1000&h=700&fit=crop",
  fabric: "https://img.freepik.com/premium-photo/tailor-stitching-making-clothes-with-sewing-machine-fashion-design-creative-workshop-serious-man-working-handmade-trendy-stylish-clothing-fashionable-boutique-store_590464-67850.jpg",
  // team1: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  // team2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4b?w=400&h=400&fit=crop&crop=face",
  // team3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  // team4: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face"
};

const features = [
  {
    icon: Scissors,
    title: "Bespoke Tailoring",
    description: "Custom-made garments crafted to perfection with precision measurements and personal styling consultations",
    gradient: "from-amber-500 to-orange-500",
    stats: "200+ Techniques",
    image: boutiqueImages.fabric
  },
  {
    icon: Award,
    title: "Luxury Certification",
    description: "Internationally recognized certifications in haute couture and luxury fashion design",
    gradient: "from-purple-500 to-pink-500",
    stats: "98% Success Rate",
    image: boutiqueImages.workshop
  },
  {
    icon: Users,
    title: "Elite Clientelle",
    description: "Join our exclusive network of fashion connoisseurs, celebrities, and style influencers",
    gradient: "from-blue-500 to-cyan-500",
    stats: "5K+ VIP Clients",
    image: boutiqueImages.hero2
  },
  {
    icon: Heart,
    title: "Artisan Craftsmanship",
    description: "Each piece tells a story of traditional craftsmanship blended with contemporary design philosophy",
    gradient: "from-rose-500 to-red-500",
    stats: "1000+ Masterpieces",
    image: boutiqueImages.about
  },
];

const collections = [
  {
    name: "Our Stitching Services",
    description: "Custom-made outfits designed with precision, style, and perfect fitting.",
  
    image: boutiqueImages.collection1,
    gradient: "from-purple-600 to-pink-600",
    items: "45+ Designs"
  },
  {
    name: "Designer Stitching Training",
    description: "Learn professional stitching and design skills from expert tailors.",
  
    image: boutiqueImages.collection2,
    gradient: "from-gray-700 to-gray-900",
    items: "32+ Students"
  },
  {
    name: "Luxury Couture & Products",
    description: "Explore elegant designs that blend modern trends with timeless fashion",
  
    image: boutiqueImages.collection3,
    gradient: "from-rose-600 to-orange-600",
    items: "67+ Designs"
  },
  {
    name: "Our Signature Collections",
    description: "Experience premium craftsmanship and high-end fashion for every occasion",

    image: boutiqueImages.collection4,
    gradient: "from-white to-rose-100",
    items: "28+ Designs"
  }
];

const testimonials = [
  {
    name: "M.Venu Prasad",
    role: "Fashion Director, Vogue",
    content: "The attention to detail and quality of craftsmanship is unparalleled. Each piece feels like wearable art.",

    image: "https://img.freepik.com/premium-photo/face-young-handsome-indian-man_251136-20685.jpg",
    beforeAfter: "Client for 5+ years"
  },
  {
    name: "P.Vanket Ramana Reddy",
    role: "Celebrity Stylist",
    content: "Working with this boutique transformed how I approach red carpet styling. The quality is exceptional.",
    rating: 5,
    image: "https://st.depositphotos.com/1011643/4430/i/950/depositphotos_44309759-stock-photo-young-indian-man-outdoors.jpg",
    beforeAfter: "30+ celebrity clients dressed"
  },
  {
    name: "Bhavana Sharma",
    role: "Luxury Fashion Influencer",
    content: "From custom fittings to final delivery, the experience is nothing short of extraordinary. True luxury.",
    rating: 5,
    image: "https://live.staticflickr.com/3741/8875025219_fa4ab2ceb4_z.jpg",
    beforeAfter: "1M+ followers in fashion"
  }
];

const stats = [
  { number: "2,500+", label: "Bespoke Designs", icon: Sparkles, suffix: "Created" },
  { number: "15", label: "Years of Excellence", icon: Award, suffix: "Experience" },
  { number: "50+", label: "Master Artisans", icon: Users, suffix: "Team" },
  { number: "24/7", label: "Concierge Service", icon: Clock, suffix: "Support" }
];



const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: boutiqueImages.hero1,
      title: "Haute Couture",
      subtitle: "Where Art Meets Fashion",
      description: "Experience bespoke tailoring that celebrates your unique elegance"
    },
    {
      image: boutiqueImages.hero2,
      title: "Luxury Redefined",
      subtitle: "Timeless Elegance",
      description: "Discover collections crafted with passion and precision"
    },
    {
      image: boutiqueImages.hero3,
      title: "Artisan Craft",
      subtitle: "Masterful Creations",
      description: "Each piece tells a story of exceptional craftsmanship"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden rounded-3xl shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform transition-transform duration-10000 ease-linear hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-8">
              <div className={`max-w-2xl space-y-6 transition-all duration-1000 delay-300 ${
                index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 transform hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span className="text-white/90 text-sm font-semibold">New Collection</span>
                </div>
                <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white leading-tight transform hover:scale-105 transition-transform duration-500">
                  {slide.title}
                </h1>
                <p className="text-2xl lg:text-3xl text-amber-200 font-light mb-4 transform hover:translate-x-2 transition-transform duration-300">
                  {slide.subtitle}
                </p>
                <p className="text-xl text-white/80 max-w-lg leading-relaxed transform hover:translate-x-1 transition-transform duration-300">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
<Link to="/products">
  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:rotate-1">
    Explore Collection
    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
  </Button>
</Link>
      
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-150 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="flex flex-col items-center text-white transform hover:scale-110 transition-transform duration-300">
          <span className="text-sm mb-2 font-semibold">Scroll</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (totalScroll / windowHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.classList.add('animate-out');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-amber-50/30 overflow-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 z-50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 transition-all duration-300 shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <Navbar/>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="w-full">
          <HeroCarousel />
        </div>
      </section>

      {/* Animated Stats Section */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="relative py-20 bg-white/40 backdrop-blur-sm border-y border-white/20 transform transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-soft hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:scale-105 hover:rotate-1"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex p-4 bg-gradient-to-r from-amber-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gradient-gold bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent mb-2 transform group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-1 group-hover:text-gray-900 transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">
                  {stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Collections */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="relative py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 transform transition-all duration-1000">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-white/20 shadow-soft transform hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              <span className="text-lg font-bold text-purple-700">Signature Collections</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-gradient-gold mb-6 leading-tight transform hover:scale-105 transition-transform duration-500">
              Curated <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Elegance</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:translate-y-1 transition-transform duration-300">
              Discover our exclusive collections where every piece tells a story of luxury and craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {collections.map((collection, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-soft hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                          {collection.name}
                        </h3>
                        <p className="text-white/90 text-lg transform group-hover:translate-x-1 transition-transform duration-300">
                          {collection.description}
                        </p>
                      </div>
                      <div className="text-right transform group-hover:translate-x-[-4px] transition-transform duration-300">
                
                        <div className="text-sm text-white/80">
                          {collection.items}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <Link to="/products">
                    <Button className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-lg transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                      View Our Collection
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    </Link>
                    <div className="flex items-center space-x-2 text-gray-600 transform group-hover:scale-105 transition-transform duration-300">
              
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features with Images */}
      <section 
        ref={el => sectionRefs.current[3] = el}
        className="relative py-24 bg-gradient-to-br from-purple-50/50 to-pink-50/50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-soft transform hover:scale-105 transition-all duration-300">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-700">Why Choose Élégance</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 leading-tight transform hover:scale-105 transition-transform duration-500">
                Beyond <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Fashion</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed transform hover:translate-y-1 transition-transform duration-300">
                We don't just create clothing; we craft experiences. Every piece is a testament to our commitment to excellence, innovation, and timeless beauty.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 transform hover:translate-x-2"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                    <img
                      src={boutiqueImages.workshop}
                      alt="Workshop"
                      className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-semibold transform hover:translate-x-1 transition-transform duration-300">
                      Our Atelier
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 delay-100 hover:rotate-1">
                    <img
                      src={boutiqueImages.fabric}
                      alt="Fabrics"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-semibold transform hover:translate-x-1 transition-transform duration-300">
                      Handmade Fabrics
                    </div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 delay-200 hover:rotate-1">
                    <img
                      src={boutiqueImages.about}
                      alt="Craftsmanship"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-semibold transform hover:translate-x-1 transition-transform duration-300">
                      Craftsmanship
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 delay-300 hover:rotate-1">
                    <img
                      src={boutiqueImages.hero3}
                      alt="Design"
                      className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-semibold transform hover:translate-x-1 transition-transform duration-300">
                      Our Luxury Fabrics
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section 
        ref={el => sectionRefs.current[4] = el}
        className="relative py-24 bg-white/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-6 transform hover:scale-105 transition-transform duration-500">
              Our <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Creative Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto transform hover:translate-y-1 transition-transform duration-300">
              Discover why discerning clients choose Élégance for their most important moments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 border border-white/20"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                    <div className="font-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 font-semibold group-hover:text-gray-700 transition-colors duration-300">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                

                
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic transform group-hover:translate-x-1 transition-transform duration-300">
                  "{testimonial.content}"
                </p>
                
                <div className="text-sm text-amber-600 font-medium pt-4 border-t border-gray-200 transform group-hover:translate-x-1 transition-transform duration-300">
                  {testimonial.beforeAfter}
                </div>

           
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section 
        ref={el => sectionRefs.current[5] = el}
        className="relative py-28 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-300">
            <Zap className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-lg font-bold text-white">Limited Private Appointments</span>
            <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1 rounded-full transform hover:scale-105 transition-transform duration-300">
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-semibold text-amber-300">Few Slots Left</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight transform hover:scale-105 transition-transform duration-500">
            Begin Your <span className="bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">Style Legacy</span>
          </h2>
          
          <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed transform hover:translate-y-1 transition-transform duration-300">
            Experience the art of bespoke fashion. Schedule your private consultation and discover the difference of true luxury tailoring.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 font-bold text-lg px-8 py-6">
                <Sparkles className="w-5 h-5 mr-3 transform group-hover:scale-110 transition-transform duration-300" />
                Book Private Consultation
                <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-white/60">
            {[
              { icon: Award, text: "Complimentary Fitting" },
              { icon: Users, text: "Personal Stylist" },
              { icon: Zap, text: "Priority Access" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-amber-300 transform hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold transform hover:translate-x-1 transition-transform duration-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6 transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-serif font-bold">Élégance</span>
              </div>
              <p className="text-gray-400 leading-relaxed transform hover:translate-y-1 transition-transform duration-300">
                Crafting timeless elegance through bespoke tailoring and luxury fashion since 2008.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6 transform hover:translate-x-1 transition-transform duration-300">Quick Links</h3>
              <div className="space-y-3">
                {['Collections', 'Bespoke Tailoring', 'About Us', 'Client Stories'].map((item) => (
                  <Link key={item} to="#" className="block text-gray-400 hover:text-amber-300 transition-all duration-300 hover:translate-x-2">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6 transform hover:translate-x-1 transition-transform duration-300">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3 transform hover:translate-x-1 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>123 Fashion Avenue, Paris</span>
                </div>
                <div className="flex items-center space-x-3 transform hover:translate-x-1 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 transform hover:translate-x-1 transition-transform duration-300">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>hello@elegance.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6 transform hover:translate-x-1 transition-transform duration-300">Follow Us</h3>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <button key={index} className="p-3 bg-gray-800 rounded-full hover:bg-amber-500 transition-all duration-300 hover:scale-110 transform hover:rotate-12">
                    <Icon className="w-5 h-5 transform hover:scale-110 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="transform hover:scale-105 transition-transform duration-300">&copy; 2024 Élégance Boutique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;