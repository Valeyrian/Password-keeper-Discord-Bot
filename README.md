
# Password-Keeper-Discord-Bot

[![License: MIT](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-brightgreen)](https://nodejs.org/)
[![discord.js](https://img.shields.io/badge/discord.js-v14%2B-blueviolet)](https://discord.js.org/)

## 📝 Description

This bot securely manages passwords directly through Discord. Sensitive data is encrypted using **AES-256-CBC** and is only accessible to authorized users.

## ⚙️ Features

- 🔐 Add / retrieve / update / delete encrypted passwords
- 📋 List all registered sites
- 🔒 Encrypted local storage via `password.json`

## 🧰 Requirements

- Node.js (v18+)
- A valid Discord bot token
- `.env` file with:

```env
DISCORD_TOKEN=YourBotToken
ALLOWED_USERS=ID1,ID2,ID3
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

Command	Description
```!pass add <site> <login> <password> <key>	```Add a password  
```!pass get <site> <key>	```Retrieve a password  
```!pass list	```List all stored sites  
```!pass update <site> <login> <password> <key>```	Update a password  
```!pass remove <site>	```Delete a stored site  
```!pass help	```Show help information  


🔒 Security
Uses AES-256-CBC for encryption

Never commit .env or password.json to public repositories

Keep your encryption keys safe and private

📦 Dependencies
discord.js

dotenv

crypto (Node.js)

🤝 Contributions
Contributions are welcome! Feel free to fork the repo and submit a pull request.

📜 License
This project is licensed under the MIT License.

⚠️ Warning: This bot is intended for internal use only.
