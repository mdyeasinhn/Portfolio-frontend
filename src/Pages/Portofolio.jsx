import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import { motion } from "framer-motion";
import { Code, BookOpen } from "lucide-react";
import CardProject from "../components/CardProject";
import CardBlog from "../components/CardBlog";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 text-white border border-white/10 hover:border-white/20 shadow-lg hover:shadow-purple-500/20"
  >
    {isShowingMore ? "Show Less" : "Show More"}
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isShowingMore ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <path d="m6 9 6 6 6-6" />
    </motion.svg>
  </motion.button>
);

const SectionHeader = motion.div;

const TabButton = ({ isActive, children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
      isActive
        ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-purple-500/30"
        : "text-gray-400 hover:text-gray-200 hover:bg-slate-800/50"
    }`}
  >
    {children}
  </motion.button>
);

const ProjectCardWrapper = ({ children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    key={index}
  >
    {children}
  </motion.div>
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
          techStack: project.TechStack || project.techStack || [],
          github: project.github || project.githubUrl || null,
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

  const tabs = [
    { id: 0, label: "Projects", icon: Code },
    { id: 1, label: "Blog", icon: BookOpen },
  ];

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center pb-10"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my projects, blogs, and the technologies I use to build them.
        </p>
      </SectionHeader>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-20"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto text-center"
        >
          {error} (Showing cached data if available)
        </motion.div>
      )}

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex p-1 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  isActive={value === tab.id}
                  onClick={() => setValue(tab.id)}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabButton>
              ))}
            </div>
          </motion.div>

          {value === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {displayedProjects.map((project, index) => (
                      <ProjectCardWrapper key={project._id || project.id || index} index={index}>
                        <CardProject
                          Img={project.image}
                          Title={project.title}
                          Description={project.content}
                          Link={project.link}
                          id={project._id}
                          github={project.github}
                          techStack={project.techStack}
                          featured={project.featured}
                        />
                      </ProjectCardWrapper>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-gray-400"
                  >
                    No projects found
                  </motion.div>
                )}
              </div>
              {projects.length > initialItems && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 w-full flex justify-center"
                >
                  <ToggleButton onClick={() => setShowAllProjects(!showAllProjects)} isShowingMore={showAllProjects} />
                </motion.div>
              )}
            </motion.div>
          )}

          {value === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                {blogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 gap-5 w-full max-w-4xl">
                    {displayedBlogs.map((blog, index) => (
                      <motion.div
                        key={blog._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="mb-8"
                      >
                        <CardBlog
                          Img={blog.image}
                          Title={blog.title}
                          Description={blog.content}
                          Link={blog.link}
                          id={blog._id}
                          createdAt={blog.createdAt}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-gray-400"
                  >
                    No blogs found
                  </motion.div>
                )}
              </div>
              {blogs.length > initialBlogs && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 w-full flex justify-center"
                >
                  <ToggleButton onClick={() => setShowAllBlogs(!showAllBlogs)} isShowingMore={showAllBlogs} />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}