# README Portfolio Update

## Lancer localement
1. `npm install`
2. `npm start`
3. Ouvrir `http://localhost:3000`

## Parcours a tester
1. Splash Netflix -> `/browse` -> selection d un profil -> `/profile/recruiter`
2. Sur `/profile/recruiter`: verifier la rangee `Today's Top Picks for Elias` (Experience, Projects, Hackathon, Competences, Formation, Langues, Activites, Contact)
3. Cliquer une tuile: navigation vers `/section/:sectionId`
4. Dans une section: verifier hero + carrousel + cartes detaillees + bouton `Retour`
5. Hero profil: bouton `Telecharger mon CV (FR)` (telechargement direct), bouton LinkedIn (nouvel onglet, `noopener noreferrer`)

## Fichiers modifies
- `src/profilePage/profilePage.tsx`
- `src/profilePage/TopPicksRow.tsx`
- `src/profilePage/TopPicksRow.css`
- `src/portfolio/SectionPage.tsx`
- `src/portfolio/sectionPage.css`
- `src/portfolio/portfolioData.ts`
- `src/lib/loadDataFromRepo.ts`
- `src/components/NavBar.tsx`
- `src/queries/fallbackData.ts`

## Sources de donnees (traceables)
- `Cv/officiel/cv_elias_moussouni_Fr.pdf`
- `Cv/officiel/cv_elias_moussouni_eng.pdf`
- `Certificats/*`
- `hackTheFork/*`
- `hackathon_suede/*`
- `index_elias_final_corrected2.html`
- `public/repo-manifest.json`

## Note
- Si une precision n est pas presente dans les fichiers sources (ex: details piano), la valeur affichee est `info non disponible`.
