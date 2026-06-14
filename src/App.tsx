import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Briefcase,
  Scale,
  Shield,
  CheckSquare,
  FileText,
  ShieldAlert,
  Percent,
  CreditCard,
  Globe,
  Zap,
  Users,
  Search,
  TrendingUp,
  Clock,
  UserCheck,
  HeartHandshake,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Linkedin,
  Building,
  CheckCircle,
  Menu,
  X,
  Lock,
  Compass,
  MessageSquare,
  BadgeAlert
} from 'lucide-react';

import { QUALIFICATIONS, STATS, EXPERTISE_LIST, SERVICE_CATEGORIES, WHY_CHOOSE_ME, TESTIMONIALS } from './data/portfolioData';
import Preloader from './components/Preloader';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { submitContactForm } from './lib/api';

// Helper component for animated statistics counters
function AnimatedCounter({ value, suffix, duration = 1.5 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = value;
    const totalTicks = 40;
    const increment = end / totalTicks;
    let ticks = 0;

    const interval = setInterval(() => {
      ticks++;
      setCount(Math.min(Math.floor(increment * ticks), end));
      if (ticks >= totalTicks) {
        setCount(end);
        clearInterval(interval);
      }
    }, (duration * 1000) / totalTicks);

    return () => clearInterval(interval);
  }, [hasAnimated, value, duration]);

  return (
    <div ref={elementRef} className="text-center">
      <div className="font-display font-bold text-3xl md:text-5xl text-[#C8A45D] tracking-tight drop-shadow-sm">
        {count}
        {suffix}
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('company-law');
  
  // Testimonial state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Mouse Coordinate spotlight tracker
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('General Corporate Advisory');
  const [contactMsg, setContactMsg] = useState('');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Icon mapping helper
  const renderIcon = (name: string, className: string = "w-6 h-6") => {
    const IconComponent = {
      Award,
      Briefcase,
      Scale,
      Shield,
      CheckSquare,
      FileText,
      ShieldAlert,
      Percent,
      CreditCard,
      Globe,
      Zap,
      Users,
      Search,
      TrendingUp,
      Clock,
      UserCheck,
      HeartHandshake,
      GraduationCap,
      Compass,
      Building
    }[name];
    
    return IconComponent ? <IconComponent className={className} /> : <Shield className={className} />;
  };

  // Tracking Mouse Coordinates for Ambient Dark Spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle Autoplay Testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim() || !contactMsg.trim()) {
      setFormError('Please complete all fields to submit your inquiry.');
      return;
    }

    if (contactPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit telephone number.');
      return;
    }

    setIsFormSubmitting(true);

    try {
      await submitContactForm({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        service: contactService,
        message: contactMsg,
      });

      setFormSuccess(true);

      // Clear forms
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMsg('');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
      );
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const openBooking = (serviceName: string = 'General Corporate Advisory') => {
    setBookingService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#071628] text-slate-100 font-sans selection:bg-[#C8A45D] selection:text-[#0F2747]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Ambient Mouse Tracking Light Aura */}
            <div
              className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-35 transition-opacity duration-300 hidden lg:block"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(24, 59, 107, 0.22), transparent 80%)`
              }}
            />

            {/* Premium Header/Navigation Bar */}
            <header className="sticky top-0 z-40 bg-[#071628]/85 backdrop-blur-xl border-b border-slate-800/60 font-sans">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <a href="#hero" className="flex items-center gap-3 group">
                  <div className="p-2 h-11 w-11 rounded-lg bg-gradient-to-tr from-[#183B6B] to-[#0F2747] border border-[#C8A45D]/40 flex items-center justify-center font-display font-extrabold text-[#C8A45D] group-hover:border-[#C8A45D] transition-colors shadow-lg shadow-black/40">
                    CS
                  </div>
                  <div>
                    <h1 className="text-sm md:text-base font-bold font-display tracking-tight text-[#F8FAFC]">
                      Mangesh Narvekar
                    </h1>
                    <p className="text-[9px] font-mono tracking-widest text-[#C8A45D] font-bold uppercase">
                      FCS • MBA • LLB
                    </p>
                  </div>
                </a>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <a href="#about" className="hover:text-[#C8A45D] transition-colors">About</a>
                  <a href="#qualifications" className="hover:text-[#C8A45D] transition-colors">Credentials</a>
                  <a href="#expertise" className="hover:text-[#C8A45D] transition-colors">Expertise</a>
                  <a href="#services" className="hover:text-[#C8A45D] transition-colors">Practice Areas</a>
                  <a href="#about-values" className="hover:text-[#C8A45D] transition-colors">Why Us</a>
                  <a href="#testimonials" className="hover:text-[#C8A45D] transition-colors">Success Stories</a>
                  <a href="#contact" className="hover:text-[#C8A45D] transition-colors">Contact</a>
                </nav>

                {/* Right Header Action Button */}
                <div className="hidden lg:block">
                  <button
                    id="nav-consult-cta-btn"
                    onClick={() => openBooking()}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C29B5D] to-[#E5C185] hover:from-[#dabb7c] hover:to-[#f0d8a5] text-[#0F2747] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                  >
                    Book Consultation
                  </button>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                  id="mobile-nav-toggle-btn"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Drawer Menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    id="mobile-menu-drawer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:hidden bg-[#0F2747]/95 border-b border-slate-800 px-6 py-5 space-y-4 text-sm font-semibold uppercase tracking-wide text-slate-200"
                  >
                    <a
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1 border-b border-slate-800/40"
                    >
                      About
                    </a>
                    <a
                      href="#qualifications"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1 border-b border-slate-800/40"
                    >
                      Credentials
                    </a>
                    <a
                      href="#expertise"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1 border-b border-slate-800/40"
                    >
                      Expertise
                    </a>
                    <a
                      href="#services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1 border-b border-slate-800/40"
                    >
                      Practice Areas
                    </a>
                    <a
                      href="#about-values"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1 border-b border-slate-800/40"
                    >
                      Why Us
                    </a>
                    <a
                      href="#testimonials"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1 border-b border-slate-800/40"
                    >
                      Success Stories
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#C8A45D] py-1"
                    >
                      Contact
                    </a>
                    <button
                      id="mobile-menu-consult-btn"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openBooking();
                      }}
                      className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-[#C29B5D] to-[#E5C185] text-[#0F2747] font-bold text-xs uppercase tracking-wider text-center"
                    >
                      Book Consultation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* HERO SECTION - PwC Cinematic Inspiration */}
            <section
              id="hero"
              className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-24 overflow-hidden border-b border-slate-800/50"
            >
              {/* Background Geometric Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#183B6B_1px,transparent_1px),linear-gradient(to_bottom,#183B6B_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

              {/* Decorative Blur Spheres */}
              <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#183B6B]/15 blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-[#C8A45D]/5 blur-3xl pointer-events-none animate-slow-drift" />

              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
                {/* Left Side: Branding Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <motion.div
                    id="hero-label-panel"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <span className="w-8 h-[2px] bg-[#C8A45D]" />
                    <span className="text-xs font-bold tracking-[0.25em] font-mono text-[#C8A45D] uppercase">
                      Practice of CS Mangesh Narvekar
                    </span>
                  </motion.div>

                  <motion.h2
                    id="hero-main-name"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-normal font-marcellus leading-[1.15] text-[#F8FAFC] tracking-wide"
                  >
                    Empowering Businesses Through <br />
                    <span className="font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#C29B5D] via-[#F5D8A4] to-[#C29B5D] relative inline-block select-text py-1.5">
                      Compliance & Governance
                    </span>
                  </motion.h2>

                  <motion.p
                    id="hero-subheadline"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-slate-300 text-sm md:text-base leading-relaxed mt-6 max-w-xl font-serif italic text-slate-300"
                  >
                    CS Mangesh Narvekar is an esteemed **Practicing Company Secretary (FCS, MBA, LLB)**, offering deep-tier regulatory planning, corporate law secretarial counsel, Goods & Services tax filings, and foreign direct investment (FEMA) advisory boards to startups and MSMEs.
                  </motion.p>

                  <motion.div
                    id="hero-assurance"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 gap-4 my-8 p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 font-sans backdrop-blur cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#C8A45D]/15 text-[#C8A45D]">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-slate-200 font-semibold">100% Statutory Safety Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#C8A45D]/15 text-[#C8A45D]">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-slate-200 font-semibold">Multidisciplinary Advisory</span>
                    </div>
                  </motion.div>

                  <motion.div
                    id="hero-action-buttons-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                  >
                    <button
                      id="hero-primary-booking-btn"
                      onClick={() => openBooking()}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C29B5D] to-[#E5C185] hover:from-[#dabb7c] hover:to-[#f0d8a5] text-[#0F2747] font-bold text-sm tracking-wide shadow-lg shadow-[#C8A45D]/10 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Free Consultation
                    </button>
                    <a
                      id="hero-secondary-contact-link"
                      href="#contact"
                      className="px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900 text-slate-200 font-semibold text-sm tracking-wide transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-slate-400" />
                      Contact Office Board
                    </a>
                  </motion.div>
                </div>

                {/* Right Side: Portrait Image Frame & Glass Cards */}
                <div className="lg:col-span-5 flex justify-center relative">
                  <motion.div
                    id="hero-interactive-stage"
                    onMouseEnter={() => setIsHoveringHero(true)}
                    onMouseLeave={() => setIsHoveringHero(false)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative w-full max-w-[380px] h-[460px] flex items-center justify-center"
                  >
                    {/* Golden Circle Rotating Dial */}
                    <div className="absolute inset-0 w-full h-full border border-dashed border-[#C8A45D]/30 rounded-full animate-[spin_40s_linear_infinite] opacity-50" />
                    
                    {/* Secondary Rotating Compass Track */}
                    <div className="absolute w-[80%] h-[80%] border border-dashed border-[#183B6B]/40 rounded-full animate-[spin_25s_linear_infinite_reverse]" />

                    {/* Portrait Placeholder with Luxury Vector Aesthetics */}
                    <div className="relative z-10 w-[85%] h-[85%] rounded-3xl bg-gradient-to-b from-[#183B6B] to-[#0A1E38] border-2 border-[#C8A45D]/50 shadow-2xl p-6 overflow-hidden flex flex-col justify-between group">
                      
                      {/* Interactive Diagonal Metallic Light Shine overlay */}
                      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/5 to-transparent -skew-y-12 pointer-events-none group-hover:translate-y-24 transition-transform duration-1000" />

                      {/* Header emblem */}
                      <div className="flex justify-between items-start">
                        <div className="text-[10px] font-mono tracking-wider font-extrabold text-[#C8A45D] bg-slate-950/60 p-2 rounded border border-slate-800">
                          ICSI CERTIFIED
                        </div>
                        <Shield className="w-6 h-6 text-[#C8A45D]" />
                      </div>

                      {/* Portrait Photo — rectangular, fills card */}
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-full overflow-hidden rounded-xl border border-[#C8A45D]/30 shadow-2xl" style={{height: '200px'}}>
                          <img
                            src="/mangesh-narvekar.png"
                            alt="CS Mangesh Narvekar"
                            className="w-full h-full object-cover object-top"
                          />
                          <Scale className="absolute bottom-2 right-2 w-7 h-7 text-[#C8A45D] bg-slate-950/90 border border-[#C8A45D]/30 p-1.5 rounded-full" />
                        </div>
                        <span className="text-sm font-semibold tracking-wide text-slate-100 mt-3 font-mono uppercase bg-slate-950/40 px-3 py-1.5 rounded-full border border-slate-800/40">
                          Corporate Counsel
                        </span>
                      </div>

                      {/* Corporate Bio Line */}
                      <div className="bg-slate-950/80 border border-slate-850 p-3.5 rounded-xl">
                        <div className="flex items-center gap-1.5 text-xs text-[#C8A45D] font-bold tracking-tight">
                          <Award className="w-3.5 h-3.5" />
                          Fellow Company Secretary
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">
                          Based in Kolhapur, Maharashtra
                        </p>
                      </div>
                    </div>

                    {/* Interactive 3D Floating Glass Card */}
                    <motion.div
                      id="hero-floating-glass-pill"
                      animate={isHoveringHero ? { y: -10 } : { y: 0 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className="absolute -bottom-4 right-1.5 z-20 p-3.5 rounded-xl glass-panel-gold border border-[#C8A45D]/30 shadow-xl max-w-[200px]"
                    >
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-100 leading-tight">
                          Authorized ROC & Income Tax Representative
                        </span>
                      </div>
                    </motion.div>

                    {/* Stats Bubble */}
                    <motion.div
                      id="hero-floating-status"
                      animate={isHoveringHero ? { y: 10 } : { y: 0 }}
                      className="absolute -top-3 left-0 z-20 py-2 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[#25D366] text-[10px] font-mono tracking-wider flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      ACTIVE ADVISORY DESK
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Slit Clip Path decoration */}
              <div className="absolute bottom-0 left-0 w-full h-[60px] bg-slate-950/60 pointer-events-none border-t border-slate-800/20" />
            </section>

            {/* ABOUT SECTION - Professional Biography */}
            <section id="about" className="py-20 bg-slate-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Visual Portrait Card */}
                  <div className="lg:col-span-5 max-w-md mx-auto w-full flex justify-center">
                    <div className="relative group p-1.5 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#183B6B] to-[#0F2747] border border-slate-800">
                        {/* Desk photo — full width rectangle, large and clear */}
                        <div className="relative w-full overflow-hidden border-b border-[#C8A45D]/20" style={{height: '280px'}}>
                          <img
                            src="/mangesh-narvekar-desk.png"
                            alt="CS Mangesh Narvekar"
                            className="w-full h-full object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/60 to-transparent pointer-events-none" />
                        </div>
                        <div className="p-6 pb-4 text-center">
                          <h4 className="text-xl font-bold font-serif text-[#F8FAFC]">
                            “Integrity in Governance”
                          </h4>
                          <p className="text-xs text-[#C8A45D]/80 italic mt-2">
                            CS Mangesh Narvekar (FCS, MBA, LLB)
                          </p>
                        </div>
                        
                        <div className="p-6 bg-slate-950 border-t border-slate-900 space-y-4">
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Serving as an independent consultant based in Kolhapur, offering a rigorous legal, compliance, and strategy portfolio configured directly to minimize regulatory vulnerabilities.
                          </p>
                          <div className="flex gap-2.5">
                            <span className="text-[10px] font-mono bg-[#183B6B]/20 text-slate-300 border border-slate-805 px-2.5 py-1 rounded">
                              Registrations Compliance
                            </span>
                            <span className="text-[10px] font-mono bg-[#183B6B]/20 text-slate-300 border border-slate-805 px-2.5 py-1 rounded">
                              Secretarial Audit
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative Biography */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-[2px] bg-[#C8A45D]" />
                      <span className="text-[11px] font-mono text-[#C8A45D] font-bold tracking-widest uppercase">
                        Executive Biograph
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                      Decades of Combined Legal <br />
                      & Corporate Advisory Excellence
                    </h3>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-6">
                      <strong>CS Mangesh Narvekar</strong> stands as an authoritative corporate governance consultant based in the industrial hub of <strong>Kolhapur, Maharashtra</strong>. Holding a comprehensive powerhouse intellectual portfolio—including a <strong>Fellow Company Secretary (FCS)</strong> credential, standard <strong>Master of Business Administration (MBA)</strong>, and professional <strong>Bachelor of Laws (LLB)</strong>—he bridges the gap between intricate regulatory frameworks and commercial execution.
                    </p>

                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4">
                      Whether resolving complex Goods & Services Tax (GST) litigation, framing standard board secretarial proceedings, or organizing end-to-end multi-currency FEMA investments, CS Mangesh maintains an unwavering ethical standard. Our office consults on corporate structuring, due diligence audits for major mergers, and standard regular compliance returns files with pristine attention to legal security.
                    </p>

                    {/* Mission, Vision, Values Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 font-sans">
                      <div className="p-4 rounded-xl border border-slate-850 bg-slate-900/40">
                        <h4 className="text-xs font-bold font-mono tracking-widest text-[#C8A45D] uppercase mb-2">
                          Our Mission
                        </h4>
                        <p className="text-xs text-slate-400">
                          Protecting enterprise value by implementing bulletproof, proactive corporate compliance frameworks so businesses can unlock full funding capabilities.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-850 bg-slate-900/40">
                        <h4 className="text-xs font-bold font-mono tracking-widest text-[#C8A45D] uppercase mb-2">
                          Our Values
                        </h4>
                        <p className="text-xs text-slate-400">
                          Operating with complete transparency, absolute confidentiality parameters under the ICSI charter, and dedicating partner-level attention to all clients.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* QUALIFICATIONS SECTION - Premium Animated Cards */}
            <section id="qualifications" className="py-20 bg-gradient-to-b from-slate-950 to-[#071628] relative">
              <div className="absolute inset-0 bg-[#0F2747]/5 opacity-30 pointer-events-none" />

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/25 text-[11px] font-bold font-mono text-[#C8A45D] uppercase tracking-wider mb-3">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Authorized Professional Credentials
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                    The Multidisciplinary Triad
                  </h3>
                  <p className="text-xs text-slate-400 font-serif mt-2">
                    A combination of Corporate Governance, Financial Strategy, and Legal Litigation expertise, providing unparalleled holistic defense.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {QUALIFICATIONS.map((qual, idx) => (
                    <motion.div
                      id={`qualification-card-${qual.id}`}
                      key={qual.id}
                      whileHover={{ y: -8, borderColor: 'rgba(200, 164, 93, 0.4)' }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-xl overflow-hidden group flex flex-col justify-between"
                    >
                      {/* Gradient border top cover */}
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${qual.color}`} />
                      
                      {/* Background watermark */}
                      <div className="absolute -bottom-6 -right-6 text-slate-800 opacity-5 pointer-events-none font-bold text-7xl font-mono select-none">
                        {qual.abbreviation}
                      </div>

                      <div>
                        {/* Header icon wrapper */}
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${qual.color} text-white shadow-md`}>
                            {renderIcon(qual.iconName, "w-6 h-6")}
                          </div>
                          <span className="text-[11px] font-mono tracking-widest font-extrabold text-[#C8A45D] bg-[#0F2747] px-2.5 py-1 rounded">
                            LEVEL III
                          </span>
                        </div>

                        {/* Title & Full description */}
                        <h4 className="text-2xl font-bold font-display text-[#F8FAFC] tracking-tight">
                          {qual.abbreviation}
                        </h4>
                        <p className="text-xs font-mono text-[#C8A45D] tracking-wide mt-1 uppercase font-bold">
                          {qual.fullName}
                        </p>
                        
                        <p className="text-slate-400 text-xs leading-relaxed mt-4">
                          {qual.description}
                        </p>
                      </div>

                      {/* Footer micro label */}
                      <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        CERTIFIED COMPLIANT REGULATION
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* EXPERTISE SECTION - Animated Skills Grid & Counters */}
            <section id="expertise" className="py-20 bg-[#071628] border-y border-slate-800/50">
              <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-[2px] bg-[#C8A45D]" />
                      <span className="text-[11px] font-mono text-[#C8A45D] font-bold tracking-widest uppercase">
                        Expertise & Capability Spectrum
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                      Engineered for Absolute Risk Mitigation
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm font-sans">
                    Guiding companies through multi-tiered ROC filings, Goods & Services tax disputes, and strategic business conversions smoothly.
                  </p>
                </div>

                {/* Subgrid: Columns 1 is expertise grid, Column 2 is animated counters */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Column: 10 expertise categories */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {EXPERTISE_LIST.map((exp, idx) => (
                      <motion.div
                        id={`expertise-badge-${idx}`}
                        key={idx}
                        whileHover={{ scale: 1.02, x: 2, borderColor: 'rgba(24, 59, 107, 0.4)' }}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-[#0F2747]/45 transition-all flex gap-3.5"
                      >
                        <div className="p-2 rounded-lg bg-[#C8A45D]/10 text-[#C8A45D] border border-[#C8A45D]/20 self-start">
                          {renderIcon(exp.icon, "w-4 fill-none h-4")}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 font-display">
                            {exp.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                            {exp.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right Column: High Quality Counters */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
                      {/* Decorative Gold Glow accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#C8A45D]/10 blur-xl rounded-full" />
                      
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#C8A45D] uppercase mb-6 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 animate-pulse" />
                        Key Practices Metric
                      </h4>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        {STATS.map((stat) => (
                          <div key={stat.id} className="border-l border-[#C8A45D]/40 pl-3">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            <p className="text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase mt-1">
                              {stat.label}
                            </p>
                            <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">
                              {stat.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-800/60 text-center">
                        <button
                          onClick={() => openBooking()}
                          className="px-4 py-2.5 rounded-lg border border-dashed border-[#C8A45D]/45 text-[#C8A45D] bg-[#C8A45D]/5 hover:bg-[#C8A45D]/10 transition-all font-mono font-bold text-[10px] tracking-widest uppercase w-full"
                        >
                          Reserve Meeting with CS Mangesh
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SERVICES PRACTICE CATEGORIES SECTION - Toggle/Tabs Layout */}
            <section id="services" className="py-20 bg-slate-950">
              <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center max-w-xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#183B6B]/30 border border-[#183B6B]/40 text-[11px] font-mono text-slate-300 uppercase tracking-widest mb-3 font-semibold">
                    Strategic Services Catalog
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                    Compliance & Litigation Divisions
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-serif">
                    Toggle through our practice sectors to inspect our thorough compliance workflows.
                  </p>
                </div>

                {/* Tabs Hub */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 font-mono text-xs font-semibold">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`px-5 py-3 rounded-lg border uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                        activeTab === cat.id
                          ? 'bg-gradient-to-r from-[#183B6B] to-[#0F2747] text-[#C8A45D] border-[#C8A45D] shadow-lg shadow-black/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {renderIcon(cat.iconName, "w-4 h-4")}
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Tab content view - Alternating layout */}
                <div className="p-1 pt-4 relative">
                  {SERVICE_CATEGORIES.map((cat) => {
                    if (cat.id !== activeTab) return null;

                    return (
                      <motion.div
                        id={`services-tab-group-${cat.id}`}
                        key={cat.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-12"
                      >
                        {/* Tab Subtitle */}
                        <div className="p-4 rounded-xl bg-[#0F2747]/30 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-3xl mx-auto">
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-serif italic max-w-xl">
                            "{cat.description}"
                          </p>
                          <button
                            onClick={() => openBooking(cat.name)}
                            className="bg-[#C8A45D] hover:bg-[#dabb7c] text-[#0F2747] text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2.5 rounded shrink-0 self-start md:self-auto shadow-md"
                          >
                            Inquire: {cat.name.split(' ')[0]}
                          </button>
                        </div>

                        {/* Sub items matching alternating layout requirements */}
                        <div className="space-y-16 mt-12 max-w-4xl mx-auto font-sans">
                          {cat.details.map((detail, dIdx) => (
                            <div
                              key={detail.id}
                              className={`flex flex-col md:flex-row gap-8 items-start ${
                                dIdx % 2 === 1 ? 'md:flex-row-reverse' : ''
                              }`}
                            >
                              {/* Left Side: Detail Context */}
                              <div className="flex-1 space-y-3">
                                <span className="font-mono text-xs text-[#C8A45D] font-bold tracking-widest">
                                  DIVISION ELEMENT // 0{dIdx + 1}
                                </span>
                                <h4 className="text-xl font-bold text-[#F8FAFC] font-display">
                                  {detail.title}
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {detail.description}
                                </p>
                              </div>

                              {/* Right Side: Checklist with glass list theme */}
                              <div className="flex-1 w-full bg-slate-900/60 border border-slate-800 p-6 rounded-xl space-y-3 shadow-lg">
                                <span className="text-[10px] font-mono tracking-wider font-bold text-[#C8A45D] uppercase block mb-2">
                                  Standard Action Checklist
                                </span>
                                {detail.items.map((item, itemIdx) => (
                                  <div key={itemIdx} className="flex gap-2.5 items-start">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span className="text-xs text-slate-300 leading-relaxed">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* WHY CHOOSE ME SECTION - Core Strengths Grid */}
            <section id="about-values" className="py-20 bg-[#071628] relative">
              {/* Background gradient block */}
              <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/25 text-[11px] font-bold font-mono text-[#C8A45D] uppercase tracking-wider mb-3">
                    Corporate Pillars
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                    Why Retain CS Mangesh Narvekar?
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-serif">
                    Professional parameters of our consultancy, serving company boards across Maharashtra with absolute accuracy.
                  </p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {WHY_CHOOSE_ME.map((val, idx) => (
                    <div
                      key={val.id}
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md flex gap-4"
                    >
                      <div className="p-3 rounded-xl bg-[#183B6B]/40 text-[#C8A45D] border border-slate-800 self-start shrink-0">
                        {renderIcon(val.iconName, "w-5 h-5")}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide font-display">
                          {val.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIALS SECTION - Carousel slider */}
            <section id="testimonials" className="py-20 bg-slate-950 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#183B6B]/5 blur-3xl pointer-events-none" />

              <div className="max-w-4xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-12">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/25 text-[11px] font-bold font-mono text-[#C8A45D] uppercase tracking-wider mb-3">
                    <Users className="w-3.5 h-3.5" />
                    Board & client testimonials
                  </div>
                  <h3 className="text-3xl font-extrabold font-display text-white tracking-tight">
                    Trusted by Maharashtra’s Business Leaders
                  </h3>
                </div>

                {/* Slider Wrapper */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      id={`testimonial-pane-${testimonialIndex}`}
                      key={testimonialIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative"
                    >
                      {/* Giant quotes marks watermark decoration */}
                      <span className="absolute top-4 right-6 text-7xl font-serif text-[#C8A45D]/10 select-none">
                        “
                      </span>

                      {/* Content */}
                      <p className="text-slate-300 font-serif italic text-sm md:text-base leading-relaxed mb-6">
                        "{TESTIMONIALS[testimonialIndex].content}"
                      </p>

                      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                        <div>
                          <h4 className="text-sm font-bold text-slate-150">
                            {TESTIMONIALS[testimonialIndex].name}
                          </h4>
                          <p className="text-[11px] font-mono tracking-wide text-[#C8A45D] uppercase mt-0.5">
                            {TESTIMONIALS[testimonialIndex].position} • <span className="text-slate-400">{TESTIMONIALS[testimonialIndex].company}</span>
                          </p>
                        </div>

                        {/* Standard rating stars */}
                        <div className="flex gap-1 text-[#C8A45D]">
                          {Array.from({ length: TESTIMONIALS[testimonialIndex].rating }).map((_, i) => (
                            <span key={i} className="text-sm">★</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Manual Arrow Controls */}
                  <div className="flex justify-end gap-2.5 mt-4">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Next Slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* CONSULTATION BANNER CTA SECTION */}
            <section className="py-16 bg-[#071628] border-t border-slate-805 text-center relative overflow-hidden">
              {/* Slanted decoration background */}
              <div className="absolute inset-0 bg-[#183B6B]/15 bg-[radial-gradient(#183B6B_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

              <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
                <h3 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                  Need Expert Corporate Compliance Guidance?
                </h3>
                <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto font-sans leading-relaxed">
                  Protect your directors from fines, structure legal entities properly, and handle FEMA audits correctly. Speak directly with FCS Mangesh Narvekar.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                  <button
                    id="cta-schedule-btn"
                    onClick={() => openBooking()}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#C29B5D] to-[#E5C185] hover:from-[#dabb7c] hover:to-[#f0d8a5] text-[#0F2747] font-bold text-xs uppercase tracking-widest shadow-lg"
                  >
                    Schedule Live Consultation
                  </button>
                  <a
                    href="#contact"
                    className="px-6 py-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors font-mono"
                  >
                    Request Callback Desk
                  </a>
                </div>
              </div>
            </section>

            {/* CONTACT SECTION - Split Grid (Addressing map integration, callback form & WhatsApp) */}
            <section id="contact" className="py-20 bg-slate-950 border-t border-slate-900 font-sans">
              <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-[2px] bg-[#C8A45D]" />
                      <span className="text-[11px] font-mono text-[#C8A45D] font-bold tracking-widest uppercase">
                        Administrative Board Contacts
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold font-display text-[#F8FAFC] tracking-tight leading-none">
                      Initiate Professional Mandate
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 font-sans max-w-xs mt-2 md:mt-0">
                    Reach the Kolhapur Rajarampuri Headquarter Office through various compliant channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Side: Address Details & Live map */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    {/* Key board info list */}
                    <div className="space-y-4">
                      {/* Address card */}
                      <div className="flex gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-900">
                        <div className="p-2.5 rounded-lg bg-[#C8A45D]/10 text-[#C8A45D] border border-[#C8A45D]/20 self-start">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-[#C8A45D] uppercase mb-1">
                            Office Location Address
                          </h4>
                          <p className="text-xs text-[#F8FAFC] font-semibold">
                            Flat No. 501, 5th Floor, Mahalaxmi Pride,
                          </p>
                          <p className="text-xs text-slate-300">
                            6th Lane, Rajarampuri, Kolhapur,
                          </p>
                          <p className="text-xs text-slate-400">
                            Maharashtra, India – 416008
                          </p>
                        </div>
                      </div>

                      {/* Email contacts */}
                      <a
                        href="mailto:csmnoffice@gmail.com"
                        className="flex gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-900 hover:border-[#C8A45D]/25 transition-all block group"
                      >
                        <div className="p-2.5 rounded-lg bg-[#C8A45D]/10 text-slate-400 group-hover:text-[#C8A45D] border border-slate-900/50 self-start shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 group-hover:text-[#C8A45D] uppercase mb-1">
                            Official Email Inbox
                          </h4>
                          <p className="text-xs text-[#F8FAFC] font-bold font-mono">
                            csmnoffice@gmail.com
                          </p>
                          <span className="text-[9px] text-[#C8A45D] font-semibold flex items-center gap-1 mt-1 group-hover:underline">
                            Click to send email <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </a>

                      {/* Call support */}
                      <a
                        href="tel:+919922262985"
                        className="flex gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-900 hover:border-[#C8A45D]/25 transition-all block group"
                      >
                        <div className="p-2.5 rounded-lg bg-[#C8A45D]/10 text-slate-400 group-hover:text-[#C8A45D] border border-slate-900/50 self-start shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 group-hover:text-[#C8A45D] uppercase mb-1">
                            Primary Office Hotline
                          </h4>
                          <p className="text-xs text-[#F8FAFC] font-bold font-mono">
                            +91 99222 62985
                          </p>
                          <span className="text-[9px] text-[#C8A45D] font-semibold flex items-center gap-1 mt-1 group-hover:underline">
                            Click to Dial <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </a>

                      {/* Timing Desk */}
                      <div className="flex gap-4 p-4 rounded-xl bg-slate-900/80 border border-[#183B6B]/20">
                        <div className="p-2.5 rounded-lg bg-[#183B6B]/30 text-[#C8A45D] self-start">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-1">
                            Office Consulting Hours
                          </h4>
                          <p className="text-xs text-[#F8FAFC]">
                            Monday – Saturday: 10:00 AM – 7:00 PM
                          </p>
                          <p className="text-[10px] text-slate-500 italic">
                            Closed on official national holidays & Sundays.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Interactive Google Maps Iframe */}
                    <div className="rounded-xl overflow-hidden border border-slate-800/80 relative shadow-lg h-52">
                      <iframe
                        title="CS Mangesh Narvekar Kolhapur Office Address Map Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.5796791834165!2d74.24260662497672!3d16.69176518407421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc10014efbc74e9%3A0xe1db0bc75bdca4d8!2sMahalaxmi%20Pride%2C%206th%20Ln%2C%20Rajarampuri%2C%20Kolhapur%2C%20Maharashtra%20416008!5e0!3m2!1sen!2sin!4v1718220000000!5m2!1sen!2sin"
                        className="w-full h-full border-none pointer-events-auto filter brightness-[1.0] contrast-[1.05] hover:brightness-[1.05] hover:contrast-[1.1] transition-all duration-300 focus:outline-none"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="absolute top-2.5 left-2.5 py-1 px-2.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#C8A45D]" />
                        KOLHAPUR DISTRICT REGION
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Professional Contact Form */}
                  <div className="lg:col-span-7 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
                    <h4 className="text-lg font-bold font-display text-white tracking-tight mb-1">
                      Direct Advisory Requisition
                    </h4>
                    <p className="text-xs text-slate-400 mb-6 font-sans">
                      Fill out our formal response channel. Your compliance issue will be routed to CS Mangesh.
                    </p>

                    {formSuccess ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-6 text-center border border-emerald-500/20 bg-emerald-950/20 rounded-xl space-y-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto">
                          <CheckCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-[#F8FAFC] font-semibold text-sm">Corporate Mandate Dispatched!</h4>
                          <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                            Thank you. Your compliance detail was logged successfully. CS Mangesh Narvekar’s staff will analyze MCA records and revert within 12 business hours.
                          </p>
                        </div>
                        <button
                          onClick={() => setFormSuccess(false)}
                          className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white rounded"
                        >
                          Book Another Ticket
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                        {formError && (
                          <div className="p-3 text-xs text-red-400 bg-red-950/40 rounded border border-red-500/25 font-semibold">
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Name Input */}
                          <div>
                            <label className="block text-[11px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1">
                              Corporate Representative *
                            </label>
                            <input
                              type="text"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="e.g. Ramesh Patil"
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C8A45D] text-slate-200"
                            />
                          </div>

                          {/* Phone input */}
                          <div>
                            <label className="block text-[11px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1">
                              Direct Telephone Number *
                            </label>
                            <input
                              type="tel"
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder="e.g. 9845011044"
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C8A45D] text-slate-200"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="block text-[11px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1">
                            Contact Business Email Address *
                          </label>
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="e.g. consult@firm.co.in"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C8A45D] text-slate-220"
                          />
                        </div>

                        {/* Subject Service choice */}
                        <div>
                          <label className="block text-[11px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1">
                            Primary Compliance Division Requested *
                          </label>
                          <select
                            value={contactService}
                            onChange={(e) => setContactService(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C8A45D] text-slate-200 cursor-pointer text-xs"
                          >
                            <option value="Company Law & Secretarial">Company Law & Secretarial</option>
                            <option value="GST Services">GST Services</option>
                            <option value="Income Tax Services">Income Tax Services</option>
                            <option value="Legal & FEMA Compliance">Legal & FEMA Compliance</option>
                            <option value="General Corporate Advisory">General Corporate Advisory</option>
                          </select>
                        </div>

                        {/* Message Description */}
                        <div>
                          <label className="block text-[11px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1">
                            Brief of Regulatory Inquiry *
                          </label>
                          <textarea
                            rows={4}
                            value={contactMsg}
                            onChange={(e) => setContactMsg(e.target.value)}
                            placeholder="Please summarize ROC notice challenges, ongoing filing backlogs or company structuring goals..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C8A45D] text-slate-200 resize-none font-sans"
                          />
                        </div>

                        {/* Secure and Submit */}
                        <div className="pt-2 flex items-center justify-between gap-4">
                          <p className="text-[10px] text-slate-500 font-mono hidden sm:block">
                            🔒 Encrypted transmission under ICSI standards.
                          </p>
                          <button
                            type="submit"
                            disabled={isFormSubmitting}
                            className="px-6 py-2.5 rounded bg-gradient-to-r from-[#C29B5D] to-[#E5C185] hover:from-[#dabb7c] hover:to-[#f0d8a5] text-[#0F2747] font-bold uppercase tracking-wider relative shadow-md disabled:opacity-50"
                          >
                            {isFormSubmitting ? 'Verifying Profile...' : 'Dispatch Requisition'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                </div>
              </div>
            </section>

            {/* PREMIER DARK FOOTER */}
            <footer className="bg-[#071628] border-t border-slate-900 py-16 text-xs text-slate-400">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                
                {/* Column 1: Brand details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 h-8 w-8 rounded bg-gradient-to-tr from-[#183B6B] to-[#0F2747] border border-[#C8A45D]/30 flex items-center justify-center font-display font-black text-[#C8A45D]">
                      CS
                    </div>
                    <span className="font-bold text-slate-100 uppercase tracking-wide">CS Mangesh Narvekar</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Practicing Company Secretary (FCS, MBA, LLB). Establishing high integrity corporate, legal, and tax structures for thriving enterprises.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 hover:text-[#C8A45D] transition-colors"
                      title="LinkedIn Corporate Link"
                    >
                      <Linkedin className="w-5.5 h-5.5" />
                    </a>
                    <a
                      href="#contact"
                      className="p-1.5 hover:text-[#C8A45D] transition-colors"
                      title="Email Office Link"
                    >
                      <Mail className="w-5.5 h-5.5" />
                    </a>
                  </div>
                </div>

                {/* Column 2: Quick links */}
                <div className="space-y-3">
                  <h4 className="text-slate-200 font-mono tracking-widest font-bold uppercase text-[11px]">
                    Navigation
                  </h4>
                  <ul className="space-y-1.5 uppercase tracking-wide text-[10px]">
                    <li><a href="#about" className="hover:text-white transition-colors">Biography</a></li>
                    <li><a href="#qualifications" className="hover:text-white transition-colors">Credentials Matrix</a></li>
                    <li><a href="#expertise" className="hover:text-white transition-colors">Expertise Spectrum</a></li>
                    <li><a href="#services" className="hover:text-white transition-colors">Practice Divisions</a></li>
                    <li><a href="#testimonials" className="hover:text-white transition-colors">Client Reviews</a></li>
                  </ul>
                </div>

                {/* Column 3: Practices categories */}
                <div className="space-y-3">
                  <h4 className="text-slate-200 font-mono tracking-widest font-bold uppercase text-[11px]">
                    Practice Hubs
                  </h4>
                  <ul className="space-y-1.5 text-slate-400">
                    <li><a href="#services" onClick={() => setActiveTab('company-law')} className="hover:text-[#C8A45D] transition-colors">Company Secretarial Audits</a></li>
                    <li><a href="#services" onClick={() => setActiveTab('gst-services')} className="hover:text-[#C8A45D] transition-colors">GST Returns & Appeals</a></li>
                    <li><a href="#services" onClick={() => setActiveTab('taxation')} className="hover:text-[#C8A45D] transition-colors">Corporate Income Tax Filing</a></li>
                    <li><a href="#services" onClick={() => setActiveTab('legal-fema')} className="hover:text-[#C8A45D] transition-colors">Foreign Cross-Border FEMA</a></li>
                  </ul>
                </div>

                {/* Column 4: Legals Disclaimer */}
                <div className="space-y-3">
                  <h4 className="text-slate-200 font-mono tracking-widest font-bold uppercase text-[11px]">
                    Regulatory Charter
                  </h4>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 space-y-2">
                    <p className="text-[10px] text-slate-400 leading-snug">
                      As prescribed by the code of conduct of the <strong>Institute of Company Secretaries of India (ICSI)</strong>, this portfolio represents factual credentials only. No marketing or solicitation is intended.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <Shield className="w-3.5 h-3.5 text-[#C8A45D]" />
                      <span>ICSI Code Compliant</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sub-footer segment */}
              <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-900 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
                <p>
                  &copy; {new Date().getFullYear()} CS Mangesh Narvekar Corporate Desk. All rights reserved. Registered Practicing CS.
                </p>
                <div className="flex gap-4">
                  <span>Kolhapur Office, Rajarampuri</span>
                  <span>|</span>
                  <a href="#hero" className="hover:text-slate-400 transition-colors uppercase font-mono tracking-wider">Top of board ▲</a>
                </div>
              </div>
            </footer>

            {/* Static Overlay widgets for Live WhatsApp support */}
            <FloatingWhatsApp />

            {/* Consultation Booking Modal Panel */}
            <BookingModal
              isOpen={isBookingOpen}
              onClose={() => setIsBookingOpen(false)}
              initialService={bookingService}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
