import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active section based on scroll position
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll position
  const updateActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '/';
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        currentSection = `/${section.id}`;
        if (section.id === 'home') currentSection = '/';
      }
    });
    
    setActiveSection(currentSection);
  };
  
  // Scroll to section when clicking on nav item
  const scrollToSection = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    let targetId = path.replace('/', '');
    if (path === '/') targetId = 'home';
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  // Initialize active section on mount
  useEffect(() => {
    updateActiveSection();
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 transition-all duration-500">
      {/* Animated background with geometric patterns */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: isScrolled ? 
            'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(23, 37, 84, 0.9))' : 
            'linear-gradient(135deg, rgba(173, 216, 230, 0.8), rgba(135, 206, 235, 0.8))',
          backdropFilter: 'blur(10px)',
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Animated grid lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: isScrolled ?
              `linear-gradient(to right, rgba(0, 191, 255, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0, 191, 255, 0.1) 1px, transparent 1px)` :
              `linear-gradient(to right, rgba(0, 120, 215, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0, 120, 215, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.5,
            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'perspective(500px) rotateX(10deg)',
            transformOrigin: 'top'
          }}
        />
        
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full tech-pulse"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: isScrolled ? 'rgba(0, 255, 255, 0.4)' : 'rgba(0, 120, 215, 0.4)',
              boxShadow: isScrolled ? '0 0 10px rgba(0, 255, 255, 0.7)' : '0 0 10px rgba(0, 120, 215, 0.7)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
              transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Horizontal line with animated pulse */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: isScrolled ? 
              'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.7), transparent)' : 
              'linear-gradient(to right, transparent, rgba(0, 120, 215, 0.7), transparent)',
            opacity: 1,
            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
      
      {/* Main navbar content */}
      <div className="max-w-6xl mx-auto px-6 py-3 relative z-10">
        <div className="flex flex-col space-y-2">
          {/* Top row with logo and social links */}
          <div className="flex justify-between items-center">
            {/* Tech Logo with 3D effect */}
            <div className="relative group transform perspective-[800px] hover:rotate-y-12 transition-all duration-700">
              <Link href="/" className="flex items-center">
                <div className="relative overflow-hidden p-1">
                  {/* Animated circuit board background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.5) 1px, transparent 1px),
                        radial-gradient(circle at 90% 80%, rgba(0, 191, 255, 0.5) 1px, transparent 1px),
                        linear-gradient(to right, rgba(0, 191, 255, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 191, 255, 0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px, 20px 20px, 10px 10px, 10px 10px',
                    }}
                  />
                  
                  <div className="flex items-center space-x-1">
                    {/* 3D text effect */}
                    <div className="relative">
                      {/* Shadow layer */}
                      <span 
                        className="absolute text-2xl font-tech font-bold tracking-wider text-transparent"
                        style={{
                          textShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)',
                          transform: 'translateX(2px) translateY(2px)',
                          filter: 'blur(2px)'
                        }}
                      >
                        WALAA
                      </span>
                      
                      {/* Main text with gradient */}
                      <span 
                        className="relative text-2xl font-tech font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 transform transition-all duration-500 group-hover:scale-110"
                        style={{
                          textShadow: '0 0 15px rgba(0, 200, 255, 0.5)',
                        }}
                      >
                        WALAA
                      </span>
                    </div>
                    
                    {/* Animated dot with rays */}
                    <div className="relative">
                      <div 
                        className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"
                        style={{
                          boxShadow: '0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff',
                        }}
                      />
                      
                      {/* Animated rays */}
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute w-[1px] bg-cyan-400/50"
                          style={{
                            height: '8px',
                            top: '50%',
                            left: '50%',
                            transformOrigin: 'bottom center',
                            transform: `rotate(${i * 45}deg) translateY(-8px)`,
                            animation: `pulse 1.5s infinite ${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech circuit frame */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400/70"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400/70"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-400/70"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-400/70"></div>
                  
                  {/* Animated data flow lines */}
                  <div 
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0"
                    style={{
                      width: '100%',
                      animation: 'dataFlow 2s infinite linear'
                    }}
                  />
                </div>
              </Link>
            </div>
            
            {/* Social links with interactive effects */}
            <div className="flex space-x-4">
              {/* GitHub */}
              <a 
                href="https://github.com/wxmohd" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-300 tech-glow"></div>
                <div className="relative p-2 rounded-lg bg-darkBlue/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-darkBlue/50 group-hover:scale-110 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="tech-pulse">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/walaa-mohamed-b28604251" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-300 tech-glow"></div>
                <div className="relative p-2 rounded-lg bg-darkBlue/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-darkBlue/50 group-hover:scale-110 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="tech-pulse">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>
          </div>
          
          {/* Bottom row with navigation links */}
          <div className="hidden md:flex justify-center items-center">
            {/* Advanced navigation with 3D hover effects */}
            <div className="relative">
              {/* Background with animated gradient border */}
              <div className="relative bg-darkBlue/20 backdrop-blur-md rounded-xl p-1 flex items-center shadow-lg border border-cyan-500/20 overflow-hidden">
                {/* Animated background glow */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-600/5 to-indigo-700/5"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'gradientMove 8s linear infinite'
                  }}
                />
                
                {/* Navigation items with advanced hover effects */}
                <div className="flex space-x-1 relative z-10">
                  {navItems.map((item, index) => (
                    <div
                      key={item.path}
                      className="relative group"
                    >
                      <Link 
                        href={item.path} 
                        onClick={(e) => scrollToSection(e, item.path)}
                        className="relative px-4 py-2 flex items-center justify-center overflow-hidden rounded-lg transition-all duration-300"
                      >
                        {/* Background effects */}
                        {activeSection === item.path && (
                          <div className="absolute inset-0 bg-darkBlue/40 tech-glow rounded-lg border border-cyan-400/30"></div>
                        )}
                        
                        {/* Hover spotlight effect */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
                          }}
                        />
                        
                        {/* Text with glow effect */}
                        <span 
                          className={`relative z-10 font-mono text-sm tracking-wide ${activeSection === item.path ? 'text-cyan-400 font-bold' : 'text-gray-300 group-hover:text-cyan-300'}`}
                          style={{
                            textShadow: activeSection === item.path ? '0 0 8px rgba(0, 255, 255, 0.5)' : 'none'
                          }}
                        >
                          {item.name}
                        </span>
                        
                        {/* Bottom indicator line */}
                        <div 
                          className={`absolute bottom-0 left-1/2 w-0 h-[2px] bg-cyan-400 transition-all duration-300 ${activeSection === item.path ? 'w-4/5 -translate-x-1/2' : 'group-hover:w-1/2 group-hover:-translate-x-1/4'}`}
                          style={{
                            boxShadow: '0 0 5px rgba(0, 255, 255, 0.7)'
                          }}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400/70"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400/70"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400/70"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400/70"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-darkBlue/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-darkBlue/50 hover:scale-105 focus:outline-none"
        >
          <div
            className="transition-transform duration-300"
            style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-darkBlue/95 backdrop-blur-lg z-40 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Mobile menu background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 191, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 191, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
          
          {/* Animated particles */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                backgroundColor: 'rgba(0, 255, 255, 0.3)',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.5,
                animation: `pulse ${Math.random() * 3 + 2}s infinite, float ${Math.random() * 10 + 10}s infinite`
              }}
            />
          ))}
        </div>
        
        {/* Mobile menu content */}
        <div className="relative h-full flex flex-col justify-center items-center p-6">
          <div className="space-y-6 w-full max-w-md">
            {navItems.map((item, index) => (
              <div
                key={item.path}
                className="transform transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'slideIn 0.3s forwards',
                }}
              >
                <Link 
                  href={item.path} 
                  onClick={(e) => scrollToSection(e, item.path)}
                  className={`group flex items-center justify-center py-3 px-4 rounded-lg border border-cyan-500/20 backdrop-blur-sm transition-all duration-300 ${activeSection === item.path ? 'bg-darkBlue/40 text-cyan-400 border-cyan-400/30' : 'bg-darkBlue/20 text-gray-300 hover:bg-darkBlue/30 hover:text-cyan-300'}`}
                >
                  {/* Animated background */}
                  <div 
                    className={`absolute inset-0 rounded-lg ${activeSection === item.path ? 'tech-glow' : ''}`}
                    style={{
                      background: activeSection === item.path ? 
                        'radial-gradient(circle at center, rgba(0, 255, 255, 0.15) 0%, transparent 70%)' : 
                        'transparent',
                    }}
                  />
                  
                  {/* Text with tech effect */}
                  <span className="relative z-10 font-mono tracking-wide text-lg">
                    {item.name}
                    
                    {/* Animated underline */}
                    <span 
                      className={`absolute bottom-0 left-0 h-[1px] bg-cyan-400 transition-all duration-500 ${activeSection === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                      style={{
                        boxShadow: '0 0 5px rgba(0, 255, 255, 0.7)'
                      }}
                    />
                  </span>
                </Link>
              </div>
            ))}
            
            {/* Social links */}
            <div className="flex justify-center space-x-6 mt-10">
              <a 
                href="https://github.com/wxmohd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-darkBlue/40 text-cyan-400 border border-cyan-500/30 transition-all duration-300 hover:bg-darkBlue/60 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="tech-pulse">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/walaa-mohamed-b28604251" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-darkBlue/40 text-cyan-400 border border-cyan-500/30 transition-all duration-300 hover:bg-darkBlue/60 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="tech-pulse">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
