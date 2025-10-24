import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-6">
            Our Designer Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our exquisite range of handcrafted designer blouses, each a testament to fine craftsmanship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={`₹${product.price}`}
            />
          ))}
        </div>
        {/* Custom Orders Section... */}
      </div>
      <Footer />
    </div>
  );
};

export default Products;