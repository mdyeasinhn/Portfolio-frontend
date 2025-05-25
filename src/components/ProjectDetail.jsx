import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  ChevronRight,
  Layers,
  Package,
} from "lucide-react";
import axios from "axios";

// TechBadge component
const TechBadge = ({ tech }) => (
  <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
    <div className="relative flex items-center gap-1.5 md:gap-2">
      <Package className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
      <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
        {tech}
      </span>
    </div>
  </div>
);

// FeatureItem component
const FeatureItem = ({ feature }) => (
  <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
    <div className="relative mt-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
      <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
    </div>
    <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
      {feature}
    </span>
  </li>
);

// ProjectStats component
const ProjectStats = ({ techCount = 0, featureCount = 0 }) => (
  <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
    <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
      <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
        <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>
      <div className="flex-grow">
        <div className="text-lg md:text-xl font-semibold text-blue-200">{techCount}</div>
        <div className="text-[10px] md:text-xs text-gray-400">Total Technologies</div>
      </div>
    </div>

    <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
      <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
        <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>
      <div className="flex-grow">
        <div className="text-lg md:text-xl font-semibold text-purple-200">{featureCount}</div>
        <div className="text-[10px] md:text-xs text-gray-400">Key Features</div>
      </div>
    </div>
  </div>
);

// Main ProjectDetails Component
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://portfolio-server-omega-neon.vercel.app/api/v1/projects/${id}`,{
          withCredentials: true 
        });
        setProject(response.data.data);
      } catch (err) {
        setError("Failed to fetch project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  if (loading) return <div className="text-white p-4">Loading project...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!project) return <div className="text-white p-4">No project found.</div>;

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Header */}
        <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
          <button 
            onClick={handleBack}
            className="group inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <div className="flex items-center text-sm text-white/50">
            <span>Projects</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{project.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-10">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              {project.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">{project.content}</p>

            <ProjectStats
              techCount={project.techStack?.length || 0}
              featureCount={project.features?.length || 0}
            />

            <div className="flex gap-4 flex-wrap">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Live Demo</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">GitHub</span>
                </a>
              )}
            </div>

            {project.techStack && (
              <div>
                <h3 className="text-xl text-white mt-8 mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, i) => (
                    <TechBadge key={i} tech={tech} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image + Features */}
          <div className="space-y-6">
            {project.image && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {project.features && (
              <ul className="space-y-2 mt-6">
                {project.features.map((feature, i) => (
                  <FeatureItem key={i} feature={feature} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;