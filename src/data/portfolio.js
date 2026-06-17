// =====================================================================
//  Single source of truth for the three new themed routes (/vue, /react,
//  /nuxt). The original home page keeps its own inline data untouched.
//  All values here are the real portfolio data, plus a few derived
//  sections (stats, services, tech stack) built from existing facts.
// =====================================================================

// --- Avatar & hero backgrounds -------------------------------------------------
import avatar from "../assets/two.jpg";
import bgA from "../assets/ten.webp";
import bgB from "../assets/eight.webp";

// --- Social icons --------------------------------------------------------------
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import threadsIcon from "../assets/threads.png";
import instagramIcon from "../assets/instagram.png";

// --- Project media -------------------------------------------------------------
import topVideo from "../assets/topNbuy.mp4";
import caveoVideo from "../assets/caveo.mp4";
import meitsVideo from "../assets/meits.mp4";
import bittrustVideo from "../assets/bittrust.mp4";
import lemonVideo from "../assets/little-lemon.mp4";
import heroVideo from "../assets/hero.webm";
import ordersVideo from "../assets/orders.webm";
import mealPrepVideo from "../assets/meal-prep.webm";
import qwizeenVideo from "../assets/qwizeen.webm";
import fascanoVideo from "../assets/fascano-web.mp4";
import reservationVideo from "../assets/reservation-web.mp4";

// --- Certificate images --------------------------------------------------------
import umImg from "../assets/um.png";
import metaImg from "../assets/meta.png";
import codecademyImg from "../assets/codecdmy.png";
import soloImg from "../assets/solo.png";
import aiceImg from "../assets/aice.png";
import fwdImg from "../assets/fwd.png";
import freecodeImg from "../assets/freecode.png";

// ------------------------------------------------------------------------------
//  PROFILE
// ------------------------------------------------------------------------------
export const profile = {
  name: "Radwa Khalaf",
  firstName: "Radwa",
  lastName: "Khalaf",
  role: "Full-Stack Web Developer",
  specialty: "Vue · Nuxt · Node.js",
  roles: [
    "Full-Stack Web Developer",
    "Vue.js & Nuxt.js Specialist",
    "React & Next.js Developer",
    "Node.js Back-Ends",
  ],
  tagline:
    "I build complete web apps for startups — from pixel-perfect front-ends to Node-powered back-ends.",
  avatar,
  backgrounds: [bgA, bgB],
  resume:
    "https://drive.google.com/file/d/1GQTnmwh2rrj60lXYa-G_Tsn5QyVN5VKy/view?usp=sharing",
  about:
    "I'm a Full-Stack Web Developer who made a bold leap into programming — and it's the decision I'm proudest of. What began as curiosity grew into a craft: I kept learning, building and growing until I could carry an idea all the way from a blank screen to a deployed, real-world product. Vue.js and Nuxt.js are my home turf, and I work confidently across React and Next.js too. More recently I've gone full-stack, pairing Nuxt front-ends with Node.js back-ends to ship complete applications. Today I work as a freelancer, partnering with startups to build full web apps — landing pages, dashboards and management systems, e-commerce, portfolios, reservation platforms and more — always with clean, scalable code and an obsessive eye for detail.",
  email: "radwa2484@gmail.com",
  location: "October Gardens, Egypt",
  languages: ["Arabic", "English", "Turkish", "German"],
  degree: "Bachelor",
  graduation: "2020",
  hobbies: ["Photography", "Traveling"],
};

// ------------------------------------------------------------------------------
//  ABOUT — info cards (mirrors the home page facts)
// ------------------------------------------------------------------------------
export const aboutFacts = [
  { icon: "fi-rr-globe", label: "Languages", value: "Arabic, English, Turkish, German" },
  { icon: "fi-rr-envelope", label: "Email", value: "radwa2484@gmail.com" },
  { icon: "fi-rr-map-marker", label: "Location", value: "October Gardens, Egypt" },
  { icon: "fi-rr-degree-credential", label: "Degree", value: "Bachelor" },
  { icon: "fi-rr-graduation-cap", label: "Graduation", value: "2020" },
  { icon: "fi-rr-camera", label: "Hobbies", value: "Photography, Traveling" },
];

// ------------------------------------------------------------------------------
//  SOCIAL LINKS
// ------------------------------------------------------------------------------
export const socials = [
  { name: "GitHub", url: "https://github.com/radwaa24", icon: githubIcon, brand: "fi-brands-github", handle: "radwaa24" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/radwa-khalaf/", icon: linkedinIcon, brand: "fi-brands-linkedin", handle: "radwa-khalaf" },
  { name: "Threads", url: "https://www.threads.net/@rudii.24?hl=en", icon: threadsIcon, brand: "fi-brands-threads", handle: "@rudii.24" },
  { name: "Instagram", url: "https://www.instagram.com/rudii.24/", icon: instagramIcon, brand: "fi-brands-instagram", handle: "@rudii.24" },
];

// ------------------------------------------------------------------------------
//  SKILLS — grouped into categories for richer layouts
// ------------------------------------------------------------------------------
export const skillGroups = [
  {
    category: "Core Web",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "Vue.js", level: 96 },
      { name: "Nuxt.js", level: 96 },
      { name: "React.js", level: 84 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    category: "Back-End",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "RESTful APIs", level: 96 },
      { name: "Full-Stack Apps", level: 88 },
    ],
  },
  {
    category: "Tooling",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Version Control", level: 90 },
    ],
  },
  {
    category: "Strengths",
    skills: [
      { name: "Problem Solving", level: 92 },
      { name: "Communication", level: 98 },
      { name: "Attention to Detail", level: 95 },
      { name: "Adaptability", level: 90 },
      { name: "Collaboration", level: 96 },
    ],
  },
];

// flat list (handy for marquees / orbits / clouds)
export const skills = skillGroups.flatMap((g) => g.skills);

// ------------------------------------------------------------------------------
//  PROJECTS
// ------------------------------------------------------------------------------
export const projects = [
  {
    title: "Fascano",
    description:
      "Fascano delivers all-in-one management systems for restaurants, cafés, hotels and many other business types. As their front-end developer I built a wide range of high-converting landing pages, shipped new features for the dashboard, and contributed to the web-menu project.",
    video: fascanoVideo,
    demo: "https://www.fascano.com/en/restaurants",
    tags: ["Nuxt.js", "Dashboard", "Landing Pages", "Web Menu"],
  },
  {
    title: "Reservation & QR Check-in",
    description:
      "A full reservation platform for booking a hall or a table, generating a unique QR code that guests scan for fast, seamless on-site check-in. Built full-stack with a Nuxt front-end and a Node.js back-end.",
    video: reservationVideo,
    tags: ["Nuxt.js", "Node.js", "Full-Stack", "QR Check-in"],
  },
  {
    title: "Qwizeen Landing Pages",
    description:
      "Refactored the Qwizeen landing page with a switchable design for the Qwizeen meal prep page. Created separate landing pages for each service, incorporating smooth animations, a polished layout, and a 'Contact Us' modal for enhanced user experience.",
    video: qwizeenVideo,
    demo: "https://qwizeen.io/",
    tags: ["Vue.js", "Animations", "Landing"],
  },
  {
    title: "Meal Prep Restaurant",
    description:
      "Developed a landing page UI for meal prep restaurants, featuring a home page, an FAQ page, and a dynamic menu based on delivery dates. Also implemented login pages and forgot/reset password functionality for both customers and administrators.",
    video: mealPrepVideo,
    demo: "https://kitchen-storys.qwizeen.io/prep",
    tags: ["Nuxt.js", "Auth", "Dynamic Menu"],
  },
  {
    title: "Task Management Board",
    description:
      "An assessment project for task management featuring drag-and-drop. Users can easily add tasks with options to select a title color and background color. The design emphasizes a basic UI structure to highlight functionality.",
    video: heroVideo,
    repo: "https://github.com/radwaa24/Hero",
    tags: ["Vue.js", "Drag & Drop", "UI"],
  },
  {
    title: "Top & Buy",
    description:
      "UI Transformation: Orchestrated a comprehensive revamp of the React project's user interface.",
    video: topVideo,
    tags: ["React.js", "UI Revamp"],
  },
  {
    title: "Caveo",
    description:
      "Led the overhaul of an outdated WordPress-based system, transitioning it to a modern stack.",
    video: caveoVideo,
    demo: "https://caveo.com.kw/",
    tags: ["Migration", "Vue.js", "WordPress"],
  },
  {
    title: "Orders Management",
    description:
      "An order management project with features to create, list, and update orders. Includes admin login, order filtering by status or date, pagination for better list handling, and payment status synced with Stripe responses.",
    video: ordersVideo,
    repo: "https://github.com/radwaa24/velents",
    tags: ["Stripe", "Dashboard", "REST API"],
  },
  {
    title: "Meits Tech",
    description:
      "Converted an existing WordPress project to a dynamic Vue.js application.",
    video: meitsVideo,
    demo: "https://meitstech.com/",
    tags: ["Vue.js", "Migration"],
  },
  {
    title: "Bittrust",
    description:
      "Expanded the functionality of an existing system by incorporating three new pages.",
    video: bittrustVideo,
    repo: "https://github.com/radwaa24/bittrust",
    tags: ["Vue.js", "Feature Work"],
  },
  {
    title: "Little Lemon Restaurant",
    description:
      "Developed a React-based restaurant booking site with Material-UI components.",
    video: lemonVideo,
    demo: "https://little-limon.vercel.app/",
    repo: "https://github.com/radwaa24/little-limon",
    tags: ["React.js", "Material-UI", "Booking"],
  },
];

// ------------------------------------------------------------------------------
//  CERTIFICATES
// ------------------------------------------------------------------------------
export const certificates = [
  { img: umImg, name: "University of Michigan", issuer: "Coursera", link: "https://drive.google.com/file/d/1_vmc3MKJsdSLxMjTByYtvPPtbHv5KFZu/view?usp=sharing" },
  { img: metaImg, name: "Meta", issuer: "Meta / Coursera", link: "https://drive.google.com/file/d/1goUCFzpM7UPEhMVVea2gLkPOSaI-71xZ/view?usp=sharing" },
  { img: codecademyImg, name: "CodeCademy", issuer: "Codecademy", link: "https://drive.google.com/file/d/1Oo2Nh3KypxGQkp8gQWk8w_kZLFXGuXWQ/view?usp=sharing" },
  { img: freecodeImg, name: "FreeCodeCamp", issuer: "JavaScript Algorithms & Data Structures", link: "https://www.freecodecamp.org/certification/fcc27c68a8f-117a-4666-aed4-05679ffcb9a6/javascript-algorithms-and-data-structures" },
  { img: soloImg, name: "Solo Learn", issuer: "SoloLearn", link: "https://drive.google.com/file/d/1WJAh6iUKVRODZAuSI1FgwjbV3_3qUmW6/view?usp=sharing" },
  { img: aiceImg, name: "AICE - ALX", issuer: "ALX", link: "https://drive.google.com/file/d/1QOLLZtqlO9Wm5uiR_9kBm5ca-0Gd1Sgk/view?usp=sharing" },
  { img: fwdImg, name: "FWD", issuer: "Egypt FWD", link: "https://drive.google.com/file/d/1fO1hOcKJyqKx8JxmjDrjlYYpL20pNvE6/view?usp=sharing" },
];

// ------------------------------------------------------------------------------
//  DERIVED — Services (from real project work) [NEW SECTION]
// ------------------------------------------------------------------------------
export const services = [
  {
    icon: "fi-rr-browser",
    title: "Full-Stack Web Apps",
    description: "Complete, production-ready applications with Nuxt front-ends and Node.js back-ends — built to scale with your startup.",
  },
  {
    icon: "fi-rr-apps",
    title: "Dashboards & Management Systems",
    description: "Admin panels and management systems with data tables, role-based access and real-time control.",
  },
  {
    icon: "fi-rr-shopping-cart",
    title: "E-Commerce",
    description: "Storefronts, carts and checkout with payment integration like Stripe, plus full order management.",
  },
  {
    icon: "fi-rr-calendar",
    title: "Reservation & Booking Apps",
    description: "Booking platforms for tables, halls and services — complete with QR-code check-in.",
  },
  {
    icon: "fi-rr-rocket-lunch",
    title: "Landing Pages",
    description: "High-converting, animated marketing pages that make startups look world-class.",
  },
  {
    icon: "fi-rr-magic-wand",
    title: "Portfolios & Brand Sites",
    description: "Bespoke, memorable personal and brand sites with standout motion and micro-interactions.",
  },
];

// ------------------------------------------------------------------------------
//  DERIVED — Stats / highlights [NEW SECTION]  (all factual counts)
// ------------------------------------------------------------------------------
export const stats = [
  { value: projects.length, suffix: "+", label: "Projects Delivered" },
  { value: certificates.length, suffix: "", label: "Certifications" },
  { value: skills.length, suffix: "", label: "Skills & Strengths" },
  { value: profile.languages.length, suffix: "", label: "Languages Spoken" },
];

// ------------------------------------------------------------------------------
//  DERIVED — Tech stack (for marquees / orbits) [NEW SECTION]
// ------------------------------------------------------------------------------
export const techStack = [
  "HTML", "CSS", "JavaScript", "Vue.js", "Nuxt.js",
  "React.js", "Tailwind CSS", "Figma", "Git", "REST APIs",
];

// ------------------------------------------------------------------------------
//  Route registry — used by the floating experience switcher
// ------------------------------------------------------------------------------
export const experiences = [
  { path: "/", label: "Original", tech: "Home", accent: "#f87171" },
  { path: "/1", label: "FLUX · Liquid WebGL", tech: "01", accent: "#a78bfa" },
  { path: "/2", label: "ORBIT · 3D Particle Universe", tech: "02", accent: "#38bdf8" },
  { path: "/3", label: "REEL · Horizontal Cinema", tech: "03", accent: "#fb7185" },
  { path: "/4", label: "RAW · Kinetic Brutalist", tech: "04", accent: "#facc15" },
  { path: "/5", label: "ATLAS · Draggable Canvas", tech: "05", accent: "#34d399" },
  { path: "/6", label: "PETAL · Soft Editorial", tech: "06", accent: "#ec4899" },
  { path: "/7", label: "HALO · Holographic", tech: "07", accent: "#c084fc" },
  { path: "/8", label: "VEIL · Spotlight Reveal", tech: "08", accent: "#cbd5e1" },
  { path: "/9", label: "LUNA · Moonlight", tech: "09", accent: "#93c5fd" },
  { path: "/10", label: "NOVA · Hyperspace", tech: "10", accent: "#22d3ee" },
  { path: "/11", label: "SYNTH · Retrowave", tech: "11", accent: "#ff4dd2" },
  { path: "/12", label: "ECLIPSE · Total Eclipse", tech: "12", accent: "#fbbf24" },
  { path: "/13", label: "AURORA · Northern Lights", tech: "13", accent: "#4ade80" },
  { path: "/14", label: "WORMHOLE · Tunnel Warp", tech: "14", accent: "#fb923c" },
  { path: "/15", label: "ORRERY · Solar System", tech: "15", accent: "#818cf8" },
];

export default {
  profile,
  aboutFacts,
  socials,
  skillGroups,
  skills,
  projects,
  certificates,
  services,
  stats,
  techStack,
  experiences,
};
