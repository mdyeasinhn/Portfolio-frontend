import PropTypes from "prop-types";

const TechStackIcon = ({ IconComponent, language }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/70 hover:bg-slate-900 transition-all duration-200 group cursor-pointer">
      <IconComponent className="w-5 h-5 text-blue-400 group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="text-sm text-gray-200 group-hover:text-blue-300 transition-colors">{language}</span>
    </div>
  );
};

TechStackIcon.propTypes = {
  IconComponent: PropTypes.elementType.isRequired,
  language: PropTypes.string.isRequired,
};

export default TechStackIcon;