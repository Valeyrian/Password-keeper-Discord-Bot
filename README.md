
# Password-Keeper-Discord-Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-brightgreen)](https://nodejs.org/)
[![discord.js](https://img.shields.io/badge/discord.js-v14%2B-blueviolet)](https://discord.js.org/)

## 📝 Description

This bot securely manages passwords directly through Discord. Sensitive data is encrypted using **AES-256-CBC** and is only accessible to authorized users.

## ⚙️ Features

- 🔐 Add / retrieve / update / delete encrypted passwords
- 📋 List all registered sites
- 🛡️ Role-based access control:
    - Users are assigned roles with different access levels (1, 2, or 3).
    - Password access is restricted based on the user's role:
        - **Level 3**: Full access to all stored logins and passwords.
        - **Level 2**: Access to a subset of passwords, as defined by the configuration.
        - **Level 1**: Basic access.
    - Role IDs and security levels are configured in the `.env` file.
- 🔑 Dynamic permission checks ensure only authorized users can retrieve  specific password.
- 🛠️ Easily customizable role and security settings.
- 📜 Logs unauthorized access attempts for auditing purposes.

## 🧰 Requirements

- Node.js (v18+)
- A valid Discord bot token
- `.env` file with:

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
Then configure your .env file and run the bot:

```
node index.js
```
💬 Commands
All commands start with ```!pass```:

Command	Description :     
```!pass add <site> <login> <password> <key>	```Add a password  
```!pass get <site> <key>	```Retrieve a password  
```!pass list	```List all stored sites  
```!pass update <site> <login> <password> <key> <security Level: 1 to 3 (3 is the higher)>```	Update a password  
```!pass remove <site>	```Delete a stored site  
```!pass help	```Show help information  


🔒 Security
Uses AES-256-CBC for encryption

Never commit .env or password.json to public repositories

Keep your encryption keys safe and private

📦 Dependencies
```discord.js```
```dotenv```
```crypto (Node.js)```

🤝 Contributions
Contributions are welcome! Feel free to fork the repo and submit a pull request.

📜 License
This project is licensed under the MIT License.

⚠️ Warning: This bot is intended for internal use only.
