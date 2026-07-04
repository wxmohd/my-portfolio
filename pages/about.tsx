import { useState, useEffect, ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaShieldAlt, FaTerminal, FaCode, FaLock, FaSearch, FaUserAlt, FaLaptopCode, FaBolt } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiWireshark, SiKalilinux, SiMetasploit, SiGo } from 'react-icons/si'
import { GrVulnerability } from 'react-icons/gr'
import { BiSolidAnalyse } from 'react-icons/bi'
import { RiShieldKeyholeFill, RiUserHeartLine } from 'react-icons/ri'
import { BsShieldLock, BsFileEarmarkCode } from 'react-icons/bs'
import { MdSecurity, MdTimeline } from 'react-icons/md'
const securityTools = [
  { name: 'Wazuh SIEM',   desc: 'Security monitoring & threat detection', Icon: RiShieldKeyholeFill, color: 'text-purple-400' },
  { name: 'Wireshark',    desc: 'Network protocol analyzer',               Icon: SiWireshark,         color: 'text-blue-400'   },
  { name: 'Kali Linux',   desc: 'Penetration testing distribution',        Icon: SiKalilinux,         color: 'text-red-400'    },
  { name: 'Metasploit',   desc: 'Exploitation framework',                  Icon: SiMetasploit,        color: 'text-orange-400' },
  { name: 'Nmap',         desc: 'Network discovery & security auditing',   Icon: FaSearch,            color: 'text-cyan-400'   },
  { name: 'Suricata',     desc: 'Network threat detection engine',         Icon: FaBolt,              color: 'text-yellow-400' },
  { name: 'Burp Suite',   desc: 'Web security testing',                    Icon: BsFileEarmarkCode,   color: 'text-green-400'  },
  { name: 'Splunk',       desc: 'Log analysis & SIEM',                     Icon: BiSolidAnalyse,      color: 'text-indigo-400' },
  { name: 'OSINT Tools',  desc: 'Open source intelligence',                Icon: MdSecurity,          color: 'text-pink-400'   },
  { name: 'PowerShell',   desc: 'Security automation',                     Icon: FaTerminal,          color: 'text-blue-300'   },
  { name: 'Shuffle',      desc: 'SOAR workflow automation',                Icon: MdTimeline,          color: 'text-violet-400' },
  { name: 'DeepBlueCLI', desc: 'PowerShell log threat hunting',            Icon: FaCode,              color: 'text-slate-300'  },
  { name: 'Netcat',       desc: 'Network connection & pentesting',         Icon: FaLaptopCode,        color: 'text-emerald-400'},
  { name: 'VirusTotal',   desc: 'File & URL threat analysis',              Icon: FaShieldAlt,         color: 'text-green-400'  },
  { name: 'MISP',         desc: 'Threat intelligence platform',            Icon: FaLock,              color: 'text-amber-400'  },
]

const techSkills = [
  { name: 'React',      Icon: FaReact,       color: 'text-blue-400',   glow: 'rgba(96,165,250,1)',   border: 'rgba(96,165,250,0.4)'  },
  { name: 'Next.js',    Icon: SiNextdotjs,   color: 'text-slate-200',  glow: 'rgba(226,232,240,1)',  border: 'rgba(226,232,240,0.3)' },
  { name: 'Tailwind',   Icon: SiTailwindcss, color: 'text-cyan-400',   glow: 'rgba(34,211,238,1)',   border: 'rgba(34,211,238,0.4)'  },
  { name: 'TypeScript', Icon: SiTypescript,  color: 'text-blue-500',   glow: 'rgba(59,130,246,1)',   border: 'rgba(59,130,246,0.4)'  },
  { name: 'Python',     Icon: FaPython,      color: 'text-yellow-400', glow: 'rgba(250,204,21,1)',   border: 'rgba(250,204,21,0.4)'  },
  { name: 'HTML5',      Icon: FaHtml5,       color: 'text-orange-500', glow: 'rgba(249,115,22,1)',   border: 'rgba(249,115,22,0.4)'  },
  { name: 'CSS3',       Icon: FaCss3Alt,     color: 'text-blue-400',   glow: 'rgba(59,130,246,1)',   border: 'rgba(59,130,246,0.4)'  },
  { name: 'Node.js',    Icon: FaNodeJs,      color: 'text-green-500',  glow: 'rgba(34,197,94,1)',    border: 'rgba(34,197,94,0.4)'   },
  { name: 'Git',        Icon: FaGitAlt,      color: 'text-red-500',    glow: 'rgba(239,68,68,1)',    border: 'rgba(239,68,68,0.4)'   },
  { name: 'Golang',     Icon: SiGo,          color: 'text-cyan-500',   glow: 'rgba(6,182,212,1)',    border: 'rgba(6,182,212,0.4)'   },
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
  { command: 'cat /etc/passwd', output: 'Permission denied: Nice try!' },
]

interface SecuritySkill {
  category: string;
  examples: string;
  level: number;
  color: string;
  icon: ElementType;
  iconColor: string;
}

export default function AboutSection() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(hover: none)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const securitySkills: SecuritySkill[] = [
    { category: "Network Security",          examples: "Subnetting, static routing, ACLs",                            level: 3, color: "from-blue-600 to-cyan-500",      icon: FaShieldAlt,       iconColor: "text-cyan-400"   },
    { category: "Threat Detection & SIEM",    examples: "Wazuh, Suricata, alert tuning",                             level: 4, color: "from-violet-600 to-purple-500",  icon: RiShieldKeyholeFill, iconColor: "text-purple-400" },
    { category: "Security Automation & SOAR", examples: "Wazuh webhooks, Shuffle workflows, automated email alerts",  level: 2, color: "from-red-600 to-orange-500",    icon: FaBolt,              iconColor: "text-orange-400" },
    { category: "Security Monitoring",        examples: "PowerShell logs, DeepBlueCLI, auditlog",                    level: 3, color: "from-emerald-600 to-green-500",  icon: MdSecurity,          iconColor: "text-green-400"  },
    { category: "Penetration Testing",        examples: "Netcat, Metasploit, enumeration",                           level: 2, color: "from-fuchsia-600 to-pink-500",   icon: FaCode,              iconColor: "text-pink-400"   },
    { category: "Threat Intelligence",        examples: "VirusTotal, MISP, indicator logging",                       level: 2, color: "from-amber-600 to-yellow-500",   icon: BiSolidAnalyse,      iconColor: "text-yellow-400" },
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
          {!isMobile && (
          <motion.div 
            className="absolute -inset-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 z-0"
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
          )}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-6 tracking-tight relative z-10 px-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">About</span>
          </motion.h1>
          
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          <motion.p
            className="text-muted mb-10 max-w-2xl mx-auto font-light text-sm sm:text-base md:text-lg leading-relaxed relative z-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I'm a<span className="mx-1"></span>
            <span className="font-medium text-primary relative inline-block">
            cybersecurity analyst
              <motion.span 
                className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary/50"
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
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-light mb-8 text-center relative inline-block px-4">
          <span className="relative z-10">Development Stack</span>
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-2 bg-primary/30 z-0 rounded-full" 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {techSkills.map((skill, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center p-5 rounded-2xl cursor-default relative overflow-hidden group border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4, type: 'spring', stiffness: 180 }}
              whileHover={isMobile ? {} : { scale: 1.12, borderColor: skill.border }}
            >
              {/* Per-icon pulsing glow orb */}
              <div
                className="absolute w-16 h-16 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: skill.glow,
                  animation: `tech-pulse ${2.8 + (i % 4) * 0.55}s ease-in-out infinite`,
                  animationDelay: `${i * 0.28}s`,
                }}
              />
              <skill.Icon className={`text-4xl mb-3 ${skill.color} relative z-10`} />
              <span className="text-light text-xs font-semibold relative z-10 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      {/* Security Tools - Animated List */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-light mb-8 text-center relative inline-block px-4">
          <span className="relative z-10"><FaTerminal className="inline-block mr-2 text-accent" size={20} /> Security Toolkit</span>
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-2 bg-accent/30 z-0 rounded-full" 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </h2>
        {/* Two-row marquee ticker */}
        <div className="overflow-hidden space-y-3 py-2">
          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee-left w-max">
              {[...securityTools.slice(0, 8), ...securityTools.slice(0, 8)].map((tool, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-w-max hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default">
                  <tool.Icon className={`text-xl flex-shrink-0 ${tool.color}`} />
                  <div>
                    <div className="text-light text-sm font-semibold leading-tight">{tool.name}</div>
                    <div className="text-muted text-xs leading-tight mt-0.5">{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee-right w-max">
              {[...securityTools.slice(8), ...securityTools.slice(8)].map((tool, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-w-max hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default">
                  <tool.Icon className={`text-xl flex-shrink-0 ${tool.color}`} />
                  <div>
                    <div className="text-light text-sm font-semibold leading-tight">{tool.name}</div>
                    <div className="text-muted text-xs leading-tight mt-0.5">{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Terminal */}
      <div className="mb-16 flex justify-center">
        <motion.div
          className="w-full rounded-lg overflow-hidden shadow-xl terminal-animation border border-gray-700/50 transition-all duration-300 relative bg-black max-h-[280px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={isMobile ? {} : { boxShadow: '0 0 20px rgba(0, 255, 0, 0.15)' }}
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1 flex items-center border-b border-gray-700/50">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-xs ml-3 flex-1 text-center font-mono">security-terminal</p>
          </div>
          <div className="p-3 font-mono text-xs text-green-400 whitespace-pre overflow-x-auto w-full">
            {terminalText}
            {showCursor && <span className="animate-pulse">▋</span>}
          </div>
        </motion.div>
      </div>

    </div>
  )
}
