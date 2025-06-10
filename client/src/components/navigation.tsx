import { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass-navbar" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="caption font-bold text-black">SAIKAT.IN</div>
            <div className="hidden sm:flex items-center gap-1 caption text-gray-600">
              <MapPin size={12} />
              <span>UTTAR PRADESH, INDIA</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("projects")}
              className="caption hover:text-black transition-colors text-gray-700"
            >
              WORKS
            </button>
            <button
              onClick={() => scrollToSection("timeline")}
              className="caption hover:text-black transition-colors text-gray-700"
            >
              CAREER
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="caption hover:text-black transition-colors text-gray-700"
            >
              CONTACT
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-grey-100 rounded transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-gray-700" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-navbar border-t border-gray-200">
            <div className="py-4 space-y-4">
              <div className="px-4 py-2 sm:hidden">
                <div className="flex items-center gap-1 caption text-gray-600">
                  <MapPin size={12} />
                  <span>INDIA</span>
                </div>
              </div>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-4 py-2 caption hover:text-black transition-colors"
              >
                WORKS
              </button>
              <button
                onClick={() => scrollToSection("timeline")}
                className="block w-full text-left px-4 py-2 caption hover:text-black transition-colors"
              >
                ARCHIVE
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 caption hover:text-black transition-colors"
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
