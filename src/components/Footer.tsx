import { ExternalLink, Github, Mail, Twitter } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, sectionId?: string) => {
    if (path === "/" && sectionId) {
      if (location.pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    }
  };

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Contests", path: "/contests" },
    { label: "Tasks", path: "/tasks" },
    { label: "Team", path: "/team" },
    { label: "Resources", path: "/resources" },
    { label: "Roadmap", path: "/roadmap" },
    { label: "Become a Setter", path: "/become-setter" },
    //{ label: "Community", path: "/community" },
  ];

  const resources = [
    { label: "IOAI Official", href: "https://ioai-official.org/" },
    { label: "Kaggle", href: "https://www.kaggle.com" },
    { label: "Hugging Face", href: "https://huggingface.co" },
    { label: "All resources", href: "/resources" },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/AI-Community-Contest",
    },
    {
      icon: ExternalLink,
      label: "Discord",
      href: "https://discord.gg/7GfxrqRreY",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:ai.community.contest@gmail.com",
    },
  ];

  return (
    <footer className="border-t border-black/[0.06] bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/AICCCC.png" alt="AICC Logo" className="h-8" />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-6 text-neutral-600">
              AICC (AI Community Contest) runs monthly IOAI practice rounds and
              competitive AI challenges. Community-organized, not affiliated
              with official IOAI.
            </p>
            <div className="-ml-2 flex gap-1">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-lg text-neutral-500 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-neutral-900">
              Pages
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className="block text-sm text-neutral-600 transition-colors duration-150 hover:text-neutral-900"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-neutral-900">
              Resources
            </h3>
            <nav className="space-y-3">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-neutral-600 transition-colors duration-150 hover:text-neutral-900"
                >
                  {resource.label}
                  <ExternalLink className="w-3 h-3 text-neutral-400" strokeWidth={1.5} />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-black/[0.06] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()}{" "}
              AI Community Contest. All rights reserved.
            </p>
            {
              /* <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-500 hover:text-aicc-purple transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-500 hover:text-aicc-purple transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-500 hover:text-aicc-purple transition-colors">
                Code of Conduct
              </a>
            </div> */
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
