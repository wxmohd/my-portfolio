import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaGamepad, FaCode, FaDocker, FaServer, FaReact, FaRobot, FaEye } from 'react-icons/fa'
import { SiJavascript, SiNextdotjs, SiGo } from 'react-icons/si'
import { BsArrowRight, BsCodeSlash } from 'react-icons/bs'

const projects = [
  {
    title: 'PhishSecure Bahrain',
    description: 'A full-stack Cyber Threat Intelligence (CTI) platform monitoring phishing threats targeting Bahrain\'s banking, telecom, government, and business sectors. Collects real threat indicators from live public feeds, scores them for Bahrain relevance, and surfaces them through a Next.js dashboard deployed on Vercel with a Flask API backend on Render.',
    link: 'https://github.com/wxmohd/PhishSecure',
    demoLink: 'https://phishsecure.onrender.com',
    tags: ['CTI', 'Next.js', 'Flask', 'Cybersecurity'],
    icon: <FaCode className="text-red-500" size={24} />,
    tech: ['Next.js', 'TypeScript', 'Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Tailwind CSS', 'Framer Motion'],
    features: [
      { name: 'Live Threat Collection', description: 'Pulls real indicators from URLhaus, PhishTank, AbuseIPDB, Censys, and AlienVault OTX via async multi-source collection' },
      { name: 'Bahrain Relevance Scoring', description: 'Scores each indicator (0–100) based on Bahrain brand keywords, .bh TLD, sector detection, and Arabic/English keyword matching' },
      { name: 'CTI Dashboard', description: 'Polls live stats every 30s — total indicators, high-threat count, daily trend chart, sector breakdown, and recent threat cards' },
      { name: 'Domain Analysis', description: 'Manual domain lookup with heuristic threat scoring, brand impersonation detection, and recommended action' }
    ]
  },
  {
    title: 'Secure Trace AI',
    description: 'A fully autonomous AI-driven penetration testing agent that plans, executes, and adapts security assessments end-to-end — no manual prompting required. The agent runs an Observe → Reason → Act loop powered by Claude (Anthropic) or GPT-4o, using 19 specialized security tools across a structured 3-phase assessment. All findings are surfaced in a live dashboard and exported as a professional PDF report.',
    link: 'https://github.com/wxmohd/Flooss-Guard',
    demoLink: '#',
    tags: ['AI Agent', 'Python', 'Flask', 'Cybersecurity'],
    icon: <FaRobot className="text-purple-400" size={24} />,
    tech: ['Python', 'Flask', 'Claude AI', 'GPT-4o', 'SQLite', 'PostgreSQL', 'ReportLab'],
    features: [
      { name: 'Autonomous Agent', description: 'Observe → Reason → Act loop with full LLM reasoning trace — no manual prompting required' },
      { name: '19 Security Tools', description: 'XSS, SQLi, CORS, IDOR, header analysis, directory listing, open redirect, path traversal, and more' },
      { name: 'Live Dashboard', description: 'Real-time scan progress via WebSocket, severity charts, and findings table' },
      { name: 'PDF Reports', description: 'Professional branded reports with cover page, findings, evidence, remediation, and agent trace' }
    ]
  },
  {
    title: 'Image-Inspector',
    description: 'A command-line digital forensics tool that analyzes images to uncover hidden information. Extracts EXIF metadata — including GPS location, device details, and timestamps — and detects steganographically concealed data such as PGP keys appended beyond the JPEG end marker. Built as an installable Python package with a clean CLI.',
    link: 'https://github.com/wxmohd/image-inspector',
    demoLink: '#',
    tags: ['Digital Forensics', 'Python', 'CLI', 'Steganography'],
    icon: <FaCode className="text-cyan-400" size={24} />,
    tech: ['Python', 'Pillow', 'pip / setuptools'],
    features: [
      { name: 'EXIF Metadata Extraction', description: 'Pulls geolocation (converted from DMS to decimal), camera make/model, and capture timestamps from image files' },
      { name: 'Steganography Detection', description: 'Scans raw bytes beyond the JPEG end marker (0xFFD9) to detect and extract hidden PGP key blocks' },
      { name: 'Flexible CLI', description: 'Composable flags (-m, -s, -o) to run metadata extraction, steganography detection, or both, with output saved to file' },
      { name: 'Installable Package', description: 'Registered as a system-wide command via pip install -e . with a structured package layout and tests' }
    ]
  },
  {
    title: 'Emotions Detector',
    description: 'A computer vision system that detects facial emotions from webcam video streams using Convolutional Neural Networks (CNNs). Detects faces in real-time using OpenCV, preprocesses frames into normalized face regions, and outputs live emotion predictions with confidence scores across 7 emotion classes.',
    link: 'https://github.com/wxmohd/emotions-detector',
    demoLink: '#',
    tags: ['Computer Vision', 'Deep Learning', 'Python', 'CNN'],
    icon: <FaEye className="text-green-400" size={24} />,
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit', 'NumPy', 'Pandas'],
    features: [
      { name: 'Real-time Detection', description: 'Processes webcam video streams at ~30 FPS, detecting faces and predicting emotions with confidence scores' },
      { name: '7 Emotion Classes', description: 'Classifies Happy, Sad, Angry, Surprise, Fear, Disgust, and Neutral from 48×48 grayscale face images' },
      { name: 'CNN Architecture', description: '3 convolutional blocks with batch normalization, dropout, and data augmentation to handle class imbalance' },
      { name: 'Streamlit Interface', description: 'Interactive web UI for model evaluation, real-time detection, training results, and integration tests' }
    ]
  }
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">My Recent Projects</span>
        </motion.h1>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.p 
          className="text-muted max-w-2xl mx-auto text-base sm:text-lg font-light px-2"
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
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="p-4 sm:p-6 md:p-10">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-white/10 rounded-lg shrink-0">
                    {project.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    {project.title}
                  </h2>
                </div>
                <div className="flex">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-white/10 text-light rounded-lg hover:bg-primary/20 border border-white/10 hover:border-primary/30 transition"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                </div>
              </div>

              <p className="text-muted mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <h3 className="text-sm uppercase tracking-wider text-muted mr-4">Tech Stack:</h3>
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-3 min-w-max pb-2">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="text-light font-medium whitespace-nowrap">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conditional rendering for features or docker setup */}
              {'features' in project && (
                <div className="mt-6">
                  <motion.button
                    className="flex items-center text-primary font-medium"
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
                          <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <h4 className="font-bold text-primary mb-2 flex items-center">
                              <BsCodeSlash className="mr-2" /> {feature.name}
                            </h4>
                            <p className="text-muted text-sm">{feature.description}</p>
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
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition shadow-lg hover:shadow-xl"
        >
          <FaGithub className="mr-2" size={18} />
          <span>View More Projects on GitHub</span>
        </a>
      </motion.div>
    </div>
  )
}
