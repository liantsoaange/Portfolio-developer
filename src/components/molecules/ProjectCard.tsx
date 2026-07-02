import React from 'react';
import { Project } from '../../types';
import { Badge } from '../atoms/Badge';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { translateProject } from '../../utils/translator';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { lang } = useTranslation();

  // Translate project on the fly
  const translatedProject = translateProject(project, lang);

  // Determine gradient based on project demo type for beautiful visual rhythm (light mode compatible)
  const getGradient = (type: string) => {
    switch (type) {
      case 'erp':
        return 'from-[#eef3ef] to-white';
      case 'recruitment':
        return 'from-[#faf8f5] to-white';
      case 'poker':
        return 'from-[#f2ede4]/40 to-white';
      case 'reporting':
        return 'from-[#eef3ef] to-white';
      case 'database':
        return 'from-[#faf7ef] to-white';
      default:
        return 'from-brand-cream to-white';
    }
  };

  const getAccentBorder = (type: string) => {
    switch (type) {
      case 'erp': return 'hover:border-brand-green/50 hover:shadow-brand-green/5';
      case 'recruitment': return 'hover:border-brand-green/40 hover:shadow-brand-green/5';
      case 'poker': return 'hover:border-brand-gold/50 hover:shadow-brand-gold/5';
      case 'reporting': return 'hover:border-brand-green/45 hover:shadow-brand-green/5';
      case 'database': return 'hover:border-brand-gold/50 hover:shadow-brand-gold/5';
      default: return 'hover:border-brand-brown/30 hover:shadow-brand-brown/5';
    }
  };

  const getThemeColorClass = (type: string) => {
    switch (type) {
      case 'erp': return 'text-brand-green';
      case 'recruitment': return 'text-brand-green';
      case 'poker': return 'text-brand-gold';
      case 'reporting': return 'text-brand-green';
      case 'database': return 'text-brand-gold';
      default: return 'text-brand-brown';
    }
  };

  return (
    <motion.div
      layoutId={`card-${translatedProject.id}`}
      id={`project-card-${translatedProject.id}`}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[32px] bg-gradient-to-br ${getGradient(translatedProject.videoDemoType)} border border-[#ebdcb9]/40 p-8 sm:p-9 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xs hover:shadow-lg ${getAccentBorder(translatedProject.videoDemoType)}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ebdcb910_1px,transparent_1px),linear-gradient(to_bottom,#ebdcb910_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Decorative colored glow on top-right */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-inherit filter blur-2xl opacity-15 group-hover:opacity-30 transition-opacity" />

      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex flex-col">
            <span className="text-caption font-sans font-bold text-brand-green uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              {translatedProject.company}
            </span>
            <h3 className="text-heading font-serif font-black text-brand-brown tracking-tight leading-snug group-hover:text-brand-green transition-colors">
              {translatedProject.title}
            </h3>
          </div>
          <div className="rounded-full bg-white p-2.5 border border-[#ebdcb9]/50 shadow-xs flex items-center justify-center">
            <PlayCircle className={`w-5.5 h-5.5 ${getThemeColorClass(translatedProject.videoDemoType)} group-hover:scale-110 transition-transform`} />
          </div>
        </div>

        {/* Short Subtitle */}
        <p className="text-body text-brand-brown/85 line-clamp-2 md:line-clamp-3 mb-7 font-sans font-normal leading-relaxed text-justify">
          {translatedProject.subtitle}
        </p>
      </div>

      <div>
        {/* Tech Stack Horizontal List */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#ebdcb9]/30">
          {translatedProject.stack.slice(0, 4).map((tech, idx) => (
            <Badge key={idx} variant="amber" className="text-caption">
              {tech}
            </Badge>
          ))}
          {translatedProject.stack.length > 4 && (
            <span className="text-caption font-sans font-bold text-brand-green self-center pl-1">
              +{translatedProject.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Hover action overlay with brand green backdrop and light details */}
      <div className="absolute inset-0 bg-brand-green/95 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2.5 transition-all duration-300 pointer-events-none rounded-3xl">
        <div className="rounded-full bg-white/10 p-4 border border-white/20">
          <PlayCircle className="w-8 h-8 text-[#ede9e2] animate-pulse" />
        </div>
        <span className="text-body font-sans font-bold text-white tracking-widest uppercase">
          {lang === 'fr'
            ? 'Visualisation des détails du projet'
            : 'View Project Details'}
        </span>
      </div>
    </motion.div>
  );
};
