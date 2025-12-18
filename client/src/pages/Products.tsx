import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// Use the environment variable for the API base URL, with a fallback for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters and sorting whenever products, priceRange, or sortOption changes
  useEffect(() => {
    let filtered = [...products];

    // Apply price filter
    if (priceRange.min !== "" || priceRange.max !== "") {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = priceRange.min === "" ? 0 : Number(priceRange.min);
        const max = priceRange.max === "" ? Infinity : Number(priceRange.max);
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, sortOption]);

  const handlePriceFilterChange = (field, value) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setSortOption("");
  };

  const handleWhatsAppEnquiry = (product) => {
    const phoneNumber = "919515174064";
    const allImages = [product.mainImage, ...(product.additionalImages || [])];
    const imageLinks = allImages.map((img, idx) => `${idx + 1}. ${img}`).join('\n');
    const message = `Hello! I'm interested in this product:\n\n*${product.title}*\nPrice: ₹${product.price}\nDescription: ${product.description}\n\nProduct Images:\n${imageLinks}\n\nCould you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToGroup = () => {
    window.open("https://chat.whatsapp.com/H8VY0jGKTvmAxs9cLZ944L", '_blank');
  };

  const handleNextImage = () => {
    if (selectedProduct) {
      const totalImages = 1 + (selectedProduct.additionalImages?.length || 0);
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct) {
      const totalImages = 1 + (selectedProduct.additionalImages?.length || 0);
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Updated Modal Component with Auto-play Carousel and No-Blink Animation
  const ProductModal = ({ product, onClose }) => {
    // Local state to manage auto-play pause
    const [isPaused, setIsPaused] = useState(false);

    if (!product) return null;
    
    const allImages = [product.mainImage, ...(product.additionalImages || [])];
    const currentImage = allImages[currentImageIndex];

    // Auto-play logic
    useEffect(() => {
      let interval;
      // Only set interval if not paused and multiple images exist
      if (!isPaused && allImages.length > 1) {
        interval = setInterval(() => {
          handleNextImage();
        }, 5000); // 5 seconds delay
      }
      
      // Cleanup interval on unmount or when dependencies change (like user clicking)
      return () => clearInterval(interval);
    }, [isPaused, currentImageIndex, allImages.length]);

    // Animation variants for smooth sliding/fading
    const slideVariants = {
      enter: { opacity: 0, x: 50 },
      center: { zIndex: 1, x: 0, opacity: 1 },
      exit: { zIndex: 0, opacity: 0, x: -50 }
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
              
              {/* Image Carousel Section */}
              <div 
                className="lg:w-1/2 relative bg-gray-50 flex flex-col"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                {/* Main Image Container - Responsive Height */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img 
                      key={currentImageIndex} // Key change triggers animation
                      src={currentImage} 
                      alt={`${product.title} - Image ${currentImageIndex + 1}`}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 }
                      }}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </AnimatePresence>
                  
                  {/* Navigation Arrows (Centered) */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                        aria-label="Previous image"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                        aria-label="Next image"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-xs md:text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </div>
                
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex p-4 space-x-2 overflow-x-auto bg-gray-100 border-t border-gray-200">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-pink-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Details Section */}
              <div className="lg:w-1/2 p-6 md:p-8 flex flex-col bg-white overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl md:text-3xl font-serif text-pink-900 leading-tight pr-4">{product.title}</h2>
                  <button
                    onClick={onClose}
                    className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors flex-shrink-0"
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="prose prose-pink max-w-none mb-8">
                  <p className="text-pink-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-auto space-y-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-semibold text-rose-600">₹{product.price}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 bg-pink-50 inline-block px-3 py-1 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{allImages.length} view angles available</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleWhatsAppEnquiry(product)}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c.93.509 1.846.696 2.806.696 3.182 0 5.769-2.586 5.769-5.766.001-3.18-2.584-5.768-5.769-5.777zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                      Enquiry Item
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToGroup}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      Join Group
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Navbar />
      <br />

      {/* Hero section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50 py-24"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-rose-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Exclusive Collection
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl text-rose-700 mb-8 leading-relaxed font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Discover handcrafted elegance that tells your unique story
                </motion.p>
            </motion.div>
        </div>
      </motion.section>
      
      {/* Filters Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Price Range Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <label className="text-pink-700 font-semibold whitespace-nowrap">Price Range:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceFilterChange('min', e.target.value)}
                    className="w-24 px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="flex items-center text-pink-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceFilterChange('max', e.target.value)}
                    className="w-24 px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <label className="text-pink-700 font-semibold whitespace-nowrap">Sort By:</label>
                <select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                >
                  <option value="">Default</option>
                  <option value="a-z">Name: A to Z</option>
                  <option value="z-a">Name: Z to A</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(priceRange.min !== "" || priceRange.max !== "" || sortOption !== "") && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Clear Filters
              </motion.button>
            )}
          </div>
        </div>
      </motion.section>

      {/* Products Grid section */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <motion.h2
              className="text-4xl font-serif text-pink-900 mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              Curated Designs
            </motion.h2>
            <motion.p
              className="text-pink-600 text-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {filteredProducts.length} exquisite pieces waiting for you
            </motion.p>
          </div>
        </motion.div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-6 h-96 animate-pulse"
              >
                <div className="bg-pink-200 h-60 rounded-2xl mb-4"></div>
                <div className="bg-pink-200 h-4 rounded mb-2"></div>
                <div className="bg-pink-200 h-4 rounded w-3/4"></div>
              </motion.div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
             <div className="w-40 h-40 mx-auto mb-6 text-pink-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif text-pink-800 mb-4">No designs found</h3>
            <p className="text-pink-600 mb-8 text-lg">
              {priceRange.min !== "" || priceRange.max !== "" 
                ? "No products match your price range. Try adjusting your filters."
                : "Please check back later for new arrivals."}
            </p>
            {(priceRange.min !== "" || priceRange.max !== "") && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.mainImage}
                      alt={product.title}
                      className="w-full h-96 object-contain bg-gray-50 transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Image count badge */}
                    {product.additionalImages && product.additionalImages.length > 0 && (
                      <div className="absolute top-3 right-3 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                        +{product.additionalImages.length}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl text-pink-900 mb-2">{product.title}</h3>
                    <p className="text-2xl font-semibold text-rose-600 mb-4">₹{product.price}</p>
                    {product.additionalImages && product.additionalImages.length > 0 && (
                      <p className="text-sm text-gray-500 mb-3">
                        {product.additionalImages.length + 1} images available
                      </p>
                    )}
                    <div className="mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedProduct(product);
                          setCurrentImageIndex(0);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 shadow-lg"
                      >
                        View Item
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CTA and Footer sections remain unchanged */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-pink-100 to-rose-100 py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-serif font-bold text-pink-900 mb-6"
            >
                Need Custom Design?
            </motion.h2>
            <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-pink-700 text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
            >
                Let's create something extraordinary together. Message us on WhatsApp for custom designs and personal consultations.
            </motion.p>
            <motion.button
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(72, 187, 120, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsAppEnquiry({ title: "Custom Design Consultation", price: "Lets Disscuss", description: "I'm interested in custom design services", mainImage: "", additionalImages: [] })}
                className="px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
            </motion.button>
        </div>
      </motion.section>

      <Footer />

      <ProductModal product={selectedProduct} onClose={() => {
        setSelectedProduct(null);
        setCurrentImageIndex(0);
      }} />
    </div>
  );
};

export default Products;