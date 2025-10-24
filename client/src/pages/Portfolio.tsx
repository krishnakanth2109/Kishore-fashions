import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { PortfolioImage as ImageType, PortfolioVideo as VideoType } from "@/types"; // Import types

// A helper component for the play icon
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-20 h-20 text-white drop-shadow-lg"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
      clipRule="evenodd"
    />
  </svg>
);

const Portfolio = () => {
  // Use specific types for your state
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  
  // New state to track which video is currently playing
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, imagesRes] = await Promise.all([
          fetch("http://localhost:5000/api/portfolio/videos"),
          fetch("http://localhost:5000/api/portfolio/images"),
        ]);
        if (!videosRes.ok || !imagesRes.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        setVideos(await videosRes.json());
        setImages(await imagesRes.json());
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * Extracts the YouTube video ID from an embed URL and constructs
   * a high-quality thumbnail URL.
   * @param embedUrl - The full YouTube embed URL.
   * @returns The URL of the thumbnail image.
   */
  const getYouTubeThumbnail = (embedUrl: string): string => {
    try {
      // e.g., https://www.youtube.com/embed/VIDEO_ID -> VIDEO_ID
      const videoId = new URL(embedUrl).pathname.split('/').pop();
      if (!videoId) return "";
      // Returns a standard high-quality thumbnail image
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch (error) {
      console.error("Invalid YouTube URL provided:", embedUrl);
      return ""; // Return a fallback image or an empty string
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our training programs, student success stories, and the beautiful creations from our workshops.
          </p>
        </div>
        
        {/* Videos Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-gradient-gold mb-8 text-center">Training Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <Card key={video._id} className="overflow-hidden shadow-lg">
                <div className="aspect-video relative group bg-black">
                  {playingVideoId === video._id ? (
                    // 1. If this video is playing, show the iframe with autoplay
                    <iframe
                      src={`${video.embedUrl}?autoplay=1`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // 2. Otherwise, show the thumbnail and a play button
                    <div
                      className="w-full h-full cursor-pointer"
                      onClick={() => setPlayingVideoId(video._id!)}
                    >
                      <img
                        src={getYouTubeThumbnail(video.embedUrl)}
                        alt={`Thumbnail for ${video.title}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <PlayIcon />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">{video.title}</h3>
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
              <Card key={image._id} className="overflow-hidden group shadow-lg">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">{image.title}</h3>
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