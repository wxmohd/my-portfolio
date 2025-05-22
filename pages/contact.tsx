import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

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

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95
  }
};

const socialIconVariants = {
  hover: {
    y: -5,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
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
    <div className="px-4 overflow-hidden min-h-[80vh] flex flex-col justify-center py-12">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />
      
      <motion.section 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div 
            className="inline-block relative mb-2 bg-white p-4 rounded-full shadow-md"
            animate={{ 
              y: [0, -10, 0],
              transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <FaEnvelope className="text-indigo-600" size={32} />
          </motion.div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Get In Touch</span>
          </h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-700 text-lg max-w-xl mx-auto font-light leading-relaxed">
            I'm open to collaboration, projects, or just a friendly chat! 
            Drop me a message and I'll get back to you soon.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-xl relative overflow-hidden border border-gray-100"
        >
          {/* Decorative tech elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 rounded-full blur-xl -z-10" />
          
          {isSubmitted ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div 
                className="mb-4 inline-block bg-indigo-100 p-5 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                  boxShadow: [
                    '0 0 0 rgba(79, 70, 229, 0.4)',
                    '0 0 20px rgba(79, 70, 229, 0.6)',
                    '0 0 0 rgba(79, 70, 229, 0.4)'
                  ],
                  transition: { repeat: 2, duration: 0.6 }
                }}
              >
                <FaPaperPlane className="text-indigo-600" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-2">Message Sent!</h3>
              <p className="text-gray-700">Thank you for reaching out. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white shadow-sm"
                  placeholder="Your name"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white shadow-sm"
                  placeholder="your.email@example.com"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white shadow-sm"
                  placeholder="Your message here..."
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-right">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:bg-indigo-700 transition-colors relative overflow-hidden"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Button content */}
                  <div className="flex items-center justify-center gap-2 z-10 relative">
                    <FaPaperPlane className="h-5 w-5" />
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                  </div>
                  
                  {/* Loading animation */}
                  {isSubmitting && (
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 -z-0"
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 1.5 }}
                    />
                  )}
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-10 text-center"
        >
          <motion.a 
            href="https://github.com/wxmohd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
              <FaGithub size={28} className="text-gray-800 group-hover:text-indigo-600 transition-colors" />
            </div>
            <p className="mt-3 text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">GitHub</p>
          </motion.a>
          
          <motion.a 
            href="https://linkedin.com/in/wxmohd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
              <FaLinkedin size={28} className="text-gray-800 group-hover:text-indigo-600 transition-colors" />
            </div>
            <p className="mt-3 text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">LinkedIn</p>
          </motion.a>
          
          <motion.a 
            href="mailto:yourname@example.com" 
            className="group"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
              <FaEnvelope size={28} className="text-gray-800 group-hover:text-indigo-600 transition-colors" />
            </div>
            <p className="mt-3 text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">Email</p>
          </motion.a>
        </motion.div>
      </motion.section>
    </div>
  )
}