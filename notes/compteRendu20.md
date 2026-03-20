# Compte rendu du Vendredi 20 Avril 2026

## Debut rapport / State Of the Art du cloud
J'ai commencé a écrire le rapport, essayé de définir ce qu'est le cloud, les différents types de cloud (public, privé, hybride), les avantages et inconvénients de chacun.

## Exploration OpenStack
Vous avez parlé d'OpenStack mais c'est une plateforme IaaS (Infrastructure as a Service)* ca permet don en gros, si j'ai bien compris, de créer et gérer des machines virtuelles, du stockage, des réseaux, etc.
Je vois pas trop comment ca peut nous etre utile dans le cas de notre projet, vaut-il mieux pas utiliser une soltion self hosted plus "simple"?

*Je mets les parantheses pour moi, je decouvre ces termes :)

## Différentes solutions
Pour résumer les différentes solutions que j'ai trouvées :
- OpenStack : Je vois pas l'intérêt ? (voir Exploration OpenStack)
- Coolify : 
    - Solution intéressante mais assez lourde, de plus j'ai essayé de l'installer sur mon VPS mais elle fait 20Go a vide donc impossible
    - Elle offre une interface graphique et un deploiment git ce qui est déja un prérequis
- CapRover :
    - Je connais son existence mais je n'ai pas encore approfondie
- Dokku :
    - Solution légère et simple, elle offre une interface en ligne de commande et un deploiment git
    - Elle est assez populaire 
    - Probleme : n'offre pas d'interface graphique, donc pas très user friendly pour les personnes non techniques & du coup pas de logs ?
- Dockpoly :
    - Assez peu connu j'ai l'impression, j'ai du mal a faire marcher il y a un probleme avec docker et vu que je dois tout apprendre sur docker je rame..
    - Offre une interface graphique et un deploiment git
    - Il y a aussi la possibilité de creer des bases de données dont mongodb avec une methode d'acces et de gestion pour les utilisateurs
