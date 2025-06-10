import { Contact } from "@shared/schema";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail } from "lucide-react";

interface ContactSectionProps {
  contact: Contact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section className="content-section bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 lg:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="caption mb-6 lg:mb-8 text-gray-600">→ CONTACT</div>
            <h2 className="section-title mb-8 lg:mb-12">
              LET'S CREATE
              <br />
              <span className="hidden sm:inline">
                SOMETHING AMAZING
                <br />
                TOGETHER
              </span>
              <span className="sm:hidden">GREAT THINGS</span>
            </h2>

            <div className="space-y-6 lg:space-y-8">
              <div>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-3 body-large hover:text-black transition-colors"
                >
                  <Mail size={24} />
                  <span className="break-all">{contact.email}</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 caption hover:text-black transition-colors"
                >
                  <SiGithub size={20} />
                  GITHUB
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 caption hover:text-black transition-colors"
                >
                  <SiLinkedin size={20} />
                  LINKEDIN
                </a>
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 caption hover:text-black transition-colors"
                >
                  <div className="w-5 h-5 bg-black rounded"></div>
                  TWITTER
                </a>
              </div>
            </div>

            <div className="mt-12 lg:mt-16 text-center">
              <div className="caption text-gray-500 mb-4">AVAILABILITY</div>
              <div className="body-text text-gray-700">
                Open for freelance projects and full-time opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
