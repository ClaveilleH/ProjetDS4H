* Intro :
              Contexte & Objectifs
              Explication sujet
                    Expreimentation d'un cloud self hosted type render pour cours IOT
                    ...

# State of art & Analyse des besoins:

## Qu'est ce que le cloud => oui essayer de définir le "paradigme cloud"

Le cloud est liée avec une vision "service" de ce qu'est un logiciel
Le cloud est le support matériel  de l'exploitation d'un logiciel

### Les principaux types de services cloud

On parle souvent de trois grands modèles :

IaaS (Infrastructure as a Service)
→ Tu loues des machines virtuelles, du stockage, du réseau
(ex : serveurs chez AWS)

PaaS (Platform as a Service)
→ On te fournit une plateforme pour développer et déployer tes applications
(tu ne gères pas les serveurs)

SaaS (Software as a Service)
→ Tu utilises directement un logiciel en ligne
(ex : Google Docs, Dropbox)

### Prenons un exemple concret : créer un site web

1. Avec IaaS (Infrastructure as a Service)

Exemples : Amazon Web Services, Microsoft Azure

Ce que tu fais :

- Louer un serveur
- Installer le système (Linux, etc.)
- Installer un serveur web (Apache, Nginx)
- Déployer ton site

✔️ Résultat :

Tu contrôles tout, mais tu dois tout gérer.

2. Avec PaaS (Platform as a Service)

👉 Exemples : Heroku, Google Cloud
Ce que tu fais :

- Tu écris ton code
- Tu l’envoies sur la plateforme

Ce que la plateforme fait :

- Gère les serveurs
- Gère le déploiement
- Gère la montée en charge

✔️ Résultat :

Tu te concentres sur ton application.

3. Avec SaaS (Software as a Service)

👉 Exemples : Wix, WordPress.com
Ce que tu fais :

- Tu crées ton site avec une interface graphique
- Tu ajoutes du contenu

Ce que le service fait :

- Tout le reste (hébergement, sécurité, mises à jour)

✔️ Résultat :

Aucune technique nécessaire.

## "Ton" contexte d'utilisation ou du moins celui que tu as prévu

Le "cloud" sans un contexte d'utilisation ne veut pas dire grand chose
=> prend l'exemple du service des piscines avec la bd des logins ?

"tu" es la société qui a développé ce service et tu veux le déployer
... quelles sont les solutions qui s'offrent à toi ?

Tu t'orientes vers une approche PaaS ?

## plusieurs méthodes pour déployer un tel service :

### Cloud Public (Public Cloud) : Utilisation de services cloud

proposés par des fournisseurs tiers (AWS, GCP, Azure, etc.). Les
ressources sont partagées entre plusieurs clients, mais isolées
logiquement

    Un cloud public est un cloud :

    accessible à tout le monde via Internet
		partagé entre plusieurs utilisateurs (multi-tenant)
		géré par une entreprise externe

    il y a des avantages ET des inconvénients => voir annnexe1

### Cloud Privé (Private Cloud) : Infrastructure cloud

dédiée à une seule organisation, hébergée en interne ou chez un
fournisseur tiers.

Idéal pour les projets nécessitant un contrôle
	total sur les données et la sécurité.

### ... etc  voir annexe 1

# Pourquoi self-hosted => il faut situer/raffiner tes attentes :

Le cout et la souveraineté sont des critères majeurs

le déploiement "mondial"? La latence ? la disponibilité ?... etc
bref tous les critères qui ont motivé les différents types de cloud

# Choix de la techno : Quels sont les diff outils/solutions ?

Si il n'y avait pas la contrainte "PaaS:

- OS : Linux (Ubuntu Server)
- Conteneurs : Docker + Docker Compose
  -Reverse proxy : Traefik ou Nginx

Mais toi tu veux du Paas

Donc le plus simple :

-Docker

- orchestrateur léger :
  Kubernetes (puissant mais complexe)
  ou k3s (beaucoup mieux pour débuter)

et en plus puissant/ccomplexe

OpenStack ?
ou ???

            
            
            Besoins fonctionnels et techniques

* Mise en oeuvre:
              Integration et installation
              Tests
* Bilan & Perspectives
              Résultats obtenus vs objectifs initiaux
              Points forts et limites de la solution
              Améliorations envisagées
              Retour d'expérience
* Conclusion
* Annexes
              Commandes d'installation
              Schémas d'architecture ?
              Références et documentation
* A ajouter (pas sur et je sais pas où)
              Réplication de l'archi (pour que les eleves puissent l'avoir en local)
              Sécurité ?
