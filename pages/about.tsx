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

const terminalCommands = [
  { command: 'whoami', output: 'security-enthusiast' },
  { command: 'nmap -sV localhost', output: 'Starting Nmap scan...Scanning localhost...\n\nPORT     STATE  SERVICE\n22/tcp   open   ssh\n80/tcp   open   http\n443/tcp  open   https\n\nNmap done: 1 IP address scanned' },
  { command: 'cat /etc/passwd', output: 'Permission denied: Nice try! 😉' },
]

interface SecuritySkill {
  category: string;
  examples: string;
  level: number;
  color: string;
}

export default function AboutSection() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const securitySkills: SecuritySkill[] = [
    {
      category: "Network Security",
      examples: "Subnetting, static routing, ACLs",
      level: 3,
      color: "from-blue-600 to-cyan-500"
    },
    {
      category: "Threat Detection & SIEM",
      examples: "Wazuh, Suricata, alert tuning",
      level: 4,
      color: "from-violet-600 to-purple-500"
    },
    {
      category: "Security Automation & SOAR",
      examples: "Wazuh webhooks, Shuffle workflows, automated email alerts",
      level: 2,
      color: "from-red-600 to-orange-500"
    },
    {
      category: "Security Monitoring",
      examples: "PowerShell logs, DeepBlueCLI, auditlog",
      level: 3,
      color: "from-emerald-600 to-green-500"
    },
    {
      category: "Penetration Testing",
      examples: "Netcat, Metasploit, enumeration",
      level: 2,
      color: "from-fuchsia-600 to-pink-500"
    },
    {
      category: "Threat Intelligence",
      examples: "VirusTotal, MISP, indicator logging",
      level: 2,
      color: "from-amber-600 to-yellow-500"
    }
  ];

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
        <div className="relative mb-8">
          <motion.div 
            className="absolute -inset-10 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-3xl opacity-70 z-0"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.h1
            className="text-5xl font-bold text-darkPurple mb-6 tracking-tight relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">About</span>
          </motion.h1>
          
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          <motion.p
            className="text-gray-700 mb-10 max-w-2xl mx-auto font-light text-lg leading-relaxed relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I'm a<span className="mx-1"></span>
            <span className="font-medium text-indigo-600 relative inline-block">
            cybersecurity student
              <motion.span 
                className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-indigo-300"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </span> and aspiring full-stack developer with a passion for secure, efficient, and modern applications. 
            I explore the intersection of ethical hacking, frontend/backend development to build 
            real-world solutions that are both functional and resilient. Below are the key technologies I work with:
          </motion.p>
        </div>
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
        className="mb-12"
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
        
        {/* Security Skills - Floating Cards */}
        <div className="relative py-4 px-2 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10 z-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-5 right-10 w-60 h-60 bg-indigo-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div>
          </div>
          
          {/* Header */}
          <motion.div 
            className="relative z-10 flex items-center justify-between mb-8 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-blue-100"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="mr-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Security Expertise</h3>
            </div>
            <span className="text-xs text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200 flex items-center shadow-sm">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-1.5 animate-pulse"></span>
              2025 Edition
            </span>
          </motion.div>
          
          {/* Interactive Floating Skill Cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
            {securitySkills.map((skill, index) => (
              <motion.div
                key={skill.category}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div 
                  className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 h-full flex flex-col overflow-hidden relative group`}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Colored accent */}
                  <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${skill.color} rounded-l-lg`}></div>
                  
                  {/* Skill header */}
                  <div className="flex flex-wrap items-center mb-2 sm:mb-3 pl-2">
                    <h4 className="text-gray-800 font-bold text-sm sm:text-base">{skill.category}</h4>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < skill.level ? `text-${skill.color.split(' ')[1]}` : 'text-gray-200'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {i < skill.level && (
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                              animate={{ opacity: [0, 0.5, 0], x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: i * 0.5 + 2 }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Skill details */}
                  <div className="bg-gradient-to-br from-gray-50 to-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm text-gray-600 font-mono flex-grow flex items-center border border-gray-100 shadow-inner">
                    {skill.examples}
                  </div>
                  
                  {/* Animated glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Interactive Terminal */}
      <div className="mb-16 flex justify-center">
        <motion.div
          className="rounded-lg overflow-hidden shadow-xl terminal-animation border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 relative bg-black max-h-[280px] inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.15)' }}
        >
          {/* Terminal glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-lg blur-sm"></div>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1 flex items-center border-b border-gray-700/50">
            <div className="flex space-x-2">
              <motion.div 
                className="w-2.5 h-2.5 bg-red-500 rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div 
                // className="w-2.5 h-2.5 bg-yellow-500 rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="w-2.5 h-2.5 bg-green-500 rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
            </div>
            <p className="text-gray-400 text-xs ml-3 flex-1 text-center font-mono">security-terminal</p>
          </div>
          <div className="p-3 font-mono text-xs text-green-400 whitespace-pre overflow-auto min-w-[400px]">
            {terminalText}
            {showCursor && <span className="animate-pulse">▋</span>}
          </div>
        </motion.div>
      </div>

    </div>
  )
}
