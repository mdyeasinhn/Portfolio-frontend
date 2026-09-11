import { Briefcase, ExternalLink, Calendar, MapPin, ChevronRight, Code, Database, Globe, Users } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const experiences = [
  {
    id: 1,
    company: "Octopi Digital LLC",
    role: "Junior Software Engineer",
    location: "Dhaka, Bangladesh",
    type: "Onsite",
    period: "Oct 2025 - Present",
    current: true,
    description: "Working as a backend-focused software engineer, building full-stack web applications with scalable APIs while ensuring responsive, performant user interfaces across devices.",
    responsibilities: [
      "Build and maintain full-stack web applications with primary focus on backend development",
      "Design and implement RESTful APIs, authentication, and database logic",
      "Deliver full-stack features integrated with responsive, mobile-first React/Next.js UIs",
      "Optimize performance, scalability, and maintainable code for production systems",
    ],
    techStack: ["Node.js", "Express", "PostgreSQL", "Prisma", "React", "Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    website: "https://octopi-digital.com/",
    color: "from-[#6366f1] to-[#a855f7]",
    icon: Code,
  },
  {
    id: 2,
    company: "Freelance",
    role: "Full Stack Developer",
    location: "Remote",
    type: "Remote",
    period: "Jan 2024 - Sep 2025",
    current: false,
    description: "Developed custom web applications for clients across various industries, focusing on modern tech stacks and clean architecture.",
    responsibilities: [
      "Built 5+ production-ready web applications using React, Node.js, and PostgreSQL",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Collaborated with designers to create pixel-perfect, accessible UIs",
      "Mentored junior developers on best practices and code reviews",
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Vercel", "GitHub Actions"],
    website: "https://github.com/mdyeasinhn",
    color: "from-[#10b981] to-[#059669]",
    icon: Database,
  },
  {
    id: 3,
    company: "Open Source Contributor",
    role: "Contributor",
    location: "Global",
    type: "Open Source",
    period: "2023 - Present",
    current: true,
    description: "Active contributor to open-source projects, focusing on developer tools and UI component libraries.",
    responsibilities: [
      "Contributed to 10+ open-source projects with 50+ merged PRs",
      "Built reusable UI components adopted by 1000+ developers",
      "Participated in Hacktoberfest and other community events",
      "Maintained documentation and wrote comprehensive guides",
    ],
    techStack: ["TypeScript", "React", "Vite", "Rollup", "Testing Library", "Storybook"],
    website: "https://github.com/mdyeasinhn",
    color: "from-[#f59e0b] to-[#d97706]",
    icon: Globe,
  },
];

const TimelineDot = ({ index, active, color }) => (
  <motion.div
    className="relative w-4 h-4 rounded-full border-4 border-[#030014] z-10 flex-shrink-0"
    style={{ background: color }}
    initial={{ scale: 0 }}
    animate={{ scale: active ? 1.3 : 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: color }}
      animate={{ opacity: active ? [0.6, 0, 0.6] : 0, scale: active ? [1, 2, 1] : 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const TimelineLine = ({ progress, color }) => (
  <motion.div
    className="absolute left-[10px] top-0 bottom-0 w-0.5 rounded-full"
    style={{
      background: `linear-gradient(to bottom, ${color.replace("from-", "").replace("to-", "")})`,
    }}
    initial={{ scaleY: 0, originY: 0 }}
    animate={{ scaleY: progress }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
);

const SkillPill = ({ tech, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ scale: 1.05 }}
    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
  >
    {tech}
  </motion.span>
);

const ExperienceCard = ({ experience, index, isActive, onClick, scrollY }) => {
  const cardRef = useRef(null);
  const { y } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const rotateY = useTransform(y, [0, 1], [-5, 5]);
  const translateX = useTransform(y, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{
        transform: `perspective(1000px) rotateY(${rotateY.get()}deg) translateX(${translateX.get()}px)`,
      }}
      onClick={() => onClick(index)}
    >
      <div className="flex gap-6">
        <div className="relative flex flex-col items-center">
          <TimelineDot index={index} active={isActive} color={experience.color} />
          {index < experiences.length - 1 && (
            <TimelineLine progress={isActive && index < experiences.length - 1 ? 1 : 0} color={experience.color} />
          )}
        </div>

        <motion.div
          className={`flex-1 relative p-6 rounded-2xl transition-all duration-500 ${
            isActive
              ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl shadow-[0_0_40px_rgba(99,102,241,0.15)]"
              : "bg-gray-900/50 backdrop-blur-lg border border-white/10 hover:border-white/20"
          }`}
          whileHover={!isActive ? { y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)" } : {}}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50 rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r text-transparent bg-clip-text"
                  style={{ background: experience.color }}
                >
                  {experience.type}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-2 text-2xl font-bold text-white"
                >
                  {experience.company}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: experience.current ? "rgba(16, 185, 129, 0.1)" : "rgba(99, 102, 241, 0.1)",
                  borderColor: experience.current ? "rgba(16, 185, 129, 0.3)" : "rgba(99, 102, 241, 0.3)",
                }}
              >
                {experience.current && (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: experience.current ? "#10b981" : "#6366f1" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <span className="text-sm font-medium" style={{ color: experience.current ? "#10b981" : "#a855f7" }}>
                  {experience.current ? "Currently Working" : "Previous Role"}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-4 border-b border-white/10"
            >
              <motion.h4
                className="text-xl font-semibold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
              >
                {experience.role}
              </motion.h4>
              <motion.div
                className="flex items-center gap-2 text-gray-400"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{experience.period}</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              <motion.p
                className="text-gray-300 leading-relaxed"
              >
                {experience.description}
              </motion.p>

              <motion.ul
                className="space-y-2"
              >
                {experience.responsibilities.map((resp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: experience.color }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                    <span>{resp}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {experience.techStack.map((tech, i) => (
                  <SkillPill key={tech} tech={tech} index={i} />
                ))}
              </motion.div>

              <motion.a
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
                style={{ color: experience.color.split(" ")[0].replace("from-", "") }}
              >
                <span>Visit Company</span>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen bg-[#030014] text-white px-[5%] sm:px-[5%] lg:px-[10%] py-20"
      id="Experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
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
            <Briefcase className="w-4 h-4 text-[#6366f1]" />
            Professional Journey
          </motion.span>
          <motion.h2
            className="mt-4 text-4xl md:text-5xl font-bold text-transparent bg-clip-text"
            style={{ background: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)" }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            My professional journey building scalable solutions and innovative products
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          style={{ minHeight: containerHeight || "auto" }}
        >
          <motion.div
            className="absolute left-[10px] top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />

          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isActive={activeIndex === index}
              onClick={setActiveIndex}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            {activeIndex + 1} of {experiences.length} experiences
          </p>
          <motion.div
            className="mt-4 flex justify-center gap-2"
          >
            {experiences.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] w-6"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`View experience ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;