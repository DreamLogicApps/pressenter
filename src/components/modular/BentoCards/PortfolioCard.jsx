import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'AETHER MONOLITH',
    category: 'Brand Identity & Web',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tag: 'Web & Identity'
  },
  {
    title: 'VELOCITY DYNAMICS',
    category: '3D Motion & Video Production',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tag: 'Commercial Film'
  },
  {
    title: 'AURORA CAPITAL',
    category: 'Social Content & Rebrand',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Full Brand Suite'
  }
];

export default function PortfolioCard() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="bento-card bento-portfolio">
      <div className="card-top-tag">
        <Film size={14} className="gold-text" />
        <span>FEATURED SHOWCASE</span>
      </div>

      <div className="portfolio-viewer">
        <div className="portfolio-img-wrapper">
          <img 
            src={projects[activeProject].image} 
            alt={projects[activeProject].title} 
            className="portfolio-img"
          />
          <div className="portfolio-overlay" />
          <div className="portfolio-tag">{projects[activeProject].tag}</div>
          <div className="portfolio-play-btn">
            <Play size={18} fill="currentColor" />
          </div>
        </div>

        <div className="portfolio-info">
          <div>
            <h3 className="project-title">{projects[activeProject].title}</h3>
            <p className="project-cat">{projects[activeProject].category}</p>
          </div>
          <div className="project-dots">
            {projects.map((_, idx) => (
              <button
                key={idx}
                className={`dot-btn ${idx === activeProject ? 'active' : ''}`}
                onClick={() => setActiveProject(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
