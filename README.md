# QR Generator

**[Démo en ligne](https://qr.purvanas.fr)** · [Contrôles GitHub](https://github.com/Purvanas/qr-generator/actions)

Un générateur de QR codes simple et rapide pour du texte, des URL, des e-mails et des accès Wi-Fi, avec export PNG et SVG.

L'interface privilégie le retour immédiat : chaque modification relance une génération débouncée, annule la requête devenue obsolète et n'affiche que le dernier résultat. Le serveur produit les deux formats en une seule requête et ne conserve pas le contenu encodé.

## Ce que le projet soigne

- payload Wi-Fi conforme, y compris lorsque le SSID ou le mot de passe contient `\\`, `;`, `,`, `:` ou `"` ;
- paramètres d'e-mail encodés sans casser les caractères spéciaux ;
- niveau de correction, dimensions et couleurs validés côté serveur ;
- erreurs réseau lisibles dans l'interface et requêtes concurrentes annulées ;
- aperçu mobile, téléchargement PNG pour l'usage courant et SVG pour l'impression.

## Architecture et confidentialité

Le navigateur construit le contenu selon le mode choisi, puis l'envoie à `POST /api/generate`. Le service Node/Express utilise le paquet `qrcode` et renvoie le résultat en mémoire. Il ne persiste ni texte, ni URL, ni identifiants Wi-Fi.

Des compteurs agrégés et des rapports de bug volontaires peuvent être enregistrés localement. La route de lecture des erreurs est invisible sans configuration et exige ensuite `Authorization: Bearer …` avec `ERRORS_TOKEN`.

## Lancer le projet

Prérequis : Node.js 22 ou 24.

```bash
cp .env.example .env
npm ci
npm start
```

Le service écoute par défaut sur `http://127.0.0.1:3300`. On peut aussi charger le fichier explicitement :

```bash
node --env-file=.env server.js
```

En production, conservez l'écoute en loopback derrière un reverse proxy HTTPS. Les fichiers de statistiques et d'erreurs sont des données d'exécution et restent hors du dépôt.

## Limites assumées

- la génération est côté serveur : le contenu transite donc par le processus, même s'il n'est pas conservé ;
- il s'agit de QR statiques, sans redirection administrable ni suivi ;
- les lecteurs de QR ne gèrent pas tous les extensions Wi-Fi de façon identique.

## Licence

Le code propre au projet est sous licence MIT. Les dépendances conservent leurs licences ; voir [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
