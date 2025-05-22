import { motion } from 'framer-motion'
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs, SiTypescript } from 'react-icons/si'

const skills = [
  { name: 'React', icon: <FaReact size={40} className="text-blue-500" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={40} className="text-black" /> },
  { name: 'Tailwind', icon: <SiTailwindcss size={40} className="text-cyan-400" /> },
  { name: 'TypeScript', icon: <SiTypescript size={40} className="text-blue-700" /> },
  { name: 'Python', icon: <FaPython size={40} className="text-yellow-500" /> },
  { name: 'HTML5', icon: <FaHtml5 size={40} className="text-orange-500" /> },
  { name: 'CSS3', icon: <FaCss3Alt size={40} className="text-blue-600" /> },
  { name: 'Node.js', icon: <FaNodeJs size={40} className="text-green-600" /> },
  { name: 'Git', icon: <FaGitAlt size={40} className="text-red-500" /> },
]

export default function AboutSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 text-center">
      {/* Intro */}
      <motion.h1
        className="text-4xl font-fancy text-darkPurple mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me 💕👩‍💻
      </motion.h1>

      <motion.p
        className="text-gray-700 mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I'm a tech-lover with a soft spot for creativity and clean code. I enjoy building beautiful interfaces, exploring cybersecurity, and learning new tools. Here's a glimpse of my toolbox:
      </motion.p>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
        {skills.map((skill, i) => (
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
    </div>
  )
}
