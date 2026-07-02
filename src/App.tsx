import React, { useState, useEffect } from 'react';
import { PortfolioLayout } from './components/templates/PortfolioLayout';
import { ProfileSection } from './components/organisms/ProfileSection';
import { ProjectCard } from './components/molecules/ProjectCard';
import { ProjectDetailsModal } from './components/organisms/ProjectDetailsModal';
import { SkillCategorySection } from './components/molecules/SkillCategorySection';
import { ExperienceTimeline } from './components/organisms/ExperienceTimeline';
import { Badge } from './components/atoms/Badge';
import { PROJECTS, SKILL_CATEGORIES, PERSONAL_SKILLS, LANGUAGES, EDUCATION, CERTIFICATIONS, CREATIONS } from './data';
import { Project } from './types';
import { 
  GraduationCap, 
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from './contexts/LanguageContext';
import { 
  translateEducation, 
  translateCreation, 
  translatePersonalSkills, 
  translateLanguages 
} from './utils/translator';

const ALL_PREVIEW_IMAGES = [
  // Certifications
  { src: 'https://i.postimg.cc/T3ks1SBG/certificatstage.jpg', title: 'Attestation de Stage - RELIA Consulting' },
  { src: 'https://i.postimg.cc/nL8KcGTN/uniathena.png', title: 'Digital Marketing - UniAthena' },
  { src: 'https://i.postimg.cc/hGzwx6Rx/eni.jpg', title: 'Master 2 ENI - Génie Logiciel' },
  { src: 'https://i.postimg.cc/DfXvFpSx/agro.png', title: 'Licence Agronomie - Institut Technique Supérieur Agricole' },
  { src: 'https://i.postimg.cc/rsXLKcdp/emotional-management.png', title: 'Intelligence Émotionnelle - Cegos' },
  { src: 'https://i.postimg.cc/8zPgFZCB/leadership.jpg', title: 'Leadership - Grovo' },
  { src: 'https://i.postimg.cc/ncp653Bw/web-canva.png', title: 'Expertise Canva - Design Visuel' },
  { src: 'https://i.postimg.cc/8cBxcvQC/outlook.png', title: 'Maîtrise Outlook - Productivité' },
  // Creations
  { src: 'https://i.postimg.cc/hGPmGZTx/billet-d-invitation.png', title: "Billet d'Invitation / Levée de Fonds - Association MATOKISA" },
  { src: 'https://i.postimg.cc/mk0kN8Pn/logomatokisa.jpg', title: 'Logo MAnome TOhana ny KIlonga Sembana - MATOKISA' },
  { src: 'https://i.postimg.cc/nLjHTvJC/bapteme.png', title: 'Faire-part de Baptême - Conception Graphique Chaleureuse' },
  // Ranosoa
  { src: 'https://i.postimg.cc/vTkx14rR/photo-Equipe.png', title: 'Équipe Ranosoa - Projet R.A.N.O.S.O.A' },
  { src: 'https://i.postimg.cc/gJjCMjZB/ranosoa-moniteur.png', title: 'Attestation de Moniteur - R.A.N.O.S.O.A' },
  { src: 'https://i.postimg.cc/tRZTJCcH/ranosoa-Accompagnateur.png', title: "Attestation d'Accompagnateur - R.A.N.O.S.O.A" }
];

export default function App() {
  const { lang, t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  // Dynamic values translated on-the-fly
  const translatedEducationList = translateEducation(lang) || EDUCATION;
  const translatedPersonalSkills = translatePersonalSkills(PERSONAL_SKILLS, lang) || PERSONAL_SKILLS;
  const translatedLanguages = translateLanguages(lang) || LANGUAGES;

  // Monitor scroll behavior to highlight current section in navigation dynamically
  useEffect(() => {
    const sections = ['profile', 'projects', 'experiences', 'parcours', 'certificats', 'creations'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIndex = ALL_PREVIEW_IMAGES.findIndex(img => img.src === lightboxImg.src);
        if (currentIndex === -1) return;
        if (e.key === 'ArrowLeft') {
          const prevIdx = currentIndex > 0 ? currentIndex - 1 : ALL_PREVIEW_IMAGES.length - 1;
          setLightboxImg(ALL_PREVIEW_IMAGES[prevIdx]);
        } else {
          const nextIdx = currentIndex < ALL_PREVIEW_IMAGES.length - 1 ? currentIndex + 1 : 0;
          setLightboxImg(ALL_PREVIEW_IMAGES[nextIdx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  return (
    <PortfolioLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      
      {/* 1. PROFILE / HERO SECTION */}
      <section id="profile" className="scroll-mt-24 pt-4 space-y-16">
        <ProfileSection />
        
        <div id="approche" className="scroll-mt-24 space-y-10">
          <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
            <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-xs bg-brand-green inline-block" />
              {lang === 'fr' ? 'Mon Approche & Singularité' : 'My Approach & Uniqueness'}
            </span>
            <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
              {lang === 'fr' ? "Qu'est-ce qui me différencie ?" : 'What Sets Me Apart?'}
            </h2>
            <p className="text-body text-brand-brown/85 leading-relaxed max-w-3xl font-sans">
              {lang === 'fr' 
                ? "Je ne conçois pas la technique de manière abstraite. Pour moi, le développement prend tout son sens lorsqu'il s'applique à la préservation de l'environnement, au rapprochement avec la nature et à la vie réelle."
                : "I don't think of technology abstractly. For me, software development reaches its full potential when applied to environment preservation, nature connection, and improving real lives."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-3 bg-white border border-[#ebdcb9]/40 rounded-3xl p-6.5 shadow-xs hover:border-brand-green/40 hover:shadow-md transition-all duration-300">
              <h3 className="font-serif font-black text-heading text-brand-brown tracking-tight leading-snug flex items-center gap-3 pb-2 border-b border-[#ebdcb9]/30">
                <span className="font-serif font-black text-heading text-brand-green">01</span>
                {lang === 'fr' ? 'Agronomie & Écologie réelle' : 'Agronomy & Ecology'}
              </h3>
              <p className="text-body text-brand-brown/85 leading-relaxed font-sans text-justify [text-justify:inter-word]">
                {lang === 'fr' ? (
                  <>
                    À la fois technicienne agronome et développeuse informatique, concevoir des applications ayant un impact réel sur l'écologie ou l'environnement est une grande fierté. Qu'il s'agisse de l'application de lutte contre le gaspillage alimentaire <strong>MOOZ</strong>, du suivi laitier prédictif de <strong>MLG-COW</strong>, ou de la solution de préservation des ressources aquacoles <strong>EcoFish</strong>, j'aime mettre la technique au service de la nature.
                  </>
                ) : (
                  <>
                    As both an agricultural technician and a software developer, crafting applications with a real ecological impact is a true source of pride. Whether it's the food waste prevention app <strong>MOOZ</strong>, predictive milk monitoring with <strong>MLG-COW</strong>, or aquaculture preservation via <strong>EcoFish</strong>, I love putting technology at the service of nature.
                  </>
                )}
              </p>
            </div>

            <div className="space-y-3 bg-white border border-[#ebdcb9]/40 rounded-3xl p-6.5 shadow-xs hover:border-brand-green/40 hover:shadow-md transition-all duration-300">
              <h3 className="font-serif font-black text-heading text-brand-brown tracking-tight leading-snug flex items-center gap-3 pb-2 border-b border-[#ebdcb9]/30">
                <span className="font-serif font-black text-heading text-brand-green">02</span>
                {lang === 'fr' ? 'Analyse & Force de proposition' : 'Analytical Initiative'}
              </h3>
              <p className="text-body text-brand-brown/85 leading-relaxed font-sans text-justify [text-justify:inter-word]">
                {lang === 'fr' ? (
                  <>
                    Dans mon travail de développement, je n'applique pas seulement des spécifications : j'aime analyser profondément les enjeux, décortiquer les besoins opérationnels réels et être une réelle force de proposition. Proposer des chemins d'architecture viables, robustes et stables fait partie de ma rigueur d'ingénierie quotidienne.
                  </>
                ) : (
                  <>
                    In my development process, I don't just follow specifications: I deeply analyze challenges, evaluate actual operational needs, and act as a proactive consultant. Recommending viable, robust, and clean architecture layouts is a key aspect of my daily engineering discipline.
                  </>
                )}
              </p>
            </div>

            <div className="space-y-3 bg-white border border-[#ebdcb9]/40 rounded-3xl p-6.5 shadow-xs hover:border-brand-green/40 hover:shadow-md transition-all duration-300">
              <h3 className="font-serif font-black text-heading text-brand-brown tracking-tight leading-snug flex items-center gap-3 pb-2 border-b border-[#ebdcb9]/30">
                <span className="font-serif font-black text-heading text-brand-green">03</span>
                {lang === 'fr' ? 'Engagement Humain & Collaboration' : 'Human Values & Connection'}
              </h3>
              <p className="text-body text-brand-brown/85 leading-relaxed font-sans text-justify [text-justify:inter-word]">
                {lang === 'fr' ? (
                  <>
                    Le partage humain est au cœur de ma démarche. J'apprécie la relation directe et de confiance avec des clients francophones, tout comme l'émulation née de la coopération avec des étudiants et bénévoles étrangers — à l'instar de notre travail d'équipe pluridisciplinaire sur le projet d'accès à l'eau solaire <strong>RANOSOA</strong> ou pour l'association <strong>MATOKISA</strong>.
                  </>
                ) : (
                  <>
                    Human connection is at the core of my practice. I value building trust-based relationships with French-speaking clients, as well as the creative energy born from collaborating with international students and volunteers — like our cross-functional team efforts for the solar water pumping project <strong>RANOSOA</strong> or the <strong>MATOKISA</strong> charity.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROJECTS SECTION */}
      <section id="projects" className="scroll-mt-24 space-y-10">
        <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
          <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            {lang === 'fr' ? 'Portefeuille Technique de Pointe' : 'Advanced Engineering Portfolio'}
          </span>
          <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
            {lang === 'fr' ? 'Projets & Simulateurs Interactifs' : 'Projects & Interactive Simulators'}
          </h2>
          <p className="text-body text-brand-brown/85 leading-relaxed max-w-2xl font-sans">
            {lang === 'fr' 
              ? "Cliquez sur n'importe quel projet pour le visualiser en plein écran avec son simulateur de fonctionnement et son code source."
              : "Click on any project card to view it full-screen alongside its interactive behavioral simulator and source code."}
          </p>
        </div>

        {/* Dynamic Hover Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCES SECTION */}
      <section id="experiences" className="scroll-mt-24 space-y-10">
        <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
          <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest">
            {lang === 'fr' ? 'Expertise de terrain' : 'Field Expertise'}
          </span>
          <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
            {lang === 'fr' ? 'Parcours Professionnel' : 'Professional Experiences'}
          </h2>
          <p className="text-body text-brand-brown/85 font-sans">
            {lang === 'fr'
              ? 'Des contributions logicielles éprouvées alliant ingénierie informatique de pointe et réactivité opérationnelle.'
              : 'Proven software contributions combining high-level computer science engineering and operational responsiveness.'}
          </p>
        </div>

        <ExperienceTimeline onImagePreview={(src, title) => setLightboxImg({ src, title })} />
      </section>

      {/* SKILLS DIVISION */}
      <section id="skills" className="scroll-mt-24 space-y-10 pt-4">
        <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
          <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-xs bg-brand-green inline-block" />
            {lang === 'fr' ? 'Savoir-faire et Maîtrise' : 'Savoir-Faire & Mastery'}
          </span>
          <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
            {lang === 'fr' ? 'Compétences Techniques & Langues' : 'Technical Skills & Languages'}
          </h2>
        </div>

        {/* Unified 3-Column Grid for Technical categories + Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <SkillCategorySection key={idx} category={cat} />
          ))}

          {/* Langues card styled to match exactly as a cohesive card */}
          <div className="bg-white border border-[#ebdcb9]/40 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-brand-green/40 transition-[border-color,box-shadow] duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#ebdcb9]/30">
                <span className="w-1.5 h-1.5 rounded-xs bg-brand-green inline-block" />
                <h3 className="text-caption font-bold text-brand-brown uppercase tracking-wider font-sans">
                  {lang === 'fr' ? 'Langues Parlées' : 'Spoken Languages'}
                </h3>
              </div>
              <p className="text-body text-brand-brown/85 leading-relaxed mb-4 font-sans text-justify">
                {lang === 'fr' 
                  ? "Aptitude à communiquer en direct de manière fluide avec des clients francophones, des équipes d'ingénieurs et des collaborateurs à l'international."
                  : "Ability to communicate smoothly and directly with French-speaking clients, engineering teams, and international business collaborators."}
              </p>
              <div className="space-y-3 font-sans pt-2">
                {translatedLanguages.map((l, idx) => (
                  <div key={idx} className="flex justify-between items-center text-body">
                    <span className="font-bold text-brand-brown">{l.name}</span>
                    <span className="text-caption px-2.5 py-1 rounded-full bg-[#ede9e2]/60 text-brand-brown border border-[#ebdcb9]/30 font-sans font-bold">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills Section: Horizontal full-width alignment (5 items) */}
        <div className="bg-brand-cream border border-[#ebdcb9]/40 rounded-[32px] p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#ebdcb9]/30 pb-3">
            <span className="w-1.5 h-1.5 rounded-xs bg-brand-green inline-block" />
            <h3 className="text-caption font-bold text-brand-brown uppercase tracking-wider font-sans">
              {lang === 'fr' ? "Soft Skills / Forces Personnelles de l'ingénieur" : 'Soft Skills & Personal Strengths'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {translatedPersonalSkills.map((skill, idx) => (
              <div key={idx} className="space-y-3 bg-white p-5 rounded-2xl border border-[#ebdcb9]/25 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-body mb-1.5">
                    <span className="font-bold text-brand-brown font-serif leading-tight">{skill.name}</span>
                    <span className="font-mono text-brand-green font-semibold text-caption bg-[#eef3ef] px-1.5 py-0.5 rounded">{skill.percentage}%</span>
                  </div>
                  {/* Linear slider metrics */}
                  <div className="h-1.5 w-full bg-[#ebdcb9]/25 rounded-full overflow-hidden border border-[#ebdcb9]/10">
                    <div className="h-full bg-brand-green" style={{ width: `${skill.percentage}%` }} />
                  </div>
                </div>
                <p className="text-caption text-brand-brown/85 leading-relaxed font-sans font-normal pt-1.5 border-t border-stone-50 text-justify">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PARCOURS ACADÉMIQUE SECTION */}
      <section id="parcours" className="scroll-mt-24 space-y-10">
        <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
          <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest">
            {lang === 'fr' ? 'Cursus académique' : 'Academic Path'}
          </span>
          <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
            {lang === 'fr' ? 'Formation & Diplômes' : 'Education & Degrees'}
          </h2>
          <p className="text-body text-brand-brown/85 font-sans">
            {lang === 'fr'
              ? "Un ancrage académique rigoureux axé sur la conception de logiciels fiables, validé par l'École Nationale d'Informatique."
              : "Rigorous computer science study with a focus on stable architecture, certified by the National School of Computer Science."}
          </p>
        </div>

        {/* Education grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {translatedEducationList.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#ebdcb9]/40 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-brand-green/40 transition-all duration-300 relative overflow-hidden group shadow-xs"
              style={{ backgroundImage: 'radial-gradient(ellipse at bottom, rgba(88,106,90,0.03) 0%, transparent 60%)' }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="p-3 bg-[#ede9e2] text-brand-green border border-[#ebdcb9]/30 rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-5.5 h-5.5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-brown text-caption text-white font-sans font-bold tracking-wider self-start uppercase">
                  {edu.period}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-heading font-serif font-black text-brand-brown leading-snug">
                  {edu.diploma}
                </h3>
                <div className="text-caption text-brand-green font-sans font-bold">
                  {edu.school}
                </div>
              </div>

              <p className="text-body text-brand-brown/85 leading-relaxed font-sans pt-3.5 border-t border-stone-100 text-justify">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CERTIFICATS SECTION */}
      <section id="certificats" className="scroll-mt-24 space-y-10">
        <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
          <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest">
            {lang === 'fr' ? 'Agréments et distinctions' : 'Certifications & Accreditations'}
          </span>
          <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
            {lang === 'fr' ? 'Certifications Professionnelles' : 'Professional Certifications'}
          </h2>
          <p className="text-body text-brand-brown/85 font-sans">
            {lang === 'fr'
              ? "Formation continue et validations formelles auprès des leaders de l'industrie technologique."
              : 'Ongoing professional growth validated by recognized technology and academic institutions.'}
          </p>
        </div>

        {/* Beautiful certificates Trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS && CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-[#ebdcb9]/40 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-brand-green/40 transition-all duration-300"
            >
              <div>
                <div className="mb-4">
                  <span className="text-caption font-mono text-brand-green font-black uppercase tracking-wider bg-[#eef3ef] px-2.5 py-1 rounded-md border border-[#d8e5da]">
                    CERTIF — {cert.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-heading font-serif font-black text-brand-brown mb-1 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-caption text-brand-green font-sans font-bold mb-3">{cert.issuer}</p>
                
                {cert.imageUrl && (
                  <div 
                    className="relative mt-4 aspect-[4/3] rounded-2xl overflow-hidden border border-[#ebdcb9]/40 bg-brand-sand cursor-zoom-in group/img hover:border-brand-green/40 transition-all shadow-xs"
                    onClick={() => setLightboxImg({ src: cert.imageUrl, title: cert.title })}
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover/img:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#3c3530]/0 group-hover/img:bg-[#3c3530]/5 flex items-center justify-center transition-all">
                      <div className="opacity-0 group-hover/img:opacity-100 bg-[#3c3530]/90 text-white rounded-full p-2.5 transition-all shadow-md">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {cert.imageUrl && (
                <button
                  type="button"
                  onClick={() => setLightboxImg({ src: cert.imageUrl, title: cert.title })}
                  className="inline-flex items-center gap-1.5 text-caption font-sans font-bold text-brand-green hover:text-brand-brown mt-5 transition-colors self-start cursor-pointer group/btn"
                >
                  <span className="group-hover/btn:underline decoration-[#586a5a]">
                    {lang === 'fr' ? 'Visualiser le document' : 'View Document'}
                  </span>
                  <ZoomIn className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CRÉATIONS GRAPHISQUES (Grid layout of exactly 3 columns as requested) */}
      <section id="creations" className="scroll-mt-24 space-y-10">
        <div className="flex flex-col space-y-2 border-l-4 border-brand-green pl-5">
          <span className="text-caption font-sans font-extrabold text-brand-green uppercase tracking-widest">
            {lang === 'fr' ? 'Axe visuel & Design' : 'Visual Design & Layout'}
          </span>
          <h2 className="text-display font-serif font-black text-brand-brown tracking-tight">
            {lang === 'fr' ? 'Créations Graphiques & Identités' : 'Graphic Creations & Identities'}
          </h2>
          <p className="text-body text-brand-brown/85 font-sans">
            {lang === 'fr'
              ? "Des chartes étudiées et des designs d'interfaces concrétisant l'impact de la communication digitale."
              : 'Cohesive branding systems and user interfaces translating business value into strong digital communication.'}
          </p>
        </div>

        {/* Creations beautiful cards: set to 3 columns on desktop to fit perfectly on a single line */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {CREATIONS && CREATIONS.map((creation) => {
            const translatedCreationItem = translateCreation(creation, lang);
            return (
              <div
                key={creation.id}
                className="bg-white border border-[#ebdcb9]/40 rounded-[32px] overflow-hidden group shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Creative graphic design showcase */}
                <div 
                  className="h-56 sm:h-64 w-full bg-[#f4f0ea] relative overflow-hidden flex items-center justify-center border-b border-[#ebdcb9]/30 cursor-zoom-in group/img"
                  onClick={() => setLightboxImg({ src: creation.imageUrl, title: translatedCreationItem.title })}
                >
                  <img
                    src={creation.imageUrl}
                    alt={translatedCreationItem.title}
                    className="w-full h-full object-cover group-hover/img:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#3c3530]/5 group-hover/img:bg-transparent transition-colors duration-300 z-10" />
                  
                  <span className="absolute bottom-3 left-3 z-20 bg-brand-brown text-[#f4f0ea] text-caption font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 shadow-xs">
                    {translatedCreationItem.category}
                  </span>

                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 bg-[#3c3530]/90 text-white rounded-full p-2.5 transition-all shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 
                        className="text-heading font-serif font-black text-brand-brown hover:text-brand-green transition-colors cursor-pointer leading-snug" 
                        onClick={() => setLightboxImg({ src: creation.imageUrl, title: translatedCreationItem.title })}
                      >
                        {translatedCreationItem.title}
                      </h3>
                      <button 
                        onClick={() => setLightboxImg({ src: creation.imageUrl, title: translatedCreationItem.title })}
                        className="p-1.5 rounded-lg bg-[#ede9e2] text-brand-green border border-[#ebdcb9]/30 hover:bg-brand-green hover:text-white transition-all cursor-pointer shrink-0"
                        title={lang === 'fr' ? "Zoomer l'image" : 'Zoom Image'}
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <p className="text-body text-brand-brown/85 leading-relaxed font-sans font-normal text-justify">
                      {translatedCreationItem.description}
                    </p>
                  </div>

                  {creation.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-50 mt-4">
                      {creation.tags.map((tag, tIdx) => (
                        <Badge key={tIdx} variant="amber" className="text-caption">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULLSCREEN OVERLAY MODAL */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ELEGANT LIGHTBOX COMPONENT */}
      {lightboxImg && (() => {
        const currentIndex = ALL_PREVIEW_IMAGES.findIndex(img => img.src === lightboxImg.src);
        
        const handlePrev = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (currentIndex > 0) {
            setLightboxImg(ALL_PREVIEW_IMAGES[currentIndex - 1]);
          } else {
            setLightboxImg(ALL_PREVIEW_IMAGES[ALL_PREVIEW_IMAGES.length - 1]); // Loop around
          }
        };

        const handleNext = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (currentIndex < ALL_PREVIEW_IMAGES.length - 1) {
            setLightboxImg(ALL_PREVIEW_IMAGES[currentIndex + 1]);
          } else {
            setLightboxImg(ALL_PREVIEW_IMAGES[0]); // Loop around
          }
        };

        return (
          <div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#24221f]/98 backdrop-blur-md p-4 sm:p-6 transition-all"
            onClick={() => setLightboxImg(null)}
          >
            {/* Top Control Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-50">
              <p className="text-body font-serif font-black text-[#ede9e2] max-w-[70%] truncate">
                {lightboxImg.title}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-caption font-mono text-[#ede9e2]/60">
                  {currentIndex !== -1 ? `${currentIndex + 1} / ${ALL_PREVIEW_IMAGES.length}` : ''}
                </span>
                <button
                  onClick={() => setLightboxImg(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left/Right Buttons for Desktop */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/5 hover:bg-white/15 text-[#ede9e2] hover:text-white transition-all cursor-pointer z-50 active:scale-95 border border-white/5"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Content Container (Zoom display) */}
            <div 
              className="relative max-w-4xl max-h-[72vh] flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImg.src} 
                alt={lightboxImg.title} 
                className="rounded-xl max-w-full max-h-[70vh] object-contain border border-white/10 shadow-2xl transition-all duration-300"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/5 hover:bg-white/15 text-[#ede9e2] hover:text-white transition-all cursor-pointer z-50 active:scale-95 border border-white/5"
              aria-label="Suivant"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Thumbnails rail at the bottom for instant navigation */}
            <div 
              className="absolute bottom-6 flex gap-2.5 overflow-x-auto max-w-full px-8 scrollbar-thin scrollbar-thumb-white/10 pt-2 pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {ALL_PREVIEW_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxImg(img)}
                  className={`relative shrink-0 w-11 sm:w-16 aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${idx === currentIndex ? 'border-[#586a5a] scale-105' : 'border-white/10 hover:border-white/30 opacity-55 hover:opacity-100'}`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        );
      })()}

    </PortfolioLayout>
  );
}
