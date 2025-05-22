import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaGamepad, FaCode, FaDocker, FaServer, FaReact } from 'react-icons/fa'
import { SiJavascript, SiNextdotjs, SiGo } from 'react-icons/si'
import { BsArrowRight, BsCodeSlash } from 'react-icons/bs'

const projects = [
  {
    title: 'Bomberman DOM',
    description: 'A multiplayer Bomberman game built using a custom mini-framework and DOM manipulation (no canvas/WebGL). Features an Egyptian theme for a unique and fun gaming experience.',
    link: 'https://github.com/wxmohd/bomberman-dom',
    demoLink: '#',
    tags: ['JavaScript', 'DOM', 'Game Development', 'Custom Framework'],
    icon: <FaGamepad className="text-red-500" size={24} />,
    tech: ['JavaScript', 'HTML5', 'CSS3']
  },
  {
    title: 'Mini JS Framework',
    description: 'A lightweight, zero-dependency JavaScript framework for building modern web applications. Features virtual DOM, state management, routing system, and event bus.',
    link: 'https://github.com/wxmohd/mini-framework',
    demoLink: '#',
    tags: ['Framework', 'JavaScript', 'Virtual DOM'],
    icon: <SiJavascript className="text-yellow-500" size={24} />,
    tech: ['JavaScript'],
    features: [
      { name: 'Virtual DOM', description: 'Efficient DOM manipulation without direct browser interactions' },
      { name: 'State Management', description: 'Centralized application state with reactive updates' },
      { name: 'Routing System', description: 'Simple hash-based routing for single-page applications' },
      { name: 'Event Bus', description: 'Custom event handling for component communication' }
    ]
  },
  {
    title: 'Social Network Application with Docker',
    description: 'A social network application with a Go backend and Next.js frontend, containerized using Docker. Features two main containers for backend and frontend services.',
    link: 'https://github.com/wxmohd/social-network',
    demoLink: '#',
    tags: ['Docker', 'Go', 'Next.js', 'Full Stack'],
    icon: <FaDocker className="text-blue-500" size={24} />,
    tech: ['Go', 'Next.js', 'Docker', 'WebSocket'],
    dockerSetup: [
      { name: 'Backend Container', description: 'Go application that handles server-side logic, database interactions, and WebSocket connections' },
      { name: 'Frontend Container', description: 'Next.js application that serves the client-side interface' }
    ]
  }
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1
          className="text-5xl font-bold text-darkPurple mb-4 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">My Recent Projects</span>
        </motion.h1>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto text-lg font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A showcase of my technical projects and coding experiments. 
          {/* <span className="font-medium">Created by: <span className="text-indigo-600">Walaa Mohamed (wamohamed)</span></span> */}
        </motion.p>
      </div>

      {/* Featured Projects */}
      <div className="space-y-16">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="mr-4 p-3 bg-gray-100 rounded-lg">
                    {project.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                    {project.title}
                  </h2>
                </div>
                <div className="flex space-x-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mr-4">Tech Stack:</h3>
                <div className="flex space-x-3">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="text-gray-700 font-medium">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Conditional rendering for features or docker setup */}
              {'features' in project && (
                <div className="mt-6">
                  <motion.button
                    className="flex items-center text-indigo-600 font-medium"
                    onClick={() => setActiveProject(activeProject === i ? null : i)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>View Features</span>
                    <BsArrowRight className="ml-2" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeProject === i && (
                      <motion.div 
                        className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-700 mb-2 flex items-center">
                              <BsCodeSlash className="mr-2" /> {feature.name}
                            </h4>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {'dockerSetup' in project && (
                <div className="mt-6">
                  <motion.button
                    className="flex items-center text-indigo-600 font-medium"
                    onClick={() => setActiveProject(activeProject === i ? null : i)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>View Docker Setup</span>
                    <BsArrowRight className="ml-2" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeProject === i && (
                      <motion.div 
                        className="mt-4 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.dockerSetup.map((container, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                              {idx === 0 ? <FaServer className="mr-2" /> : <FaReact className="mr-2" />}
                              {container.name}
                            </h4>
                            <p className="text-gray-600 text-sm">{container.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Projects Link */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a 
          href="https://github.com/wxmohd" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
        >
          <FaGithub className="mr-2" size={18} />
          <span>View More Projects on GitHub</span>
        </a>
      </motion.div>
    </div>
  )
}
