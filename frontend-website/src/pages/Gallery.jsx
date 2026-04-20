import { useState } from 'react';
import './Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', title: 'Main Gym Floor', category: 'Equipment' },
    { id: 2, url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f', title: 'Free Weights Area', category: 'Equipment' },
    { id: 3, url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f', title: 'Cardio Zone', category: 'Equipment' },
    { id: 4, url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', title: 'Personal Training', category: 'Training' },
    { id: 5, url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77', title: 'Yoga Studio', category: 'Studio' },
    { id: 6, url: 'https://images.unsplash.com/photo-1599058917765-a3ed875b5c3a', title: 'Group Classes', category: 'Training' },
    { id: 7, url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883', title: 'Locker Room', category: 'Facility' },
    { id: 8, url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b', title: 'Smoothie Bar', category: 'Facility' }
  ];

  const categories = ['All', 'Equipment', 'Training', 'Studio', 'Facility'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Our Gym Gallery</h1>
        <p>Take a virtual tour of our state-of-the-art facility</p>
      </div>

      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map(image => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={`${image.url}?ixlib=rb-4.0.3&w=400&h=300&fit=crop`} alt={image.title} />
            <div className="gallery-overlay">
              <h3>{image.title}</h3>
              <p>{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={`${selectedImage.url}?ixlib=rb-4.0.3&w=800&h=600&fit=crop`} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}

      <div className="gallery-cta">
        <h2>Experience It Yourself!</h2>
        <p>Book a free trial and visit our gym in person</p>
        <a href="/contact" className="cta-button">Book Free Trial →</a>
      </div>
    </div>
  );
}

export default Gallery;