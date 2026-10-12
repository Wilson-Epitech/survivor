<div align="center">

# Soul Connection

**Le CRM d'une agence de coaching amoureux, conçu et livré en deux semaines.**

<img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/> <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white"/> <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="MUI" src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white"/> <img alt="AWS S3" src="https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/> <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>

<sub>Projet à 4 · 2024</sub>

</div>

<br/>

<p align="center"><img src=".github/assets/survivor-home.png" alt="Soul Connection" width="820"/></p>

## Le projet en quelques mots

Un rush de deux semaines à quatre pour une agence fictive, *Soul Connection*. On partait d'une API fournie, et il fallait livrer un vrai outil interne : tableau de bord, fiches clients, gestion des coachs, événements… avec un brin d'astrologie pour la compatibilité.

## Ce que ça fait

- **Tableau de bord** : tranches d'âge, revenus de l'année, notes des rendez-vous, signes astrologiques
- **Clients** : liste, recherche, fiche détaillée, création et modification
- **Coachs** : liste, nombre de clients, attribution de clients, création de compte
- **Compatibilité astrologique** entre deux clients
- Événements sur une carte, conseils pour les coachs, garde-robe des clients
- Rôles manager / coach, session sécurisée par JWT et cookies chiffrés

<p align="center"><img src=".github/assets/survivor-customers.png" alt="La liste des clients" width="760"/></p>
<p align="center"><sub>La liste des clients</sub></p>

<p align="center"><img src=".github/assets/survivor-coaches.png" alt="Les coachs et l'attribution des clients" width="760"/></p>
<p align="center"><sub>Les coachs et l'attribution des clients</sub></p>

## Lancer le projet

```bash
pnpm install
# .env.local : MONGODB_URI, SECRET_KEY, clés S3 et Google Maps
pnpm build && pnpm start
```

> Les captures ont été prises en local avec des données fictives.

## L'équipe

<a href="https://github.com/Wilson-Epitech/survivor/graphs/contributors"><img src="https://contrib.rocks/image?repo=Wilson-Epitech/survivor" alt="Contributeurs"/></a>

Wilson Bordichon, Mathis Brehm, Yanis Harkouk, Eva Legrand

**Ma partition :** J'ai fait la **navigation** de l'app, les **formulaires** de création et d'édition des clients et des employés, les pages **Clients**, **Coachs** et **Compatibilité astrologique**, et plusieurs composants réutilisables.
