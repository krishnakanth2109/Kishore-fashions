import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-6">
            About Elegant Stitches
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering women through the timeless art of tailoring and boutique design
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-20 animate-slide-up">
          <Card className="border-border shadow-elegant overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Founded with a passion for preserving the art of traditional tailoring while embracing modern design, 
                  Elegant Stitches has been at the forefront of boutique training for over a decade. Our journey began 
                  with a simple vision: to create a space where women could learn, grow, and excel in the craft of tailoring.
                </p>
                <p>
                  Today, we stand proud as a beacon of excellence in boutique education, having trained hundreds of 
                  aspiring designers who have gone on to establish successful careers in fashion and design. Our 
                  comprehensive curriculum combines traditional techniques with contemporary styles, ensuring our 
                  students are well-equipped for the modern fashion industry.
                </p>
                <p>
                  At Elegant Stitches, we believe that every woman has the potential to create beauty through fabric 
                  and thread. Our expert instructors bring years of industry experience, providing personalized guidance 
                  and mentorship throughout your learning journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-gradient-gold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift border-border shadow-soft">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="inline-flex p-4 bg-secondary rounded-full">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower women with professional tailoring skills that enable them to pursue successful 
                  careers in boutique design and fashion entrepreneurship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-border shadow-soft">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="inline-flex p-4 bg-secondary rounded-full">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading boutique training center, recognized for excellence in education and 
                  for nurturing the next generation of talented fashion designers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-border shadow-soft">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="inline-flex p-4 bg-secondary rounded-full">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Our Passion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are passionate about preserving traditional tailoring techniques while embracing 
                  innovation, creating a perfect blend of heritage and modernity.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <Card className="bg-gradient-pink border-border shadow-elegant">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-serif font-bold text-gradient-gold mb-6">
                Expert Instructors
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our team of experienced instructors brings decades of combined expertise in boutique design, 
                fashion education, and industry practice. Each instructor is dedicated to providing personalized 
                attention and guidance, ensuring that every student receives the support they need to succeed. 
                With backgrounds ranging from haute couture to ready-to-wear fashion, our instructors offer 
                diverse perspectives and comprehensive knowledge.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
