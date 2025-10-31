import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { PortfolioImage as ImageType, PortfolioVideo as VideoType } from "@/types";

// Use the environment variable for the API base URL, with a fallback for local development
const API_BASE_URL =`${import.meta.env.VITE_API_BASE_URL}`|| "http://localhost:5000";

const Portfolio = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [videosRes, imagesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/portfolio/videos`),
          fetch(`${API_BASE_URL}/api/portfolio/images`),
        ]);
        if (!videosRes.ok || !imagesRes.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        setVideos(await videosRes.json());
        setImages(await imagesRes.json());
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter categories for images
  const categories = ["all", "fashion", "training", "events", "behind-scenes"];

  const filteredImages = activeFilter === "all"
    ? images
    : images.filter(img => (img as any).category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Navbar />
      <br />
      <br />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-100 to-rose-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-rose-800 mb-6 tracking-tight">
              Our Portfolio
            </h1>
            <p className="text-xl text-rose-600 max-w-2xl mx-auto font-light">
              Discover the elegance and artistry behind our boutique creations
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-rose-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Videos Section */}
        <section className="mb-24 animate-slide-up">
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-4xl font-serif font-bold text-rose-800 mb-4 relative z-10">
                Training Videos
              </h2>
              <div className="absolute bottom-2 left-0 w-full h-3 bg-pink-200 opacity-60 -z-0 transform -rotate-1"></div>
            </div>
            <p className="text-rose-600 text-lg max-w-2xl mx-auto">
              Master the art of fashion with our exclusive training sessions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <Card
                key={video._id}
                className="overflow-hidden bg-white border-pink-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8 bg-gradient-to-br from-white to-pink-50 group-hover:from-pink-50 group-hover:to-rose-50 transition-all duration-500">
                  <h3 className="text-2xl font-serif font-bold text-rose-800 mb-3 group-hover:text-rose-900 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-rose-600 leading-relaxed">{video.description}</p>
                  <div className="mt-4 flex items-center text-pink-500 group-hover:text-rose-600 transition-colors">
                    <span className="text-sm font-medium">Watch Tutorial</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Images Section */}
        <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-4xl font-serif font-bold text-rose-800 mb-4 relative z-10">
                Our Training Sessions
              </h2>
              <div className="absolute bottom-2 left-0 w-full h-3 bg-pink-200 opacity-60 -z-0 transform -rotate-1"></div>
            </div>
            <p className="text-rose-600 text-lg mb-8">
              Glimpse into our creative process and fashion journey
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium capitalize transition-all duration-300 transform hover:scale-105 ${activeFilter === category
                      ? "bg-rose-600 text-white shadow-lg"
                      : "bg-white text-rose-700 border border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                    }`}
                >
                  {category.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-pink-200 h-12 w-12"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <Card
                  key={image._id}
                  className="overflow-hidden bg-white border-pink-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {(image as any).category || "fashion"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-white to-pink-50 group-hover:from-pink-50 group-hover:to-rose-50 transition-all duration-500">
                    <h3 className="text-xl font-serif font-bold text-rose-800 mb-2 group-hover:text-rose-900 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-rose-600 leading-relaxed">{image.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-pink-500 text-sm font-medium">
                        View Details
                      </span>
                      <svg className="w-5 h-5 text-pink-400 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="mt-24 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-12 shadow-lg">
            <h3 className="text-3xl font-serif font-bold text-rose-800 mb-4">
              Ready to Create Magic Together?
            </h3>
            <p className="text-rose-600 text-lg mb-8 max-w-2xl mx-auto">
              Join our boutique family and let's craft unforgettable fashion experiences
            </p>
            <a href="/contact">

              <button className="bg-rose-600 text-white px-8 py-4 rounded-full font-medium hover:bg-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Book a Consultation
              </button>


            </a>

          </div>
        </section>
      </div>

      <Footer />

  
    </div>
  );
};

export default Portfolio;