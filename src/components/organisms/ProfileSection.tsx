import React, { useState } from 'react';
import { Mail, ArrowUpRight, Check, Send, MapPin, Award, BookOpen } from 'lucide-react';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../contexts/LanguageContext';

export const ProfileSection: React.FC = () => {
  const { lang, t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const email = 'liantsou02@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center py-6">
      
      {/* Visual profile detail & greetings */}
      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div>
          {/* Custom Olive Green / Light Sand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 text-caption font-sans font-bold uppercase tracking-widest mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            {lang === 'fr' ? 'Développeuse Fullstack & Agronome' : 'Fullstack Developer & Agronomist'}
          </div>
 
          {/* Gorgeous Serif Heading matching Title */}
          <h1 className="text-display font-serif font-black tracking-tight text-brand-brown mb-6 leading-[1.15]">
            {lang === 'fr' ? (
              <>
                Bâtir des solutions <br />
                <span className="italic font-serif font-medium text-brand-green underline decoration-brand-gold underline-offset-4">
                  performantes
                </span>{' '}
                et innovantes par le code.
              </>
            ) : (
              <>
                Building <span className="italic font-serif font-medium text-brand-green underline decoration-brand-gold underline-offset-4">high-performance</span> <br />
                and innovative solutions.
              </>
            )}
          </h1>

          {/* Detailed Paragraph with border-l accent */}
          <p className="text-body text-brand-brown/85 leading-relaxed font-sans font-normal max-w-2xl border-l-4 border-brand-green/30 pl-5 mb-8">
            {lang === 'fr' 
              ? "Développeuse Fullstack passionnée par le web et le design, je conçois des applications robustes et des interfaces soignées. De la rigueur de mes années de formation (Major en Agronomie et diplômée de l'ENI Fianarantsoa) à la stabilisation de systèmes en production chez RELIA Consulting, je m'attache toujours à apporter des solutions fiables et adaptées aux utilisateurs."
              : "A Fullstack Developer passionate about web engineering and design, I craft robust applications and highly-polished user interfaces. From the scientific rigor of my background (Valedictorian in Agronomy and a Software Engineering graduate from ENI Fianarantsoa) to stabilizing production systems at RELIA Consulting, I am dedicated to delivering reliable, user-centric solutions."}
          </p>
        </div>

        {/* Action button row */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="primary" size="lg" className="gap-2.5 shadow-md shadow-brand-green/10" onClick={handleCopyEmail}>
            {copied ? <Check className="w-4 h-4 text-white" /> : <Send className="w-4 h-4" />}
            {copied ? (lang === 'fr' ? 'Email copié !' : 'Email copied!') : t('hero.contact')}
          </Button>

          <a href="https://www.linkedin.com/in/liantsoa-ange-721245229" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="gap-2 border-brand-brown/30 text-brand-brown hover:bg-brand-brown/5">
              {lang === 'fr' ? 'Voir mon LinkedIn' : 'View my LinkedIn'}
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* Dynamic Recruiter quick-look factoids */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#ebdcb9] text-caption font-sans">
          <div className="flex items-start gap-2.5 text-brand-brown/80">
            <span className="p-2 rounded-lg bg-[#ede9e2] text-brand-green mt-0.5">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <p className="font-bold text-brand-brown">{lang === 'fr' ? 'Localisation' : 'Location'}</p>
              <p className="font-medium text-brand-brown/70">{lang === 'fr' ? 'Fianarantsoa, Mada' : 'Fianarantsoa, Madagascar'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-brand-brown/80">
            <span className="p-2 rounded-lg bg-[#ede9e2] text-brand-green mt-0.5">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <p className="font-bold text-brand-brown">{lang === 'fr' ? "Formation d'Élite" : 'Elite Education'}</p>
              <p className="font-medium text-brand-brown/70">{lang === 'fr' ? 'Master II Informatique ENI' : 'Master II CS - ENI'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-brand-brown/80">
            <span className="p-2 rounded-lg bg-[#ede9e2] text-brand-green mt-0.5">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <p className="font-bold text-brand-brown">{lang === 'fr' ? 'Rôle de Pointe' : 'Key Specialty'}</p>
              <p className="font-medium text-brand-brown/70">{lang === 'fr' ? 'Ingénierie Fullstack' : 'Fullstack Engineering'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter-focused Portrait Container */}
      <div className="w-full lg:w-[470px] flex justify-center items-center relative py-6 lg:py-0">
        
        {/* Soft elegant shadow behind the card container */}
        <div className="relative w-[340px] sm:w-[380px] bg-white p-5 rounded-[48px] shadow-2xl shadow-brand-brown/15 border border-[#ebdcb9]/50 group transition-all duration-300 hover:shadow-3xl">
          
          {/* Profile Picture Frame */}
          <div className="w-full aspect-square bg-brand-sand rounded-[40px] overflow-hidden relative flex items-center justify-center border border-stone-100">
            
            {/* Elegant warm backdrop circle */}
            <div className="absolute w-[85%] h-[85%] rounded-[32px] bg-brand-cream overflow-hidden flex items-center justify-center shadow-xs border border-[#ebdcb9]/40">
              <img
                src="https://i.postimg.cc/t4NwhJf6/profile-pic-(1).png"
                alt="RANDROZAFIARINONY Liantsoa Ange"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Micro aesthetic decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full border border-stone-200/50 flex items-center justify-center font-serif text-caption text-stone-300">
              LA.A
            </div>
            
          </div>

          {/* Floating 'DISPONIBLE' live status indicator */}
          <div className="absolute bottom-1 right-2 translate-y-3 translate-x-1 shadow-md hover:scale-105 transition-transform duration-200 bg-white border border-stone-100 rounded-3xl py-2 px-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-caption font-sans font-bold text-brand-brown tracking-widest uppercase">
              {lang === 'fr' ? 'Disponible' : 'Available'}
            </span>
          </div>

        </div>

        {/* Backdrop circular pattern dots */}
        <div className="absolute -z-10 w-24 h-24 bg-[radial-gradient(#ebdcb9_2px,transparent_2px)] bg-[size:10px_10px] bottom-2 left-6 opacity-60" />
        <div className="absolute -z-10 w-24 h-24 bg-[radial-gradient(#ebdcb9_2px,transparent_2px)] bg-[size:10px_10px] top-2 right-6 opacity-60" />

      </div>

    </div>
  );
};
