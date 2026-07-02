import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Code2, GraduationCap, Briefcase, Award, Palette, User, Menu, X } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface PortfolioLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({
  children,
  activeSection,
  onSectionChange
}) => {
  const { lang, setLang, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'profile', label: t('nav.profile'), icon: <User className="w-3.5 h-3.5" /> },
    { id: 'projects', label: t('nav.projects'), icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'experiences', label: t('nav.experiences'), icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'parcours', label: t('nav.parcours'), icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'certificats', label: t('nav.certificats'), icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'creations', label: t('nav.creations'), icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    onSectionChange(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-brown flex flex-col selection:bg-brand-green/20 selection:text-brand-brown relative font-sans overflow-x-hidden">
      {/* Decorative subtle lines/textures representing elegant design grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e3dfd040_1px,transparent_1px),linear-gradient(to_bottom,#e3dfd040_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Elegant very subtle warm blurs to avoid "too flat" feel with light theme */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-amber-100/15 filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full bg-emerald-100/10 filter blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-brand-sand/90 backdrop-blur-md border-b border-[#ebdcb9]/40 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo & Initials with Name */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => scrollToSection('profile')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-brand-brown flex items-center justify-center font-serif font-bold text-white text-body shadow-xs ring-4 ring-[#eadfc5]/30 group-hover:scale-105 transition-transform duration-300">
              L.A
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-[10px] md:text-[11px] lg:text-body tracking-tight text-brand-brown uppercase truncate max-w-[110px] md:max-w-[130px] lg:max-w-none">
                RANDROZAFIARINONY
              </span>
              <span className="text-[9px] md:text-[10px] lg:text-caption font-semibold text-brand-green tracking-wider truncate">
                Liantsoa Ange
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav Items (Hidden on Mobile) */}
          <div className="hidden md:flex md:items-center md:gap-2 lg:gap-4">
            <nav className="flex items-center gap-0.5 lg:gap-1.5">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    id={`nav-btn-${item.id}`}
                    className={`px-1.5 py-1.5 md:px-2 md:py-2 rounded-xl text-[9.5px] lg:text-caption font-sans font-bold tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1 ${isActive
                        ? 'bg-brand-green text-white shadow-xs'
                        : 'text-[#695e57] hover:text-brand-brown hover:bg-[#ebdcb9]/30'
                      }`}
                  >
                    <span className="scale-90 md:scale-100">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Contact Quick Button */}
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="ml-1 md:ml-1.5 lg:ml-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full bg-brand-brown text-white font-sans text-[9.5px] lg:text-caption font-bold tracking-wider hover:bg-[#50463f] transition-colors duration-300 shadow-xs whitespace-nowrap"
              >
                {t('nav.contact')}
              </button>
            </nav>

            {/* Elegant Language Switch Toggle */}
            <div className="flex items-center bg-[#ede9e2] rounded-full p-0.5 md:p-1 border border-[#ebdcb9]/50 shadow-inner shrink-0">
              <button
                onClick={() => setLang('fr')}
                className={`px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full text-[9.5px] lg:text-caption font-sans font-extrabold tracking-wider transition-all duration-300 ${lang === 'fr'
                    ? 'bg-brand-green text-white shadow-xs scale-105'
                    : 'text-[#695e57] hover:text-brand-brown'
                  }`}
                title="Passer en Français"
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full text-[9.5px] lg:text-caption font-sans font-extrabold tracking-wider transition-all duration-300 ${lang === 'en'
                    ? 'bg-brand-green text-white shadow-xs scale-105'
                    : 'text-[#695e57] hover:text-brand-brown'
                  }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile controls (hamburger menu + lang toggle) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Elegant Language Switch Toggle */}
            <div className="flex items-center bg-[#ede9e2] rounded-full p-0.5 border border-[#ebdcb9]/50 shadow-inner shrink-0">
              <button
                onClick={() => setLang('fr')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-extrabold tracking-wider transition-all duration-300 ${lang === 'fr'
                    ? 'bg-brand-green text-white shadow-xs'
                    : 'text-[#695e57] hover:text-brand-brown'
                  }`}
                title="Passer en Français"
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-extrabold tracking-wider transition-all duration-300 ${lang === 'en'
                    ? 'bg-brand-green text-white shadow-xs'
                    : 'text-[#695e57] hover:text-brand-brown'
                  }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#ede9e2]/80 hover:bg-[#ebdcb9]/40 border border-[#ebdcb9]/30 text-brand-brown transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5.5 h-5.5" />
              ) : (
                <Menu className="w-5.5 h-5.5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden border-t border-[#ebdcb9]/30 bg-brand-sand/95 backdrop-blur-md overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-3">
                <nav className="flex flex-col gap-1.5">
                  {menuItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full px-4 py-3 rounded-xl text-caption font-sans font-bold tracking-wider transition-all duration-300 text-left flex items-center gap-3 ${isActive
                            ? 'bg-brand-green text-white shadow-xs'
                            : 'text-[#695e57] hover:text-brand-brown hover:bg-[#ebdcb9]/20'
                          }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-3 border-t border-[#ebdcb9]/30">
                  {/* Contact Quick Button inside dropdown */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-3 rounded-full bg-brand-brown text-white font-sans text-caption font-bold tracking-wider hover:bg-[#50463f] transition-colors duration-300 text-center shadow-xs"
                  >
                    {t('nav.contact')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Template socket */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-28 relative z-10">
        {children}
      </main>

      {/* Premium Footer matching the exact layout of screenshot */}
      <footer
        id="contact"
        className="bg-brand-green text-brand-sand py-16 px-4 border-t border-[#ebdcb9]/10 relative z-25 mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Why work with me */}
          <div className="md:col-span-2 space-y-5 md:pr-10 lg:pr-14">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center font-serif font-black text-brand-green text-heading shadow-inner ring-4 ring-white/10 shrink-0">
                L.A
              </div>
              <h3 className="font-serif text-xl text-white">
                {lang === "fr"
                  ? "Pourquoi travailler avec moi ?"
                  : "Why work with me?"}
              </h3>
            </div>

            <p className="text-body text-brand-sand/85 leading-relaxed font-sans font-light">
              {lang === "fr"
                ? "Je développe des applications web modernes, performantes et évolutives en mettant l'accent sur la qualité du code, l'expérience utilisateur et une architecture solide. Mon objectif est de transformer chaque besoin métier en une solution fiable, maintenable et créatrice de valeur."
                : "I build modern, scalable, and high-performance web applications with a strong focus on clean code, user experience, and robust architecture. My goal is to transform business needs into reliable, maintainable, and value-driven digital solutions."}
            </p>

          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-caption tracking-widest text-white uppercase border-b border-white/10 pb-2">
              Navigation
            </h4>

            <ul className="space-y-2.5 text-body font-sans font-medium text-brand-sand/80">
              <li>
                <button
                  onClick={() => scrollToSection("profile")}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("nav.profile")}
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("nav.projects")}
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("experiences")}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("nav.experiences")}
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("parcours")}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("nav.parcours")}
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("creations")}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("nav.creations")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-caption tracking-widest text-white uppercase border-b border-white/10 pb-2">
              Contact
            </h4>

            <ul className="space-y-3.5 text-body font-sans font-medium text-brand-sand/80">

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href="mailto:liantsou02@gmail.com"
                  className="hover:text-white transition-colors duration-200 break-all"
                >
                  liantsou02@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href="tel:+261341248368"
                  className="hover:text-white transition-colors duration-200"
                >
                  +261 34 12 483 68
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Fianarantsoa, Madagascar</span>
              </li>

            </ul>
          </div>

          {/* Follow me */}
          <div className="space-y-4">

            <h4 className="font-sans font-bold text-caption tracking-widest text-white uppercase border-b border-white/10 pb-2">
              {lang === "fr" ? "Suivez-moi" : "Follow Me"}
            </h4>

            <div className="flex gap-3">

              <a
                href="https://www.linkedin.com/in/liantsoa-ange-721245229"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-brand-green text-white flex items-center justify-center transition-all duration-300 shadow-xs border border-white/5"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

            </div>

            <div className="pt-2">

              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-emerald-200 text-caption font-sans font-bold tracking-wider uppercase border border-white/10">

                <span className="w-2 h-2 rounded-full bg-emerald-300 mr-2 animate-pulse" />

                {lang === "fr"
                  ? "Disponible pour de nouvelles opportunités"
                  : "Open to new opportunities"}

              </span>

            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption font-sans font-light text-brand-sand/70">

          <p>
            © 2026 Liantsoa Ange RANDROZAFIARINONY.{" "}
            {lang === "fr"
              ? "Tous droits réservés."
              : "All rights reserved."}
          </p>

        </div>
      </footer>
    </div>
  );
};
