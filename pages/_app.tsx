import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps, router }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // Handle initial page load animation
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor variants
  const cursorVariants = {
    default: {
      x: cursorPosition.x - 8,
      y: cursorPosition.y - 8,
      opacity: 0.5,
    },
    hover: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: 32,
      width: 32,
      opacity: 0.8,
      backgroundColor: "rgba(255, 102, 196, 0.5)",
      mixBlendMode: "difference",
    },
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Walaa Mohamed | Creative Developer</title>
        <meta name="description" content="Personal portfolio of Walaa Mohamed, a creative developer with a passion for beautiful design and clean code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        // Loading screen
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-light to-lavender z-50">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-24 h-24 rounded-full border-4 border-transparent border-t-primary border-r-secondary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-2xl font-fancy gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              W
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Custom cursor */}
          <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary z-50 pointer-events-none hidden md:block"
            variants={cursorVariants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          />

          <div className="relative overflow-x-hidden">
            {/* Background decorative elements */}
            <div className="fixed top-0 right-0 w-full h-full overflow-hidden -z-20">
              <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-[100px]" />
              <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/5 to-mint/5 blur-[120px]" />
            </div>

            <Navbar />

            <AnimatePresence mode="wait">
              <motion.main 
                key={router.route}
                className="min-h-screen px-4 pt-20 pb-10"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Component {...pageProps} setCursorVariant={setCursorVariant} />
              </motion.main>
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-6 px-4 text-center text-dark/60 text-sm">
              <div className="max-w-6xl mx-auto">
                <p>© {new Date().getFullYear()} Walaa Mohamed. All rights reserved.</p>
                <p className="mt-2 text-xs">Designed with 💖 and modern tech</p>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
