# Bot-BDE-Discord

[![Licence MIT](https://img.shields.io/badge/Licence-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-brightgreen)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-v14+-blueviolet)](https://discord.js.org/)

Bot Discord du BDE, créé par et pour le BDE de l'ESIEA Laval.

## 📝 Description

Ce bot permet de gérer des mots de passe de manière sécurisée sur Discord. Les données sensibles sont chiffrées avec **AES-256-CBC** et accessibles uniquement par les utilisateurs autorisés.

## ⚙️ Fonctionnalités

- 🔐 Ajouter / récupérer / modifier / supprimer des mots de passe
- 📋 Lister les sites enregistrés
- 🔒 Stockage chiffré dans `password.json`

## 🧰 Prérequis

- Node.js (v18 ou plus)
- Un bot Discord avec un token valide
- Un fichier `.env` avec :

```env
DISCORD_TOKEN=VotreTokenIci
ALLOWED_USERS=ID1,ID2,ID3
```
🚀 Installation
```
git clone https://github.com/Valeyrian/Bot-BDE-Discord.git
cd Bot-BDE-Discord
npm install
```
Configurez ensuite le fichier .env puis lancez le bot :

```
node index.js
```
💬 Commandes
Toutes les commandes commencent par ```!pass``` :

Commande	Description
```!pass add <site> <login> <mdp> <clé>```	Ajoute un mot de passe  
```!pass get <site> <clé>```	Récupère un mot de passe  
```!pass list```	Liste les sites enregistrés  
```!pass update <site> <login> <mdp> <clé>```	Met à jour un mot de passe  
```!pass remove <site>```	Supprime un mot de passe  
```!pass help```	Affiche l’aide  
🔒 Sécurité
Chiffrement via AES-256-CBC

Ne publiez jamais vos fichiers .env et password.json

Gardez vos clés de chiffrement privées

📦 Dépendances
discord.js
dotenv
crypto (Node.js)

🤝 Contribution
Les contributions sont les bienvenues ! Forkez le projet et proposez vos améliorations via une pull request.

📜 Licence
Ce projet est sous licence MIT.

⚠️ Attention : Ce bot est conçu pour un usage interne uniquement.
