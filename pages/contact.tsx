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
  return (
    <div className="px-4 overflow-hidden min-h-[80vh] flex flex-col justify-center py-12">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      
      <motion.section 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <motion.div 
            className="inline-block relative mb-2 bg-gradient-to-br from-indigo-500 to-blue-500 p-5 rounded-full shadow-lg"
            animate={{ 
              y: [0, -10, 0],
              boxShadow: [
                '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                '0 20px 30px -10px rgba(79, 70, 229, 0.6)',
                '0 10px 25px -5px rgba(79, 70, 229, 0.4)'
              ],
              transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <FaEnvelope className="text-white" size={36} />
          </motion.div>
          <h1 className="text-5xl font-bold text-darkPurple mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Let's Connect</span>
          </h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-700 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out if you'd like to collaborate!
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 sm:p-8 relative overflow-hidden border border-gray-100 mx-4 sm:mx-0"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 rounded-full blur-xl -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left side - Contact Card */}
            <motion.div 
              className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 sm:p-8 rounded-xl border border-indigo-100 shadow-md relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-xl -z-10" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-indigo-600">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaEnvelope className="text-indigo-600" size={18} />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base break-words">walaamohamedj@gmail.com</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaGithub className="text-indigo-600" size={18} />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">github.com/wxmohd</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaLinkedin className="text-indigo-600" size={18} />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">linkedin.com/walaa-mohamed-dev</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Connect Card */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 sm:p-8 rounded-xl border border-blue-100 shadow-md flex flex-col justify-center items-center text-center relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-xl -z-10" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-indigo-600">Connect Directly</h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Click below to send me an email directly</p>
              
              <motion.a
                href="mailto:walaamohamedj@gmail.com"
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 w-full text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaEnvelope size={20} />
                <span>Email Me</span>
              </motion.a>
              {/* <p className="mt-4 text-gray-500 text-sm">Opens your email client with a new draft</p> */}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer space */}
        <div className="h-8 sm:h-16"></div>
      </motion.section>
    </div>
  )
}