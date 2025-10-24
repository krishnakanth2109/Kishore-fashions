import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Portfolio = () => {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, imagesRes] = await Promise.all([
          fetch("http://localhost:5000/api/portfolio/videos"),
          fetch("http://localhost:5000/api/portfolio/images"),
        ]);
        setVideos(await videosRes.json());
        setImages(await imagesRes.json());
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-6 text-center">
          Our Portfolio
        </h1>
        {/* Videos Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-gradient-gold mb-8 text-center">Training Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <Card key={video._id} className="overflow-hidden">
                <div className="aspect-video">
                  <iframe src={video.embedUrl} title={video.title} className="w-full h-full" allowFullScreen />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold">{video.title}</h3>
                  <p className="text-muted-foreground">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
        {/* Images Section */}
        <section>
           <h2 className="text-4xl font-serif font-bold text-gradient-gold mb-8 text-center">Our Training Sessions</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <Card key={image._id} className="overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={image.src} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold">{image.title}</h3>
                  <p className="text-muted-foreground">{image.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;