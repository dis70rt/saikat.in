import { Skills } from "@shared/schema";
import { Palette, Server, Wrench, Lightbulb, Brain, Award } from "lucide-react"; 

interface SkillsSectionProps {
  skills: Skills;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Palette size={28} className="text-neutral-400" />, 
      skills: skills.frontend,
    },
    {
      title: "Backend",
      icon: <Server size={28} className="text-neutral-400" />, 
      skills: skills.backend,
    },
    {
      title: "Tools",
      icon: <Wrench size={28} className="text-neutral-400" />, 
      skills: skills.tools,
    },
    {
      title: "Other",
      icon: <Lightbulb size={28} className="text-neutral-400" />, 
      skills: skills.other,
    },
  ];

  return (
    <section
      className="py-20 md:py-32 bg-neutral-900 text-neutral-100"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20 reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            Technologies and methodologies I leverage to create exceptional
            digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-20">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-xl shadow-xl flex flex-col reveal-stagger"
            >
              <div className="flex items-center mb-5">
                {category.icon}
                <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
              </div>
              <ul className="space-y-2 flex-grow">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-neutral-300 bg-neutral-700/50 px-3 py-1.5 rounded-md text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-800 p-8 rounded-xl shadow-xl reveal-stagger">
            <div className="flex items-center mb-5">
              <Brain size={28} className="text-neutral-400" />
              <h3 className="text-2xl font-semibold ml-3 text-neutral-100">
                Continuous Learning
              </h3>
            </div>
            <p className="text-neutral-300 mb-6">
              Technology evolves rapidly, and I stay ahead by continuously
              learning new frameworks, tools, and best practices. Currently
              exploring AI/ML integration, system design principles, and
              low-level programming.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Rust", "AI/ML Integration", "System Design"].map((item) => (
                <div
                  key={item}
                  className="bg-neutral-700 text-neutral-200 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-800 p-8 rounded-xl shadow-xl text-center flex flex-col justify-center items-center reveal-stagger">
            <Award size={32} className="text-neutral-400 mb-3" />
            <div className="text-6xl font-bold text-neutral-100">2+</div>
            <h4 className="text-xl font-semibold text-neutral-300 mt-2">
              Years Experience
            </h4>
            <p className="text-neutral-400 mt-1 max-w-xs">
              Building scalable solutions and delivering impactful projects
              across multiple domains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
