const SLIDES = [
  {
    type: "cover",
    eyebrow: "Master 1 Informatique - DS4H",
    title: "Self Hosted Cloud Implementation",
    subtitle: "Remplacer Render par une plateforme PaaS auto-hebergee",
    meta: ["Hugo Claveille", "Encadre par Gilles Menez", "2025"],
  },
  {
    section: "Introduction",
    title: "Pourquoi remplacer Render ?",
    subtitle: "Le projet part d'un besoin pedagogique concret : garder la simplicite de deploiement, mais reprendre la maitrise de l'infrastructure.",
    bullets: [
      "Cours d'IoT dependant d'un service cloud externe.",
      "Besoin de souverainete, de controle et de reproductibilite.",
      "Utilisateurs non experts : le deploiement doit rester simple.",
      "Contrainte forte : une seule machine, peu de ressources, maintenance limitee.",
    ],
    tags: ["PaaS", "Self-hosted", "Docker", "Multi-utilisateur"],
  },
  {
    section: "Etat de l'art",
    title: "Le cloud comme abstraction",
    subtitle: "L'objectif n'est pas seulement d'heberger une application : il faut masquer l'infrastructure et fournir un service de deploiement.",
    cards: [
      {
        title: "IaaS",
        text: "Ressources virtualisees : machines, stockage, reseau.",
      },
      {
        title: "PaaS",
        text: "Plateforme de deploiement : Git, build, runtime, URL publique.",
      },
      {
        title: "SaaS",
        text: "Application complete consommee directement par l'utilisateur.",
      },
    ],
  },
  {
    section: "Solution",
    title: "Choisir un PaaS leger",
    subtitle: "La solution devait etre plus proche de Render que d'une infrastructure complete type cloud prive industriel.",
    columns: [
      {
        title: "Solutions evaluees",
        items: [
          "OpenStack : trop lourd",
          "k3s : puissant mais complexe",
          "Dokku : efficace, pas d'interface web",
          "CapRover : multi-utilisateur limite",
          "Coolify : empreinte plus elevee",
        ],
      },
      {
        title: "Pourquoi Dokploy",
        items: [
          "Installation simple",
          "Pipeline Git vers Docker",
          "Interface web accessible",
          "Gestion des permissions",
          "Consommation adaptee au VPS",
        ],
      },
    ],
  },
  {
    section: "Infrastructure",
    title: "Une machine volontairement contrainte",
    subtitle: "Le contexte impose une plateforme efficace : chaque replica et chaque build consomment une part visible des ressources.",
    stats: [
      { value: "2", label: "vCPU Xeon E5" },
      { value: "4.2 GB", label: "RAM totale" },
      { value: "25 GB", label: "Stockage" },
    ],
    note: "En pratique, la marge disponible reste limitee apres le systeme, Docker et Dokploy.",
  },
  {
    section: "Deploiement",
    title: "Du depot Git a l'URL publique",
    subtitle: "Le flux cible reprend l'experience attendue d'un PaaS : pousser son code, laisser la plateforme construire et exposer le service.",
    flow: ["Git push", "Docker build", "Container", "Traefik", "URL publique"],
    bullets: [
      "Application de test : classifieur MNIST RNN.",
      "API Flask empaquetee avec Docker.",
      "Deploiement connecte a un depot GitHub.",
    ],
  },
  {
    section: "Evaluation",
    title: "Charge avec une seule replique",
    subtitle: "Le premier test sert de ligne de base : il montre a quel moment la machine commence a saturer.",
    bullets: [
      "La latence augmente fortement avec le nombre de workers.",
      "Le CPU devient rapidement le facteur limitant.",
      "Le comportement reste coherent : plus de concurrence ne signifie pas plus de capacite.",
    ],
    tags: ["Baseline", "CPU", "Latence"],
  },
  {
    section: "Scalabilite",
    title: "Le point d'equilibre est a 2 repliques",
    subtitle: "Le scaling horizontal aide jusqu'au moment ou la machine n'a plus assez de ressources a redistribuer.",
    comparison: [
      { label: "1 replique", value: "stable mais limitee" },
      { label: "2 repliques", value: "meilleur compromis" },
      { label: "3 repliques", value: "saturation CPU/RAM" },
    ],
    note: "A 3 repliques, la plateforme approche 96% CPU et 93% RAM : le gain attendu devient une instabilite.",
  },
  {
    section: "Autoscaling v1",
    title: "Piloter Dokploy par API",
    subtitle: "Une premiere strategie ajuste le nombre de repliques a partir d'une metrique globale : l'utilisation CPU.",
    bullets: [
      "Script externe qui interroge regulierement la machine.",
      "Decision simple : augmenter ou reduire les repliques selon un seuil.",
      "Limite principale : une seule metrique ne decrit pas toute la charge applicative.",
    ],
    tags: ["API Dokploy", "CPU", "Replicas"],
  },
  {
    section: "Autoscaling v2",
    title: "Adapter le modele plutot que les ressources",
    subtitle: "La seconde strategie remplace le modele ML par une version plus legere quand la charge augmente.",
    columns: [
      {
        title: "Intuition",
        items: [
          "CNN v2 en situation normale",
          "CNN v1 si la charge augmente",
          "MLP comme fallback leger",
        ],
      },
      {
        title: "Resultat",
        items: [
          "Strategie plus risquee que prevu",
          "58% d'erreurs observees",
          "Compromis performance/qualite difficile a piloter",
        ],
      },
    ],
  },
  {
    section: "Discussion",
    title: "Ce que le projet montre",
    subtitle: "Dokploy repond bien au besoin pedagogique, mais les limites physiques de l'infrastructure restent centrales.",
    bullets: [
      "Un PaaS auto-heberge peut rester simple pour les etudiants.",
      "Docker et Git donnent un flux de deploiement reproductible.",
      "Le scaling horizontal redistribue des ressources fixes : il n'en cree pas.",
      "L'automatisation doit etre guidee par des metriques fiables et contextualisees.",
    ],
  },
  {
    type: "closing",
    section: "Conclusion",
    title: "Bilan et perspectives",
    bullets: [
      "Dokploy est une alternative credible a Render dans ce contexte.",
      "Le meilleur compromis observe est autour de 2 repliques.",
      "Perspectives : VPS plus large, second noeud, migration eventuelle vers k3s.",
    ],
    quote: "Une plateforme cloud n'efface pas les contraintes materielles : elle les rend plus faciles a gerer.",
  },
];
