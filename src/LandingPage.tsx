"use client";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
  Variants,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MousePosition {
  x: number;
  y: number;
}
interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  impact: string[];
  color: string;
  year: string;
  category: string;
}
interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}
interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  color: string;
}
interface Achievement {
  icon: string;
  title: string;
  description: string;
  date: string;
  rarity: "common" | "rare" | "legendary";
}

// ─── Context ──────────────────────────────────────────────────────────────────
const MouseContext = createContext<MousePosition>({ x: 0, y: 0 });
const useMouse = () => useContext(MouseContext);

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nexora",
    tagline: "Learn. Teach. Earn.",
    description:
      "A peer-to-peer learning platform where learners gain skills through mentorship while earning XP rewards. Educators can teach, build credibility, and convert earned XP into real-world earnings.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Authentication", "OpenAI API"],
    impact: ["XP-Based Reward System", "Role-Based Platform", "Mentor Monetization"],
    color: "#10B981",
    year: "2025",
    category: "SaaS Platform",
  },
  {
    id: 2,
    title: "AgriVision AI",
    tagline: "Smart farming powered by AI",
    description:
      "An AI-powered agriculture platform that detects crop diseases, recommends relevant government schemes, and connects farmers directly with buyers through an integrated marketplace",
    tech: ["Typescript", "Express", "Node.js", "OpenAI API", "Javascript", "SQL"],
    impact: ["AI Disease Detection", "Government Scheme Assistance", "Farmer-to-Buyer Marketplace"],
    color: "#22D3EE",
    year: "2025",
    category: "AgriTech",
  },
  {
    id: 3,
    title: "Lost & Found Tracker",
    tagline: "Reconnect people with what matters",
    description:
      "A campus-focused web application that helps students report, discover, and recover lost belongings through a centralized community-driven platform.",
    tech: ["Javascript", "Html5", "CSS3", "GeminiAPI", "Firebase"],
    impact: ["Lost Item Reporting", "Community-Based Recovery", "Campus Connectivity"],
    color: "#F59E0B",
    year: "2024",
    category: "EduTech",
  },
  {
    id: 4,
    title: "FraudAnomalyGuard",
    tagline: "Detecting fraud beyond fixed rules",
    description:
      "A machine learning-powered fraud detection system that identifies suspicious transactions by analyzing location anomalies, transaction patterns, and cash velocity to uncover potential financial fraud in real time.",
    tech: ["Streamlit", "Pandas", "Numpy", "Scikit-Learn", "Python", "Matplotlib"],
    impact: ["Location Anomaly Detection", "Transaction Pattern Analysis", "Cash Velocity Monitoring"],
    color: "#0D9488",
    year: "2026",
    category: "FinTech",
  },
];

const SKILLS: Skill[] = [
  { name: "React", level: 85, category: "Frontend", icon: "⚛" },
  { name: "TypeScript", level: 75, category: "Frontend", icon: "𝗧" },
  { name: "Next.js", level: 60, category: "Frontend", icon: "▲" },
  { name: "Framer Motion", level: 70, category: "Frontend", icon: "◎" },
  { name: "TailwindCSS", level: 90, category: "Frontend", icon: "🎨" },
  { name: "Node.js", level: 90, category: "Backend", icon: "⬡" },
  { name: "Express", level: 96, category: "Backend", icon: "◈" },
  { name: "MongoDB", level: 84, category: "Backend", icon: "🍃" },
  { name: "PostgreSQL", level: 70, category: "Backend", icon: "🐘" },
  { name: "Redis", level: 25, category: "Backend", icon: "◉" },
  { name: "Docker", level: 40, category: "DevOps", icon: "🐳" },
  { name: "AWS", level: 65, category: "DevOps", icon: "☁" },
  { name: "Figma", level: 80, category: "Design", icon: "✦" },

];

const EXPERIENCES: Experience[] = [
  {
    company: "Industry Experience",
    role: "Full Stack Developer Intern",
    period: "2026",
    location: "Remote",
    points: [
      "Working on real-world software solutions through a contract-based internship. Contributing to full-stack development, collaborating with teams, and delivering scalable applications while gaining hands-on industry experience.",
    ],
    color: "#10B981",
  },
  {
    company: "Developer Communities & Campus Programs",
    role: "Community Leader & Campus Ambassador",
    period: "2024 – 2025",
    location: "Remote, Global",
    points: [
      "Led and contributed to multiple national and international developer programs, including Google Student Ambassador initiatives, GDG Organizer, Girlscript Summer of Code, GeeksforGeeks Campus Mantri, and NECxECELL Member. Organized events, mentored peers, and fostered collaborative learning environments",
    ],
    color: "#22D3EE",
  },
  {
    company: "Personal Brand & Knowledge Sharing",
    role: "Technical Storyteller",
    period: "2024 – 2025",
    location: "India",
    points: [
      "Began documenting my learning journey, sharing technical insights, project experiences, and career lessons. Built an online presence focused on helping students navigate technology and professional growth.",
    ],
    color: "#F59E0B",
  },
  {
    company: "Self-Driven Learning Journey",
    role: "Frontend Developer",
    period: "2023 – 2024",
    location: "India",
    points: [
      "Started my software development journey by mastering frontend technologies and building responsive web applications. Developed strong foundations in JavaScript, React, UI/UX principles, and modern web development",
    ],
    color: "#0D9488",
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "☁️",
    title: "AWS Certified (Basic)",
    description: "Earned AWS Cloud certification and gained hands-on understanding of cloud infrastructure and deployment fundamentals.",
    date: "Sep 2025",
    rarity: "rare",
  },
  {
    icon: "👩‍💻",
    title: "Code Club Vice President",
    description: "Led technical initiatives, coordinated events, and helped grow the developer community within the college ecosystem.",
    date: "Sept 2025",
    rarity: "rare",
  },
  {
    icon: "🌍",
    title: "Community Builder",
    description: "Represented and contributed to programs including Google Student Ambassador, GDG, GFG Campus Mantri, GSSoC Ambassador, and E-Cell.",
    date: "Mar 2025",
    rarity: "legendary",
  },
  {
    icon: "💼",
    title: "Industry Breakthrough",
    description: "Secured a contract-based software development internship with a ₹25,000 stipend while pursuing engineering.",
    date: "May 2026",
    rarity: "legendary",
  },
  {
    icon: "📈",
    title: "Tech Storyteller",
    description: "Built a professional presence on LinkedIn, growing a network of 1,000+ developers, students, and industry professionals.",
    date: "Nov 2024 - 25",
    rarity: "legendary",
  },
  {
    icon: "✍️",
    title: "Project Explorer",
    description: "Built projects across EdTech, AgriTech, Campus Utility, and AI/ML domains using the MERN stack and machine learning.",
    date: "Aug 2024 - 26",
    rarity: "common",
  },
];

// ─── Shared Animation Variants ────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ─── Utility ──────────────────────────────────────────────────────────────────
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const mouse = useMouse();
  const prefersReducedMotion = useReducedMotion();
  const cx = useSpring(mouse.x, { stiffness: 500, damping: 40 });
  const cy = useSpring(mouse.y, { stiffness: 500, damping: 40 });
  const trailX = useSpring(mouse.x, { stiffness: 120, damping: 28 });
  const trailY = useSpring(mouse.y, { stiffness: 120, damping: 28 });
  if (prefersReducedMotion) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-emerald-400 mix-blend-screen"
        style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-cyan-400/40"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

// ─── Navigation Dots ──────────────────────────────────────────────────────────
const SECTION_IDS = ["hero", "about", "skills", "projects", "experience", "achievements", "contact"];

function NavigationDots() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const offsets = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? Math.abs(el.getBoundingClientRect().top) : Infinity;
      });
      setActive(offsets.indexOf(Math.min(...offsets)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className="group relative flex items-center justify-end gap-2"
          aria-label={`Go to ${id}`}
        >
          <span className="hidden group-hover:block text-xs text-slate-400 capitalize pr-1 whitespace-nowrap">
            {id}
          </span>
          <motion.div
            animate={{ scale: active === i ? 1.4 : 1, opacity: active === i ? 1 : 0.4 }}
            className={`w-2 h-2 rounded-full transition-colors ${
              active === i ? "bg-emerald-400" : "bg-slate-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-400 to-teal-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ─── Section Reveal Wrapper ───────────────────────────────────────────────────
function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.opacity})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Floating Card (Hero) ─────────────────────────────────────────────────────
function FloatingDevCard() {
  const mouse = useMouse();
  const x = useSpring((mouse.x / window.innerWidth - 0.5) * 20, { stiffness: 80, damping: 20 });
  const y = useSpring((mouse.y / window.innerHeight - 0.5) * 20, { stiffness: 80, damping: 20 });
  return (
    <motion.div
      style={{ rotateX: y, rotateY: x }}
      className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 perspective-1000"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="w-64 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/60 backdrop-blur-xl p-6 shadow-2xl"
        style={{ boxShadow: "0 0 40px rgba(16,185,129,0.15), 0 30px 60px rgba(0,0,0,0.5)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-sm font-bold text-slate-900">
            BD
          </div>
          <div>
            <p className="text-slate-100 font-semibold text-sm">Bhumika Dolnare</p>
            <p className="text-emerald-400 text-xs">Available to hire</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        {[
          { label: "Projects Shipped", value: "5+" },
          { label: "Years Experience", value: "1 yrs" },
          { label: "Satisfaction Rate", value: "100%" },
        ].map((stat) => (
          <div key={stat.label} className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
            <span className="text-slate-400 text-xs">{stat.label}</span>
            <span className="text-cyan-300 text-xs font-bold">{stat.value}</span>
          </div>
        ))}
        <div className="mt-4 flex gap-1.5 flex-wrap">
          {["React", "Node.js", "TypeScript"].map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -80]);

  const words = ["Engineer.", "Creator.", "Builder.", "Storyteller."];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0F1E]">
      <ParticleCanvas />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-6">
            Full Stack Engineer
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-100 leading-none tracking-tight mb-4">
            Bhumika Dolnare
          </motion.h1>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8 h-14">
            <span className="text-2xl md:text-4xl text-slate-400 font-light">I am a</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {words[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl leading-relaxed mb-10">
            I craft digital products that feel inevitable fast, beautiful, and built to last. From idea to deploy, I own the full stack.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              primary
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let's Talk
            </MagneticButton>
          </motion.div>
        </SectionReveal>
        <FloatingDevCard />
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const acts = [
    {
      label: "Origins",
      title: "The curious kid who wanted to understand computers",
      body: "I was always curious about how things worked. As a child, one question never left my mind: How can a computer do everything using just 0s and 1s? That curiosity pushed me to explore technology beyond the surface and eventually led me to choose Computer Science Engineering. What started as a simple question became the foundation of my journey into software development.",
      accent: "#10B981",
    },
    {
      label: "The Turn",
      title: "A Tier-3 student creating opportunities",
      body: "Coming from a Tier-3 college, I realized early that opportunities wouldn't simply come to me,I had to create them myself. The turning point came during my fourth semester when I stepped into leadership roles and started building communities. I became the Vice President of my college coding club and represented several national and international programs as a Campus Ambassador, Community Leader, and Organizer. Through these experiences, I learned that growth happens when you step forward, take responsibility, and help others grow alongside you.",
      accent: "#22D3EE",
    },
    {
      label: "Today",
      title: "Developer. Storyteller. Community Builder",
      body: "Today, as a pre-final year Computer Science student, I am a Full-Stack Developer focused on building impactful digital experiences. I've completed both unpaid and paid internships, worked on real-world projects, and continue to explore modern technologies. Beyond coding, I enjoy creating content, sharing knowledge, and building communities that inspire students to learn, collaborate, and grow. My journey is still just beginning, and I'm excited about what comes next",
      accent: "#F59E0B",
    },
  ];

  return (
    <section id="about" ref={containerRef} className="relative bg-[#0A0F1E] py-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #10B981 0, #10B981 1px, transparent 0, transparent 50%)",
          backgroundSize: "40px 40px",
          y: bgY,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-3">
            Origin Story
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-100 mb-20">
            How I got here.
          </motion.h2>
        </SectionReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {acts.map((act, i) => (
            <ActCard key={i} act={act} index={i} />
          ))}
        </div>
        {/* Stats row */}
        <SectionReveal className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "2+", label: "Years building" },
            { num: "5+", label: "Products shipped" },
            { num: "12+", label: "Users reached" },
            { num: "10+", label: "GitHub stars" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="bg-slate-800/40 rounded-2xl border border-slate-700/40 p-6 text-center backdrop-blur-sm"
            >
              <div className="text-4xl font-black text-emerald-400 mb-1">{s.num}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

function ActCard({ act, index }: { act: { label: string; title: string; body: string; accent: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-slate-800/30 rounded-3xl border border-slate-700/40 p-8 hover:border-slate-600/60 transition-all duration-500 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${act.accent}12 0%, transparent 70%)` }}
      />
      <div className="relative z-10">
        <span
          className="inline-block font-mono text-xs tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-5 border"
          style={{ color: act.accent, borderColor: `${act.accent}40`, background: `${act.accent}10` }}
        >
          {act.label}
        </span>
        <h3 className="text-xl font-bold text-slate-100 mb-4 leading-snug">{act.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{act.body}</p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${act.accent}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────────────────────
function SkillsSection() {
  const categories = ["Frontend", "Backend", "DevOps", "Design"];
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const filtered = SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative bg-[#111827] py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-3">
            Arsenal
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-100 mb-4">
            The Skill Universe
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-12 max-w-xl">
            Every tool earned the hard way — in production, under pressure.
          </motion.p>
        </SectionReveal>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-emerald-500 border-emerald-500 text-slate-900"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skill bars */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {filtered.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Floating skill orbs decorative */}
        <div className="mt-24 relative h-48 overflow-hidden">
          {SKILLS.slice(0, 12).map((skill, i) => (
            <OrbFloat key={skill.name} skill={skill} index={i} total={12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group bg-slate-800/40 rounded-2xl border border-slate-700/40 p-5 hover:border-slate-600/60 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-slate-200 font-semibold">{skill.name}</span>
        </div>
        <span className="text-emerald-400 font-bold text-sm">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.07 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ originX: 0, width: `${skill.level}%` }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
        />
      </div>
    </motion.div>
  );
}

function OrbFloat({ skill, index, total }: { skill: Skill; index: number; total: number }) {
  const angle = (index / total) * 360;
  const radius = 35 + (index % 3) * 12;
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 50 + (radius * 0.4) * Math.sin((angle * Math.PI) / 180);
  const size = 8 + (skill.level / 100) * 18;
  const delay = index * 0.3;
  const colors = ["#10B981", "#22D3EE", "#0D9488", "#F59E0B"];
  const color = colors[index % colors.length];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.7, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { repeat: Infinity, duration: 3 + (index % 3), ease: "easeInOut", delay: delay % 2 },
      }}
      className="absolute flex items-center justify-center rounded-full cursor-default group"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size * 4,
        height: size * 4,
        background: `radial-gradient(circle, ${color}30, ${color}08)`,
        border: `1px solid ${color}40`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="text-[10px] font-bold" style={{ color }}>
        {skill.icon}
      </span>
      <span className="absolute opacity-0 group-hover:opacity-100 -top-6 text-[10px] text-slate-300 whitespace-nowrap bg-slate-900 px-2 py-0.5 rounded-md transition-opacity">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="projects" className="relative bg-[#0A0F1E] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-teal-400 font-mono text-sm tracking-[0.3em] uppercase mb-3">
            Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-100 mb-4">
            Selected Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-16 max-w-xl">
            Products I've led from concept to production. Each one a different problem, a different stack, the same obsession with craft.
          </motion.p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const mouse = useMouse();
  const [hovered, setHovered] = useState(false);
  const [cardRect, setCardRect] = useState({ left: 0, top: 0, width: 1, height: 1 });

  const rotateX = hovered
    ? clamp(((mouse.y - cardRect.top - cardRect.height / 2) / (cardRect.height / 2)) * -8, -8, 8)
    : 0;
  const rotateY = hovered
    ? clamp(((mouse.x - cardRect.left - cardRect.width / 2) / (cardRect.width / 2)) * 8, -8, 8)
    : 0;
  const glowX = hovered ? ((mouse.x - cardRect.left) / cardRect.width) * 100 : 50;
  const glowY = hovered ? ((mouse.y - cardRect.top) / cardRect.height) * 100 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
      className="perspective-1000 cursor-pointer"
      onMouseEnter={(e) => {
        setHovered(true);
        const r = e.currentTarget.getBoundingClientRect();
        setCardRect({ left: r.left, top: r.top, width: r.width, height: r.height });
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCardRect({ left: r.left, top: r.top, width: r.width, height: r.height });
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative group bg-slate-800/50 rounded-3xl border border-slate-700/40 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic sheen */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${project.color}20 0%, transparent 60%)`,
          }}
        />
        <div className="relative z-10 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-slate-500">{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="font-mono text-xs" style={{ color: project.color }}>{project.category}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-100">{project.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{project.tagline}</p>
            </div>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 group-hover:border-slate-400 group-hover:text-slate-200 transition-colors"
            >
              ↗
            </motion.div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
          {/* Impact chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.impact.map((imp) => (
              <span
                key={imp}
                className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
              >
                {imp}
              </span>
            ))}
          </div>
          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 bg-slate-700/60 text-slate-400 rounded-md border border-slate-700/40">
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* Bottom accent */}
        <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 bg-slate-900 border border-slate-700/60 rounded-3xl p-10 max-w-2xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-slate-200 transition-colors text-xl">✕</button>
        <span className="font-mono text-xs" style={{ color: project.color }}>{project.category} · {project.year}</span>
        <h2 className="text-4xl font-black text-slate-100 mt-2 mb-2">{project.title}</h2>
        <p className="text-slate-400 mb-6">{project.description}</p>
        <div className="mb-6">
          <h4 className="text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">Impact</h4>
          <div className="flex flex-wrap gap-2">
            {project.impact.map((imp) => (
              <span
                key={imp}
                className="text-sm px-4 py-1.5 rounded-full font-semibold"
                style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
              >
                {imp}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-sm px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── EXPERIENCE SECTION ───────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-[#111827] py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase mb-3">
            The Path
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-100 mb-20">
            Experience Timeline
          </motion.h2>
        </SectionReveal>

        <div className="relative">
          {/* Spine */}
          <TimelineSpine />
          {/* Nodes */}
          <div className="space-y-0">
            {EXPERIENCES.map((exp, i) => (
              <TimelineNode key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div ref={ref} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
      <div className="absolute inset-0 bg-slate-700/40 rounded-full" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-500 via-cyan-400 to-teal-500"
      />
    </div>
  );
}

function TimelineNode({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-8"
      >
        <motion.div
          animate={inView ? { boxShadow: [`0 0 0 0px ${exp.color}60`, `0 0 0 8px ${exp.color}00`] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
          className="w-4 h-4 rounded-full border-2 border-slate-900"
          style={{ background: exp.color }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`ml-16 md:ml-0 ${isLeft ? "md:mr-8 md:pr-8 md:w-[45%]" : "md:ml-8 md:pl-8 md:w-[45%] md:ml-auto"} bg-slate-800/40 rounded-2xl border border-slate-700/40 p-6 hover:border-slate-600/60 transition-all duration-300 group`}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 0% 0%, ${exp.color}08, transparent 60%)` }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-1">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded border"
              style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}10` }}
            >
              {exp.period}
            </span>
            <span className="text-xs text-slate-500">{exp.location}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-3">{exp.role}</h3>
          <p className="text-slate-400 text-sm font-medium mb-4">{exp.company}</p>
          <ul className="space-y-2">
            {exp.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2 text-slate-400 text-sm">
                <span style={{ color: exp.color }} className="mt-0.5 flex-shrink-0">▸</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ─── ACHIEVEMENTS SECTION ─────────────────────────────────────────────────────
function AchievementsSection() {
  return (
    <section id="achievements" className="relative bg-[#0A0F1E] py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-400/30"
            style={{ left: `${5 + i * 5}%`, top: `${10 + (i % 7) * 12}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase mb-3">
            Trophy Room
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-100 mb-4">
            Achievements Unlocked
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-16 max-w-xl">
            Milestones that meant something. Each one earned, not collected.
          </motion.p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const RARITY_CONFIG = {
  common: { glow: "#94A3B8", label: "Common", badge: "bg-slate-700/40 text-slate-400 border-slate-700/40" },
  rare: { glow: "#22D3EE", label: "Rare", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
  legendary: { glow: "#F59E0B", label: "Legendary", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
};

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [unlocked, setUnlocked] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const rarity = RARITY_CONFIG[achievement.rarity];

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setUnlocked(true), index * 150 + 400);
      return () => clearTimeout(t);
    }
  }, [inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="cursor-pointer perspective-1000"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="bg-slate-800/50 rounded-2xl border p-6 backface-hidden relative overflow-hidden"
          style={{ borderColor: unlocked ? `${rarity.glow}40` : "#374151", backfaceVisibility: "hidden" }}
        >
          {/* Unlock sweep */}
          {unlocked && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ background: `linear-gradient(105deg, transparent 40%, ${rarity.glow}30, transparent 60%)` }}
            />
          )}
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(circle at 50% 0%, ${rarity.glow}60, transparent 70%)` }}
          />
          <div className="relative z-10 flex items-start justify-between mb-4">
            <motion.span
              animate={unlocked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="text-4xl"
            >
              {achievement.icon}
            </motion.span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${rarity.badge}`}>
              {rarity.label}
            </span>
          </div>
          <h3 className="text-slate-100 font-bold text-lg mb-1">{achievement.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>
          <p className="text-slate-600 text-xs font-mono mt-4">{achievement.date}</p>
          {!unlocked && (
            <div className="absolute inset-0 bg-slate-900/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">🔒</span>
            </div>
          )}
          <p className="text-slate-600 text-[10px] mt-3 text-center">Tap to flip</p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-slate-800/90 rounded-2xl border p-6 flex flex-col items-center justify-center text-center"
          style={{ borderColor: `${rarity.glow}60`, transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <span className="text-5xl mb-3">{achievement.icon}</span>
          <h3 className="text-slate-100 font-black text-xl mb-2">{achievement.title}</h3>
          <p className="text-slate-400 text-sm">{achievement.description}</p>
          <div className="mt-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${rarity.glow}20`, color: rarity.glow }}>
            {rarity.label} Achievement
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({ target: containerRef, offset: ["start end", "end start"] });

  return (
    <section id="contact" ref={containerRef} className="relative bg-[#0A0F1E] min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Aurora */}
      <AuroraBackground />

      {/* Pulsing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5 + i * 0.3, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
            className="absolute rounded-full border border-emerald-400/30"
            style={{
              width: 100 + i * 80,
              height: 100 + i * 80,
              left: -(50 + i * 40),
              top: -(50 + i * 40),
            }}
          />
        ))}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <SectionReveal>
          <motion.p variants={fadeUp} className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-6">
            The Invitation
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black text-slate-100 leading-tight mb-6">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              impossible.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-xl mb-12 leading-relaxed">
            I'm open to Web Development Roles, co-founder conversations, and ambitious freelance projects. If it's worth building, let's talk.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-5 mb-14">
            <MagneticButton primary href="mailto:dolnarebhumika@gmail.com">
              Send a Message
            </MagneticButton>
            <MagneticButton href="https://www.linkedin.com/in/bhumika-dolnare-5b5649329/">
              LinkedIn
            </MagneticButton>
            <MagneticButton href="https://github.com/BhumikaDolnare01">
              GitHub
            </MagneticButton>
          </motion.div>
        </SectionReveal>

        {/* Social row */}
        <SectionReveal>
          <motion.div variants={stagger} className="flex items-center justify-center gap-8 text-slate-600">
            {["dolnarebhumika@gmail.com", "Maharashtra / Remote"].map((item) => (
              <motion.span key={item} variants={fadeIn} className="font-mono text-xs hover:text-slate-300 transition-colors cursor-default">
                {item}
              </motion.span>
            ))}
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { color: "#10B981", x: "20%", y: "30%", size: 600, delay: 0 },
        { color: "#22D3EE", x: "70%", y: "60%", size: 500, delay: 2 },
        { color: "#0D9488", x: "50%", y: "80%", size: 400, delay: 4 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          className="absolute rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: orb.color,
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  primary = false,
  onClick,
  href,
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const baseClass = `inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
    primary
      ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25"
      : "border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-100"
  }`;

  const motionProps = {
    ref,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" className={baseClass} {...motionProps}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button onClick={onClick} className={baseClass} {...motionProps}>
      {children}
    </motion.button>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <MouseContext.Provider value={mouse}>
      <div className="bg-[#0A0F1E] antialiased" style={{ cursor: "none" }}>
        <CustomCursor />
        <ScrollProgressBar />
        <NavigationDots />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <footer className="bg-[#0A0F1E] border-t border-slate-800/60 py-8 text-center">
          <p className="text-slate-600 font-mono text-xs">
            Designed & built by Bhumika Dolnare · {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </MouseContext.Provider>
  );
}
