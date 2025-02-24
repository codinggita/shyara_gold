import React from 'react';
import './JewelryCollection.css';

const JewelryCollection = () => {
    <div className="collection-container">
      <div className="collection-wrapper">
        {/* Decorative Elements */}
        <div className="decorative-circle"></div>
        <div className="decorative-dots"></div>

        {/* Main Content */}
        <div className="content-wrapper">
          <h1 className="collection-title">Best Collection</h1>

          <div className="grid-container">
            {/* Top Row */}
            <div className="grid-item small-square">
              <img 
                src="/api/placeholder/400/400" 
                alt="Ruby ring"
                className="collection-image"
              />
            </div>

            <div className="grid-item small-square">
              <img 
                src="/api/placeholder/400/400" 
                alt="Gold necklace"
                className="collection-image"
              />
            </div>

            {/* Large Right Square */}
            <div className="grid-item large-square">
              <img 
                src="/api/placeholder/800/800" 
                alt="Gold set"
                className="collection-image"
              />
            </div>

            {/* Center Video */}
            <div className="grid-item video-container">
              <div className="video-placeholder"></div>
            </div>

            {/* Bottom Row */}
            <div className="grid-item wide-rectangle">
              <img 
                src="/api/placeholder/800/400" 
                alt="Diamond earrings"
                className="collection-image"
              />
            </div>

            <div className="grid-item wide-rectangle">
              <img 
                src="/api/placeholder/800/400" 
                alt="Diamond ring"
                className="collection-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
};

export default JewelryCollection;