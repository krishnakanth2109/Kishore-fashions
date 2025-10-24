import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const courseCategories = [
    {
      id: 'dresses',
      title: 'Dress & Pant Models',
      items: [
        'Punjabi Dress', 'Salwar Pant', 'Chudidar Pant', 'Umbrella Frock',
        'A-Line Kurti', 'Palazzo Pant'
      ]
    },
    {
      id: 'blouses',
      title: 'Blouse Designs',
      items: [
        'Boat Neck Blouse', 'Prince Cut Blouse', 'Katori Blouse', 'Cross Cut Blouse',
        'Collar Neck Blouse', 'High Neck Blouse', 'Shoulder-less Blouse', 'Fish Cut Blouse'
      ]
    },
    {
      id: 'sleeves',
      title: 'Sleeve Patterns',
      items: [
        'Half Hand', 'Elbow Hand', 'Full Hand', 'Butta Hand',
        'Mukanda Hand', 'Bell Hand'
      ]
    },
    {
      id: 'piping',
      title: 'Piping & Finishing Styles',
      items: [
        'Regular Piping', 'Goat Piping', 'Loading Piping', 'Feasing Piping',
        'Piping All Models'
      ]
    },
    {
      id: 'necks',
      title: 'Neck Designs',
      items: [
        'Regular Neck', 'Boat Neck', 'Collar Neck', 'Coat Neck'
      ]
    }
  ];

  const batchTimings = [
    { days: 'Monday, Wednesday, Friday', time: '11:00 AM – 9:00 PM' },
    { days: 'Saturday, Sunday, Thursday', time: '11:00 AM – 9:00 PM' }
  ];

  const whyChooseUs = [
    { icon: '👩‍🏫', text: 'Expert trainers with real-world experience' },
    { icon: '✂️', text: 'Step-by-step practical sessions' },
    { icon: '🎯', text: 'Personalized learning for every student' },
    { icon: '👗', text: 'Modern and traditional tailoring techniques' },
    { icon: '💼', text: 'Guidance to start your own boutique or fashion business' },
    { icon: '⏰', text: 'Flexible batch timings to suit your schedule' }
  ];

  const handleEnrollmentClick = () => {
    const phoneNumber = "919876543210";
    const message = "Hello! I'm interested in enrolling in Kishor Fashion Tailoring Class. Please provide more details about the courses and admission process.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #fff5f7 0%, #fce4ec 50%, #f8bbd9 100%)',
      minHeight: '100vh'
    }}>
      <Navbar/>
      <br />
      
      {/* Hero Section */}
      <section style={{ padding: '6rem 2rem 4rem' }} className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
      
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3.5rem',
            fontWeight: '700',
            color: '#880e4f',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Fashion & Tailoring Training
          </h1>
          
          <motion.div 
            style={{
              width: '120px',
              height: '4px',
              background: 'linear-gradient(90deg, #f48fb1, #d81b60)',
              margin: '0 auto 2rem auto',
              borderRadius: '2px'
            }}
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.3rem',
            color: '#6d1b7b',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Complete professional training in fashion design, cutting, and stitching for students, 
            homemakers, and aspiring designers
          </p>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(255, 255, 255, 0.7)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 15px 35px rgba(244, 143, 177, 0.2)',
              border: '1px solid rgba(244, 143, 177, 0.1)'
            }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.2rem',
              fontWeight: '600',
              color: '#880e4f',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              Master the Art of Tailoring with Confidence
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}>
              <div>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#6d1b7b',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  At <strong>Kishor Fashion Tailoring Class</strong>, we provide complete professional training 
                  in fashion design, cutting, and stitching. Our courses are designed for students, 
                  homemakers, and aspiring designers who wish to master the art of tailoring with confidence.
                </p>
                
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#6d1b7b',
                  lineHeight: '1.8'
                }}>
                  You'll learn everything from basic stitching to advanced fashion design under expert 
                  guidance, with hands-on practice and personalized attention.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, #f48fb1, #f06292)',
                  borderRadius: '15px',
                  padding: '2rem',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '0.5rem' }}>Course Duration</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 'bold' }}>
                  3 Months
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", opacity: '0.9' }}>
                  (Adjustable as per your convenience)
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Coverage Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#880e4f',
              textAlign: 'center',
              marginBottom: '3rem'
            }}
          >
            Comprehensive Course Coverage
          </motion.h2>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 justify-center mb-8"
          >
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                border: '2px solid #f48fb1',
                background: activeCategory === 'all' ? '#f48fb1' : 'transparent',
                color: activeCategory === 'all' ? 'white' : '#d81b60',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              All Categories
            </button>
            {courseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  border: '2px solid #f48fb1',
                  background: activeCategory === category.id ? '#f48fb1' : 'transparent',
                  color: activeCategory === category.id ? 'white' : '#d81b60',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category.title}
              </button>
            ))}
          </motion.div>

          {/* Course Items Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {courseCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredService(category.id)}
                onHoverEnd={() => setHoveredService(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: hoveredService === category.id 
                    ? '0 20px 40px -10px rgba(244, 143, 177, 0.4)' 
                    : '0 8px 25px -5px rgba(244, 143, 177, 0.2)',
                  border: '1px solid rgba(244, 143, 177, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  color: '#880e4f',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {category.title}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {category.items.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1rem',
                        color: '#d81b60',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: 'rgba(244, 143, 177, 0.1)'
                      }}
                    >
                      <span style={{ 
                        color: '#f48fb1', 
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}>✓</span>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Timings Section */}
      <section style={{ 
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(255, 245, 247, 0.9), rgba(252, 228, 236, 0.9))'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#880e4f',
              marginBottom: '1rem'
            }}>
              Flexible Batch Timings
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.1rem',
              color: '#6d1b7b'
            }}>
              We understand your schedule — choose what works best for you
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {batchTimings.map((batch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px -5px rgba(244, 143, 177, 0.3)',
                  border: '2px solid rgba(244, 143, 177, 0.2)'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1.5rem',
                  color: '#f48fb1'
                }}>
                  📅
                </div>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#880e4f',
                  marginBottom: '1rem'
                }}>
                  {batch.days}
                </h3>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#d81b60',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  {batch.time}
                </p>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#6d1b7b',
                  fontSize: '0.9rem'
                }}>
                  2 hours per session
                </p>
              </motion.div>
            ))}
          </div>

          {/* Discipline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              border: '2px dashed #f48fb1'
            }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#880e4f',
              marginBottom: '1rem'
            }}>
              Discipline & Dedication
            </h3>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              color: '#6d1b7b',
              lineHeight: '1.7',
              fontSize: '1.05rem'
            }}>
              Success in tailoring comes from consistent practice and passion. We encourage every 
              student to stay committed, attend regularly, and focus on developing creativity and 
              precision. If you ever need a break, extra time will be provided to ensure you 
              complete your training confidently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#880e4f',
              marginBottom: '1rem'
            }}>
              Why Choose Our Training?
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  boxShadow: '0 8px 25px -5px rgba(244, 143, 177, 0.2)',
                  border: '1px solid rgba(244, 143, 177, 0.1)'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f48fb1, #f06292)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#880e4f',
                  fontWeight: '500',
                  lineHeight: '1.6',
                  fontSize: '1.1rem',
                  margin: 0
                }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 2rem' }} className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #f48fb1, #f06292)',
            borderRadius: '25px',
            padding: '4rem 2rem',
            maxWidth: '800px',
            margin: '0 auto',
            boxShadow: '0 20px 40px -10px rgba(244, 143, 177, 0.4)'
          }}
        >
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '1.5rem'
          }}>
            Start Your Tailoring Journey Today!
          </h2>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Join Kishor Fashion Tailoring Class and transform your passion into professional skills. 
            Enroll now to begin your journey in fashion design and tailoring.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 30px -5px rgba(136, 14, 79, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnrollmentClick}
            style={{
              background: 'white',
              color: '#d81b60',
              border: 'none',
              padding: '1.2rem 3rem',
              borderRadius: '50px',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px -5px rgba(136, 14, 79, 0.3)'
            }}
          >
            Enroll Now - WhatsApp Us
          </motion.button>
        </motion.div>
      </section>
      
      <Footer/>
    </div>
  );
};

export default Services;