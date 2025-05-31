import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaShieldAlt, FaTerminal, FaCode, FaLock, FaSearch, FaUserAlt, FaLaptopCode, FaBolt } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiWireshark, SiKalilinux, SiMetasploit, SiGo } from 'react-icons/si'
import { GrVulnerability } from 'react-icons/gr'
import { BiSolidAnalyse } from 'react-icons/bi'
import { RiShieldKeyholeFill, RiUserHeartLine } from 'react-icons/ri'
import { BsShieldLock, BsFileEarmarkCode } from 'react-icons/bs'
import { MdSecurity, MdTimeline } from 'react-icons/md'

// Icon animation variants
const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

const techSkills = [
  { name: 'React', icon: <motion.div whileHover="hover" variants={iconVariants}><FaReact size={40} className="text-blue-500" /></motion.div> },
  { name: 'Next.js', icon: <motion.div whileHover="hover" variants={iconVariants}><SiNextdotjs size={40} className="text-black" /></motion.div> },
  { name: 'Tailwind', icon: <motion.div whileHover="hover" variants={iconVariants}><SiTailwindcss size={40} className="text-cyan-400" /></motion.div> },
  { name: 'TypeScript', icon: <motion.div whileHover="hover" variants={iconVariants}><SiTypescript size={40} className="text-blue-700" /></motion.div> },
  { name: 'Python', icon: <motion.div whileHover="hover" variants={iconVariants}><FaPython size={40} className="text-yellow-500" /></motion.div> },
  { name: 'HTML5', icon: <motion.div whileHover="hover" variants={iconVariants}><FaHtml5 size={40} className="text-orange-500" /></motion.div> },
  { name: 'CSS3', icon: <motion.div whileHover="hover" variants={iconVariants}><FaCss3Alt size={40} className="text-blue-600" /></motion.div> },
  { name: 'Node.js', icon: <motion.div whileHover="hover" variants={iconVariants}><FaNodeJs size={40} className="text-green-600" /></motion.div> },
  { name: 'Git', icon: <motion.div whileHover="hover" variants={iconVariants}><FaGitAlt size={40} className="text-red-500" /></motion.div> },
  { name: 'Golang', icon: <motion.div whileHover="hover" variants={iconVariants}><SiGo size={40} className="text-cyan-600" /></motion.div> },
]

// Cyber icon animation variants
const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
}

const cyberSkills = [
  { 
    category: 'SIEM', 
    tools: ['Wazuh', 'Suricata', 'Sysmon'],
    icon: <motion.div variants={pulseVariants} animate="pulse"><FaShieldAlt size={28} className="text-blue-600" /></motion.div>
  },
  { 
    category: 'Threat Intel', 
    tools: ['VirusTotal', 'AlienVault', 'MISP'],
    icon: <motion.div variants={pulseVariants} animate="pulse"><FaSearch size={28} className="text-purple-600" /></motion.div>
  },
  { 
    category: 'Blue Team', 
    tools: ['MITRE ATT&CK', 'Cyber Kill Chain', 'FIM'],
    icon: <motion.div variants={pulseVariants} animate="pulse"><RiShieldKeyholeFill size={28} className="text-indigo-600" /></motion.div>
  },
  { 
    category: 'Languages', 
    tools: ['Python (threat detection)', 'PowerShell (enumeration)'],
    icon: <motion.div variants={pulseVariants} animate="pulse"><FaCode size={28} className="text-green-500" /></motion.div>
  },
]

const terminalCommands = [
  { command: 'whoami', output: 'security-enthusiast' },
  { command: 'nmap -sV localhost', output: 'Starting Nmap scan...\nScanning localhost...\nPort 80/tcp open  http\nPort 443/tcp open https\nPort 22/tcp open  ssh\nNmap done: 1 IP address scanned' },
  { command: 'cat /etc/passwd', output: 'Permission denied: Nice try! 😉' },
]

interface CVE {
  id: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  published: string;
}

export default function AboutSection() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [mockCVEs, setMockCVEs] = useState<CVE[]>([
    { id: 'CVE-2023-45698', description: 'Buffer overflow in OpenSSL', severity: 'Critical', published: '2023-11-15' },
    { id: 'CVE-2023-38831', description: 'Remote code execution in PDF reader', severity: 'High', published: '2023-10-22' },
    { id: 'CVE-2023-29200', description: 'SQL injection vulnerability in CMS', severity: 'Medium', published: '2023-09-05' },
  ]);

  // Check when terminal is visible
  useEffect(() => {
    const handleScroll = () => {
      const terminalElement = document.querySelector('.terminal-animation');
      if (terminalElement) {
        const rect = terminalElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible && !terminalVisible) {
          setTerminalVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [terminalVisible]);

  // Terminal animation effect - only starts when terminal is visible
  useEffect(() => {
    if (!terminalVisible || currentCommand >= terminalCommands.length) return;
    
    const command = terminalCommands[currentCommand].command;
    const output = terminalCommands[currentCommand].output;
    
    let charIndex = 0;
    let outputStarted = false;
    let fullText = '$ ';
    
    const typingInterval = setInterval(() => {
      if (!outputStarted) {
        if (charIndex < command.length) {
          fullText += command[charIndex];
          charIndex++;
        } else {
          fullText += '\n';
          outputStarted = true;
          charIndex = 0;
        }
      } else {
        if (charIndex < output.length) {
          fullText += output[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTerminalText(fullText + '\n\n$ ');
            setCurrentCommand(prev => prev + 1);
          }, 1000);
          return;
        }
      }
      
      setTerminalText(fullText);
    }, 50);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [currentCommand, terminalVisible]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Intro */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl font-fancy text-darkPurple mb-6 font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">About Me</span> <span className="inline-flex items-center ml-2"><RiUserHeartLine className="text-red-500 mr-1" size={24} /><FaLaptopCode className="text-indigo-500" size={24} /></span>
        </motion.h1>

        <motion.p
          className="text-gray-700 mb-10 max-w-2xl mx-auto font-light text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I'm a tech-lover with a soft spot for creativity and clean code. I enjoy building beautiful interfaces, <span className="font-medium text-indigo-600">exploring cybersecurity</span>, and learning new tools. Here's a glimpse of my toolbox:
        </motion.p>
      </motion.div>

      {/* Development Skills Grid */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-darkPurple mb-8 text-center relative inline-block">
          <span className="relative z-10">Development Stack</span>
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-300 z-0" 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
          {techSkills.map((skill, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {skill.icon}
              <p className="mt-2 text-sm text-darkPurple font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cyber Security Skills */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-darkPurple mb-8 text-center relative inline-block">
          <span className="relative z-10"><BsShieldLock className="inline-block mr-2 text-blue-600" size={20} /> Cyber Skills & Tools</span>
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-2 bg-blue-300 z-0" 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cyberSkills.map((category, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="ml-3 text-lg font-bold text-darkPurple">{category.category}</h3>
              </div>
              <ul className="space-y-2">
                {category.tools.map((tool, j) => (
                  <li key={j} className="text-gray-700 flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-indigo-500 rounded-full mr-2"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.5, backgroundColor: "#4F46E5" }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="font-medium">{tool}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Terminal and CVE Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Terminal */}
        <motion.div
          className="bg-gray-900 rounded-xl overflow-hidden shadow-xl terminal-animation"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm ml-4 flex-1 text-center">security-terminal</p>
          </div>
          <div className="p-4 font-mono text-sm text-green-400 h-64 overflow-y-auto">
            {terminalText}
            {showCursor && <span className="animate-pulse">▋</span>}
          </div>
        </motion.div>

        {/* CVE Feed */}
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-darkPurple px-4 py-3">
            <h3 className="text-white font-semibold flex items-center">
              <GrVulnerability className="mr-2 text-white" />
              Latest CVE Vulnerabilities
            </h3>
          </div>
          <div className="divide-y">
            {mockCVEs.map((cve, i) => (
              <motion.div 
                key={i} 
                className="p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-mono text-blue-600 font-semibold">{cve.id}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cve.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    cve.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    cve.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {cve.severity}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1">{cve.description}</p>
                <p className="text-gray-500 text-xs">Published: {cve.published}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  )
}
