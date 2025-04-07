# Bot-Discord-Gestionaire-De-MDP

[![Licence MIT](https://img.shields.io/badge/Licence-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-brightgreen)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-v14+-blueviolet)](https://discord.js.org/)


## 📝 Description

Ce bot permet de gérer des mots de passe de manière sécurisée sur Discord. Les données sensibles sont chiffrées avec **AES-256-CBC** et accessibles uniquement par les utilisateurs autorisés.

## ⚙️ Fonctionnalités
- 🔐 Ajouter / récupérer / mettre à jour / supprimer des mots de passe chiffrés
- 📋 Lister tous les sites enregistrés
- 🛡️ Contrôle d'accès basé sur les rôles :
    - Les utilisateurs se voient attribuer des rôles avec différents niveaux d'accès (1, 2 ou 3).
    - L'accès aux mots de passe est restreint en fonction du rôle de l'utilisateur :
        - **Niveau 3** : Accès complet à tous les identifiants et mots de passe enregistrés.
        - **Niveau 2** : Accès à un sous-ensemble de mots de passe, défini par la configuration.
        - **Niveau 1** : Accès de base.
    - Les IDs des rôles et les niveaux de sécurité sont configurés dans le fichier `.env`.
- 🔑 Des vérifications dynamiques des permissions garantissent que seuls les utilisateurs autorisés peuvent récupérer un mot de passe spécifique.
- 🛠️ Paramètres de rôles et de sécurité facilement personnalisables.
- 📜 Journalise les tentatives d'accès non autorisées à des fins d'audit.

## 🧰 Prérequis

- Node.js (v18 ou plus)
- Un bot Discord avec un token valide
- Un fichier `.env` avec :

```env
DISCORD_TOKEN=YourDiscordToken
#
NEED_RESTRICTED_USER_ACCESS=false
ALLOWED_USERS=User1,User2,User3
#
ROLE_LEVEL_3=YourHighAccesRoleId
ROLE_LEVEL_2=1YourMidAccesRoleId
ROLE_LEVEL_1=YourLowAccesRoleId
#
SECURITY_LEVEL_3=3
SECURITY_LEVEL_2=2
SECURITY_LEVEL_1=1
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

Commande	Description :  
```!pass add <site> <login> <mdp> <clé>```	Ajoute un mot de passe  
```!pass get <site> <clé>```	Récupère un mot de passe  
```!pass list```	Liste les sites enregistrés  
```!pass update <site> <login> <mdp> <clé> <security Level: 1 to 3 (3 is the higher)>```	Met à jour un mot de passe  
```!pass remove <site>```	Supprime un mot de passe  
```!pass help```	Affiche l’aide  
🔒 Sécurité
Chiffrement via AES-256-CBC

Ne publiez jamais vos fichiers .env et password.json

Gardez vos clés de chiffrement privées

📦 Dépendances
```discord.js```
```dotenv```
```crypto (Node.js)```

🤝 Contribution
Les contributions sont les bienvenues ! Forkez le projet et proposez vos améliorations via une pull request.

📜 Licence
Ce projet est sous licence MIT.

⚠️ Attention : Ce bot est conçu pour un usage interne uniquement.
