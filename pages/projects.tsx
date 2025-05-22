import { motion } from 'framer-motion'

const projects = [
  {
    title: 'AI Threat Detection',
    description: 'A smart system for detecting cyberattacks using machine learning (UNSW-NB15 dataset).',
    link: 'https://github.com/wxmohd/ai-threat-detection',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal website built with Next.js and Tailwind CSS — this site!',
    link: 'https://walaa.vercel.app',
  },
  {
    title: 'Instagram Clone',
    description: 'A simplified clone with real-time follow system and styled with ShadCN UI.',
    link: 'https://github.com/wxmohd/insta-clone',
  },
]

export default function ProjectsSection() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.h1
        className="text-4xl font-fancy text-darkPurple text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects 💻✨
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition border border-softPink"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h2 className="text-2xl font-bold text-techBlue">{project.title}</h2>
            <p className="mt-2 text-gray-700">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-darkPurple underline hover:text-techBlue transition"
            >
              View on GitHub →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
