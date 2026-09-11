import { useState, useEffect, useCallback, useRef, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import animationImg from '../assets/Animation1.gif';

const StatusBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
    className="inline-block"
    whileHover={{ scale: 1.02 }}
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000" />
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </motion.div>
));
StatusBadge.displayName = 'StatusBadge';

const MainTitle = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    className="space-y-2"
  >
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20" />
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Full stack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20" />
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </motion.div>
));
MainTitle.displayName = 'MainTitle';

const TechStack = memo(({ tech }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileHover={{ y: -2, scale: 1.02 }}
    className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
  >
    {tech}
  </motion.div>
));
TechStack.displayName = 'TechStack';

const MagneticButton = memo(({ href, text, icon: Icon, variant = "primary" }) => {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const baseStyles = "group relative w-[160px]";
  const primaryStyles = "bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10";
  const secondaryStyles = "bg-transparent backdrop-blur-xl rounded-lg border border-white/20";

  return (
    <a href={href}>
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${variant === "primary" ? primaryStyles : secondaryStyles}`}
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <motion.span
            className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10"
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
          >
            {text}
          </motion.span>
          <motion.div
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
            className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`}
          >
            <Icon />
          </motion.div>
        </span>
      </motion.button>
    </a>
  );
});
MagneticButton.displayName = 'MagneticButton';

const SocialLink = memo(({ icon: Icon, link, delay = 0 }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.6 + delay * 0.1, ease: "easeOut" }}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.95 }}
  >
    <button className="group relative p-3">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </motion.a>
));
SocialLink.displayName = 'SocialLink';

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Tech Enthusiast", "Problem Solver", "Code Architect"];
const TECH_STACK = ["React", "TypeScript", "Node.js", "Tailwind", "Next.js", "PostgreSQL"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/mdyeasinhn" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/mdyeasinhn/" },
  { icon: Instagram, link: "https://www.instagram.com/mdyeasinhn" }
];

const FloatingOrb = memo(({ className, delay = 0 }) => (
  <motion.div
    className={className}
    animate={{
      x: [0, 20, -20, 0],
      y: [0, -20, 20, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
));

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  const heroContent = (
    <div className="min-h-screen bg-[#030014] overflow-hidden relative" id="Home">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" delay={0} />
        <FloatingOrb className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" delay={5} />
        <FloatingOrb className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" delay={10} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="container mx-auto px-[5%] sm:px-[5%] lg:px-[10%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="space-y-4 sm:space-y-6"
              >
                <StatusBadge />
                <MainTitle />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  className="h-8 flex items-center"
                >
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <motion.span
                    className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                  className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                >
                  Creating an Innovative, Functional, and User-Friendly Website for Digital Solutions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                  className="flex flex-wrap gap-3 justify-start"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={tech} tech={tech} style={{ transitionDelay: `${index * 50}ms` }} />
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                  className="flex flex-row gap-3 w-full justify-start"
                >
                  <MagneticButton href="#Portofolio" text="Projects" icon={ExternalLink} variant="primary" />
                  <MagneticButton href="#Contact" text="Contact" icon={Mail} variant="secondary" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
                  className="hidden sm:flex gap-4 justify-start"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} delay={index} />
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                  className="mt-8 hidden lg:block"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                    <span className="text-sm font-medium">Scroll to explore</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative w-full opacity-90">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl"
                  animate={{
                    scale: isHovering ? 1.05 : 1,
                    opacity: isHovering ? 0.5 : 0.2,
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovering ? 0.5 : 0.2 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="relative z-10 w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[300px] xl:max-w-[280px] aspect-square opacity-90 mx-auto"
                  animate={{
                    scale: isHovering ? 1.1 : 1,
                    rotate: isHovering ? 2 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={animationImg}
                    alt="Developer animation"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500 text-sm"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>Scroll</span>
                  <motion.div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      {heroContent}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </>
  );
};

export default memo(Home);