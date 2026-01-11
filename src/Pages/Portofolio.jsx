import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes, BookOpen } from "lucide-react";
import CardProject from "../components/CardProject";
import CardBlog from "../components/CardBlog";
import { techStacks } from "../components/TechStacks";

const TechStackIcon = ({ IconComponent, language }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/70 hover:bg-slate-900 transition-all duration-200 group cursor-pointer">
      <IconComponent className="w-5 h-5 text-blue-400 group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="text-sm text-gray-200 group-hover:text-blue-300 transition-colors">{language}</span>
    </div>
  );
};

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 text-white border border-white/10 hover:border-white/20 shadow-lg hover:shadow-purple-500/20"
  >
    {isShowingMore ? "Show Less" : "Show More"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${isShowingMore ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
);

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 2 : 4;
  const initialBlogs = isMobile ? 2 : 2;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [projectsRes, blogsRes] = await Promise.all([
          axios.get(`${BASE_URL}/projects`),
          axios.get(`${BASE_URL}/blogs`)
        ]);

        const projectData = projectsRes.data.data.map((project) => ({
          ...project,
          TechStack: project.TechStack || [],
        }));

        setProjects(projectData);
        setBlogs(blogsRes.data.data);
        localStorage.setItem("projects", JSON.stringify(projectData));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedBlogs = showAllBlogs ? blogs : blogs.slice(0, initialBlogs);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my projects, blogs, and the technologies I use to build them.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto text-center">
          {error} (Showing cached data if available)
        </div>
      )}

      {!isLoading && (
        <div className="w-full">
          {/* Modern Segmented Control Tabs */}
          <div className="flex justify-center mb-8" data-aos="fade-up" data-aos-delay="200">
            <div className="inline-flex p-1 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800">
              <button
                onClick={() => setValue(0)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  value === 0
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 hover:text-gray-200 hover:bg-slate-800/50"
                }`}
              >
                <Code className="w-4 h-4" />
                Projects
              </button>
              <button
                onClick={() => setValue(1)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  value === 1
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 hover:text-gray-200 hover:bg-slate-800/50"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </button>
              <button
                onClick={() => setValue(2)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  value === 2
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 hover:text-gray-200 hover:bg-slate-800/50"
                }`}
              >
                <Boxes className="w-4 h-4" />
                Tech Stack
              </button>
            </div>
          </div>

          {/* PROJECTS TAB */}
          {value === 0 && (
            <div>
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {displayedProjects.map((project, index) => (
                      <div
                        key={project.id || index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      >
                        <CardProject
                          Img={project.image}
                          Title={project.title}
                          Description={project.content}
                          Link={project.link}
                          id={project._id}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">No projects found</div>
                )}
              </div>
              {projects.length > initialItems && (
                <div className="mt-8 w-full flex justify-center">
                  <ToggleButton onClick={() => setShowAllProjects(!showAllProjects)} isShowingMore={showAllProjects} />
                </div>
              )}
            </div>
          )}

          {/* BLOG TAB */}
          {value === 1 && (
            <div>
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                {blogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 gap-5 w-full max-w-4xl">
                    {displayedBlogs.map((blog, index) => (
                      <div key={blog._id || index} data-aos="fade-up" data-aos-duration="1000" className="mb-8">
                        <CardBlog
                          Img={blog.image}
                          Title={blog.title}
                          Description={blog.content}
                          Link={blog.link}
                          id={blog._id}
                          createdAt={blog.createdAt}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">No blogs found</div>
                )}
              </div>
              {blogs.length > initialBlogs && (
                <div className="mt-8 w-full flex justify-center">
                  <ToggleButton onClick={() => setShowAllBlogs(!showAllBlogs)} isShowingMore={showAllBlogs} />
                </div>
              )}
            </div>
          )}

          {/* TECH STACK TAB */}
          {value === 2 && (
            <div className="container mx-auto overflow-hidden pb-[5%] space-y-8">
              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">Frontend</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {techStacks.frontend.map((stack, index) => (
                    <div key={index} data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 50}>
                      <TechStackIcon IconComponent={stack.IconComponent} language={stack.language} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">Backend</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {techStacks.backend.map((stack, index) => (
                    <div key={index} data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 50}>
                      <TechStackIcon IconComponent={stack.IconComponent} language={stack.language} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">Tools</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {techStacks.tools.map((stack, index) => (
                    <div key={index} data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 50}>
                      <TechStackIcon IconComponent={stack.IconComponent} language={stack.language} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
