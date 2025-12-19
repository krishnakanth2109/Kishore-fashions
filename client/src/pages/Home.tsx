import { Link } from "react-router-dom";
import { Scissors, Award, Users, Heart, Sparkles, Star, ArrowRight, Play, Instagram, Facebook, Twitter, Zap, Clock, Shield, Phone, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios"; // ✅ Added axios for data fetching

// ✅ Get API URL from .env
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// ✅ Define Interface for Dynamic Team Data
interface TeamMember {
  _id: string;
  name: string;
  image: string;
  address: string; // Mapped to Role/Designation
  content: string; // Mapped to Quote
  description: string; // Mapped to Bottom text
}

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
};

const features = [
  {
    icon: Scissors,
    title: "Learn from Real Boutique Professionals",
    description: "Our trainers are experienced boutique designers who share not just stitching skills but practical business tips — from selecting fabrics to pricing your designs.",
    gradient: "from-amber-500 to-orange-500",
    stats: "200+ Techniques",
    image: boutiqueImages.fabric,
    expandedContent: {
      details: [
        "Learn from industry professionals with 10+ years of boutique experience",
        "Master fabric selection, pattern making, and advanced stitching techniques",
        "Get insider tips on pricing strategies and customer management",
        "Hands-on training with professional equipment and tools"
      ],
      benefits: [
        "Start your own boutique business",
        "Build professional portfolio",
        "Industry-recognized certification",
        "Lifetime mentorship support"
      ]
    }
  },
  {
    icon: Award,
    title: "100% Practical Training",
    description: "Every class is hands-on. You'll cut, stitch, design, and finish your own garments under expert guidance. By the end of the course, you'll have a ready portfolio of your creations.",
    gradient: "from-purple-500 to-pink-500",
    stats: "98% Success Rate",
    image: boutiqueImages.workshop,
    expandedContent: {
      details: [
        "Complete 50+ practical projects during the course",
        "Work with different fabrics: cotton, silk, linen, and designer materials",
        "Learn advanced techniques: embroidery, embellishments, and finishing",
        "Real-time feedback and personalized guidance"
      ],
      benefits: [
        "Portfolio of 20+ completed garments",
        "Confidence to handle complex designs",
        "Professional finishing techniques",
        "Industry-standard quality work"
      ]
    }
  },
  {
    icon: Users,
    title: "Home Learning Support with Videos",
    description: "Missed a class? No problem! Watch our exclusive training videos at home — each lesson can be rewatched up to three times for better understanding",
    gradient: "from-blue-500 to-cyan-500",
    stats: "5K+ VIP Clients",
    image: boutiqueImages.hero2,
    expandedContent: {
      details: [
        "Access to 100+ exclusive training videos",
        "Step-by-step tutorials for every technique",
        "Mobile-friendly platform accessible 24/7",
        "Downloadable patterns and resources"
      ],
      benefits: [
        "Learn at your own pace",
        "Never miss important lessons",
        "Reinforce classroom learning",
        "Access from anywhere, anytime"
      ]
    }
  },
  {
    icon: Heart,
    title: "Flexible Timings",
    description: "Morning, afternoon, or evening — choose a schedule that fits your lifestyle. We also adjust for long leaves and special situations to ensure you never miss your learning.",
    gradient: "from-rose-500 to-red-500",
    stats: "1000+ Masterpieces",
    image: boutiqueImages.about,
    expandedContent: {
      details: [
        "Multiple batch timings: 8AM, 12PM, 4PM, 7PM",
        "Weekend batches available",
        "Make-up classes for missed sessions",
        "Personalized schedule adjustments"
      ],
      benefits: [
        "Balance work and learning",
        "No pressure of fixed timings",
        "Family-friendly schedules",
        "Holiday batch options"
      ]
    }
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

const stats = [
  { number: "2,500+", label: "Bespoke Designs", icon: Sparkles, suffix: "Created" },
  { number: "20", label: "Years of Excellence", icon: Award, suffix: "Experience" },
  { number: "15+", label: "Master Artisans", icon: Users, suffix: "Team" },
  { number: "24/7", label: "Concierge Service", icon: Clock, suffix: "Support" }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: boutiqueImages.hero1,
      title: "Master Boutique Tailoring & Styling",
      subtitle: "Launch Your Own Boutique with Confidence",
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
      title: "Crafted for Your Moments",
      subtitle: "Tailored to fit your story — from dawn to dusk, celebration to calm.",
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
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide
              ? 'opacity-100 scale-100 z-10 pointer-events-auto'
              : 'opacity-0 scale-110 z-0 pointer-events-none'
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
              <div className={`max-w-2xl space-y-6 transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}>
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 transform hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span className="text-white/90 text-sm font-semibold">New Collection</span>
                </div>
                {index === 0 ? (
                  <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight transform hover:scale-105 transition-transform duration-500">
                    {slide.title}
                  </h1>
                ) : (
                  <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white leading-tight transform hover:scale-105 transition-transform duration-500">
                    {slide.title}
                  </h1>
                )}

                <p className="text-2xl lg:text-3xl text-amber-200 font-light mb-4 transform hover:translate-x-2 transition-transform duration-300">
                  {slide.subtitle}
                </p>
                <p className="text-xl text-white/80 max-w-lg leading-relaxed transform hover:translate-x-1 transition-transform duration-300">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-150 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce z-20">
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

const FeatureCard = ({ feature, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="flex items-start space-x-4 group p-6 rounded-2xl hover:bg-white/50 transition-all duration-300 transform hover:translate-x-2 bg-white/30 backdrop-blur-sm border border-white/20 shadow-soft"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0`}>
        <feature.icon className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="flex-1 transform group-hover:translate-x-1 transition-transform duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-3">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="flex items-center mb-3">
          <div className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {feature.stats}
          </div>
        </div>

        {/* Read More Button */}
        <Button
          variant="ghost"
          className="p-0 h-auto text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 flex items-center gap-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </Button>

        {/* Expanded Content */}
        {isExpanded && feature.expandedContent && (
          <div className="mt-4 space-y-4 animate-in fade-in duration-500">
            {/* Details Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn:</h4>
              <ul className="space-y-2">
                {feature.expandedContent.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
              <div className="flex flex-wrap gap-2">
                {feature.expandedContent.benefits.map((benefit, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature Image */}
            <div className="pt-2">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-elegant border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-serif font-bold text-gradient-gold">
                Kishor Fashions
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering creativity through the art of tailoring. Learn, create, and excel in boutique design with expert guidance.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">+91 95504 58132</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">+91 95025 68049</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">krstylecorner@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Kishor Fashion Boutique Training Center, KPHB Road Number 6, Dharmareddy Colony Phase-1, Opp Sitara Hostel, Hyderabad, Pin Code - 500072
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Location Map */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-primary mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/919550458132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full hover-lift transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kishor_fashions_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full hover-lift transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="https://www.youtube.com/@Kishor_fashion_tailoring_class"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full hover-lift transition-all"
                  aria-label="Youtube"
                >
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Location Map Added Here */}
            <div className="rounded-xl overflow-hidden border border-border h-48 w-full shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.278452590862!2d78.39385417462931!3d17.494216299719845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91005f467ca7%3A0x8f853db665e184f9!2sKishor%20fashion%20boutique%20training%20center!5e0!3m2!1sen!2sin!4v1766067632405!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kishor Fashion Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Kishor Fashions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // ✅ New State for Team
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // ✅ Fetch Team Data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/team`);
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Failed to load team members", error);
        // Fallback or empty array handled in UI
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (totalScroll / windowHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove as any);

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
      window.removeEventListener('mousemove', handleMouseMove as any);
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

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="w-full">
          <HeroCarousel />
        </div>
      </section>

      {/* Animated Stats Section */}
      <section
        ref={el => { sectionRefs.current[0] = el }}
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
        ref={el => { sectionRefs.current[1] = el }}
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
                    {/* UPDATED: Added scrollTo(0,0) */}
                    <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
                      <Button className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-lg transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                        View Our Collection
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
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
        ref={el => { sectionRefs.current[3] = el }}
        className="relative py-24 bg-gradient-to-br from-purple-50/50 to-pink-50/50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-soft transform hover:scale-105 transition-all duration-300">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-700">Why Choose Our Boutique</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 leading-tight transform hover:scale-105 transition-transform duration-500">
                Beyond <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Fashion</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed transform hover:translate-y-1 transition-transform duration-300">
                At Kishor Fashions, we don't just teach tailoring — we build confidence, creativity, and career paths.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
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

      {/* Enhanced Team / Testimonials Section - NOW DYNAMIC */}
      <section
        ref={el => { sectionRefs.current[4] = el }}
        className="relative py-24 bg-white/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-6 transform hover:scale-105 transition-transform duration-500">
              Our <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Creative Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto transform hover:translate-y-1 transition-transform duration-300">
              Meet the talented professionals behind Kishor Fashions' exceptional craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <div
                  key={member._id}
                  className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-6 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 border border-white/20"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-lg transform group-hover:scale-110 transition-transform duration-300 mb-4"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150"; }}
                    />
                    <div className="transform group-hover:translate-y-1 transition-transform duration-300">
                      <div className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {member.name}
                      </div>
                      <div className="text-gray-600 text-sm font-semibold group-hover:text-gray-700 transition-colors duration-300">
                        {member.address}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic text-center transform group-hover:translate-y-1 transition-transform duration-300 line-clamp-4">
                    "{member.content}"
                  </p>

                  <div className="text-xs text-amber-600 font-medium text-center pt-4 border-t border-gray-200 transform group-hover:translate-y-1 transition-transform duration-300">
                    {member.description}
                  </div>

                  {/* Hover shine effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                <p>Loading creative team...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section
        ref={el => { sectionRefs.current[5] = el }}
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
            {/* UPDATED: Added scrollTo(0,0) */}
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
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

      {/* Use the Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;