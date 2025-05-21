import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes, BookOpen } from "lucide-react";
import CardBlog from "../components/CardBlog";

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
      className={`transition-transform duration-300 ${isShowingMore ? "rotate-180" : ""
        }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 2 : 4;
  const initialBlogs = isMobile ? 1 : 2;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/projects', {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const projectData = response.data.data.map(project => ({
        ...project,
        TechStack: project.TechStack || []
      }));

      setProjects(projectData);
      localStorage.setItem("projects", JSON.stringify(projectData));
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/blogs', {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setBlogs(response.data.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
  }, [fetchProjects, fetchBlogs]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMoreProjects = useCallback(() => {
    setShowAllProjects((prev) => !prev);
  }, []);

  const toggleShowMoreBlogs = useCallback(() => {
    setShowAllBlogs((prev) => !prev);
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
        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "transparent",
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              mb: 4,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)",
                backdropFilter: "blur(8px)",
                zIndex: 0,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "inherit",
              },
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="primary"
              variant="fullWidth"
              sx={{
                minHeight: "72px",
                position: "relative",
                zIndex: 1,
                "& .MuiTab-root": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: "600",
                  color: "#cbd5e1",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  padding: "20px 16px",
                  margin: "0 4px",
                  borderRadius: "8px",
                  "&:hover": {
                    color: "#ffffff",
                    background: "rgba(255, 255, 255, 0.05)",
                    "& svg": {
                      transform: "scale(1.1)",
                      color: "#a78bfa",
                    },
                  },
                  "&.Mui-selected": {
                    color: "#ffffff",
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))",
                    boxShadow: "0 4px 20px -5px rgba(99, 102, 241, 0.4)",
                    "& svg": {
                      color: "#ffffff",
                    },
                  },
                },
                "& .MuiTabs-indicator": {
                  height: "3px",
                  background: "linear-gradient(90deg, #6366f1, #a855f7)",
                  borderRadius: "3px 3px 0 0",
                  bottom: 0,
                },
              }}
            >
              <Tab
                icon={<Code className="w-5 h-5 transition-all duration-300" />}
                iconPosition="start"
                label="Projects"
                {...a11yProps(0)}
                sx={{
                  "&.Mui-selected": {
                    "& svg": {
                      animation: "pulse 1.5s infinite",
                    },
                  },
                }}
              />
              <Tab
                icon={<BookOpen className="w-5 h-5 transition-all duration-300" />}
                iconPosition="start"
                label="Blog"
                {...a11yProps(1)}
                sx={{
                  "&.Mui-selected": {
                    "& svg": {
                      animation: "pulse 1.5s infinite",
                    },
                  },
                }}
              />
              <Tab
                icon={<Boxes className="w-5 h-5 transition-all duration-300" />}
                iconPosition="start"
                label="Tech Stack"
                {...a11yProps(2)}
                sx={{
                  "&.Mui-selected": {
                    "& svg": {
                      animation: "pulse 1.5s infinite",
                    },
                  },
                }}
              />
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={setValue}
          >
            {/* PROJECTS TAB */}
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {displayedProjects.map((project, index) => (
                      <div
                        key={project.id || index}
                        data-aos={
                          index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"
                        }
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
                  !isLoading && (
                    <div className="text-center py-10 text-gray-400">
                      No projects found
                    </div>
                  )
                )}
              </div>
              {projects.length > initialItems && (
                <div className="mt-8 w-full flex justify-center">
                  <ToggleButton
                    onClick={toggleShowMoreProjects}
                    isShowingMore={showAllProjects}
                  />
                </div>
              )}
            </TabPanel>

            {/* BLOG TAB */}
            {/* BLOG TAB */}
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                {blogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 gap-5 w-full max-w-4xl">
                    {displayedBlogs.map((blog, index) => (
                      <div
                        key={blog._id || index}
                        data-aos="fade-up" // Simplified animation for column layout
                        data-aos-duration="1000"
                        className="mb-8" // Add margin bottom for spacing between stacked items
                      >
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
                  <div className="text-center py-10 text-gray-400">
                    No blogs found
                  </div>
                )}
              </div>
              {blogs.length > initialBlogs && (
                <div className="mt-8 w-full flex justify-center">
                  <ToggleButton
                    onClick={toggleShowMoreBlogs}
                    isShowingMore={showAllBlogs}
                  />
                </div>
              )}
            </TabPanel>

            {/* TECH STACK TAB */}
            <TabPanel value={value} index={2} dir={theme.direction}>
              <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                  {techStacks.map((stack, index) => (
                    <div
                      key={index}
                      data-aos={
                        index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"
                      }
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Box>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}