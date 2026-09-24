import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

const serviceCategories = [
  {
    id: 'brand',
    title: 'BRAND',
    items: ['Logo', 'Identity', 'Strategy', 'Visual Language'],
    previewType: 'logo',
    color: 'var(--color-accent)'
  },
  {
    id: 'digital',
    title: 'DIGITAL',
    items: ['Websites', 'UI/UX', 'Landing Pages', 'Digital Experiences'],
    previewType: 'website',
    color: '#00D1FF'
  },
  {
    id: 'content',
    title: 'CONTENT',
    items: ['Video Editing', 'Production', 'Photography', 'Motion Graphics'],
    previewType: 'video',
    color: '#FF3366'
  },
  {
    id: 'social',
    title: 'SOCIAL',
    items: ['Social Management', 'Creatives', 'Campaigns', 'Content Strategy'],
    previewType: 'social',
    color: '#7000FF'
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(serviceCategories[0]);

  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        
        <h2 className="heading-xl mb-16">
          Everything you need.<br/>
          <span className="text-editorial text-gray">In one place.</span>
        </h2>

        <div className="services-layout">
          
          {/* Services List */}
          <div className="services-list">
            {serviceCategories.map((category) => (
              <div 
                key={category.id} 
                className={`service-category ${activeService.id === category.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveService(category)}
                onClick={() => setActiveService(category)}
              >
                <h3 className="heading-lg service-title">{category.title}</h3>
                
                <AnimatePresence>
                  {activeService.id === category.id && (
                    <motion.ul 
                      className="service-items"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.items.map((item, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="body-lg"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Visual Preview */}
          <div className="services-preview-container">
            <div className="services-preview glass">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="preview-content w-full h-full flex items-center justify-center relative overflow-hidden rounded-lg"
                  style={{ backgroundColor: `${activeService.color}15` }} // 15 is hex opacity ~8%
                >
                  
                  {activeService.previewType === 'logo' && (
                    <div className="preview-logo font-editorial" style={{ fontSize: '6rem', color: activeService.color }}>PE</div>
                  )}

                  {activeService.previewType === 'website' && (
                    <div className="preview-website">
                      <div className="w-header" style={{ borderColor: activeService.color }}></div>
                      <div className="w-body" style={{ background: activeService.color }}></div>
                    </div>
                  )}

                  {activeService.previewType === 'video' && (
                    <div className="preview-video" style={{ borderColor: activeService.color }}>
                      <div className="v-play" style={{ color: activeService.color }}>▶</div>
                    </div>
                  )}

                  {activeService.previewType === 'social' && (
                    <div className="preview-social grid grid-cols-2 gap-4">
                      <div className="s-post" style={{ background: activeService.color }}></div>
                      <div className="s-post" style={{ background: activeService.color, opacity: 0.7 }}></div>
                      <div className="s-post" style={{ background: activeService.color, opacity: 0.5 }}></div>
                      <div className="s-post" style={{ background: activeService.color, opacity: 0.3 }}></div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
