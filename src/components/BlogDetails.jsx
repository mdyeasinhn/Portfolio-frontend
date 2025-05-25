import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Bookmark,
  Clock,
  ChevronRight,
  Share2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import axios from "axios";

// CategoryBadge component
const CategoryBadge = ({ category }) => {
  const categoryColors = {
    Technology: "from-blue-600/10 to-blue-400/10 text-blue-300",
    Health: "from-green-600/10 to-green-400/10 text-green-300",
    Lifestyle: "from-pink-600/10 to-pink-400/10 text-pink-300",
    Business: "from-purple-600/10 to-purple-400/10 text-purple-300",
  };

  return (
    <div className={`px-3 py-1.5 bg-gradient-to-r ${categoryColors[category]} rounded-lg border border-white/10`}>
      <span className="text-xs font-medium">{category}</span>
    </div>
  );
};

// MetadataItem component
const MetadataItem = ({ icon, text }) => (
  <div className="flex items-center space-x-2 text-gray-400">
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);

// Main BlogDetails Component
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://portfolio-server-omega-neon.vercel.app/api/v1/blogs/${id}`,{
          withCredentials: true 
        });
        setBlog(response.data.data);
        // Calculate reading time (assuming 200 words per minute)
        const words = response.data.data.description.split(/\s+/).length;
        setReadingTime(Math.ceil(words / 200));
      } catch (err) {
        setError("Failed to fetch blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-white p-4">Loading blog post...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!blog) return <div className="text-white p-4">No blog post found.</div>;

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Header */}
        <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <div className="flex items-center text-sm text-white/50">
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{blog.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Category and Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CategoryBadge category={blog.category} />
            
            <div className="flex flex-wrap items-center gap-4">
              <MetadataItem 
                icon={<User className="w-4 h-4" />} 
                text={`By ${blog.author}`} 
              />
              <MetadataItem 
                icon={<CalendarDays className="w-4 h-4" />} 
                text={new Date(blog.createdAt).toLocaleDateString()} 
              />
              <MetadataItem 
                icon={<Clock className="w-4 h-4" />} 
                text={`${readingTime} min read`} 
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 leading-tight">
            {blog.title}
          </h1>

          {/* Image */}
          {blog.image && (
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-6">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none mt-8">
            <div 
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
            <button className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 rounded-xl text-white hover:bg-white/10 transition">
              <Bookmark className="w-4 h-4 group-hover:text-purple-300 transition-colors" />
              <span>Save for later</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Share this post:</span>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                <Share2 className="w-4 h-4 text-gray-300 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{blog.author}</h3>
                <p className="text-sm text-gray-400">Blog Author</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">
              {blog.author} writes about {blog.category.toLowerCase()} and related topics. 
              Follow for more insightful content in this space.
            </p>
          </div>

          {/* Back to Blog List Button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to All Blogs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;