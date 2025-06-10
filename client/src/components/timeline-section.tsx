import { TimelineItem } from "@shared/schema";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiFlutter,
  SiFirebase,
  SiPython,
  SiPostgresql,
  SiJavascript,
  SiGit,
} from "react-icons/si";

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const getTechIcon = (tech: string) => {
    const iconProps = { size: 16, className: "text-neutral-400" };
    switch (tech.toLowerCase()) {
      case "react":
        return <SiReact {...iconProps} />;
      case "next.js":
        return <SiNextdotjs {...iconProps} />;
      case "node.js":
        return <SiNodedotjs {...iconProps} />;
      case "typescript":
        return <SiTypescript {...iconProps} />;
      case "flutter":
        return <SiFlutter {...iconProps} />;
      case "firebase":
        return <SiFirebase {...iconProps} />;
      case "python":
        return <SiPython {...iconProps} />;
      case "postgresql":
        return <SiPostgresql {...iconProps} />;
      case "javascript":
        return <SiJavascript {...iconProps} />;
      case "git":
        return <SiGit {...iconProps} />;
      case "java":
        return <div className="w-4 h-4 bg-neutral-500 rounded-sm"></div>;
      default:
        return <div className="w-4 h-4 bg-neutral-600 rounded-sm"></div>;
    }
  };

  const getTypeStyling = (type: string) => {
    switch (type) {
      case "work":
        return {
          borderColor: "border-blue-500",
          textColor: "text-blue-400",
          dotColor: "bg-blue-500",
        };
      case "project":
        return {
          borderColor: "border-green-500",
          textColor: "text-green-400",
          dotColor: "bg-green-500",
        };
      case "education":
        return {
          borderColor: "border-purple-500",
          textColor: "text-purple-400",
          dotColor: "bg-purple-500",
        };
      case "internship":
        return {
          borderColor: "border-yellow-500",
          textColor: "text-yellow-400",
          dotColor: "bg-yellow-500",
        };
      default:
        return {
          borderColor: "border-neutral-500",
          textColor: "text-neutral-400",
          dotColor: "bg-neutral-500",
        };
    }
  };

  return (
    <section
      className="py-20 md:py-32 bg-neutral-900 text-neutral-100"
      id="timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-20 text-center reveal">
          <h3 className="text-3xl font-semibold text-neutral-100 mb-10">
            Career Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                label: "Work Experiences",
                value:
                  timeline.filter((item) => item.type === "work").length +
                  1 +
                  "+",
              },
              {
                label: "Major Projects",
                value:
                  timeline.filter((item) => item.type === "project").length +
                  2 +
                  "+",
              },
              {
                label: "Technologies Mastered",
                value:
                  new Set(timeline.flatMap((item) => item.technologies)).size +
                  "+",
              },
              {
                label: "Years Coding",
                value: new Date().getFullYear() - 2023 + "+",
              }, 
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-neutral-800 p-6 rounded-xl shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-neutral-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16 md:mb-20 reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Professional Journey
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            A timeline of my career path, projects, and educational milestones.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-5 md:left-6 top-0 bottom-0 w-1 bg-neutral-700 rounded-full"></div>

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, index) => {
              const typeStyle = getTypeStyling(item.type);
              return (
                <div
                  key={index}
                  className="relative timeline-item reveal-stagger pl-12 sm:pl-14 md:pl-16"
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full z-10 ${typeStyle.dotColor} left-2.5 sm:left-3.5 md:left-[1.125rem]`}
                  ></div>

                  <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 md:p-8 shadow-xl hover:border-neutral-600 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl md:text-3xl font-bold text-neutral-100">
                            {item.year}
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full border-2 ${typeStyle.borderColor} ${typeStyle.textColor} bg-neutral-800`}
                          >
                            {item.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-400 text-left sm:text-right">
                          {item.company}
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold text-neutral-100 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-neutral-300 leading-relaxed">
                        {item.description}
                      </p>

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.technologies.map((tech, techIndex) => (
                            <div
                              key={techIndex}
                              className="flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-700/60 border border-neutral-600 px-3 py-1.5 rounded-full"
                            >
                              {getTechIcon(tech)}
                              <span>{tech}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
