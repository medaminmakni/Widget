// Texts are plain strings. Words between *asterisks* are shown in orange.
const fr = {
  meta: {
    title: 'Widget Consulting · Studio logiciel à Sfax',
    description:
      'Widget Consulting, studio logiciel à Sfax : sites web, applications mobiles, tableaux de bord et logiciels sur mesure pour les entreprises en Tunisie et dans le monde.',
    ogTitle: 'Chaque entreprise a une pièce manquante.',
  },
  a11y: {
    brand: 'Widget Consulting, retour en haut',
    scene: "Un champ de tuiles en 3D ; une tuile orange se pose dans l'emplacement vide quand vous faites défiler",
    menu: 'Menu principal',
    language: 'Langue',
  },
  nav: { studio: 'Studio', services: 'Services', build: 'Créer le vôtre', work: 'Réalisations', cta: 'Démarrer', ctaLong: 'un projet' },
  hero: {
    eyebrow: 'Studio logiciel · Sfax → monde entier',
    lines: ['Chaque entreprise', 'a une *pièce*', 'manquante.'],
    text: 'Nous la concevons et la développons : plateformes web, applications mobiles, tableaux de bord et logiciels sur mesure, par une seule équipe, pour des entreprises partout dans le monde.',
    cue: 'Défilez pour la placer',
  },
  marquee: ['Plateformes web', 'Applications mobiles', 'Tableaux de bord', 'Logiciels sur mesure', 'Cloud', 'Conseil IT'],
  studio: {
    label: 'Le studio',
    manifesto:
      "Nous sommes un studio logiciel à Sfax. Nous construisons les *pièces* sur lesquelles reposent les entreprises : le site qui vend, l'application dans la poche de vos clients, le tableau de bord qui remplace dix fichiers Excel. Une seule équipe, du premier croquis au lancement. Un périmètre fixe, et chaque semaine quelque chose à *tester.*",
  },
  services: {
    title: 'Ce que nous construisons',
    startWith: 'Pour commencer',
    items: [
      { title: 'Plateformes web', text: 'Sites vitrines, portails clients et applications web rapides et faciles à mettre à jour.', start: 'Site web · 3 semaines' },
      { title: 'Applications mobiles', text: 'Applications iOS et Android pour vos clients ou vos équipes sur le terrain.', start: 'MVP · 8 semaines' },
      { title: 'Tableaux de bord', text: 'Vos chiffres dans un tableau de bord en direct, au lieu de dix fichiers Excel.', start: 'Sprint dashboard · 2 semaines' },
      { title: 'Logiciels sur mesure', text: 'ERP, CRM et outils internes adaptés à la façon dont votre entreprise travaille vraiment.', start: 'Audit gratuit' },
      { title: 'Cloud & intégration', text: 'Hébergement, migrations, et connexion des outils que vous payez déjà.', start: 'Audit gratuit' },
      { title: 'Conseil IT', text: 'Audits et feuilles de route, pour ne jamais investir dans le mauvais outil.', start: 'Appel gratuit de 30 min' },
    ],
  },
  builder: {
    label: 'Créer le vôtre',
    title: 'Choisissez vos pièces. Nous vous montrons par où commencer.',
    picks: {
      web: { name: 'Site web', sub: 'sites · portails' },
      app: { name: 'Application mobile', sub: 'iOS · Android' },
      data: { name: 'Tableau de bord', sub: 'données · reporting' },
      erp: { name: 'Logiciel sur mesure', sub: 'ERP · CRM · outils' },
      cloud: { name: 'Cloud', sub: 'hébergement · intégration' },
      advice: { name: 'Conseil', sub: 'audit · feuille de route' },
    },
    blueprint: 'Votre plan',
    empty: "Aucune pièce pour l'instant. Sélectionnez les tuiles qui correspondent à votre projet.",
    where: 'Par où commencer',
    send: 'Envoyer mon plan',
    piece: 'pièce',
    suggestions: {
      none: ['Audit gratuit de 30 minutes', 'Parlez-nous de votre entreprise, nous vous dirons quoi construire en premier.'],
      web: ['Site vitrine · 3 semaines', 'Notre offre site web à périmètre fixe correspond à ce besoin.'],
      data: ['Sprint dashboard · 2 semaines', 'Un tableau de bord en direct sur vos données, périmètre fixe.'],
      audit: ['Audit gratuit de 30 minutes', 'Nous analysons votre existant, puis envoyons une proposition fixe.'],
      mvp: ['MVP · environ 8 semaines', 'Une première version fonctionnelle, avec une démo chaque semaine.'],
      custom: ['Projet sur mesure', "Plusieurs pièces ensemble. Nous cadrons le projet avec vous lors d'un appel gratuit, puis envoyons une proposition fixe."],
    },
    msgPieces: "Pièces dont j'ai besoin : ",
    msgStart: 'Point de départ suggéré : ',
    msgAbout: 'À propos de mon projet : ',
  },
  process: {
    label: 'Notre méthode',
    title: 'Construit pièce par pièce, sous vos yeux.',
    steps: [
      { when: 'Jour 1', title: "Appel d'audit gratuit", text: '30 minutes pour comprendre votre besoin et vos contraintes.' },
      { when: 'Semaine 1', title: 'Proposition fixe', text: 'Périmètre, prix et délai par écrit avant de commencer.' },
      { when: 'Chaque semaine', title: 'Développement en sprints', text: 'Une démo à tester chaque semaine. Aucune surprise.' },
      { when: 'Lancement', title: 'La pièce se pose', text: 'Nous mettons en ligne ensemble, et restons pour assurer le bon fonctionnement.' },
    ],
  },
  work: {
    label: 'Réalisations',
    title: 'Les pièces que nous avons livrées.',
    items: [
      { shot: '[Capture du projet]', name: '[Nom du projet]', line: '[Type de client] · [Ce que vous avez construit] · [Résultat en une ligne]' },
      { shot: '[Capture du projet]', name: '[Nom du projet]', line: '[Type de client] · [Ce que vous avez construit] · [Résultat en une ligne]' },
      { shot: '[Capture du projet]', name: '[Nom du projet]', line: '[Type de client] · [Ce que vous avez construit] · [Résultat en une ligne]' },
    ],
  },
  offers: {
    label: "Offres prêtes à l'emploi",
    title: 'Périmètre clair. Prix clair. Délai clair.',
    items: [
      { when: '3 semaines', title: 'Site vitrine', points: ['Design et structure des contenus', "Jusqu'à [X] pages, adapté au mobile", 'Formulaire de contact, statistiques, bases du SEO'], price: '[VOTRE PRIX]' },
      { when: '2 semaines', title: 'Sprint dashboard', points: ['Connexion de vos sources de données', 'Un tableau de bord en direct pour votre équipe', 'Session de formation incluse'], price: '[VOTRE PRIX]' },
      { when: '8 semaines', title: 'MVP', points: ['Une première version web ou mobile fonctionnelle', 'Des démos à tester chaque semaine', 'Accompagnement au lancement'], price: '[VOTRE PRIX]' },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Dites-nous quelle pièce *vous manque.*',
    email: '[contact@yourdomain]',
    whatsapp: '[+216 00 000 000]',
    studio: 'Sfax, Tunisie',
    languagesLabel: 'Langues',
    replyLabel: 'Réponse',
    reply: 'Sous un jour ouvrable',
    name: 'Votre nom',
    message: 'Votre projet',
    send: 'Envoyer',
    sending: 'Envoi…',
    hint: 'Nous répondons sous un jour ouvrable.',
    error: 'Ajoutez votre nom et un email valide pour que nous puissions vous répondre.',
    failed: "L'envoi a échoué. Réessayez, ou écrivez-nous directement par email.",
    sent: 'Merci ! Votre demande est bien envoyée. Nous revenons vers vous très vite.',
    preview: "Reçu en mode local : la demande s'affiche dans le terminal. Ajoutez une clé Resend pour recevoir les emails.",
  },
  footer: { copy: '© 2026 Widget Consulting · Sfax, Tunisie', domain: '[yourdomain.com]' },
  cursor: { talk: 'Parler', drop: 'Poser', drag: 'Glisser', add: 'Ajouter', send: 'Envoyer', view: 'Voir' },
};

export default fr;
