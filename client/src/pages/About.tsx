import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Users, Award, Sparkles, Quote, Scissors, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

// A custom SVG icon for a needle, as it's not in Lucide
const NeedleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19.07,4.93l-1.41,1.41" />
    <path d="M16.24,7.76l-1.41,1.41" />
    <path d="M5,12a1,1,0,0,0,1,1h.01" />
    <path d="M4.93,19.07l1.41-1.41" />
    <path d="M7.76,16.24l1.41-1.41" />
    <path d="M12,5a1,1,0,0,0-1-1H11" />
    <path d="M12,19a1,1,0,0,0,1,1h.01" />
    <path d="M19.07,19.07l-1.41-1.41" />
  </svg>
);

const About = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  // Curated, high-quality images for the training environment
  const trainingImages = [
    "https://images.unsplash.com/photo-1542042161-954335875862?w=500&h=400&fit=crop&auto=format&q=80",
    "https://unsplash.com/photos/a-person-using-a-sewing-machine-to-sew-a-piece-of-cloth-agCabGmmVgY",
    "https://images.unsplash.com/photo-1581338834902-f912204a28b0?w=500&h=400&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1620799140408-edc6d5f96333?w=500&h=400&fit=crop&auto=format&q=80"
  ];

  // Curated, high-quality images of student work
  const studentWorkImages = [
    "https://images.unsplash.com/photo-1572611932849-7f0f116fb2f1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym91dGlxdWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=300&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1578353022142-09264fd64295?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2V3aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % trainingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
            entry.target.classList.remove("opacity-0", "translate-y-8", "scale-95");
            
            const paragraphs = entry.target.querySelectorAll('.animate-paragraph');
            paragraphs.forEach((para, index) => {
              setTimeout(() => {
                para.classList.add('opacity-100', 'translate-x-0', 'blur-0');
                para.classList.remove('opacity-0', 'translate-x-4', 'blur-sm');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
      {/* Animated Stitching Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute inset-0">
          <path d="M-100 100 Q 50 200, 100 100 T 300 100" stroke="#FBCFE8" fill="none" strokeWidth="1" className="stitch-path" style={{ animationDuration: '20s' }}/>
          <path d="M-50 250 Q 100 350, 250 250 T 450 250" stroke="#F9A8D4" fill="none" strokeWidth="1" className="stitch-path" style={{ animationDuration: '25s', animationDelay: '2s' }}/>
          <path d="M calc(100% + 100px) 200 Q calc(100% - 50px) 300, calc(100% - 200px) 200 T calc(100% - 400px) 200" stroke="#FBCFE8" fill="none" strokeWidth="1" className="stitch-path-reverse" style={{ animationDuration: '22s', animationDelay: '5s' }}/>
          <path d="M calc(100% + 50px) 400 Q calc(100% - 100px) 500, calc(100% - 250px) 400 T calc(100% - 450px) 400" stroke="#F9A8D4" fill="none" strokeWidth="1" className="stitch-path-reverse" style={{ animationDuration: '28s', animationDelay: '7s' }}/>
        </svg>
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div 
          ref={addToRefs}
          className="text-center mb-20 opacity-0 translate-y-8 scale-95 transition-all duration-1000 ease-out"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-rose-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-pink-400 animate-bounce" />
            <h1 className="text-6xl md:text-8xl font-serif font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-6 relative z-10">
              About Elegant Stitches
            </h1>
            <Sparkles className="absolute -bottom-6 -right-6 w-12 h-12 text-rose-400 animate-bounce delay-1000" />
          </div>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Empowering women through the timeless art of tailoring and boutique design
          </p>
        </div>

        {/* Founder Section */}
        <section 
          ref={addToRefs}
          className="mb-24 opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out"
        >
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden relative group hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-pink-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            <CardContent className="p-8 md:p-16 relative z-10">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div>
                      <h2 className="text-5xl font-serif font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                        Meet Our Founder
                      </h2>
                      <div className="w-32 h-1 bg-gradient-to-r from-pink-300 to-rose-400 mt-4 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-6 text-lg">
                    <p className="text-gray-700 leading-relaxed bg-white/60 p-6 rounded-2xl border-l-4 border-pink-400 hover:border-l-8 transition-all duration-500 hover:scale-105 transform hover:shadow-lg animate-paragraph opacity-0 translate-x-4 blur-sm transition-all duration-700">
                      <strong className="text-pink-500 text-xl bg-gradient-to-r from-pink-100 to-pink-50 px-2 py-1 rounded">Kishore Kumar</strong>, the visionary behind Elegant Stitches, 
                      brings over <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">15 years</span> of expertise in fashion design and boutique management. 
                      His passion for empowering women through skill development has transformed 
                      countless lives across the nation.
                    </p>
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-200 animate-paragraph opacity-0 translate-x-4 blur-sm transition-all duration-700 delay-300">
                      <Quote className="w-8 h-8 text-pink-400 mb-4" />
                      <p className="text-gray-600 italic text-lg leading-relaxed">
                        "I believe every woman has an innate talent for creation. Our mission is to 
                        provide the tools and guidance to unlock that potential and turn passion 
                        into profession."
                      </p>
                      <div className="flex items-center space-x-4 pt-4 mt-4 border-t border-pink-200">
                        <Award className="w-6 h-6 text-rose-500" />
                        <span className="text-gray-600 font-semibold">- Kishore Kumar, Founder & CEO</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-6 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
                    <div className="relative">
                      <img 
                        src="https://homeless-brown-xsh1pysgec.edgeone.app/kishore.png" 
                        alt="Kishore Kumar - Founder of Elegant Stitches"
                        className="w-96 h-96 rounded-2xl object-cover shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop&auto=format&q=80";
                        }}
                      />
                      <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-3 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-5 h-5 inline mr-2" />
                        <span className="font-bold">Founder & Mentor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Training Gallery Section */}
        <section 
          ref={addToRefs}
          className="mb-24 opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Our Training Environment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities with a hands-on learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              {trainingImages.map((src, index) => (
                <img 
                  key={index}
                  src={src}
                  alt={`Training session ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-1000 ease-in-out ${
                    index === activeImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                />
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Scissors className="w-12 h-12 text-pink-500 animate-[bounce_2s_ease-in-out_infinite]" />
                <h3 className="text-3xl font-bold text-gray-700">Hands-On Learning</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-rose-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm">
                  Students learn through <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">practical, real-world projects</span> that simulate actual boutique operations.
                </p>
                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-pink-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm delay-200">
                  <span className="text-pink-500 font-semibold bg-pink-50 px-1 rounded">Modern equipment</span> and traditional techniques combine for a comprehensive learning experience.
                </p>
                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-rose-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm delay-400">
                  <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">Small class sizes</span> ensure personalized attention and mentorship from industry experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Work Showcase */}
        <section 
          ref={addToRefs}
          className="mb-24 opacity-0 translate-y-8 transition-all duration-1000 delay-400 ease-out"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50 overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
                  Student Success Stories
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  See the incredible work created by our talented students.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {studentWorkImages.map((src, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl transform hover:scale-105 transition-all duration-500 shadow-lg">
                    <img 
                      src={src}
                      alt={`Student work ${index + 1}`}
                      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                      <div className="text-white">
                        <div className="font-semibold">Boutique Collection</div>
                        <div className="text-sm text-pink-200">By an Elegant Stitches Graduate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core Values Section */}
        <section 
          ref={addToRefs}
          className="mb-24 opacity-0 transition-all duration-1000 delay-500 ease-out"
        >
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl font-serif font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent relative z-10">
                Our Core Values
              </h2>
              <svg width="100%" height="20" className="absolute -bottom-4 left-0 w-full z-0">
                  <path d="M0 10 Q 50 0, 100 10 T 200 10 T 300 10 T 400 10" stroke="#F9A8D4" fill="none" strokeWidth="2" className="heading-underline" />
              </svg>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-8">
              The principles that guide everything we do at Elegant Stitches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Excellence in Education", description: "Maintaining the highest standards in fashion education, combining traditional craftsmanship with modern design principles.", color: "from-pink-400 to-rose-400", bgColor: "bg-gradient-to-br from-pink-50 to-rose-50" },
              { icon: Eye, title: "Innovation & Creativity", description: "Encouraging creative expression while embracing technological advancements in fashion design.", color: "from-rose-400 to-pink-400", bgColor: "bg-gradient-to-br from-rose-50 to-pink-50" },
              { icon: Heart, title: "Empowerment & Growth", description: "Dedicated to empowering women through skill development and entrepreneurial training.", color: "from-pink-500 to-rose-500", bgColor: "bg-gradient-to-br from-pink-100 to-rose-100" }
            ].map((value, index) => (
              <Card key={index} className={`border-0 shadow-2xl ${value.bgColor} hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transform hover:-translate-y-4 transition-all duration-500 group overflow-hidden`}>
                <CardContent className="p-8 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4 relative z-10">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 relative z-10 animate-paragraph opacity-0 translate-x-4 blur-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes draw-stitch {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .stitch-path {
          stroke-dasharray: 10 5;
          stroke-dashoffset: 1000;
          animation: draw-stitch linear infinite;
        }

        .stitch-path-reverse {
            stroke-dasharray: 10 5;
            stroke-dashoffset: -1000;
            animation: draw-stitch linear infinite;
        }
        
        @keyframes draw-underline {
            to {
                stroke-dashoffset: 0;
            }
        }
        .heading-underline {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: draw-underline 2s ease-out forwards;
            animation-delay: 1s; /* Start after main section animates in */
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default About;