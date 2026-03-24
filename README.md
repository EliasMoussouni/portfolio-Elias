# Elias Moussouni Portfolio

Portfolio personnel React inspire de l'interface Netflix, avec navigation par profils, sections immersives, experiences, projets, activites et assistant `EliasGPT` en mode front-only.

## Stack

- React
- TypeScript
- React Router
- Framer Motion
- CSS custom

## Points clefs

- Homepage Netflix-style avec selection de profils
- Sections portfolio dediees (`experience`, `projects`, `formation`, `activites`, etc.)
- Page `Activites` en mode player overlay inspire Netflix
- EliasGPT local-first, base sur les donnees structurees du portfolio
- Build statique compatible avec un hebergement front

## Lancer en local

```bash
npm install
npm start
```

## Build production

```bash
npm run build
```

## Notes de deploiement

- Le projet est maintenant en front-only.
- Le backend historique d'EliasGPT a ete retire.
- Pour un hebergement type GitHub Pages, il faut verifier la gestion des routes React (`/profile/...`, `/section/...`).

## Contact

- LinkedIn: https://www.linkedin.com/in/elias-moussouni-075410241/
- Email: elias.moussouni@edu.ece.fr
