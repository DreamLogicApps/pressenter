import { motion } from 'framer-motion';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Aura',
    category: 'Complete Brand Ecosystem',
    size: 'large',
    year: '2023',
    color: '#E0E7FF'
  },
  {
    id: 2,
    title: 'Nexus',
    category: 'Digital Experience',
    size: 'small',
    year: '2023',
    color: '#FEF3C7'
  },
  {
    id: 3,
    title: 'Kite',
    category: 'Identity & Motion',
    size: 'medium',
    year: '2024',
    color: '#D1FAE5'
  },
  {
    id: 4,
    title: 'Origin',
    category: 'Brand Strategy & Campaign',
    size: 'large',
    year: '2024',
    color: '#FCE7F3'
  }
];

const Portfolio = () => {
  return (
    <section className="portfolio-section section-padding" id="work">
      <div className="container">
        
        <div className="flex justify-between items-end mb-16">
          <h2 className="heading-xl">Selected <span className="text-editorial text-gray">Work.</span></h2>
          <a href="#" className="label-sm text-accent mb-4">View All Cases →</a>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              className={`portfolio-card card-${project.size}`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div 
                className="card-image-wrapper"
                style={{ backgroundColor: project.color }}
              >
                {/* Placeholder for actual project image */}
                <div className="project-placeholder text-black text-2xl font-bold opacity-20">
                  {project.title} Visual
                </div>
              </div>

              <div className="card-metadata flex justify-between mt-4">
                <div>
                  <h3 className="heading-md">{project.title}</h3>
                  <p className="label-sm text-gray mt-1">{project.category}</p>
                </div>
                <div className="label-sm text-gray">{project.year}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
