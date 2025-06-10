import { PersonalInfo } from "@shared/schema";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

interface HeroSectionProps {
  personal: PersonalInfo;
}

export default function HeroSection({ personal }: HeroSectionProps) {
  const scrollToNext = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div
        className="orb top-25 right-44 opacity-60  lg:block"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="orb top-40 right-1/3 opacity-40 hidden lg:block"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="orb bottom-40 left-40 opacity-40 hidden lg:block"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          <div className="lg:col-span-7">
            <div className="reveal space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <div className="caption">{personal.title.toUpperCase()}</div>
                <h1 className="text-6xl sm:text-6xl lg:text-8xl font-black leading-none text-black uppercase">
                  {personal.name}
                  <br />
                </h1>
                <div className="text-base sm:text-lg lg:text-xl max-w-md text-gray-700">
                  {personal.tagline}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={scrollToNext}
                    className="px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors w-full sm:w-auto"
                  >
                    VIEW WORKS
                  </button>
                  <a
                    href="https://dis70rt.github.io/resume/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black border border-black text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-center"
                  >
                    RESUME
                  </a>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                  <a
                    href="https://github.com/dis70rt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href="https://instagram.com/saikat._"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/saikat-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
                <div className="flex gap-2">
                  <div className="nav-dot active"></div>
                  <div className="nav-dot"></div>
                  <div className="nav-dot"></div>
                </div>
              </div>

              <div className="lg:hidden grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-black">
                    {personal.stats.projects}
                  </div>
                  <div className="caption">PROJECTS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-black">
                    {personal.stats.companies}
                  </div>
                  <div className="caption">COMPANIES</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-black">
                    {personal.stats.awards}
                  </div>
                  <div className="caption">AWARDS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="reveal">
              <div className="grid grid-cols-1 gap-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-black">
                    {personal.stats.projects}
                  </div>
                  <div className="caption">PROJECTS COMPLETED</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-black">
                    {personal.stats.companies}
                  </div>
                  <div className="caption">COMPANIES WORKED WITH</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-black">
                    {personal.stats.awards}
                  </div>
                  <div className="caption">AWARDS RECEIVED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator hidden md:block" onClick={scrollToNext}>
        SCROLL
      </div>

      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8">
        <div className="text-right">
          <div className="caption mb-2">PORTFOLIO 2024</div>
          <div className="caption">{personal.domain.toUpperCase()}</div>
        </div>
      </div>
    </section>
  );
}
