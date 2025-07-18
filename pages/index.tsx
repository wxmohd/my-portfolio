import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Import components from other pages
import AboutSection from './about';
import ProjectsSection from './projects';
import ContactSection from './contact';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const floatingVariants = {
  floating: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const,
    }
  }
};

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Handle cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsMounted(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      {/* Home Section - Modern Asymmetric Design */}
      <section id="home" className="relative min-h-[100vh] flex items-center pt-16 pb-24 sm:pb-32" style={{ backgroundColor: '#e6f4ff' }}>
        {/* Solid light blue background - no patterns or design elements */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: '#e6f4ff' }}
          />
        </div>

        {/* Main content with asymmetric layout */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left content - Text and buttons */}
          <motion.div 
            className="md:col-span-7 z-10 md:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <motion.div 
                className="inline-block bg-darkBlue/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1 text-sm font-mono text-darkBlue font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 191, 255, 0.15)' }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Cybersecurity Specialist
              </motion.div>
              
              <motion.div 
                className="inline-block bg-darkBlue/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-1 text-sm font-mono text-darkBlue font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 255, 0.15)' }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                Full-Stack Developer
              </motion.div>
            </div>

            {/* Main heading with 3D effect */}
            <div className="relative mb-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight text-darkBlue">
                Hello, I'm{' '}
                <div className="relative inline-block">
                  <span 
                    className="relative z-10 bg-clip-text text-transparent font-bold text-5xl md:text-7xl" 
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: '-0.02em',
                      background: 'linear-gradient(90deg, #00a2ff, #3a8dff, #00b8ff, #00f2ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Walaa Mohamed
                  </span>
                  <div 
                    className="absolute -bottom-2 left-0 w-full h-1"
                    style={{ backgroundColor: '#00a2ff', boxShadow: 'none' }}
                  ></div>
                </div>
              </h1>
            </div>

            {/* Enhanced description with cybersecurity and development focus */}
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-dark font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Bridging the gap between <span className="font-semibold text-darkBlue">secure systems</span> and <br className="hidden md:block" />
              <span className="font-semibold text-darkBlue">cutting-edge</span> web development solutions.
            </motion.p>
            
            {/* Animated Tech Icons */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-6 mt-8"
            >
              {['react', 'typescript', 'figma', 'nextjs'].map((tech, index) => (
                <motion.div 
                  key={tech}
                  className="text-dark/70 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {tech === 'react' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                      </svg>
                    )}
                    {tech === 'typescript' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                      </svg>
                    )}
                    {tech === 'figma' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
                      </svg>
                    )}
                    {tech === 'nextjs' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
                      </svg>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action Buttons - Enhanced with cute animations and icons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="#projects" className="btn btn-primary flex items-center justify-center gap-2 px-6 py-3">
                <span className="relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping"></span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <span>View Projects</span>
                <span className="ml-1 animate-bounce inline-block">✨</span>
              </Link>
              <Link href="#contact" className="btn btn-outline relative flex items-center justify-center gap-2 px-6 py-3 overflow-hidden group">
                {/* Diagonal overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 transform origin-top-right z-0"></div>
                </div>
                
                {/* Button content */}
                <div className="flex items-center justify-center gap-2 z-10 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contact Me</span>
                  <span className="ml-1 text-xs relative top-0 animate-pulse">💌</span>
                </div>
                
                {/* Animated dot */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right content - Enhanced 3D profile image */}
          <div 
            className="md:col-span-5 relative z-10 mb-8 sm:mb-12 md:mb-0"
          >
            <div className="relative">
              {/* Simple background effect without animation */}
              <div 
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/30 to-accent/20 rounded-full blur-xl opacity-70" 
              />
              
              {/* Profile image with simple styling - no animations */}
              <div 
                className="relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto mb-8 sm:mb-12 md:mb-0" 
              >
                <img
                  src="/profile.jpg"
                  alt="Walaa Mohamed"
                  className="w-full h-full object-cover"
                />
                
                {/* Simple overlay with subtle gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" 
                />
                
                {/* Decorative corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/40 rounded-tl-sm"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/40 rounded-tr-sm"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/40 rounded-bl-sm"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/40 rounded-br-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Removed scroll indicator */}
      </section>
      
      {/* About Me Section - with smooth transition from Home section */}
      <section id="about" className="py-20 -mt-12 sm:-mt-16 md:mt-0" style={{ backgroundColor: '#e6f4ff' }}>
        <AboutSection />
      </section>
      
      {/* Projects Section - with smooth transition from About section */}
      <section id="projects" className="min-h-[100vh] py-20 pt-24 -mt-12 sm:-mt-16 md:mt-0" style={{ backgroundColor: '#e6f4ff' }}>
        <ProjectsSection />
      </section>
      
      {/* Contact Section - with smooth transition from Projects section */}
      <section id="contact" className="min-h-[100vh] py-20 pt-24 -mt-12 sm:-mt-16 md:mt-0" style={{ backgroundColor: '#e6f4ff' }}>
        <ContactSection />
      </section>
    </div>
  );
}
