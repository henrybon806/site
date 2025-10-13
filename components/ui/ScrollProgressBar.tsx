import { useScrollContext } from '@/context/ScrollContext';
import React, { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const { scrollProgress } = useScrollContext();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      const scrollPercent = scrollY / (documentHeight - windowHeight);
      setScrollPercentage(scrollPercent);
      console.log('Scroll percent:', scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Use whichever source of scroll data is available
  const progress = scrollPercentage > 0 ? scrollPercentage : scrollProgress;
  const progressWidth = `${Math.round(progress * 100)}%`;
  
  // Fallback for non-web platforms
  if (typeof document === 'undefined') {
      return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      // Positioned at the bottom of the viewport
      bottom: 0, 
      left: 0,
      right: 0,
      height: '6px',
      // The outer div is the TRACK (the empty background)
      backgroundColor: 'rgba(0, 0, 0, 0.1)', 
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        // Bar grows from the left side
        left: 0, 
        height: '100%',
        // Width is controlled by the scroll progress state
        width: progressWidth, 
        // The inner div is the PROGRESS BAR (the green color)
        backgroundColor: '#10b981', 
        transition: 'width 0.1s linear', // Smooth animation for growth/shrinkage
      }} />
    </div>
  );
}