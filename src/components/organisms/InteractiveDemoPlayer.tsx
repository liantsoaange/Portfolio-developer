import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Terminal, ArrowRight, Laptop, Server, Award, Plus, LayoutGrid, CheckCircle2, Cpu, FileText, Database, ShoppingBag, Video, Upload, FileVideo, Sparkles, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface InteractiveDemoPlayerProps {
  demoType: 'erp' | 'recruitment' | 'poker' | 'database' | 'reporting' | 'ecommerce' | 'mlgcow' | 'etafa';
  projectName: string;
}

export const InteractiveDemoPlayer: React.FC<InteractiveDemoPlayerProps> = ({ demoType, projectName }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'visual' | 'logs'>('visual');
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const DEFAULT_VIDEO_URL = '/assets/mooz.mp4';
  const FALLBACK_VIDEO_URL = '';

  const getVideoUrlForType = (type: string) => {
    switch (type) {
      case 'erp':
        return '/assets/mooz.mp4';
      case 'recruitment':
        return '/assets/jobprivé.mp4';
      case 'mlgcow':
        return '/assets/MLG_COW.mp4';
      case 'reporting':
        return '/assets/ecofish.mp4';
      default:
        return null;
    }
  };

  const [viewMode, setViewMode] = useState<'simulation' | 'video'>('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(getVideoUrlForType(demoType));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const erpTimestamps = [
    { time: "00:00", seconds: 0, label: "Table de bord & Mouvements" },
    { time: "00:08", seconds: 8, label: "Inventaire de stock" },
    { time: "00:20", seconds: 20, label: "Import de stock (CSV/XML/API)" },
    { time: "00:50", seconds: 50, label: "Nouveau mouvement" },
    { time: "01:00", seconds: 60, label: "Création de produit" },
    { time: "01:48", seconds: 108, label: "Fiche détail & Traçabilité" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoPlaying(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setVideoPlaying(true);
        }).catch(err => console.error(err));
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const percentage = parseFloat(e.target.value);
      const newTime = (percentage / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setVideoProgress(percentage);
    }
  };

  const jumpToTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().then(() => {
        setVideoPlaying(true);
      }).catch(err => console.error(err));
    }
  };

  // Demo step configurations based on types
  const demoSteps = {
    erp: [
      {
        title: "Connexion & Authentification (Better Auth)",
        desc: "L'administrateur se connecte avec le rôle 'Coordinateur de Stock'.",
        log: "POST /api/auth/sign-in - Status: 200 OK | Session JWT issued for role USER_MANAGER",
        data: { activeUser: "Liantsoa Ange", role: "Coordinateur ERP", shop: "MOOZ Central" }
      },
      {
        title: "Importation Multi-formats du catalogue (CSV)",
        desc: "Analyse et traitement asynchrone d'un fichier d'inventaire de 250 produits.",
        log: "POST /api/inventory/import - Parsing 250 records from file product_catalog_052026.csv...",
        data: { progress: 100, status: "SUCCESS", importedCount: 250 }
      },
      {
        title: "Optimisation de Recette par Assistant IA",
        desc: "Gemini AI analyse les ingrédients disponibles en stock pour ajuster les marges.",
        log: "GET /api/recipe/optimize/mooz-recipe-92 - Prompting Server Gemini-Flash-3.5... Ready.",
        data: { aiResponse: "Ingrédient Farine réajusté. Économie de 14.5% détectée.", recommendation: "Ajuster la production standard du magasin de Fianarantsoa." }
      },
      {
        title: "Transfert Inter-magasins Transactionnel (Drizzle ORM)",
        desc: "Transfert sécurisé de 50 unités de Farine de Antsirabe vers Fianarantsoa.",
        log: "START TRANSACTION - Drizzle ORM Isolation Level: Serializable\nUPDATE stocks SET quantity = quantity - $1 WHERE id = $2\nINSERT into stocks ON CONFLICT DO UPDATE stocks.quantity + $1\nINSERT INTO stock_transfers (from, to, qty) VALUES ('Shop_Antsirabe', 'Shop_Fianarantsoa', 50)\nCOMMIT TRANSACTION - Success.",
        data: { sourceStock: 220, destStock: 180, transferQty: 50 }
      }
    ],
    recruitment: [
      {
        title: "Initialisation du Tableau de Bord Candidats",
        desc: "Chargement en temps réel de notre base de données PostgreSQL de recrutement.",
        log: "GET /api/v1/candidates?page=1 - Total records loaded: 1420 Candidates.",
        data: { total: 1420, activeList: ["Sarah (React)", "Feno (NestJS)", "Tsiry (Angular)"] }
      },
      {
        title: "Filtrage et Scoring Multicritères",
        desc: "Rapprochement automatique des compétences requises avec le profil du candidat.",
        log: "GET /api/v1/candidates/filter?stack=React,NestJS - Computing scores using database indices...",
        data: { matches: 2, scoreSarah: "95%", scoreFeno: "89%" }
      },
      {
        title: "Mise à jour du statut via Firebase",
        desc: "Changement de statut pour Sarah de 'Nouveau' à 'Évalué' avec mise à jour en temps réel.",
        log: "PATCH /api/v1/candidates/sarah-99/status - Status: 200 OK | Payload: { status: 'REVIEWING' }\nFirebase DB sync triggered synchronously to recruiter dashboard.",
        data: { id: "sarah-99", name: "Sarah", status: "EVALUATION EN COURS" }
      },
      {
        title: "Stabilisation & Notifications directes",
        desc: "Envoi automatisé des invitations à l'entretien technique sur les boîtes mails.",
        log: "POST /api/v1/notifications/send-invite - Template 'Technical Interview' parsed.\nMail successfully delivered via API proxy. 100% stable.",
        data: { emailSent: "sarah.m@gmail.com", status: "Inscrit à l'agenda" }
      }
    ],
    poker: [
      {
        title: "Initialisation du Core Métier (Design Hexagonal)",
        desc: "Démarrage du moteur de poker découplé de la couche framework.",
        log: "HexagonalCore: Bootstrap Domain Engine. Initializing rules mapping...\nAll adapters mapped cleanly. PokerSessionEngine running.",
        data: { state: "READY", tableId: "table-05" }
      },
      {
        title: "Modélisation des relations dans Neo4j (Graphes)",
        desc: "Création dynamique de noeuds représentant les joueurs à la table.",
        log: "Neo4j Session Active:\nRUN 'MERGE (p1:Player {name: 'Ange'}) MERGE (p2:Player {name: 'Alex'}) MATCH (t:Table {id: 'table-05'}) CREATE (p1)-[:PLAYED {buyIn: 100}]->(t)'",
        data: { nodes: 3, relationships: 4 }
      },
      {
        title: "Détection des Tactiques de Jeu (Cypher Query)",
        desc: "Calcul du taux de confrontation répété entre joueurs pour déceler des alliances.",
        log: "Neo4j Read: MATCH (p:Player)-[r:PLAYED_WITH]->(o:Player) WHERE count(r) > 5 RETURN p.name, o.name, count(r)\nCypher Engine return speed: 1.2ms.",
        data: { detectedAllies: "Ange & Alex (6 parties communes)" }
      },
      {
        title: "Matchmaking & Traitement à très faible latence",
        desc: "Mise à jour du foyer de table de jeu de poker avec réduction du temps de réponse.",
        log: "GET /api/poker/matchmake?playerId=p-01 - Status Code: 200 OK. MatchFound in 8ms.",
        data: { status: "GAME_STARTED", minBuyIn: "100$", currentBlind: "2$/4$" }
      }
    ],
    reporting: [
      {
        title: "Chargement de la Plateforme Ecofish",
        desc: "Initialisation du frontend modulaire en Angular et des accès de sécurité.",
        log: "Angular AppModule loaded. Instantiating project trackers module...\nNestJS Server online. Connection test to MariaDB status: SUCCESS.",
        data: { activeModule: "Projets Agro-maritimes", currentRole: "Auditeur Externe" }
      },
      {
        title: "Calcul des budgets financiers & de l'avancement",
        desc: "Extraction et agrégation des budgets des thèmes éco-responsables.",
        log: "GET /api/projects/financials - SQL Query: SELECT SUM(allocated_budget) FROM project_budgets GROUP BY category\nBudgets OK",
        data: { spentRatio: "74%", totalBudget: "1,200,000 €" }
      },
      {
        title: "Génération automatique d'un rapport formalisé PDF",
        desc: "Création du stream de données via PDFKit asynchrone pour l'envoi au donateur.",
        log: "POST /api/reports/generate/ecofish-audit-2024\nCreating PDFKit instance on server...\nDrawing header colors, dynamic tables, signatures fields...",
        data: { status: "GENERATION_EN_COURS", progress: 65 }
      },
      {
        title: "Compilation finale et mise en téléchargement",
        desc: "Le document est exporté avec succès, prêt à être téléchargé par l'auditeur.",
        log: "PdfKitStream: Generation complete. Stream flushed to response.\nFile: ecofish_rapport_annuel_2024.pdf (2.4 MB) ready for download.",
        data: { status: "DISPONIBLE", fileName: "ecofish_rapport_2024.pdf" }
      }
    ],
    database: [
      {
        title: "Démarrage du Microservice (Spring Boot)",
        desc: "Instanciation du serveur Java sous environnement Agile Scrum.",
        log: ":: Spring Boot :: (v3.2.1)\nStarting IncuboostBackendApplication...\nInitializing JPA EntityManagerFactory...\nInitializing HikariDataSource connected to PostgreSQL pools",
        data: { activeProfile: "prod", poolSize: 10 }
      },
      {
        title: "Seeding des données et modélisation Hibernate",
        desc: "Mise en cache du portefeuille des structures d'incubation.",
        log: "Hibernate: select s1_0.id, s1_0.name, s1_0.is_active from startup s1_0 where s1_0.is_active=true\nLoaded JPA schema with 18 startup entities successfully.",
        data: { startupsLoaded: 18 }
      },
      {
        title: "Documentation API interactive avec Swagger",
        desc: "Exposition des contrats d'interfaces REST OpenAPI pour le client.",
        log: "OpenAPI generator initialized. Swagger UI exposed at http://localhost:3000/api/v1/swagger-ui.html\nEndpoints declared: GET/POST/PUT/DELETE startups.",
        data: { swaggerStatus: "100% DOCUMENTÉ" }
      },
      {
        title: "Requête CRUD & Résultat de validation",
        desc: "Exécution d'une requête POST pour inscrire un projet avec des données validées.",
        log: "POST /api/v1/startups - Headers: Content-Type: application/json\nBody: { 'name': 'GreenTech', 'sector': 'Agri' }\nValidating input constraints... VALID\nSERVER STATUS: 201 Created.",
        data: { responseStatus: 201, insertedName: "GreenTech" }
      }
    ],
    ecommerce: [
      {
        title: "Initialisation du module Angular E-commerce",
        desc: "Montage des modules responsives stylés sous Bootstrap.",
        log: "Angular Ecommerce Module initialized. Loading components lazily...",
        data: { device: "Mobile responsive grid", cartCount: 0 }
      },
      {
        title: "Récupération asynchrone des Produits (RxJS API)",
        desc: "Fluxe de données réactif émettant les offres promotionnelles.",
        log: "GET /api/products/ecommerce - HTTP call triggered...\nRxJS Stream initialized. Mapping items and applying tax calculations...",
        data: { banner: "Soldes de Juin !", availableProducts: 42 }
      },
      {
        title: "Gestion du Panier d'achat réactif (BehaviorSubject)",
        desc: "Le panier accumule les articles choisis et recalcule instantanément le total.",
        log: "CartService: addItem('p_01'). CartItems behavior source emissions emitted to subscribers.",
        data: { cartItems: 1, currentTotal: "89.00 €", lastAdded: "Clavier Gamer RGB" }
      },
      {
        title: "Finalisation et calcul du Checkout",
        desc: "Passage de la commande sécurisée avec mise à jour immédiate de l'état local.",
        log: "Checkout successful. Emitting reset value to behavior subjects. Saved to storage.",
        data: { cartCount: 0, orderStatus: "SUCCESS", totalPaid: "89.00 €" }
      }
    ]
  };

  const currentSteps = demoSteps[demoType as keyof typeof demoSteps] || [
    { title: "Démo", desc: "Lecture de la vidéo de présentation", log: "Chargement de la vidéo...", data: {} }
  ];
  const totalSteps = currentSteps.length;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          const next = prev < totalSteps - 1 ? prev + 1 : 0;
          return next;
        });
      }, 5000); // 5 seconds per step
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSteps]);

  useEffect(() => {
    // Append logs
    const currentStepLog = currentSteps[step].log;
    setLogs((prev) => {
      // Keep only last 15 logs to prevent memory overflow
      const combined = [...prev, `[${new Date().toLocaleTimeString()}] ${currentStepLog}`];
      if (combined.length > 25) combined.shift();
      return combined;
    });
  }, [step, demoType]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setStep(0);
    setLogs([`[System] Réinitialisation de la démo interactive de "${projectName}"...`]);
  };

  const renderVisualSimulation = () => {
    const activeData = currentSteps[step].data as any;

    switch (demoType) {
      case 'erp':
        return (
          <div className="flex flex-col h-full justify-between p-4 bg-slate-950 rounded-xl border border-slate-900 font-sans text-xs">
            {/* ERP Dashboard header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono font-bold text-slate-200">MOOZ ERP v2.1</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                <span>Magasin: <strong className="text-emerald-400">{activeData.shop || 'MOOZ Central'}</strong></span>
                <span className="text-slate-600">|</span>
                <span>Rôle: <strong className="text-slate-300">{activeData.role || 'Admin'}</strong></span>
              </div>
            </div>

            {/* Animation stages */}
            <div className="flex-1 my-4 flex flex-col justify-center space-y-4">
              {step === 0 && (
                <div className="text-center p-4 bg-slate-900/60 rounded-xl border border-emerald-500/10 max-w-sm mx-auto">
                  <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-2">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-bold text-slate-200 mb-1">Authentification validée !</h4>
                  <p className="text-slate-400 text-[11px]">Interface reconfigurée en temps réel selon les habilitations de l'utilisateur.</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>Importation catalogue d'articles...</span>
                    <span>{activeData.progress}% de réussite</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${activeData.progress}%` }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                      <div className="font-semibold text-emerald-400">{activeData.importedCount}</div>
                      <div className="text-[9px] text-slate-500">Produits ajoutés</div>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                      <div className="font-semibold text-sky-400">0</div>
                      <div className="text-[9px] text-slate-500">Erreurs d'unités</div>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                      <div className="font-semibold text-white">PostgreSQL</div>
                      <div className="text-[9px] text-slate-500">Stockage final</div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-emerald-950/20 rounded-xl border border-emerald-500/10 p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] font-mono">
                    <Cpu className="w-3.5 h-3.5 animate-spin" />
                    <span>LIGNES OPTIMISÉES PAR INTELLIGENCE ARTIFICIELLE :</span>
                  </div>
                  <p className="text-slate-300 italic text-[11.5px] font-serif">"{activeData.aiResponse}"</p>
                  <div className="text-[10px] bg-slate-950/80 p-2 rounded border border-slate-900 font-mono text-slate-400">
                    <strong className="text-emerald-500">Conseil d'action :</strong> {activeData.recommendation}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center w-[40%]">
                      <div className="text-[9px] text-slate-500 uppercase">Magasin Antsirabe</div>
                      <div className="text-sm font-mono font-bold text-slate-300">{activeData.sourceStock} kg</div>
                      <span className="text-[9px] text-rose-400 font-mono">-50 kg transférés</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />

                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center w-[40%]">
                      <div className="text-[9px] text-slate-500 uppercase">Magasin Fianarantsoa</div>
                      <div className="text-sm font-mono font-bold text-slate-300">{activeData.destStock} kg</div>
                      <span className="text-[9px] text-emerald-400 font-mono">+50 kg reçus</span>
                    </div>
                  </div>
                  <div className="text-center font-mono text-[9px] bg-emerald-500/10 text-emerald-400 py-1 rounded border border-emerald-500/20">
                    🔒 TRANSACTION ATOMIQUE DRIZZLE EFFECTUÉ EN TOUTE SÉCURITÉ
                  </div>
                </div>
              )}
            </div>

            {/* Bottom mini-metric */}
            <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Database Drizzle Sync</span>
              <span className="text-emerald-400">STATUS: CONNECTED (14ms)</span>
            </div>
          </div>
        );

      case 'recruitment':
        return (
          <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-900 p-4 font-sans text-xs justify-between">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-mono font-semibold text-slate-200">JOBAUTO RECRUIT (100% Stabilité)</span>
              <span className="px-2 py-0.5 bg-brand-green/10 text-brand-green rounded text-[9px] border border-brand-green/20 font-mono">Firebase Online</span>
            </div>

            <div className="flex-1 my-4 flex flex-col justify-center">
              {step === 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Candidats totaux indexés :</span>
                    <strong className="text-brand-green text-base font-mono">{activeData.total} profiles</strong>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-500">Flux de réception récent :</div>
                    {activeData.activeList?.map((cand: string, idx: number) => (
                      <div key={idx} className="bg-slate-900 p-1.5 rounded text-[11px] text-slate-300 border border-slate-900 flex justify-between">
                        <span>👤 {cand}</span>
                        <span className="text-brand-green font-mono text-[10px]">Nouveau</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-slate-400 text-center">Score d'adéquation technique par pertinence :</div>
                  <div className="space-y-2">
                    <div className="bg-slate-900 p-2 rounded-lg border border-brand-green/10">
                      <div className="flex justify-between font-bold text-slate-200">
                        <span>Sarah (React Stack)</span>
                        <span className="text-emerald-400 font-mono">{activeData.scoreSarah} Match</span>
                      </div>
                      <div className="h-1 bg-slate-950 rounded mt-1 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <div className="flex justify-between font-bold text-slate-300">
                        <span>Feno (NestJS Spec)</span>
                        <span className="text-brand-green font-mono">{activeData.scoreFeno} Match</span>
                      </div>
                      <div className="h-1 bg-slate-950 rounded mt-1 overflow-hidden">
                        <div className="h-full bg-brand-green" style={{ width: '89%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-brand-green/10 rounded-xl border border-brand-green/20 p-3 space-y-2 text-center max-w-xs mx-auto">
                  <div className="w-2 h-2 rounded-full bg-brand-green animate-ping inline-block" />
                  <h4 className="font-bold text-slate-200">Synchronisation Firebase Instantanée</h4>
                  <div className="bg-slate-900 p-2 rounded-lg font-mono text-[11px] border border-slate-800 text-left">
                    <div className="text-slate-500">ID: {activeData.id}</div>
                    <div className="text-slate-300">Candidat: <strong>{activeData.name}</strong></div>
                    <div className="text-brand-green font-bold mt-1">Nouveau Statut: {activeData.status}</div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3 text-center">
                  <div className="inline-flex p-2.5 bg-brand-green/10 text-brand-green rounded-full">
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="font-bold text-slate-100">Candidat validé à 100%</h4>
                  <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 border border-slate-800 inline-block">
                    📧 Invitation et tests Laravel envoyés à <strong className="text-brand-green">{activeData.emailSent}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>99.9% Robustesse Service API</span>
              <span>Laravel + Postgres</span>
            </div>
          </div>
        );

      case 'poker':
        return (
          <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-900 p-4 font-sans text-xs justify-between">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-mono font-semibold text-brand-gold">POKER ENGINE CORE</span>
              <span className="text-[10px] text-slate-400 font-mono">Neo4j Graph Database</span>
            </div>

            <div className="flex-1 my-4 flex flex-col justify-center">
              {step === 0 && (
                <div className="text-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <Cpu className="w-10 h-10 text-brand-gold mx-auto animate-spin mb-2" />
                  <span className="text-brand-gold font-mono text-[10px]">INDEPENDANT DB ADAPTER</span>
                  <div className="font-bold text-slate-200 mt-1">Core Architecture Hexagonale</div>
                  <p className="text-[10px] text-slate-500 mt-1">Domaine isolé des bases SQL/NoSQL et REST.</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-slate-400 text-center">Réseau d'interactions de Table (Graph Nodes):</div>
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center font-bold text-[10px] text-brand-gold shadow-md shadow-brand-gold/15">
                      Joueur
                    </div>
                    <div className="h-0.5 w-8 bg-dashed bg-brand-gold/40" />
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-bold text-[10px] text-emerald-200 shadow-md shadow-emerald-500/15">
                      Table_05
                    </div>
                    <div className="h-0.5 w-8 bg-dashed bg-brand-gold/40" />
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center font-bold text-[10px] text-brand-gold shadow-md shadow-brand-gold/15">
                      Joueur_2
                    </div>
                  </div>
                  <div className="text-center font-mono text-[9px] text-slate-500">
                    Calcul instantané des chemins Neo4j ({activeData.nodes} nœuds, {activeData.relationships} relations)
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-[#4a3f35]/30 border border-brand-gold/15 rounded-xl p-3 space-y-2">
                  <div className="text-slate-400 font-mono text-[10px]">Analyse Anti-Collusion (Cypher Pattern match):</div>
                  <div className="text-slate-300 bg-slate-900 p-2 rounded text-[11px] border border-slate-850 font-mono">
                    🚨 <strong className="text-brand-gold">{activeData.detectedAllies}</strong>
                  </div>
                  <p className="text-[9.5px] text-slate-500 italic">"Repérage instantané des relations suspectes de jeu via la vitesse computationnelle des graphes."</p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3 text-center">
                  <div className="bg-slate-900 border border-brand-gold/20 rounded-xl p-3 inline-block">
                    <span className="text-[10px] font-mono p-1 bg-brand-gold/10 text-brand-gold rounded">FAST API (8ms Latency)</span>
                    <div className="font-bold text-slate-200 mt-2">Dépôt min: {activeData.minBuyIn} | Cave: {activeData.currentBlind}</div>
                    <div className="text-[11px] font-bold text-emerald-400 mt-1">Status: JEU DÉMARRÉ EN DIRECT</div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between font-mono text-[9px] text-slate-500">
              <span>Domain-Driven Design (DDD)</span>
              <span>Matchmaking performant</span>
            </div>
          </div>
        );

      case 'reporting':
        return (
          <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-900 p-4 font-sans text-xs justify-between">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-mono font-semibold text-brand-green">ECOFISH ADMIN DASHBOARD</span>
              <span className="font-mono text-[10px] text-brand-green">Rôle: {activeData.currentRole}</span>
            </div>

            <div className="flex-1 my-4 flex flex-col justify-center">
              {step === 0 && (
                <div className="space-y-2 text-center max-w-sm mx-auto">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-full inline-block animate-pulse">
                    <LayoutGrid className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-100">Interface Angular Propre & Modulaire</h4>
                  <p className="text-[10px] text-slate-500">L'application s'axe sur une division par widgets métier isolés pour limiter les effets de bord.</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Thème : <strong className="text-slate-200">{activeData.activeModule}</strong></span>
                    <span className="text-brand-green font-mono font-semibold">{activeData.spentRatio} Utilisé</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded overflow-hidden">
                    <div className="h-full bg-brand-green" style={{ width: '74%' }} />
                  </div>
                  <div className="text-center text-slate-300 font-mono text-[11px]">
                    Budget total : <span className="font-bold text-slate-100">{activeData.totalBudget}</span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>Création du flux PDFKit...</span>
                    <span>{activeData.progress}% complété</span>
                  </div>
                  <div className="h-1 w-full bg-slate-900 rounded overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-pulse" style={{ width: `${activeData.progress}%` }} />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded border border-slate-850 text-[10px] font-mono text-slate-300">
                    <FileText className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Calcul des graphiques budgétaires vectoriels à inclure</span>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2 text-center">
                  <div className="p-2 bg-[#596a5d]/10 text-brand-green border border-brand-green/20 rounded inline-block">
                    ✓ RAPPORT EXPÉDIÉ & CONVENU
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px] inline-block font-mono text-slate-300">
                    📄 Descendre: <strong className="text-brand-green underline cursor-pointer">{activeData.fileName}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between font-mono text-[9px] text-slate-500">
              <span>MariaDB + NestJS Stream</span>
              <span>Automatisation des audits</span>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-900 p-4 font-sans text-xs justify-between">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-mono font-semibold text-amber-500">SPRING BOOT CORE BACKEND</span>
              <span className="text-[10px] font-mono text-amber-500">Profile: {activeData.activeProfile}</span>
            </div>

            <div className="flex-1 my-4 flex flex-col justify-center">
              {step === 0 && (
                <div className="font-mono bg-slate-900 p-3 rounded-lg border border-slate-850 text-[10.5px] text-slate-400 leading-tight">
                  <div className="text-amber-500">Java Virtual Machine Online</div>
                  <div>Starting service context...</div>
                  <div>Hikari Pool Connections: <span className="text-emerald-400">{activeData.poolSize} Availables</span></div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <Database className="w-8 h-8 text-amber-500 mx-auto animate-bounce mb-1" />
                  <div className="text-slate-300 font-bold text-[11px]">Hibernate JPA Engine</div>
                  <div className="font-mono text-[10px] text-amber-400">{activeData.startupsLoaded} startups synchronisées</div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2 bg-slate-900 p-3 rounded-lg border border-amber-500/15">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SWAGGER DOCS OPENAPI GENERATED</span>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">"Tous les endpoints REST du contrôleur sont inspectables avec documentation automatique des formats JSON."</p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2 text-center bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Requête CRUD de création réussie :</div>
                  <div className="font-mono text-xs text-emerald-400 font-semibold">STATUS {activeData.responseStatus} CREATED</div>
                  <div className="text-[11px] text-slate-300">Startup : <strong className="text-white">{activeData.insertedName}</strong></div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between font-mono text-[9px] text-slate-500">
              <span>Java 17 + Spring Data JPA</span>
              <span>100% de conformité REST</span>
            </div>
          </div>
        );

      case 'ecommerce':
        return (
          <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-900 p-4 font-sans text-xs justify-between">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-mono font-semibold text-brand-gold">AZ+ SUPER APPLICATION</span>
              <span className="text-[10px] text-slate-400 font-mono">{activeData.device || 'Responsive'}</span>
            </div>

            <div className="flex-1 my-4 flex flex-col justify-center">
              {step === 0 && (
                <div className="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                  <Laptop className="w-10 h-10 text-brand-gold mx-auto animate-pulse mb-1" />
                  <div className="font-bold text-slate-200 text-[11.5px]">Angular Architecture Modulaire</div>
                  <p className="text-[10px] text-slate-500">Garantie d'absence de régression grâce au chargement différé (Lazy Loading) des routes e-commerce.</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <ShoppingBag className="w-8 h-8 text-brand-gold mx-auto animate-bounce mb-1" />
                  <div className="text-slate-200 font-bold">Catalogue d'articles</div>
                  <p className="text-[10px] font-mono text-brand-gold">Abonnement RxJS actif : {activeData.availableProducts} articles</p>
                </div>
              )}

              {step === 2 && (
                <div className="bg-slate-900 border border-brand-gold/15 rounded-xl p-3 space-y-2 text-center">
                  <div className="text-slate-400 font-mono text-[10px]">BehaviorSubject Panier Réactif :</div>
                  <div className="text-sm font-bold text-slate-200">{activeData.lastAdded}</div>
                  <div className="flex justify-around text-[10px] font-mono text-brand-gold/80">
                    <span>Quantité : {activeData.cartItems}</span>
                    <span>Total : {activeData.currentTotal}</span>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-2">
                  <div className="p-1 px-3 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded inline-block text-[11px] font-bold">
                    ✓ VALIDE : COMMANDE TRANCHÉE
                  </div>
                  <div className="text-[11.5px] text-slate-300 font-mono">
                    Montant de la facture : <strong>{activeData.totalPaid}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between font-mono text-[9px] text-slate-500">
              <span>RxJS State Management</span>
              <span>Bootstrap Responsive Grid</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (viewMode === 'video') {
    return (
      <div className={`bg-[#0f1115] border border-slate-800/40 rounded-2xl overflow-hidden shadow-2xl relative w-full group/player flex flex-col justify-center items-center ${
        demoType === 'mlgcow' ? 'h-[500px] sm:h-[600px] md:h-[700px]' : 'h-[260px] sm:h-[340px] md:h-[400px]'
      }`}>
        {/* Actual Video Tag */}
        <video
          ref={videoRef}
          src={videoUrl || undefined}
          onTimeUpdate={handleTimeUpdate}
          onClick={toggleVideoPlay}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          onError={(e) => {
            console.error("Video play error:", e);
          }}
          className={`w-full h-full cursor-pointer rounded-2xl ${demoType === 'mlgcow' ? 'object-contain' : 'object-cover'}`}
          autoPlay
          loop
          muted={videoMuted}
          playsInline
        />

        {/* Custom controls overlay bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0f1115]/95 backdrop-blur-md p-3 flex items-center justify-between gap-4 border-t border-slate-800/30 z-10 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2.5 shrink-0">
            <button 
              onClick={toggleVideoPlay} 
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {videoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <button 
              onClick={toggleVideoMute} 
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Progress slider bar */}
          <input 
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={videoProgress}
            onChange={handleProgressChange}
            className="flex-1 accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer outline-none"
          />

          <div className="text-[10.5px] text-slate-400 font-mono select-none shrink-0 pr-1">
            {videoRef.current ? (
              `${formatTime(videoRef.current.currentTime)} / ${formatTime(videoRef.current.duration || 0)}`
            ) : (
              '--:--'
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[420px] md:h-[320px]">
      {/* Visual Screen Container (left side) */}
      <div className="flex-1 bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-800 relative flex flex-col justify-between overflow-hidden">
        {/* Browser Mock Tab Indicator */}
        <div className="absolute top-2 left-4 flex gap-1 items-center z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
        </div>

        {/* Navigation Selector */}
        <div className="absolute top-2 right-4 flex items-center bg-slate-900 border border-slate-800/60 rounded-lg p-0.5 text-[9px] font-mono z-20 shadow-lg">
          <button
            onClick={() => setViewMode('simulation')}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              viewMode === 'simulation'
                ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💻 Simulateur
          </button>
          <button
            onClick={() => setViewMode('video')}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              viewMode === 'video'
                ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎥 Vidéo Démo
          </button>
        </div>

        {/* Content Panel */}
        <div className="mt-5 flex-1 h-full flex flex-col justify-center">
          {viewMode === 'simulation' ? (
            renderVisualSimulation()
          ) : (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full h-full rounded-xl flex flex-col justify-between overflow-hidden relative border transition-all duration-300 ${
                !videoUrl 
                  ? isDragging 
                    ? 'border-emerald-400 bg-emerald-950/20' 
                    : 'border-dashed border-slate-800 bg-slate-900/40 hover:border-slate-700' 
                  : 'border-slate-850 bg-transparent'
              }`}
            >
              {!videoUrl ? (
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="video/*" 
                    className="hidden" 
                  />
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-3 shadow-md animate-pulse">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-slate-200 font-bold text-xs sm:text-sm mb-1">Démonstration vidéo du projet</h4>
                  <p className="text-slate-400 text-[10.5px] max-w-xs leading-normal">
                    Faites glisser et déposez la vidéo enregistrée de l'application ici pour la lire directement dans ce cadre, ou cliquez pour parcourir.
                  </p>
                  <button className="mt-4 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg text-caption font-semibold font-sans transition-all cursor-pointer shadow-sm active:scale-95">
                    Sélectionner la vidéo
                  </button>
                </div>
              ) : (
                <div className="relative flex-1 group/player flex flex-col justify-between bg-transparent">
                  {/* Actual Video Tag */}
                  <video
                    ref={videoRef}
                    src={videoUrl || undefined}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={toggleVideoPlay}
                    onPlay={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                    onError={(e) => {
                      console.error("Video play error:", e);
                    }}
                    className={`w-full h-full rounded-xl cursor-pointer ${demoType === 'mlgcow' ? 'object-contain' : 'object-cover'}`}
                    autoPlay
                    loop
                    muted={videoMuted}
                    playsInline
                  />

                  {/* Custom controls overlay bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md p-2 flex items-center justify-between gap-3 border-t border-slate-800/50 z-10 opacity-90 group-hover/player:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={toggleVideoPlay} 
                        className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
                      >
                        {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      
                      <button 
                        onClick={toggleVideoMute} 
                        className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
                      >
                        {videoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Progress slider bar */}
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={videoProgress}
                      onChange={handleProgressChange}
                      className="flex-1 accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer outline-none"
                    />

                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        onClick={() => {
                          if (fileInputRef.current) fileInputRef.current.click();
                        }}
                        className="text-[9.5px] px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition font-mono cursor-pointer"
                        title="Changer de vidéo"
                      >
                        Importer
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="video/*" 
                        className="hidden" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Control panel & Side log or Play list (right side) */}
      <div className="w-full md:w-[280px] bg-slate-900 flex flex-col h-[160px] md:h-full">
        {viewMode === 'simulation' ? (
          <>
            {/* Terminal Tab Bar */}
            <div className="bg-slate-950 border-b border-slate-800 p-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Logs console</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] px-1 py-0.2 bg-slate-900 border border-slate-800 rounded font-mono text-slate-500">
                  STEP {step + 1}/4
                </span>
              </div>
            </div>

            {/* Scrollable logs */}
            <div className="flex-1 overflow-y-auto p-3 font-mono text-[9.5px] leading-relaxed text-slate-400 select-none bg-slate-950/80">
              {logs.map((log, index) => (
                <div key={index} className="mb-1 text-slate-300">
                  <span className="text-slate-600 font-mono">{log.split(' ')[0]}</span>{' '}
                  <span className="text-emerald-400">ange$</span>{' '}
                  <span className="text-slate-100">{log.slice(log.indexOf(']') + 2)}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Console Controls */}
            <div className="bg-slate-950 border-t border-slate-800 p-2 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <button
                  onClick={togglePlay}
                  className={`p-1.5 rounded hover:bg-slate-800 transition ${isPlaying ? 'text-amber-400' : 'text-emerald-400'}`}
                  title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[9.5px] text-slate-500 font-mono">
                {isPlaying ? 'Looping sequences...' : 'Simulation paused'}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800/40">
            {/* Playlist Highlights Header */}
            <div className="bg-slate-950 border-b border-slate-850 p-2.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wide text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Moments clés du projet</span>
              </div>
              <span className="text-[8.5px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-mono">
                Interactif
              </span>
            </div>

            {/* Timestamps list panel */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 bg-slate-900/40 scrollbar-thin">
              {demoType === 'erp' ? (
                <>
                  <p className="text-[9.5px] text-slate-500 font-mono px-1 mb-2">
                    💡 Cliquez sur une étape pour caler la vidéo à cet instant précis :
                  </p>
                  {erpTimestamps.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => jumpToTime(item.seconds)}
                      className="w-full text-left p-2 rounded-lg bg-slate-900 border border-slate-850 hover:bg-emerald-950/30 hover:border-emerald-500/30 text-slate-300 hover:text-white transition-all group flex items-start gap-2 cursor-pointer text-[10.5px]"
                    >
                      <span className="font-mono text-[9px] px-1 py-0.2 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-bold shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                        {item.time}
                      </span>
                      <div className="flex-1 truncate">
                        <div className="font-sans font-medium text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                          {item.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center text-slate-500 font-sans">
                  <FileVideo className="w-8 h-8 text-slate-700 mb-2" />
                  <p className="text-[10px] leading-relaxed max-w-[200px]">
                    Index indisponible. Utilisez les contrôles de la vidéo pour naviguer.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-950 p-2 text-center border-t border-slate-850 text-[9px] font-mono text-slate-600">
              {videoUrl ? 'Fichier vidéo connecté' : 'Aucun fichier vidéo chargé'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
