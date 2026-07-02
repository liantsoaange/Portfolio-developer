import React, { useState } from 'react';
import { EXPERIENCES } from '../../data';
import { Badge } from '../atoms/Badge';
import { Briefcase, Calendar, CheckSquare, CheckCircle, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../../contexts/LanguageContext';
import { translateExperience } from '../../utils/translator';

interface ExperienceTimelineProps {
  onImagePreview?: (src: string, title: string) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onImagePreview }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { lang, t } = useTranslation();

  return (
    <div className="space-y-10 relative py-4">
      
      {/* Left-aligned timeline track line (warm sand matching the theme) */}
      <div className="absolute left-4 sm:left-6 top-4 bottom-4 w-0.5 bg-[#ebdcb9]/60 pointer-events-none" />

      {EXPERIENCES.map((exp, idx) => {
        const isHovered = hoveredIdx === idx;
        const translatedExp = translateExperience(exp, lang);

        return (
          <motion.div
            key={exp.id}
            id={`experience-${exp.id}`}
            className="relative w-full"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.4) }}
          >
            {/* Timeline anchor bullet ring (high contrast & elegant) */}
            <div className="absolute left-4 sm:left-6 w-4 h-4 rounded-full bg-white border-2 border-[#3c3530] -translate-x-1/2 top-10 z-10 flex items-center justify-center transition-all duration-300">
              <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#586a5a] scale-125' : 'bg-[#ebdcb9]'} transition-all`} />
            </div>

            {/* Timeline Event Content Card (Screenshot layout styled beautifully with nice left margin) */}
            <div className="w-full pl-10 sm:pl-16">
              <div
                className={`bg-white border ${
                  isHovered 
                    ? 'border-brand-green/50 shadow-md shadow-brand-brown/5' 
                    : 'border-[#ebdcb9]/40'
                } rounded-3xl p-6 sm:p-8 hover:border-brand-green/40 transition-all duration-300 shadow-xs`}
              >
                {/* Card Meta details */}
                <div className="flex flex-wrap items-center gap-2 mb-3.5 font-sans text-caption text-brand-brown/70 uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1.5 text-brand-brown">
                    <Briefcase className="w-4 h-4 text-brand-green" />
                    {translatedExp.company}
                  </span>
                  
                  {translatedExp.isInternship && (
                    <Badge variant="emerald" className="text-caption uppercase font-sans py-0.5 px-2">
                      {lang === 'fr' ? 'Stage' : 'Internship'}
                    </Badge>
                  )}
                  
                  <span className="text-stone-300">•</span>
                  
                  <span className="flex items-center gap-1 text-brand-gold">
                    <Calendar className="w-3.5 h-3.5 text-brand-green" />
                    {translatedExp.period}
                  </span>
                </div>

                {/* Position Header & title styling */}
                <h3 className="text-heading font-serif font-black text-brand-brown tracking-tight leading-snug mb-1">
                  {translatedExp.role}
                </h3>
                
                {translatedExp.project && (
                  <div className="text-caption text-brand-gold font-mono font-medium mb-4">
                    Focus : {translatedExp.project}
                  </div>
                )}

                {/* Custom tiny divider under titles */}
                <div className="w-10 h-0.5 bg-brand-green mb-4" />

                {/* Bullet Descriptions */}
                <ul className="space-y-3 mb-5">
                  {translatedExp.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex gap-2.5 items-start text-body text-brand-brown/85 leading-relaxed">
                      <CheckSquare className="w-4 h-4 text-brand-green/60 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional Ranosoa Gallery inside card (compact size to avoid overwhelm) */}
                {translatedExp.id === 'exp-ranosoa' && (
                  <div className="space-y-3.5 my-5 max-w-md border border-[#ebdcb9]/40 bg-[#fbfbfc] p-3 rounded-2xl shadow-xs">
                    <p className="text-caption font-sans font-bold text-brand-brown/70 tracking-wider uppercase mb-1">
                      {lang === 'fr' ? 'Gallerie photos du projet :' : 'Project Photo Gallery:'}
                    </p>
                    
                    {/* Top: Team image */}
                    <div 
                      className="relative aspect-[16/7] sm:aspect-[2.3/1] rounded-xl overflow-hidden border border-[#ebdcb9]/40 bg-stone-50 cursor-zoom-in group/img shadow-xs hover:border-brand-green/40 transition-all"
                      onClick={() => onImagePreview?.('https://i.postimg.cc/vTkx14rR/photo-Equipe.png', 'Équipe Ranosoa - Projet R.A.N.O.S.O.A')}
                    >
                      <img 
                        src="https://i.postimg.cc/vTkx14rR/photo-Equipe.png" 
                        alt="Équipe Ranosoa" 
                        className="w-full h-full object-cover group-hover/img:scale-101 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#3c3530]/5 hover:bg-[#3c3530]/0 transition-colors" />
                      <div className="absolute bottom-2.5 left-2.5 bg-brand-brown/90 text-white text-caption font-sans px-2 py-0.5 rounded backdrop-blur-xs font-bold uppercase tracking-wider border border-white/10">
                        {lang === 'fr' ? 'Équipe Ranosoa' : 'Ranosoa Team'}
                      </div>
                    </div>

                    {/* Bottom: Two certificates side-by-side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className="relative aspect-[1.4/1] rounded-lg overflow-hidden border border-[#ebdcb9]/40 bg-stone-50 cursor-zoom-in group/img shadow-xs hover:border-brand-green/40 transition-all"
                        onClick={() => onImagePreview?.('https://i.postimg.cc/gJjCMjZB/ranosoa-moniteur.png', 'Attestation de Moniteur - R.A.N.O.S.O.A')}
                      >
                        <img 
                          src="https://i.postimg.cc/gJjCMjZB/ranosoa-moniteur.png" 
                          alt="Cert 1" 
                          className="w-full h-full object-cover group-hover/img:scale-101 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-[#3c3530]/5 hover:bg-[#3c3530]/0 transition-colors" />
                        <div className="absolute bottom-2 left-2 bg-brand-brown/90 text-white text-caption font-sans px-1.5 py-0.5 rounded backdrop-blur-xs font-bold uppercase tracking-widest border border-white/10">
                          {lang === 'fr' ? 'Moniteur' : 'Instructor'}
                        </div>
                      </div>

                      <div 
                        className="relative aspect-[1.4/1] rounded-lg overflow-hidden border border-[#ebdcb9]/40 bg-stone-50 cursor-zoom-in group/img shadow-xs hover:border-brand-green/40 transition-all"
                        onClick={() => onImagePreview?.('https://i.postimg.cc/tRZTJCcH/ranosoa-Accompagnateur.png', 'Attestation d\'Accompagnateur - R.A.N.O.S.O.A')}
                      >
                        <img 
                          src="https://i.postimg.cc/tRZTJCcH/ranosoa-Accompagnateur.png" 
                          alt="Cert 2" 
                          className="w-full h-full object-cover group-hover/img:scale-101 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-[#3c3530]/5 hover:bg-[#3c3530]/0 transition-colors" />
                        <div className="absolute bottom-2 left-2 bg-brand-brown/90 text-white text-caption font-sans px-1.5 py-0.5 rounded backdrop-blur-xs font-bold uppercase tracking-widest border border-white/10">
                          {lang === 'fr' ? 'Accompagnateur' : 'Escort'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional result/impact board */}
                {translatedExp.result && (
                  <div className="bg-[#fcfbfa] border-l-4 border-brand-green rounded-r-xl p-3.5 text-body mb-4 text-brand-brown leading-relaxed flex items-start gap-2.5 shadow-inner border border-[#ebdcb9]/20">
                    <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-brand-green font-sans uppercase text-caption tracking-widest block mb-0.5">
                        {t('exp.impact')}
                      </strong>
                      {translatedExp.result}
                    </div>
                  </div>
                )}

                {/* Custom experience extra links */}
                {translatedExp.links && translatedExp.links.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mb-4 pt-1">
                    {translatedExp.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        className="inline-flex items-center gap-1 text-caption font-sans font-bold text-brand-green hover:text-brand-brown underline underline-offset-2"
                      >
                        <Globe className="w-3 h-3" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {/* Custom Tag Buttons */}
                {translatedExp.tags && translatedExp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 border-t border-stone-100 pt-4 mt-2">
                    {translatedExp.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="px-3 py-1 rounded-lg bg-[#ede9e2]/45 text-brand-brown text-caption font-sans font-bold border border-[#ebdcb9]/40 hover:bg-[#ede9e2]/80 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
