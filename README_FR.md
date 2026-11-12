# MZOUTI Trading AI — Frontend multi-pages v1.1

Application React + Vite, prête pour Render Static Site.

## Pages distinctes
- `/dashboard` — Vue générale
- `/analyse` — Analyse en direct
- `/signaux` — Signaux
- `/marches` — Marchés
- `/historique` — Historique
- `/statistiques` — Statistiques
- `/parametres` — Paramètres

Chaque page possède son contenu dédié et une route distincte. La navigation fonctionne sans rechargement complet.

## Déploiement Render
Le fichier `render.yaml` définit le service statique.
- Build command : `npm install && npm run build`
- Publish directory : `dist`

## Local
`npm install` puis `npm run dev`.

## Important
L'interface est prête visuellement, mais les données de marché, signaux, statistiques et connexions restent volontairement vides/non connectées. Le graphique réel et l'analyse ne seront intégrés qu'après le développement du backend et de l'agent Windows. Aucune clé privée ne doit être placée dans le code frontend.
