import { Briefcase, ExternalLink, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white px-[5%] sm:px-[5%] lg:px-[10%] py-20" id="Experience">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            Experience
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            My professional journey
          </p>
        </div>

        {/* Experience Card */}
        <div className="relative group" data-aos="fade-up" data-aos-delay="200">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>

            <div className="relative z-10">
              {/* Company & Status */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Octopi Digital LLC
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Dhaka, Bangladesh
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>Onsite</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Currently Working</span>
                </div>
              </div>

              {/* Role & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-6 border-b border-white/10">
                <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Junior Software Engineer
                </h4>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Oct 2025 - Present</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">
                Working as a backend-focused software engineer, building full-stack web applications with scalable APIs while ensuring responsive, performant user interfaces across devices.
              </p>

              {/* Responsibilities */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] mt-2 flex-shrink-0" />
                  <span>
                    Build and maintain full-stack web applications with primary focus on backend development
                  </span>
                </li>

                <li className="flex items-start gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] mt-2 flex-shrink-0" />
                  <span>
                    Design and implement RESTful APIs, authentication, and database logic
                  </span>
                </li>

                <li className="flex items-start gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] mt-2 flex-shrink-0" />
                  <span>
                    Deliver full-stack features integrated with responsive, mobile-first React/Next.js UIs
                  </span>
                </li>

                <li className="flex items-start gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] mt-2 flex-shrink-0" />
                  <span>
                    Optimize performance, scalability, and maintainable code for production systems
                  </span>
                </li>
              </ul>


              {/* Visit Company Button */}
              <a
                href="https://octopi-digital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="group/btn relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover/btn:opacity-90 transition-all duration-700"></div>
                  <div className="relative px-6 py-3 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                    <div className="absolute inset-0 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
                    <span className="relative flex items-center gap-2 text-sm group-hover/btn:gap-3 transition-all duration-300">
                      <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium">
                        Visit Company
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-200 group-hover/btn:rotate-45 transform transition-all duration-300" />
                    </span>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
