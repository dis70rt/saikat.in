import { GridItem, PersonalInfo, Project } from "@shared/schema";
import { ExternalLink, Zap } from "lucide-react";
import {
  SiFlutter,
  SiFirebase,
  SiPython,
  SiStreamlit,
  SiGithub,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiVercel,
  SiGit,
} from "react-icons/si";

interface AboutGridProps {
  gridItems: GridItem[];
  personal: PersonalInfo;
  projects: Project[];
}

export default function AboutGrid({
  gridItems,
  personal,
  projects,
}: AboutGridProps) {
  const getTechIcon = (tech: string) => {
    const iconProps = { size: 18, className: "text-neutral-300" };
    switch (tech.toLowerCase()) {
      case "flutter":
        return <SiFlutter {...iconProps} />;
      case "firebase":
        return <SiFirebase {...iconProps} />;
      case "python":
        return <SiPython {...iconProps} />;
      case "streamlit":
        return <SiStreamlit {...iconProps} />;
      case "react":
        return <SiReact {...iconProps} />;
      case "next.js":
        return <SiNextdotjs {...iconProps} />;
      case "node.js":
        return <SiNodedotjs {...iconProps} />;
      case "typescript":
        return <SiTypescript {...iconProps} />;
      case "tailwind css":
        return <SiTailwindcss {...iconProps} />;
      case "docker":
        return <SiDocker {...iconProps} />;
      case "git":
        return <SiGit {...iconProps} />;

      default:
        return <Zap {...iconProps} />;
    }
  };

  const getBentoClassForIndex = (index: number): string => {
    return "col-span-1 row-span-1";
  };

  const majorProjects = projects.filter((p) => p.projectType === "major");
  const minorProjects = projects.filter((p) => p.projectType === "minor");

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "development":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "archived":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
      default:
        return "bg-sky-500/20 text-sky-400 border-sky-500/30";
    }
  };

  return (
    <section
      className="py-20 md:py-32 bg-neutral-900 text-neutral-100"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20 reveal">
          <div className="text-sm font-medium text-neutral-400 mb-3 tracking-wider">
            → SELECTED WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100 uppercase leading-tight">
            Projects Showcase
          </h2>
          <p className="mt-4 text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            A curated selection of projects that define my technical expertise
            and passion for building.
          </p>
        </div>

        {majorProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
            {majorProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-bento-card bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl flex flex-col overflow-hidden hover:border-neutral-600 transition-all duration-300 reveal-stagger ${getBentoClassForIndex(
                  index
                )}`}
              >
                <div className="aspect-video bg-neutral-700/50 flex items-center justify-center relative overflow-hidden">
                  {project.img ? (
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center z-10 p-4">
                      <div className="text-xs font-medium text-neutral-400 mb-2">
                        {project.category.toUpperCase()}
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-600 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-neutral-100 text-sm font-bold">
                          {project.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {project.img && (
                    <div className="absolute top-2 right-2 bg-neutral-900/70 text-neutral-200 text-xs px-2 py-1 rounded">
                      {project.category.toUpperCase()}
                    </div>
                  )}

                  <div
                    className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded border ${getStatusClass(
                      project.status
                    )}`}
                  >
                    {project.status.toUpperCase()}
                  </div>
                </div>

                <div className="p-4 md:p-6 flex flex-col flex-grow space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-100 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed flex-grow">
                    {project.shortDesc}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="flex items-center gap-1.5 text-xs text-neutral-300 border border-neutral-600 bg-neutral-700/60 px-2 py-1 rounded-md"
                        >
                          {getTechIcon(tech)}
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-sky-400 transition-colors"
                      >
                        <ExternalLink size={14} />
                        LIVE SITE
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
                      >
                        <SiGithub size={14} />
                        SOURCE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {minorProjects.length > 0 && (
          <div className="mt-16 md:mt-20 reveal">
            <div className="text-left mb-8 md:mb-10">
              <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-100 uppercase leading-tight">
                Other Noteworthy Projects
              </h3>
              <p className="mt-2 text-md md:text-lg text-neutral-400 max-w-2xl">
                A collection of smaller projects, experiments, and
                contributions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {minorProjects.map((project) => (
                <div
                  key={project.id}
                  className="minor-project-card bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg p-4 flex flex-col justify-between hover:border-neutral-600 transition-all duration-300 reveal-stagger"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-md font-semibold text-neutral-100 leading-tight">
                        {project.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                      {project.shortDesc}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
                      >
                        <SiGithub size={13} />
                        SOURCE
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
