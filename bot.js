const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Liste des IDs des utilisateurs autorisés (remplacez par les IDs réels)
const allowedUsers = ['285112190388666369', '476089540952457226', 'ID_UTILISATEUR_3'];

client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
  // On ignore les messages provenant des bots
  if (message.author.bot) return;

  // Supprimer le message original après 1 minute
  setTimeout(() => {
    message.delete()
      .then(() => {
        console.log(`Message de ${message.author.tag} supprimé : ${message.content}`);
      })
      .catch(err => {
        console.error(`Erreur lors de la suppression du message de ${message.author.tag} :`, err);
      });
  }, 30000);

  // Si l'utilisateur est autorisé et que le message est la commande "!donne"
  if (allowedUsers.includes(message.author.id)) {
    if (message.content === '!donne') {
      message.channel.send('Utilisateur : bde')
      message.channel.send('MDP : bde12345')
        .then(sentMessage => {
          // Supprime le message envoyé par le bot après 1 minute
          setTimeout(() => {
            sentMessage.delete()
            sentMessage.delete()
          }, 30000);
        })
        .catch(err => {
          console.error("Erreur lors de l'envoi du message :", err);
        });
    }
  }
});
client.login("MTM1NzczNzEyNTk1MjM1NjQzMg.GtBYBv.TDAkaxddZm1yIxx3Xr99kTJyEC3X8nLkRCIqEU");
