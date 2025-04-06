require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions
  ],
});

// Charger le dictionnaire de mdp
let password = {};
try {
  password = JSON.parse(fs.readFileSync("./password.json", "utf8"));
} catch {
  password = {}; // si le fichier est vide
}

// Charger la liste des utilisateurs autorisés depuis .env
const allowedUsers = process.env.ALLOWED_USERS.split(",");


// Importer les commandes
const addPassword = require("./commands/add");
const getPassword = require("./commands/get");
const listPasswords = require("./commands/list");
const removePassword = require("./commands/remove");
const updatePassword = require("./commands/update");

//import les fonctions de utils
const {
  sendMessageAndDelete ,
  sendWithReactionAndAutoDelete ,
} = require("./utils/utils");


// Quand le bot est prêt
client.once("ready", () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});


// Quand un message est reçu
client.on("messageCreate", (message) => {
  // vérifie que ce n'est pas un bot
  if (message.author.bot) return;


  // Vérifie si le message commence par "!pass"
  const args = message.content.split(" "); // sépare le message en mots et les met dans args
  if (!(args[0] === "!pass" && args.length >= 1)) {
    console.log("Ce n'est pas une commande valide");
    return;
  }



  // vérifie que l'utilisateur est autorisé
  if (!allowedUsers.includes(message.author.id)) {
    console.log(`Utilisateur ${message.author.id} non autorisé`);
    return sendMessageAndDelete(
      message,
      "Désolé, tu n'es pas autorisé à utiliser ce bot."
    );
  }

  // lecture des arguments de la commande

  console.log(`Commande reçue: ${args[1]}`); // Log de la commande reçue

  switch (args[1]) {
    case "add":
      addPassword(args, password, message);
      break;
    case "get":
      getPassword(args, password, message);
      break;
    case "list":
      listPasswords(password, message);
      break;
    case "remove":
      removePassword(args, password, message);
      break;
    case "update":
      updatePassword(args, password, message);
      break;
    case "help":
    case "h":
    case "-h":
    default:
      console.log("Commande inconnue détectée");
      sendMessageAndDelete(
        message,
        "La liste des commandes est : \n - **get**  : avoir un mdp \n - **list**  : lister les mdp \n - **remove**  : supprimer un mdp \n - **add**  : ajouter un mdp \n - **update**  : modifier un mdp\n"
      );
  }
});

client.login(process.env.DISCORD_TOKEN);
