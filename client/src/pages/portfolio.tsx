import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutGrid from "@/components/project-grid";
import SkillsSection from "@/components/skills-section";
import TimelineSection from "@/components/timeline-section";
import ContactSection from "@/components/contact-section";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { portfolioData } from "@/lib/portfolio-data";

export default function Portfolio() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 overflow-x-hidden"> 
      <Navigation />
      <HeroSection personal={portfolioData.personal} />
      <AboutGrid gridItems={portfolioData.gridItems} personal={portfolioData.personal} projects={portfolioData.projects} />
      <TimelineSection timeline={portfolioData.timeline} />
      <SkillsSection skills={portfolioData.skills} />
      <ContactSection contact={portfolioData.contact} />
      
      <footer className="bg-neutral-900 text-neutral-100 py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="caption font-bold">
                {portfolioData.personal.name.toUpperCase()} - {portfolioData.personal.title.toUpperCase()}
              </div>
              <div className="caption text-neutral-400">
                © 2024 {portfolioData.personal.name}. Built with modern web technologies.
              </div>
            </div>
            <div className="flex gap-8 items-center">
              <a 
                href={portfolioData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="caption hover:text-white transition-colors"
                aria-label="GitHub"
              >
                
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V23"></path></svg>
              </a>
              <a 
                href={portfolioData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="caption hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><rect x="2" y="9" width="20" height="13" rx="2"/><circle cx="8" cy="13" r="2"/><path d="M16 11v6"/><path d="M12 11v6"/><path d="M8 11v6"/></svg>
              </a>
              <a 
                href={portfolioData.contact.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="caption hover:text-white transition-colors"
                aria-label="Twitter"
              >
                
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64.95c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6.1v.06c0 2.13 1.52 3.9 3.54 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.55 1.7 2.16 2.94 4.07 2.97A9.06 9.06 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
