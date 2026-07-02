import { Project, Experience, SkillCategory, PersonalSkill, Certification, Creation } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React.js', 'Angular', 'Ionic', 'TailwindCSS', 'Bootstrap', 'HTML5/CSS3', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend & API',
    skills: ['Node.js', 'NestJS', 'Express.js', 'Laravel', 'Java', 'Spring Boot', 'API REST', 'Microservices'],
  },
  {
    title: 'Bases de données',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j (Graphes)', 'MariaDB', 'Drizzle ORM', 'Better Auth'],
  },
  {
    title: 'Outils & Environnement',
    skills: ['Git', 'GitLab', 'Postman', 'Swagger', 'Figma', 'Trello', 'Docker', 'Vite', 'npm/pnpm'],
  },
  {
    title: 'Architectures & Méthodes',
    skills: ['Architecture Hexagonale', 'Architecture 3-tiers', 'DDD (Domain-Driven)', 'Agile Scrum', 'UML', 'Merise'],
  },
];

export const PERSONAL_SKILLS: PersonalSkill[] = [
  { name: 'Résolution de problèmes', percentage: 95, description: "J'aime analyser les problèmes jusqu'à trouver une solution durable." },
  { name: 'Empathie utilisateur', percentage: 90, description: "Je prends le temps de comprendre les besoins des utilisateurs avant de proposer une solution." },
  { name: 'Force de proposition', percentage: 88, description: "Je n'hésite pas à partager mes idées lorsque je vois une possibilité d'amélioration." },
  { name: 'Travail en équipe', percentage: 92, description: 'Coopération fluide en méthodologie Agile avec clients et développeurs.' },
  { name: 'Adaptabilité', percentage: 95, description: "J'apprends rapidement de nouveaux outils et technologies lorsque le projet le demande." },
];

export const LANGUAGES = [
  { name: 'Malagasy', level: 'Langue maternelle' },
  { name: 'Français', level: 'Intermédiaire supérieur (C1/Professionnel)' },
  { name: 'Anglais', level: 'Intermédiaire (B2/Technique)' },
];

export const PROJECTS: Project[] = [
  {
    id: 'mooz-erp',
    title: 'MOOZ (ERP Multi-magasins)',
    subtitle: 'Gestion anti-gaspillage des stocks avec transformation des produits en recettes.',
    company: 'RELIA Consulting',
    role: 'Développeuse Fullstack JavaScript',
    period: 'Février 2026 – Présent',
    stack: ['React.js (Vite)', 'TailwindCSS', 'shadcn/ui', 'NestJS', 'PostgreSQL', 'Drizzle ORM', 'Better Auth', 'Docker', 'Git'],
    description: "Développement de la partie backoffice admin d'un ERP multi-magasins. L'objectif principal est d'éviter le gaspillage des produits en période de péremption en les transformant en recettes.",
    objectives: "Permettre aux gérants de magasins de gérer leurs stocks de manière intelligente, avec une traçabilité complète des mouvements et des indicateurs clairs pour prendre des décisions.",
    keyFeatures: [
      "Gestion des mouvements de stock avec historique détaillé des entrées et sorties, et traçabilité complète des recettes créées à partir de produits en fin de vie.",
      "Tableaux de bord avec KPI clairs pour visualiser en un coup d'œil la performance du magasin (taux de rotation, produits à risque, marges).",
      "Filtres avancés et combinables pour explorer les données et exporter les rapports facilement.",
      "Système d'authentification et de gestion des accès via Better Auth avec contrôle basé sur les rôles (RBAC).",
      "Importation massive des produits du magasin depuis des fichiers Excel ou XML via API, pour une mise en place rapide et scalable.",
      "Gestion des commandes et des livraisons pour suivre le cycle complet des produits."
    ],
    results: "Une meilleure traçabilité des opérations, une réduction du gaspillage alimentaire et une interface moderne avec shadcn/ui qui facilite la prise en main pour les gérants.",
    videoDemoType: 'erp',
    stats: [
      { label: "Efficacité d'import", value: '+300%' },
      { label: 'Calcul de marge', value: 'Temps réel' },
      { label: "Gestion d'accès", value: 'Multi-rôle (RBAC)' }
    ],
    codeFiles: [
      {
        name: 'inventory.service.ts',
        language: 'typescript',
        content: `// NestJS Service checking and transfering items with isolation level
import { Injectable, BadRequestException } from '@nestjs/common';
import { db } from '../db/connection';
import { stocks, stockTransfers } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';

@Injectable()
export class InventoryService {
  async transferStock(productId: string, fromId: string, toId: string, qty: number) {
    return await db.transaction(async (tx) => {
      // 1. Verify availability in source shop
      const sourceStock = await tx.select()
        .from(stocks)
        .where(and(eq(stocks.productId, productId), eq(stocks.shopId, fromId)))
        .limit(1);

      if (!sourceStock.length || sourceStock[0].quantity < qty) {
        throw new BadRequestException("Quantité de stock insuffisante dans le magasin d'origine.");
      }

      // 2. Decrement source inventory
      await tx.update(stocks)
        .set({ quantity: sql\`\${stocks.quantity} - \${qty}\` })
        .where(and(eq(stocks.productId, productId), eq(stocks.shopId, fromId)));

      // 3. Increment destination inventory (upsert pattern)
      await tx.insert(stocks)
        .values({ productId, shopId: toId, quantity: qty })
        .onConflictDoUpdate({
          target: [stocks.productId, stocks.shopId],
          set: { quantity: sql\`\${stocks.quantity} + \${qty}\` }
        });

      // 4. Record transfer log
      const [transfer] = await tx.insert(stockTransfers).values({
        productId,
        sourceShopId: fromId,
        destShopId: toId,
        quantity: qty,
        status: 'COMPLETED'
      }).returning();

      return transfer;
    });
  }
}`
      },
      {
        name: 'useStockTracker.ts',
        language: 'typescript',
        content: `// React Custom Hook using dynamic events for responsive stocks UI
import { useState, useEffect } from 'react';

export function useStockTracker(productId: string, shopId: string) {
  const [stock, setStock] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchStock() {
      try {
        const response = await fetch(\`/api/stocks/product/\${productId}/shop/\${shopId}\`);
        const data = await response.json();
        if (active) {
          setStock(data.quantity);
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur de synchronisation du stock:', err);
      }
    }

    fetchStock();
    // In real app, listen to Server-Sent-Events (SSE) or WebSockets
    return () => { active = false; };
  }, [productId, shopId]);

  return { stock, loading };
}`
      }
    ]
  },
  {
    id: 'job-privee',
    title: 'JobPrivée (Plateforme de recrutement)',
    subtitle: "Application web pour candidats et recruteurs avec paiement Stripe et notifications.",
    company: 'RUEA Consulting – JobPrivée',
    role: 'Développeuse Fullstack',
    period: 'Janvier 2025 – Février 2026',
    stack: ['Angular 18', 'NestJS', 'MariaDB', 'Firebase', 'Stripe', 'GitLab', 'Agile Scrum'],
    description: "Développement d'une plateforme de recrutement connectant candidats et recruteurs. J'ai principalement apporté une refonte du code et amélioré l'expérience utilisateur.",
    objectives: "Simplifier le processus de recrutement avec une interface intuitive, des alertes en temps réel et un système de paiement intégré pour les recruteurs.",
    keyFeatures: [
      "Refonte complète du code pour améliorer la stabilité et la maintenabilité de l'application.",
      "Interface intuitive pour la gestion des candidats avec un tableau de bord clair pour les recruteurs.",
      "Système de paiement Stripe pour les recruteurs souhaitant mettre en avant leurs offres.",
      "Notifications en temps réel et mailing via Firebase pour alerter les candidats des nouvelles offres.",
      "Mise en avant des nouvelles offres pour augmenter leur visibilité.",
      "Gestion complète des profils candidats et recruteurs."
    ],
    results: "Stabilisation technique de l'application avec une progression significative des objectifs métiers et une meilleure expérience utilisateur.",
    videoDemoType: 'recruitment',
    stats: [
      { label: 'Objectifs Métier', value: '80% Progression' },
      { label: 'Framework Client', value: 'Angular 18' },
      { label: 'Stabilité Backend', value: 'Améliorée' }
    ],
    codeFiles: [
      {
        name: 'application.controller.ts',
        language: 'typescript',
        content: `// NestJS Controller managing candidate application status securely
import { Controller, Patch, Param, Body, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationService } from './application.service';

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWING = 'REVIEWING',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED'
}

@Controller('api/v1/applications')
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: { status: ApplicationStatus; notes?: string }
  ) {
    return await this.appService.updateApplicationStatus(id, dto.status, dto.notes);
  }
}`
      }
    ]
  },
  {
    id: 'poker-app',
    title: 'PokerApp (Application de Poker)',
    subtitle: 'Application dédiée au poker avec backend pour mobile et backoffice admin.',
    company: 'Independent Project',
    role: 'Développeuse Fullstack',
    period: 'Décembre 2024 – Février 2025',
    stack: ['NestJS', 'React.js', 'Neo4j', 'Git', 'Agile Scrum'],
    description: "Développement du backend pour l'application mobile et la partie administration. J'ai également travaillé sur le frontend admin et amélioré la vélocité du site.",
    objectives: "Créer une application de poker performante avec un backend solide et une interface d'administration fluide, en réduisant les temps de chargement surtout sur les tableaux de bord.",
    keyFeatures: [
      "Développement du backend NestJS pour alimenter l'application mobile et le backoffice admin.",
      "Développement de la partie frontend admin avec React.js.",
      "Optimisation des performances et amélioration de la vélocité du site, notamment sur les tableaux de bord qui étaient lents.",
      "Architecture hexagonale pour un découplage strict du domaine métier.",
      "Modélisation des relations joueurs, parties et sessions avec Neo4j pour des requêtes rapides."
    ],
    results: "Une nette amélioration des performances du site, des temps de réponse réduits et une interface d'administration plus fluide.",
    videoDemoType: 'poker',
    stats: [
      { label: "Temps API (latence)", value: 'Réduit' },
      { label: 'Découplage code', value: 'Architecture Hexagonale' },
      { label: 'Modèle Graphes', value: 'Neo4j' }
    ],
    codeFiles: [
      {
        name: 'poker.domain.ts',
        language: 'typescript',
        content: `// pure Domain model (driving port / adaptor pattern). Zero frameworks imports here!
export interface TableSession {
  id: string;
  minBuyIn: number;
  playersCount: number;
  maxPlayers: number;
}

export class PokerSessionEngine {
  static canJoinTable(session: TableSession, playerBalance: number): boolean {
    if (session.playersCount >= session.maxPlayers) {
      return false; // Table pleine
    }
    if (playerBalance < session.minBuyIn) {
      return false; // Balance insuffisante
    }
    return true;
  }
}`
      },
      {
        name: 'neo4j-poker.adapter.ts',
        language: 'typescript',
        content: `// NestJS Adapter queries Neo4j relationships dynamically
import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4jPokerAdapter {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findTeammatesAndAllies(playerId: string) {
    const query = \`
      MATCH (p:Player {id: $playerId})-[r:PLAYED_WITH]->(other:Player)
      WITH other, count(r) as gamesCount
      WHERE gamesCount > 5
      RETURN other.name as partnerName, gamesCount
      ORDER BY gamesCount DESC
    \`;
    const res = await this.neo4jService.read(query, { playerId });
    return res.records.map(rec => ({
      name: rec.get('partnerName'),
      totalGames: rec.get('gamesCount').toNumber()
    }));
  }
}`
      }
    ]
  },
  {
    id: 'ecofish',
    title: 'Ecofish (Suivi de Projets Interpays)',
    subtitle: 'Plateforme de gestion de projets marinierces avec gestion des thématiques et RBAC.',
    company: 'RELIA Consulting',
    role: 'Stagiaire Développeuse Fullstack',
    period: 'Janvier 2024 – Novembre 2024',
    stack: ['Angular', 'NestJS', 'MariaDB', 'Git', 'Agile Scrum'],
    description: "Conception et développement d'une plateforme de suivi de projets marinierces entre plusieurs pays. J'ai participé à la conception, au développement et à la gestion des accès.",
    objectives: "Offrir une vision claire des projets marinierces à travers différents pays avec une gestion fine des droits d'accès et des thématiques.",
    keyFeatures: [
      "Conception technique avec diagrammes UML et modélisation de la base de données.",
      "Gestion des thématiques pour organiser les projets par domaines (préservation, pêche durable, etc.).",
      "Gestion des utilisateurs avec contrôle d'accès basé sur les rôles (RBAC) pour différents profils (porteurs de projet, auditeurs, administrateurs).",
      "Gestion complète des projets avec suivi des jalons, budgets et rapports.",
      "Développement complet de la plateforme de bout en bout."
    ],
    results: "Une plateforme simple et efficace, adaptée aux besoins des institutions de financement et des porteurs de projets internationaux.",
    videoDemoType: 'reporting',
    stats: [
      { label: 'Gain temps reporting', value: 'De 10 à 1 jour' },
      { label: 'Fichiers audités', value: 'Exports PDF automatiques' },
      { label: 'Utilisateurs actifs', value: 'Multi-rôles (RBAC)' }
    ],
    codeFiles: [
      {
        name: 'report-generator.service.ts',
        language: 'typescript',
        content: `// NestJS reporting engine generating formatted PDFs with PDFKit
import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

@Injectable()
export class ReportGeneratorService {
  async generateProjectReportPDF(projectInfo: any): Promise<NodeJS.ReadableStream> {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const stream = new PassThrough();
    doc.pipe(stream);

    // Header Design
    doc.fillColor('#10B981').fontSize(24).text('RAPPORT ECOFISH', { align: 'center' });
    doc.moveDown();
    doc.fillColor('#1F2937').fontSize(14).text(\`Projet : \${projectInfo.name}\`);
    doc.text(\`Budget global : \${projectInfo.budget} EUR\`);
    doc.text(\`Statut : \${projectInfo.status}\`);
    doc.moveDown(2);

    // Section outline
    doc.fontSize(16).text('Détails des jalons atteints', { underline: true });
    doc.moveDown();
    projectInfo.milestones.forEach((m: any, idx: number) => {
      doc.fontSize(11).text(\`\${idx + 1}. \${m.title} - [\${m.completed ? 'COMPLET' : 'EN COURS'}]\`);
    });

    doc.end();
    return stream;
  }
}`
      }
    ]
  },
  {
    id: 'mlgcow',
    title: 'MLGCOW (Suivi de Chevptel Bovin Laitier)',
    subtitle: "Application de gestion de troupeau pour augmenter la production laitière.",
    company: 'Projet Personnel',
    role: 'Développeuse Fullstack',
    period: 'Août 2021 – Décembre 2021',
    stack: ['Angular', 'Ionic', 'Firebase', 'GitHub', 'Android'],
    description: "Projet personnel pour gérer un cheptel de vaches laitières avec pour objectif d'augmenter la production laitière grâce à un meilleur suivi et une digitalisation des données.",
    objectives: "Digitaliser la gestion des troupeaux, suivre l'évolution de la production laitière, gérer les événements à venir via des notifications et prédire la production annuelle.",
    keyFeatures: [
      "Suivi individuel des vaches avec historique de production laitière.",
      "Digitalisation des documents d'élevage et des fiches médicales.",
      "Planification des traitements vétérinaires avec notifications de rappel.",
      "Suivi de l'évolution de la production laitière dans le temps.",
      "Prédiction de la production laitière annuelle pour anticiper les besoins."
    ],
    results: "Un suivi rigoureux du troupeau avec une réduction des pertes d'informations et une meilleure gestion de la production laitière.",
    videoDemoType: 'mlgcow',
    stats: [
      { label: 'Suivi individuel', value: '100% Digital' },
      { label: 'Perte de données', value: 'Proche de 0%' },
      { label: 'Accompagnement', value: 'Projet Personnel' }
    ],
    codeFiles: [
      {
        name: 'cow-tracker.page.ts',
        language: 'typescript',
        content: `// Ionic/Angular Page tracking individual cows in real-time from Firestore
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cow-tracker',
  templateUrl: './cow-tracker.page.html',
  styleUrls: ['./cow-tracker.page.scss'],
})
export class CowTrackerPage implements OnInit {
  cows$: any;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.cows$ = this.firestore.collection('cows', ref => 
      ref.where('status', '==', 'LACTATING').orderBy('nextCheckup', 'asc')
    ).valueChanges({ idField: 'id' });
  }

  async updateLactationYield(cowId: string, liters: number) {
    await this.firestore.collection('cows').doc(cowId).collection('yields').add({
      timestamp: new Date(),
      recordedBy: 'Liantsoa Ange',
      quantityLiters: liters
    });
  }
}`
      }
    ]
  },
  {
    id: 'etafa-project',
    title: 'eTAFA (Plateforme de Mentoring)',
    subtitle: 'Plateforme de mentoring reliant mentors et mentorés dans un objectif de formation.',
    company: 'eTAFA Mentoring',
    role: 'Développeuse Backend NestJS',
    period: 'Janvier 2024 – Mai 2024',
    stack: ['NestJS', 'MongoDB', 'GitLab', 'Swagger', 'Node.js'],
    description: "Développement des APIs backend pour une plateforme de mentoring utilisée à Madagascar pour connecter mentors et mentorés.",
    objectives: "Fournir des APIs REST sécurisées et documentées pour permettre la mise en relation entre mentors et mentorés dans un cadre de formation.",
    keyFeatures: [
      "Développement d'APIs REST avec NestJS pour la gestion des mises en relation.",
      "Gestion et modélisation de bases de données NoSQL MongoDB.",
      "Documentation complète des endpoints via Swagger OpenAPI.",
      "Système d'authentification sécurisé."
    ],
    results: "Mise à disposition d'APIs stables et documentées, facilitant l'intégration avec le frontend et l'onboarding des utilisateurs.",
    videoDemoType: 'etafa',
    stats: [
      { label: 'Routes API', value: '100% Documentées' },
      { label: 'Intégration', value: 'Swagger Complet' },
      { label: 'Modèle Base', value: 'MongoDB NoSQL' }
    ],
    codeFiles: [
      {
        name: 'mentoring.controller.ts',
        language: 'typescript',
        content: `// NestJS controller exposing OpenAPI / Swagger annotations for mentoring matchings
import { Controller, Post, Body, Get, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MentoringService } from './mentoring.service';

@ApiTags('Mentoring matches')
@Controller('api/v1/mentoring')
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  @Post('match')
  @ApiOperation({ summary: 'Create a mentor-mentee relationship link' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Matching successfully created.' })
  async createMatch(@Body() matchDto: { mentorId: string; menteeId: string; programId: string }) {
    return this.mentoringService.connect(
      matchDto.mentorId, 
      matchDto.menteeId, 
      matchDto.programId
    );
  }

  @Get('mentee/:id/active-mentor')
  @ApiOperation({ summary: 'Get current active mentor for a mentee' })
  async getActiveMentor(@Param('id') menteeId: string) {
    return this.mentoringService.findActiveMentorForMentee(menteeId);
  }
}`
      }
    ]
  },
  {
    id: 'super-app-az',
    title: 'Super App AZ+ (Plateforme Microservices)',
    subtitle: 'Plateforme microservices rassemblant tous les commerces avec intégration Figma.',
    company: 'RELIA Consulting',
    role: 'Développeuse Frontend Angular',
    period: 'Septembre 2022 – Janvier 2023',
    stack: ['Angular', 'Bootstrap', 'Git', 'Architecture Microservices'],
    description: "Intégration du site web d'une plateforme microservices qui rassemble tous les commerces, en suivant les maquettes Figma.",
    objectives: "Transformer les maquettes Figma en une interface web fonctionnelle et responsive, intégrée à une architecture microservices.",
    keyFeatures: [
      "Intégration des maquettes Figma en code Angular.",
      "Architecture modulaire avec Lazy Loading pour optimiser les performances.",
      "Design responsive adapté à tous les formats d'écran.",
      "Collaboration avec l'équipe backend pour définir les contrats d'API."
    ],
    results: "Interface livrée en production, fidèle aux maquettes et offrant une expérience utilisateur fluide.",
    videoDemoType: 'ecommerce',
    stats: [
      { label: 'Taux de Conversion', value: '+18%' },
      { label: 'Lazy Loading', value: 'Actif (-40% poids)' },
      { label: 'Responsive Design', value: 'Bootstrap' }
    ],
    codeFiles: [
      {
        name: 'cart.service.ts',
        language: 'typescript',
        content: `// Angular e-Commerce Cart service utilizing reactive RxJS state manager
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  totalPrice$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0))
  );

  addItem(item: CartItem): void {
    const current = [...this.cartItemsSubject.value];
    const existing = current.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      current.push(item);
    }
    this.cartItemsSubject.next(current);
  }

  getQuantityCount(): number {
    return this.cartItemsSubject.value.reduce((acc, curr) => acc + curr.quantity, 0);
  }
}`
      }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'RELIA Consulting',
    role: 'Développeuse Fullstack JavaScript',
    period: 'Février 2026 – Présent',
    project: 'MOOZ (ERP multi-magasins)',
    stack: ['React.js (Vite)', 'TailwindCSS', 'shadcn/ui', 'NestJS', 'PostgreSQL', 'Drizzle ORM', 'Better Auth', 'Docker', 'Git'],
    description: [
      'Développement de la partie backoffice admin d’un ERP multi-magasins avec React.js et shadcn/ui.',
      "Objectif anti-gaspillage : transformer les produits en fin de péremption en recettes pour éviter le gaspillage.",
      "Gestion des mouvements de stock avec historique des entrées/sorties et traçabilité des recettes.",
      "Tableaux de bord avec KPI clairs et filtres avancés combinables pour l'exploration des données.",
      "Importation scalable des produits via Excel/XML et gestion des commandes et livraisons.",
      "Authentification et gestion des accès avec Better Auth (RBAC)."
    ],
    tags: ['React', 'shadcn/ui', 'NestJS', 'Drizzle ORM', 'Better Auth', 'RBAC'],
    result: "Une meilleure traçabilité des opérations, une réduction du gaspillage et une interface moderne appréciée des gérants."
  },
  {
    id: 'exp-visuelle',
    company: 'Association MATOKISA',
    role: 'Création graphique & Communication visuelle',
    period: '2025 – Présent',
    stack: ['Figma', 'Illustrator', 'Design d\'Interfaces', 'Identité Visuelle'],
    description: [
      'Création du logo, du web design et de la charte graphique officielle de l\'association MATOKISA.',
      "Conception d'interfaces utilisateur (UI) intuitives et de supports graphiques digitaux pour la promotion des activités."
    ],
    tags: ['UI/UX Design', 'Branding', 'Figma'],
    result: "Identité de marque forte et interfaces modernes, facilitant l'engagement et la levée de fonds pour l'association."
  },
  {
    id: 'exp2',
    company: 'RUEA Consulting – JobPrivée',
    role: 'Développeuse Fullstack',
    period: 'Janvier 2025 – Février 2026',
    stack: ['Angular 18', 'NestJS', 'MariaDB', 'Firebase', 'Stripe', 'GitLab', 'Agile Scrum'],
    description: [
      "Développement d'une plateforme de recrutement connectant candidats et recruteurs.",
      "Refonte du code pour améliorer la stabilité et la maintenabilité de l'application.",
      "Interface intuitive pour la gestion des candidats avec tableau de bord clair.",
      "Système de paiement Stripe pour la mise en avant des offres.",
      "Notifications et mailing via Firebase pour alerter les candidats des nouvelles offres.",
      "Mise en avant des offres récentes pour augmenter leur visibilité."
    ],
    tags: ['Angular 18', 'NestJS', 'MariaDB', 'Firebase', 'Stripe'],
    result: "Stabilisation technique complète et meilleure expérience utilisateur avec des alertes en temps réel."
  },
  {
    id: 'exp3',
    company: 'Incuboost',
    role: 'Développeuse Backend Spring Boot',
    period: 'Décembre 2025',
    stack: ['Spring Boot', 'PostgreSQL', 'Swagger', 'Git', 'Agile Scrum'],
    description: [
      'Développement d’API REST avec Spring Boot pour la gestion d’opérations CRUD.',
      'Conception et intégration des endpoints backend connectés à PostgreSQL.',
      'Documentation et tests unitaires des API via Swagger.'
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'Java', 'Swagger'],
    result: "Adaptation rapide à l'environnement technique et contribution utile aux livrables."
  },
  {
    id: 'exp4',
    company: 'PokerApp',
    role: 'Développeuse Fullstack',
    period: 'Décembre 2024 – Février 2025',
    stack: ['NestJS', 'React.js', 'Neo4j', 'Git', 'Agile Scrum'],
    description: [
      "Développement du backend pour l'application mobile et le backoffice admin.",
      "Développement de la partie frontend admin avec React.js.",
      "Optimisation des performances du site, notamment sur les tableaux de bord.",
      "Architecture hexagonale pour un découplage strict du domaine métier."
    ],
    tags: ['NestJS', 'Neo4j', 'Architecture Hexagonale', 'React'],
    result: "Amélioration des performances et réduction des temps de chargement des tableaux de bord."
  },
  {
    id: 'exp6',
    company: 'eTAFA Mentoring',
    role: 'Développeuse Backend NestJS',
    isInternship: true,
    period: 'Janvier 2024 – Mai 2024',
    stack: ['NestJS', 'MongoDB', 'GitLab', 'Swagger', 'Node.js'],
    description: [
      "Développement des APIs backend pour une plateforme de mentoring utilisée à Madagascar.",
      "Gestion et modélisation de bases de données NoSQL MongoDB.",
      "Documentation de l’intégralité des endpoints via Swagger OpenAPI."
    ],
    tags: ['NestJS', 'MongoDB', 'Swagger', 'Stage'],
    result: "APIs stables et documentées, facilitant l'intégration avec le frontend."
  },
  {
    id: 'exp5',
    company: 'RELIA Consulting',
    role: 'Stagiaire Développeuse Fullstack',
    isInternship: true,
    period: 'Juillet 2024 – Novembre 2024',
    project: 'Projet Ecofish – Plateforme de suivi de projets marinierces',
    stack: ['Angular', 'NestJS', 'MariaDB', 'GitLab', 'Agile Scrum'],
    description: [
      "Conception et développement d'une plateforme de suivi de projets marinierces entre plusieurs pays.",
      "Gestion des thématiques pour organiser les projets par domaines.",
      "Gestion des utilisateurs avec contrôle d'accès basé sur les rôles (RBAC).",
      "Gestion complète des projets avec suivi des jalons, budgets et rapports."
    ],
    tags: ['Angular', 'NestJS', 'UML', 'MariaDB', 'RBAC'],
    result: 'Plateforme simple, efficace et évolutive, adaptée aux besoins des institutions de financement.'
  },
  {
    id: 'exp-ranosoa',
    company: 'Projet R.A.N.O.S.O.A',
    role: 'Accompagnatrice & Formatrice de projet PV',
    period: '2023',
    stack: ['Coordination', 'Énergie Solaire', 'Relations Internationales'],
    description: [
      "Coordination globale et accompagnement académique des étudiants de l'Université de Sherbrooke (Canada).",
      "Encadrement des travaux pratiques lors de l'école d'été PV FIANARA 2023 pour le déploiement de pompes solaires."
    ],
    tags: ['Coordination', 'Encadrement', 'Solaire PV', 'International'],
    links: [
      { label: 'Projet Ranosoa', url: 'https://fianaralab.fr/ranosoa.html' },
      { label: 'GCIUS Sherbrooke', url: 'https://www.gcius.ca/%C3%A9dition/madagascar-2023' }
    ],
    result: "Coopération internationale réussie et accompagnement d'étudiants ingénieurs canadiens."
  },
  {
    id: 'exp7',
    company: 'Super App AZ+ (Plateforme Microservices)',
    role: 'Développeuse Frontend Angular',
    period: 'Septembre 2022 – Janvier 2023',
    stack: ['Angular', 'Bootstrap', 'Git', 'Architecture Microservices'],
    description: [
      "Intégration du site web d'une plateforme microservices rassemblant tous les commerces.",
      "Transformation des maquettes Figma en code Angular.",
      "Architecture modulaire avec Lazy Loading pour optimiser les performances.",
      "Design responsive adapté à tous les formats d'écran."
    ],
    tags: ['Angular', 'Bootstrap', 'Microservices', 'Figma'],
    result: 'Interface fidèle aux maquettes, livrée en production avec une bonne expérience utilisateur.'
  },
  {
    id: 'exp-mlgcow',
    company: 'MLGCOW',
    role: 'Développeuse Fullstack (Projet Personnel)',
    period: 'Août 2021 – Décembre 2021',
    stack: ['Angular', 'Ionic', 'Firebase', 'GitHub', 'Android'],
    description: [
      "Projet personnel pour gérer un cheptel de vaches laitières.",
      "Objectif : augmenter la production laitière grâce à un meilleur suivi et une digitalisation des données.",
      "Suivi de l'évolution de la production laitière par animal.",
      "Planification des traitements vétérinaires avec notifications.",
      "Prédiction de la production laitière annuelle."
    ],
    tags: ['Angular', 'Ionic', 'Firebase', 'Projet Personnel'],
    result: "Digitalisation complète de la gestion du troupeau avec réduction des pertes d'informations."
  },
  {
    id: 'exp-draep',
    company: 'DRAEP – Zone Haute Mahatsiatra',
    role: 'Développeuse Stagiaire',
    isInternship: true,
    period: 'Mars 2019 – Mai 2019',
    stack: ['CodeIgniter', 'MySQL', 'PHP', 'HTML5/CSS3'],
    description: [
      "Dynamisation d'un fichier Excel en une application web pour gérer les infrastructures et données des projets hydrauliques de la zone Haute Mahatsiatra, Fianarantsoa.",
      "Importation et exportation des données via Excel.",
      "Création de modules d'édition automatique de rapports PDF administratifs."
    ],
    tags: ['CodeIgniter', 'MySQL', 'PHP', 'Stage'],
    result: "Digitalisation des données papier et automatisation des rapports administratifs."
  }
];

export const EDUCATION = [
  {
    diploma: 'Master Informatique – Génie logiciel et bases de données',
    school: 'Université de Fianarantsoa (ENI)',
    period: 'Nov. 2023 – Déc. 2024',
    details: 'Formation approfondie en modélisation avancée (UML, Merise), SGBD relationnels, SQL & NoSQL, et conception de systèmes.'
  },
  {
    diploma: 'Licence Professionnelle Informatique – Génie logiciel et bases de données',
    school: 'Université de Fianarantsoa (ENI)',
    period: 'Nov. 2015 – Déc. 2018',
    details: 'Développement d’applications, programmation objet (Java, PHP, JS/TS), algos avancés et structuration de bases de données.'
  },
  {
    diploma: 'Licence en Agronomie – Élevage',
    school: 'Institut Technique Supérieur Agricole (ITSA)',
    period: 'Nov. 2018 – Oct. 2019',
    details: 'Rigueur et esprit scientifique, modélisation systémique et méthode de résolution de problèmes.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert1',
    title: 'Attestation de Stage',
    issuer: 'RELIA Consulting',
    date: '2026',
    imageUrl: 'https://i.postimg.cc/T3ks1SBG/certificatstage.jpg',
    pdfUrl: 'https://i.postimg.cc/T3ks1SBG/certificatstage.jpg'
  },
  {
    id: 'cert2',
    title: 'Digital Marketing',
    issuer: 'UniAthena',
    date: '2023',
    imageUrl: 'https://i.postimg.cc/nL8KcGTN/uniathena.png',
    pdfUrl: 'https://i.postimg.cc/nL8KcGTN/uniathena.png'
  },
  {
    id: 'cert3',
    title: 'Master 2 ENI',
    issuer: 'Génie Logiciel',
    date: '2024',
    imageUrl: 'https://i.postimg.cc/hGzwx6Rx/eni.jpg',
    pdfUrl: 'https://i.postimg.cc/hGzwx6Rx/eni.jpg'
  },
  {
    id: 'cert4',
    title: 'Licence Agronomie',
    issuer: 'Institut Supérieur Agricole',
    date: '2018',
    imageUrl: 'https://i.postimg.cc/DfXvFpSx/agro.png',
    pdfUrl: 'https://i.postimg.cc/DfXvFpSx/agro.png'
  },
  {
    id: 'cert5',
    title: 'Intelligence Émotionnelle',
    issuer: 'Cegos',
    date: '2023',
    imageUrl: 'https://i.postimg.cc/rsXLKcdp/emotional-management.png',
    pdfUrl: 'https://i.postimg.cc/rsXLKcdp/emotional-management.png'
  },
  {
    id: 'cert6',
    title: 'Leadership',
    issuer: 'Grovo',
    date: '2023',
    imageUrl: 'https://i.postimg.cc/8zPgFZCB/leadership.jpg',
    pdfUrl: 'https://i.postimg.cc/8zPgFZCB/leadership.jpg'
  },
  {
    id: 'cert7',
    title: 'Expertise Canva',
    issuer: 'Design Visuel',
    date: '2024',
    imageUrl: 'https://i.postimg.cc/ncp653Bw/web-canva.png',
    pdfUrl: 'https://i.postimg.cc/ncp653Bw/web-canva.png'
  },
  {
    id: 'cert8',
    title: 'Maîtrise Outlook',
    issuer: 'Productivité',
    date: '2024',
    imageUrl: 'https://i.postimg.cc/8cBxcvQC/outlook.png',
    pdfUrl: 'https://i.postimg.cc/8cBxcvQC/outlook.png'
  }
];

export const CREATIONS: Creation[] = [
  {
    id: 'create1',
    title: 'Billet de Levée de Fonds',
    description: "Billet réalisé pour soutenir une opération de levée de fonds organisée par l'association MATOKISA.",
    category: 'Communication',
    tags: ['CANVA', 'SOLIDARITÉ', 'PRINT'],
    imageUrl: 'https://i.postimg.cc/hGPmGZTx/billet-d-invitation.png'
  },
  {
    id: 'create2',
    title: 'Logo Association MATOKISA',
    description: "Création du logo représentant les valeurs et la mission de l'association MATOKISA.",
    category: 'Branding',
    tags: ['LOGO', 'DESIGN', 'SOCIAL'],
    imageUrl: 'https://i.postimg.cc/mk0kN8Pn/logomatokisa.jpg'
  },
  {
    id: 'create3',
    title: 'Faire-part de Baptême',
    description: "Création d'un faire-part personnalisé réalisé selon les souhaits de la famille.",
    category: 'Événementiel',
    tags: ['DESIGN', 'FAMILLE', 'SOUVENIR'],
    imageUrl: 'https://i.postimg.cc/nLjHTvJC/bapteme.png'
  }
];