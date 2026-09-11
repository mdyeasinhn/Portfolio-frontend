import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Github, Eye, Code, Star } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const TechBadge = memo(({ tech, color = "from-[#6366f1] to-[#a855f7]" }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${color} bg-clip-text text-transparent border border-white/10 bg-white/5 backdrop-blur-sm`}
  >
    {tech}
  </motion.span>
));
TechBadge.displayName = 'TechBadge';

const ProjectImage = memo(({ image, title, isHovering, tilt }) => (
  <motion.div
    className="relative overflow-hidden rounded-t-xl"
    style={{
      transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
    }}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover transition-transform duration-700"
      loading="lazy"
      style={{
        transform: isHovering ? 'scale(1.08)' : 'scale(1)',
      }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: isHovering ? 0.8 : 0.6 }}
      transition={{ duration: 0.3 }}
    />
    <motion.div
      className="absolute inset-0 flex items-center justify-center gap-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isHovering ? 1 : 0, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {({ liveDemo, github, details }) => (
        <>
          {liveDemo && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all"
              onClick={() => window.open(liveDemo, '_blank', 'noopener,noreferrer')}
              aria-label="View live demo"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          )}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {details && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all"
              onClick={() => window.location.href = details}
              aria-label="View project details"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </>
      )}
    </motion.div>
    <motion.div
      className="absolute top-3 right-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
    </motion.div>
  </motion.div>
));
ProjectImage.displayName = 'ProjectImage';

const CardProject = ({ 
  Img: image, 
  Title: title, 
  Description: content, 
  Link: liveDemo, 
  id: _id,
  github,
  techStack = [],
  featured = false
}) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useTransform(mouseX, [-1, 1], [-5, 5]);
  const tiltY = useTransform(mouseY, [-1, 1], [5, -5]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = (e.clientY - rect.top) / rect.height * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
      setTilt({ x: x * 5, y: y * -5 });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      mouseX.set(0);
      mouseY.set(0);
      setTilt({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const detailsUrl = _id ? `/project/${_id}` : null;

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="group relative w-full"
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovering ? 0.7 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        <ProjectImage 
          image={image} 
          title={title} 
          isHovering={isHovering} 
          tilt={{ x: tilt.x, y: tilt.y }}
          liveDemo={liveDemo}
          github={github}
          details={detailsUrl}
        />

        <div className="relative p-5 z-10" style={{ transform: 'translateZ(20px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-3 flex flex-wrap gap-2"
          >
            {techStack.slice(0, 4).map((tech, index) => (
              <TechBadge key={tech} tech={tech} style={{ transitionDelay: `${index * 50}ms` }} />
            ))}
            {techStack.length > 4 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400"
              >
                +{techStack.length - 4} more
              </motion.span>
            )}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-2 text-gray-300/80 text-sm leading-relaxed line-clamp-2"
          >
            {content}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-4 pt-4 flex items-center justify-between border-t border-white/10"
          >
            <div className="flex items-center gap-3">
              {liveDemo && (
                <motion.a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
                  aria-label="View live demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              )}
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                  aria-label="View on GitHub"
                >
                  <span>Code</span>
                  <Github className="w-3.5 h-3.5" />
                </motion.a>
              )}
            </div>

            {detailsUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={detailsUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 text-sm font-medium"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"
            initial={{ scale: 1 }}
            animate={{ scale: isHovering ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

CardProject.displayName = 'CardProject';

export default CardProject;