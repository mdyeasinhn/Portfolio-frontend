import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, CalendarDays } from 'lucide-react';

const CardBlog = ({ 
  Img: image, 
  Title: title, 
  Description: content, 
  Link: link, 
  id: _id,
  createdAt 
}) => {
  // Handle cases when BlogLink is empty
  const handleReadMore = (e) => {
    if (!link) {
      console.log("BlogLink is empty");
      e.preventDefault();
      alert("Blog link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!_id) {
      console.log("ID is empty");
      e.preventDefault();
      alert("Blog details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">
          {image && (
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-400 text-sm">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>

            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {title}
            </h3>

            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3">
              {content}
            </p>

            <div className="pt-4 flex items-center justify-end">
           

              {_id ? (
                <Link
                  to={`/blog/${_id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Read</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;