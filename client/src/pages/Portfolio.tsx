import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { PortfolioImage as ImageType, PortfolioVideo as VideoType } from "@/types";
import { ExternalLink } from "lucide-react";

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
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);

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
   * Extracts the YouTube video ID from various YouTube URL formats
   * Supports:
   * - https://www.youtube.com/watch?v=VIDEO_ID
   * - https://youtu.be/VIDEO_ID
   * - https://www.youtube.com/embed/VIDEO_ID
   * - https://www.youtube.com/v/VIDEO_ID
   */
  const extractYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    try {
      // Handle different YouTube URL formats
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error extracting YouTube video ID:", error);
      return null;
    }
  };

  /**
   * Gets the high-quality thumbnail for a YouTube video
   */
  const getYouTubeThumbnail = (embedUrl: string): string => {
    const videoId = extractYouTubeVideoId(embedUrl);
    if (!videoId) {
      console.error("Could not extract video ID from:", embedUrl);
      return "/placeholder-video.jpg"; // Fallback image
    }
    // Use maxresdefault for best quality, fallback to hqdefault
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  /**
   * Converts any YouTube URL to a proper watch URL for opening in new tab
   */
  const getYouTubeWatchUrl = (embedUrl: string): string => {
    const videoId = extractYouTubeVideoId(embedUrl);
    if (!videoId) {
      console.error("Could not extract video ID from:", embedUrl);
      return embedUrl; // Return original URL as fallback
    }
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  /**
   * Opens the YouTube video in a new tab
   */
  const handleVideoClick = (embedUrl: string) => {
    const watchUrl = getYouTubeWatchUrl(embedUrl);
    window.open(watchUrl, '_blank', 'noopener,noreferrer');
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
          <h2 className="text-4xl font-serif font-bold text-gradient-gold mb-8 text-center">
            Training Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No videos available yet.</p>
              </div>
            ) : (
              videos.map((video) => {
                const thumbnailUrl = getYouTubeThumbnail(video.embedUrl);
                const videoId = extractYouTubeVideoId(video.embedUrl);
                
                return (
                  <Card key={video._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div 
                      className="aspect-video relative group bg-black cursor-pointer"
                      onClick={() => handleVideoClick(video.embedUrl)}
                    >
                      {/* Thumbnail Image */}
                      <img
                        src={thumbnailUrl}
                        alt={`Thumbnail for ${video.title}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to hqdefault if maxresdefault fails
                          const target = e.target as HTMLImageElement;
                          if (videoId && target.src.includes('maxresdefault')) {
                            target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          }
                        }}
                      />
                      
                      {/* Overlay with Play Button */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-50">
                        <div className="transform transition-transform group-hover:scale-110">
                          <PlayIcon />
                        </div>
                      </div>
                      
                      {/* External Link Indicator */}
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-primary mb-2">
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{video.description}</p>
                      <button
                        onClick={() => handleVideoClick(video.embedUrl)}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Watch on YouTube
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </section>
        
        {/* Images Section */}
        <section>
          <h2 className="text-4xl font-serif font-bold text-gradient-gold mb-8 text-center">
            Our Training Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No images available yet.</p>
              </div>
            ) : (
              images.map((image) => (
                <Card key={image._id} className="overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-image.jpg"; // Fallback image
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground">{image.description}</p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;