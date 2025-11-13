import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Users, Award, Sparkles, Quote, Scissors, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import "./About.css";

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
    "http://3.bp.blogspot.com/-tWiLIo7X5rM/UcI2MQNZh7I/AAAAAAAAC5c/3UV0YYmGDYw/s1600/1019-14.jpg",
    "https://kaurboutique.com/wp-content/uploads/2022/04/ulteration.png",
  "https://generisonline.com/wp-content/uploads/2022/06/best-womens-boutiques-in-charlotte.jpg",
   "https://enjoycouture.com/wp-content/uploads/2021/05/vignette-couture-entreprenariat-article-de-blog.jpg"
];

  const studentWorkImages = [
   "https://image2url.com/images/1761719016521-dd168043-feb5-453c-ac08-9a80eec4f599.png",
    "https://image2url.com/images/1761717329001-843cfb08-c9dc-4666-ada7-cd49574b5f93.png",
    "https://image2url.com/images/1761716548985-457dd931-16ce-433e-ab17-91141b091a94.png",
    "https://image2url.com/images/1761716048193-95b72be6-6b19-4c43-a3a7-a8421cc802d9.png"
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
      <br />
      <br />
      <br />
      
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
              About Kishor Fashions
            </h1>
            <Sparkles className="absolute -bottom-6 -right-6 w-12 h-12 text-rose-400 animate-bounce delay-1000" />
          </div>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            We believe every woman carries creativity within her — all she needs is the right platform to bring it to life.
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
                      <strong className="text-pink-500 text-xl bg-gradient-to-r from-pink-100 to-pink-50 px-2 py-1 rounded">Kishor Kumar</strong>, Founder & Creative Head of Kishor Fashions
  Every great brand begins with a vision — and for Kishor Fashions, that vision belongs to Mr. Kishor, a passionate designer and mentor who turned his love for fashion into a lifelong mission to empower others.


                    </p>
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-200 animate-paragraph opacity-0 translate-x-4 blur-sm transition-all duration-700 delay-300">
                      <Quote className="w-8 h-8 text-pink-400 mb-4" />
                      <p className="text-gray-600 italic text-lg leading-relaxed">
                        "
With years of experience in tailoring, boutique design, and fashion training, Kishor has guided hundreds of students to build confidence, creativity, and successful careers in the world of fashion."
                      </p>
                      <div className="flex items-center space-x-4 pt-4 mt-4 border-t border-pink-200">
                        <Award className="w-6 h-6 text-rose-500" />
                        <span className="text-gray-600 font-semibold">- Kishor Kumar, Founder & CEO</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-6 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
                    <div className="relative">
                      <img 
                        src="https://image2url.com/images/1761557853213-99509f6b-ecb4-49a2-a17a-eb17fb833d80.jpg" 
                        alt="Kishore Kumar - Founder of Elegant Stitches"
                        className="w-96 h-96 rounded-2xl object-cover shadow-2xl border-4 border-white transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop&auto=format&q=80";
                        }}
                      />
                      <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-3 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-5 h-5 inline mr-2" />
                        <span className="font-bold">Founder </span>
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
              Teaching Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Kishor believes that true learning doesn’t come from books alone —    it comes from Practice, Patience, and Persistence.
            </p>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Every student at Kishor Fashions is taught with care, personal attention, and the assurance that “if you follow the rules, success will follow you.”
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
                <h3 className="text-3xl font-bold text-gray-700">Unique Approach Combines</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-rose-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm">
                  <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">Practical stitching training</span> 
                </p>

                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-rose-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm">
                  <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">Creative design learning
</span> 
                </p>
                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-rose-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm">
                  <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">Home-based video lessons
</span> 
                </p>
                <p className="text-gray-600 leading-relaxed p-4 bg-white/70 rounded-xl border-l-4 border-rose-400 hover:border-l-8 transition-all duration-300 animate-paragraph opacity-0 translate-x-4 blur-sm">
                  <span className="text-rose-500 font-semibold bg-rose-50 px-1 rounded">Personal doubt-clearing sessions (100% clarity guaranteed)</span> 
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
              our values guide everything we do — from every stitch we teach to every dream we help build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Commitment to Excellence", description: " We believe in doing every task with perfection — whether it’s stitching a garment, designing a pattern, or guiding a student.Every class, every project, and every student matters.", color: "from-pink-400 to-rose-400", bgColor: "bg-gradient-to-br from-pink-50 to-rose-50" },
              { icon: Eye, title: "Creativity with Purpose", description: "Fashion is not just about beauty — it’s about expression.We encourage our students to bring their imagination to life and create designs that reflect personality, culture,and innovation.", color: "from-rose-400 to-pink-400", bgColor: "bg-gradient-to-br from-rose-50 to-pink-50" },
              { icon: Heart, title: "Learn with Discipline", description: "At Kishor Fashions, we value discipline as the key to success.Regular practice, timely homework, and dedication to improvement help every learner build both skill and confidence.", color: "from-pink-500 to-rose-500", bgColor: "bg-gradient-to-br from-pink-100 to-rose-100" }
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
    </div>
  );
};

export default About;