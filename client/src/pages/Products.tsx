import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// Use the environment variable for the API base URL, with a fallback for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the modal
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");

  // This is no longer used by any UI element but is kept to not alter handlers
  const priceFilters = [
    { id: "all", label: "All Prices", range: [0, 10000] },
    { id: "budget", label: "Budget (₹0 - ₹2000)", range: [0, 2000] },
    { id: "premium", label: "Premium (₹2000 - ₹5000)", range: [2000, 5000] },
    { id: "luxury", label: "Luxury (₹5000+)", range: [5000, 10000] }
  ];

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

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, sortBy, searchQuery]);

  const handleWhatsAppEnquiry = (product) => {
    const phoneNumber = "919515174064";
    const message = `Hello! I'm interested in this product:\n\n*${product.title}*\nPrice: ₹${product.price}\nDescription: ${product.description}\n\nCould you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToGroup = () => {
    window.open("https://chat.whatsapp.com/LSws8MVod4nF8wYjTX8Vce?mode=wwc", '_blank');
  };

  // This is no longer used by any UI element but is kept to not alter handlers
  const handleQuickPriceFilter = (filter) => {
    setSelectedPriceFilter(filter.id);
    setPriceRange(filter.range);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Modal Component
  const ProductModal = ({ product, onClose }) => (
    <AnimatePresence>
      {product && (
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
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-serif text-pink-900 mb-3">{product.title}</h2>
              <p className="text-pink-600 mb-6 leading-relaxed">{product.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleWhatsAppEnquiry(product)}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Enquiry Item
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToGroup}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Join Group
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Navbar />
      <br />
    

      {/* Hero section remains unchanged */}
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
                <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search for your perfect design..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl text-lg"
                        />
                        <motion.svg
                            className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500"
                            animate={{ rotate: searchQuery ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </motion.svg>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </motion.section>

      {/* MODIFIED Filter Section - No longer sticky, quick filters removed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-sm"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <motion.select
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all duration-300 bg-white shadow-sm"
              >
                <option value="featured">✨ Featured</option>
                <option value="newest">🆕 New Arrivals</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="name">🔤 Name A-Z</option>
              </motion.select>
            </div>

            {/* Custom Price Range Slider */}
            <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-3 border-2 border-pink-100 shadow-sm">
              <span className="text-sm text-pink-600 font-medium whitespace-nowrap">
                Price Range:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-pink-700 font-semibold">₹{priceRange[0]}</span>
                <span className="text-pink-400">→</span>
                <span className="text-pink-700 font-semibold">₹{priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => {
                  setPriceRange([priceRange[0], parseInt(e.target.value)]);
                  setSelectedPriceFilter("all");
                }}
                className="w-32 accent-pink-500 cursor-pointer"
              />
            </div>

          </div>
        </div>
      </motion.section>

      {/* Products Grid section remains unchanged */}
      <section className="container mx-auto px-4 py-16">
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
            {[...Array(8)].map((_, i) => (
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
            <p className="text-pink-600 mb-8 text-lg">Try adjusting your search or price range</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery("");
                setPriceRange([0, 10000]);
              }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              Show All Designs
            </motion.button>
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
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl text-pink-900 mb-2">{product.title}</h3>
                    <p className="text-2xl font-semibold text-rose-600 mb-4">₹{product.price}</p>
                    <div className="mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedProduct(product)}
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
                onClick={() => handleWhatsAppEnquiry({ title: "Custom Design Consultation", price: 0, description: "I'm interested in custom design services" })}
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

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Products;