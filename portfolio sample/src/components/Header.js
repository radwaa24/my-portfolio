import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else {
        headerElement.style.transform = "translateY(-200px)";
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="fixed w-full px-4 py-2 bg-gray-900" ref={headerRef}>
      <div className="max-w-7xl mx-auto text-white">
        <div className="flex items-center justify-between px-4 py-1">
          <nav>
            <div className="flex items-center justify-center space-x-2">
              {socials.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-gray-500"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    size="lg"
                    className="transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
            <div className="flex">
              <a
                href="#projects"
                onClick={handleClick("projects")}
                className="mr-4 text-white hover:text-gray-500"
              >
                Projects
              </a>
              <a
                href="#contactme"
                onClick={handleClick("contactme")}
                className="mr-4 text-white hover:text-gray-500"
              >
                Contact Me
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
