import { motion } from 'framer-motion';
import { useState } from 'react';

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

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="px-4 overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-secondary/10 to-accent/10 rounded-full blur-3xl -z-10" />
      
      <motion.section 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div 
            className="inline-block relative mb-2"
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              transition: { repeat: Infinity, duration: 5 }
            }}
          >
            <span className="text-4xl">💌</span>
          </motion.div>
          <h1 className="text-5xl font-fancy gradient-text mb-4">
            Get In Touch
          </h1>
          <p className="text-dark/80 text-lg max-w-xl mx-auto">
            I'm open to collaboration, projects, or just a friendly chat! 
            Drop me a message and I'll get back to you soon.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="card p-8 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Decorative tech elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-xl -z-10" />
          
          {isSubmitted ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div 
                className="text-5xl mb-4 inline-block"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                  transition: { repeat: 2, duration: 0.6 }
                }}
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-fancy text-primary mb-2">Message Sent!</h3>
              <p className="text-dark/70">Thank you for reaching out. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-dark/80 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-lavender focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/70 backdrop-blur-sm"
                  placeholder="Your name"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-dark/80 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-lavender focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/70 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-dark/80 mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-lavender focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/70 backdrop-blur-sm"
                  placeholder="Your message here..."
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary relative overflow-hidden group px-6 py-3 flex items-center justify-center gap-2"
                >
                  {/* Diagonal overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 -skew-x-12 transform origin-top-right z-0"></div>
                  </div>
                  
                  {/* Button content */}
                  <div className="flex items-center justify-center gap-2 z-10 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    {!isSubmitting && <span className="ml-1 text-xs animate-pulse">✨</span>}
                  </div>
                  
                  {/* Animated dot */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Loading animation */}
                  {isSubmitting && (
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end -z-0"
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 1.5 }}
                    />
                  )}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-6 text-center"
        >
          <a href="https://github.com/wxmohd" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-neon transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-dark group-hover:text-primary transition-colors">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <p className="mt-2 text-dark/70 group-hover:text-primary transition-colors">GitHub</p>
          </a>
          
          <a href="https://linkedin.com/in/wxmohd" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-neon transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-dark group-hover:text-primary transition-colors">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <p className="mt-2 text-dark/70 group-hover:text-primary transition-colors">LinkedIn</p>
          </a>
          
          <a href="mailto:yourname@example.com" className="group">
            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-neon transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark group-hover:text-primary transition-colors">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <p className="mt-2 text-dark/70 group-hover:text-primary transition-colors">Email</p>
          </a>
        </motion.div>
      </motion.section>
    </div>
  )
}