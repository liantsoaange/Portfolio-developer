import React, { useState } from 'react';
import { Project } from '../../types';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { InteractiveDemoPlayer } from './InteractiveDemoPlayer';
import { X, CheckCircle, Code2, PlayCircle, Info, Database, Briefcase, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../../contexts/LanguageContext';
import { translateProject } from '../../utils/translator';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const { lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');
  const [selectedCodeFileIdx, setSelectedCodeFileIdx] = useState<number>(0);

  // Translate project fields on the fly
  const translatedProject = translateProject(project, lang);
  const hasVideo = ['mooz-erp', 'job-privee', 'mlgcow', 'ecofish'].includes(translatedProject.id);

  const getAccentColor = (type: string) => {
    switch (type) {
      case 'erp': return 'text-brand-green border-brand-green/20';
      case 'recruitment': return 'text-brand-green border-brand-green/20';
      case 'poker': return 'text-brand-gold border-brand-gold/20';
      case 'reporting': return 'text-brand-green border-brand-green/20';
      case 'database': return 'text-brand-gold border-brand-gold/20';
      default: return 'text-brand-brown border-brand-brown/20';
    }
  };

  const getThemeBadgeVariant = (type: string) => {
    switch (type) {
      case 'erp': return 'emerald';
      case 'recruitment': return 'emerald';
      case 'poker': return 'purple';
      case 'reporting': return 'info';
      case 'database': return 'amber';
      default: return 'rose';
    }
  };

  const currentFile = translatedProject.codeFiles && translatedProject.codeFiles[selectedCodeFileIdx];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
        
        {/* Soft, warm translucent backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3c3530]/75 backdrop-blur-md"
        />

        {/* Modal Sheet body (Warm elegant cream background with luxury borders) */}
        <motion.div
          id={`project-details-modal-${translatedProject.id}`}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-[#f4f0ea] border border-[#ebdcb9] rounded-[32px] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl z-10 flex flex-col"
        >
          {/* Header Close button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white hover:bg-stone-100 text-[#3c3530] transition-colors border border-[#ebdcb9]/50 shadow-xs cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 flex-1">
            
            {/* Meta Tags Header */}
            <div className="flex flex-wrap gap-2.5 items-center text-caption text-brand-green mb-3.5 uppercase tracking-wider font-bold">
              <span className="flex items-center gap-1.5 text-brand-brown">
                <Briefcase className="w-4 h-4 text-brand-green" />
                {translatedProject.company}
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1.5 text-brand-brown/70">
                <Calendar className="w-4 h-4" />
                {translatedProject.period}
              </span>
              <span className="text-stone-300">•</span>
              <Badge variant={getThemeBadgeVariant(translatedProject.videoDemoType)} className="py-0.5">{translatedProject.role}</Badge>
            </div>

            {/* Title */}
            <h2 className="text-display font-serif font-bold text-brand-brown tracking-tight mb-2.5">
              {translatedProject.title}
            </h2>
            <p className="text-brand-brown/85 text-body leading-relaxed mb-6 font-sans text-justify">
              {translatedProject.subtitle}
            </p>

            {/* Core Interactive Demo Player & Code Tabs */}
            {hasVideo && (
              <div className="mb-6">
                
                {/* Tab Toggles */}
                <div className="flex flex-wrap gap-2 border-b border-[#ebdcb9]/40 pb-3 mb-4">
                  <button
                    onClick={() => setActiveTab('demo')}
                    className={`px-4 py-2.5 rounded-xl text-caption font-sans font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === 'demo'
                        ? 'bg-brand-green text-white shadow-md'
                        : 'bg-white border border-[#ebdcb9]/60 text-brand-brown/80 hover:bg-[#ebdcb9]/15'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    {lang === 'fr' ? 'DÉMO INTERACTIVE AVEC VIDÉO' : 'INTERACTIVE VIDEO DEMO'}
                  </button>
                  {translatedProject.codeFiles && translatedProject.codeFiles.length > 0 && (
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-4 py-2.5 rounded-xl text-caption font-sans font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'code'
                          ? 'bg-brand-green text-white shadow-md'
                          : 'bg-white border border-[#ebdcb9]/60 text-brand-brown/80 hover:bg-[#ebdcb9]/15'
                      }`}
                    >
                      <Code2 className="w-4 h-4" />
                      {lang === 'fr' 
                        ? `SIMULATEUR CODE SOURCE (${translatedProject.codeFiles.length})` 
                        : `SOURCE CODE SIMULATOR (${translatedProject.codeFiles.length})`}
                    </button>
                  )}
                </div>

                {activeTab === 'demo' ? (
                  <InteractiveDemoPlayer demoType={translatedProject.videoDemoType} projectName={translatedProject.title} />
                ) : (
                  <div className="bg-[#0f1115] border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[380px]">
                    
                    {/* Code File Explorer Headers */}
                    <div className="bg-[#16191f] px-4 py-2 flex items-center gap-2 border-b border-stone-900 overflow-x-auto scrollbar-none">
                      {translatedProject.codeFiles?.map((file, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCodeFileIdx(idx)}
                          className={`px-3 py-1.5 rounded text-caption font-mono transition-all duration-200 cursor-pointer ${
                            selectedCodeFileIdx === idx
                              ? 'bg-[#0f1115] text-[#c5af94] border border-[#c5af94]/30 font-bold'
                              : 'text-stone-400 hover:text-stone-200 hover:bg-[#202530]'
                          }`}
                        >
                          📄 {file.name}
                        </button>
                      ))}
                    </div>

                    {/* Code Content window with custom mock syntax styling */}
                    {currentFile && (
                      <div className="flex-1 overflow-auto p-4 font-mono text-caption text-stone-300 leading-relaxed bg-[#0f1115] select-text">
                        <pre className="whitespace-pre">
                          <code>
                            {currentFile.content.split('\n').map((line, lIdx) => {
                              const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('?');
                              
                              if (isComment) {
                                return <div key={lIdx} className="text-stone-500 italic font-sans">{line}</div>;
                              }

                              return (
                                <div key={lIdx} className="hover:bg-[#1a1e26] px-1 py-0.5 rounded">
                                  <span className="text-stone-600 select-none mr-4 w-4 inline-block text-right">{lIdx + 1}</span>
                                  {line.split(' ').map((word, wIdx) => {
                                    let style = 'text-stone-300';
                                    if (['import', 'export', 'class', 'from', 'public', 'private', 'async', 'await', 'return', 'const', 'let', 'interface', 'implements', 'extends', 'namespace'].includes(word.replace(/[^a-zA-Z]/g, ''))) {
                                      style = 'text-[#e5c07b] font-semibold'; // beautiful warm beige keyword
                                    } else if (['@Injectable', '@nestjs/common', '@nestjs/core', '@Autowired', '@RestController', '@Operation', '@Tag', '@GetMapping', '@PostMapping'].includes(word)) {
                                      style = 'text-[#c678dd] font-semibold';
                                    } else if (word.startsWith("'") || word.startsWith('"') || word.startsWith('`')) {
                                      style = 'text-[#98c379]'; // green string
                                    } else if (['db', 'tx', 'stocks', 'stockTransfers', 'TableSession', 'PokerSessionEngine', 'CartService', 'ReportGeneratorService'].includes(word.replace(/[^a-zA-Z]/g, ''))) {
                                      style = 'text-[#d19a66] font-bold';
                                    } else if (word.replace(/[^a-zA-Z]/g, '').match(/^[A-Z]/)) {
                                      style = 'text-[#61afef]';
                                    }
                                    return <span key={wIdx} className={style}>{word} </span>;
                                  })}
                                </div>
                              );
                            })}
                          </code>
                        </pre>
                      </div>
                    )}

                    {/* Footer copy code mock */}
                    <div className="bg-[#16191f] px-4 py-2 border-t border-stone-900 flex justify-between items-center text-caption font-mono text-stone-500">
                      <span>{lang === 'fr' ? 'Langages: HTML5, Tailwind, TS, Java, PHP, SQL' : 'Languages: HTML5, Tailwind, TS, Java, PHP, SQL'}</span>
                      <span>{lang === 'fr' ? 'Conception 100% propre' : '100% clean architecture'}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Grid description & features breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body">
              {/* Card 1: Contexte, Mission & Objectifs */}
              <div className="bg-white p-6 rounded-2xl border border-[#ebdcb9]/40 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-brand-brown mb-3 font-sans">
                    <Info className="w-4 h-4 text-brand-green" />
                    {lang === 'fr' ? 'Contexte & Mission Précise' : 'Context & Precise Mission'}
                  </h4>
                  <p className="text-brand-brown/85 leading-relaxed font-sans text-body text-justify">
                    {translatedProject.description}
                  </p>
                  
                  {translatedProject.objectives && (
                    <div className="mt-4 pt-4 border-t border-[#ebdcb9]/20">
                      <h5 className="font-bold text-brand-brown mb-2 font-sans flex items-center gap-2 text-caption">
                        <Database className="w-4 h-4 text-brand-green" />
                        {lang === 'fr' ? 'Objectifs Métiers du Client' : 'Client Business Objectives'}
                      </h5>
                      <p className="text-brand-brown/85 leading-relaxed font-sans text-caption text-justify">
                        {translatedProject.objectives}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: Réalisations & Résultats */}
              <div className="bg-white p-6 rounded-2xl border border-[#ebdcb9]/40 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-brand-brown mb-3 font-sans flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    {lang === 'fr' ? 'Réalisations Clés' : 'Key Achievements'}
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {translatedProject.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-caption text-brand-brown/85 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {translatedProject.results && (
                  <div className="bg-brand-cream p-4 rounded-xl border border-[#ebdcb9]/50 shadow-inner flex flex-col justify-center">
                    <h5 className="font-bold text-brand-green mb-1.5 font-sans flex items-center gap-1.5 text-caption">
                      <CheckCircle className="w-4 h-4" />
                      {lang === 'fr' ? 'Validation & Résultat' : 'Validation & Result'}
                    </h5>
                    <p className="text-body text-brand-brown leading-relaxed font-sans font-semibold">
                      {translatedProject.results}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Total Stacks badges */}
            <div className="mt-6 pt-5 border-t border-[#ebdcb9]/30 flex flex-wrap items-center gap-2">
              <span className="text-caption font-sans font-bold text-brand-brown/75 uppercase tracking-wider mr-1">
                {lang === 'fr' ? 'Technologies de pointe :' : 'Key Technologies:'}
              </span>
              {translatedProject.stack.map((tech, idx) => (
                <Badge key={idx} variant="amber" className="text-caption py-0.5">
                  {tech}
                </Badge>
              ))}
            </div>

          </div>

          {/* Footer controls */}
          <div className="bg-stone-50 border-t border-[#ebdcb9]/30 p-4 md:p-6 flex justify-end rounded-b-[32px]">
            <Button variant="outline" size="md" onClick={onClose} className="border-[#3c3530]/20 hover:bg-[#3c3530]/5 text-xs sm:text-sm">
              {lang === 'fr' ? 'Fermer la Visualisation' : 'Close Details'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
