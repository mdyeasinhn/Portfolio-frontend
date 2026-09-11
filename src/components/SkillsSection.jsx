import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiBootstrap, SiVite, SiNodedotjs, SiExpress, SiMongodb,
  SiPostgresql, SiPrisma, SiMongoose, SiRedux, SiGit, SiVercel, SiFirebase, SiPostman
} from "react-icons/si";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: SiReact,
    color: "from-[#61dafb] to-[#00d8ff]",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    skills: [
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", Icon: SiCss3, color: "#1572b6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
      { name: "React", Icon: SiReact, color: "#61dafb" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06b6d4" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952b3" },
      { name: "Redux", Icon: SiRedux, color: "#764abc" },
      { name: "Vite", Icon: SiVite, color: "#646cff" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: SiNodedotjs,
    color: "from-[#68a063] to-[#3c873a]",
    bgColor: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#68a063" },
      { name: "Express", Icon: SiExpress, color: "#000000" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
      { name: "Prisma", Icon: SiPrisma, color: "#2d3748" },
      { name: "Mongoose", Icon: SiMongoose, color: "#880000" },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    icon: SiGit,
    color: "from-[#f05032] to-[#ff6b35]",
    bgColor: "from-red-500/10 to-orange-500/10",
    borderColor: "border-red-500/20",
    skills: [
      { name: "Git", Icon: SiGit, color: "#f05032" },
      { name: "Vercel", Icon: SiVercel, color: "#000000" },
      { name: "Firebase", Icon: SiFirebase, color: "#ffca28" },
      { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
    ],
  },
];

const SkillIcon = ({ Icon, color, size = 28, animated = false }) => (
  <motion.span
    className="flex items-center justify-center"
    style={{ color }}
    animate={animated ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <Icon className={`w-${size} h-${size}`} />
  </motion.span>
);

const SkillItem = ({ skill, index, categoryColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-default"
  >
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ background: categoryColor }} />
    <div className="relative flex items-center gap-3">
      <div className="relative p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
        <SkillIcon {...skill} size={24} animated />
      </div>
      <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{skill.name}</span>
    </div>
    <motion.div
      className="absolute bottom-0 left-0 w-full h-0.5 rounded-b-xl"
      style={{ background: categoryColor }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
    />
  </motion.div>
);

const CategoryCard = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className={`relative rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 ${category.bgColor} ${category.borderColor}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: category.color }} />
    <div className="absolute top-0 right-0 w-24 h-24 -translate-x-1/2 translate-y-1/2 opacity-10" style={{ background: category.color }}>
      <motion.div
        className="w-full h-full rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <div className="relative z-10 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="p-3 rounded-xl"
          style={{ background: category.color }}
        >
          <SkillIcon Icon={category.icon} color="#fff" size={24} />
        </motion.div>
        <h3 className="text-xl font-bold text-white">{category.label}</h3>
      </div>
      <p className="text-gray-400 text-sm">{category.skills.length} technologies</p>
    </div>

    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {category.skills.map((skill, i) => (
        <SkillItem key={skill.name} skill={skill} index={i} categoryColor={category.color} />
      ))}
    </div>
  </motion.div>
);

const SkillCloud = ({ skills }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="fixed bottom-8 right-8 z-40 hidden lg:block"
  >
    <motion.div
      className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="text-xs text-gray-400 mb-2 text-center">Hover a category</p>
      <div className="flex flex-wrap gap-1 justify-center max-w-[200px]">
        {skills.slice(0, 8).map((skill) => (
          <motion.span
            key={skill.name}
            whileHover={{ scale: 1.2, y: -2 }}
            className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all cursor-default"
            style={{ color: skill.color }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const SkillsSection = () => {
  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-[#030014] py-20 px-[5%] sm:px-[5%] lg:px-[10%]"
      id="Skills"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-transparent bg-clip-text border border-white/10"
            style={{ background: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)" }}
          >
            <SiReact className="w-4 h-4 text-[#6366f1]" />
            Tech Stack
          </motion.span>
          <motion.h2
            className="mt-4 text-4xl md:text-5xl font-bold text-transparent bg-clip-text"
            style={{ background: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)" }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Technologies and tools I work with to build modern, scalable applications
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Always learning & exploring new technologies</p>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-[#6366f1] border-t-transparent rounded-full"
            />
            <span className="text-sm text-gray-300">20+ technologies</span>
          </motion.div>
        </motion.div>

        <SkillCloud skills={allSkills} />
      </div>
    </motion.section>
  );
};

export default SkillsSection;
export { skillCategories };