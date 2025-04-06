const { decrypt } = require("../utils/crypto");
const { sendWithReactionAndAutoDelete, logUnauthorizedAccess,sendMessageAndDelete } = require("../utils/utils.js");

module.exports = (args, password, message) => {
  if (args.length < 4) {
    sendMessageAndDelete(message, "Syntaxe: !pass get <site> <clé>");
    return;
  }
  const [_, __, site, cle] = args;

  if (!password[site])
    return sendMessageAndDelete(message, `❌ Aucune entrée pour **${site}**.`);

  // Vérifie le niveau d'autorisation
  const userRole = message.member.roles.cache.map((role) => role.id);
  let accessLevel = 0;

  if (userRole.includes(process.env.ROLE_LEVEL_3))
    accessLevel = process.env.SECURITY_LEVEL_3;
  else if (userRole.includes(process.env.ROLE_LEVEL_2))
    accessLevel = process.env.SECURITY_LEVEL_2;
  else if (userRole.includes(process.env.ROLE_LEVEL_1))
    accessLevel = process.env.SECURITY_LEVEL_1;
  else return sendMessageAndDelete(message, "❌ Vous n'avez pas les permissions de faire ça.");


  if (accessLevel < password[site].accessLevel) {
    sendMessageAndDelete(
      message,
      `❌ Vous n'avez pas les permissions de récupérer ces identifiants.`
    );

    console.log(
      `Utilisateur ${message.author.id} n'a pas les permissions de récupérer les identifiants de ${site}`
    );

    logUnauthorizedAccess(
      message.author.username,
      message.author.id,
      `get:${site}`,
      `Niveau requis pour get: ${password[site].accessLevel}, niveau utilisateur: ${accessLevel}`
    );
    return;
  }

  try {
    const decryptedLogin = decrypt(password[site].login, cle);
    const decryptedMdp = decrypt(password[site].mdp, cle);
    sendWithReactionAndAutoDelete(
      message,
      `🔐 **${site}**\n- Login : \`${decryptedLogin}\`\n- MDP : \`${decryptedMdp}\``,
      "✅",
      36000
    );
  } catch (error) {
    console.error("Erreur lors du décryptage:", error);
    sendMessageAndDelete(message, "❌ Clé incorrecte ou données corrompues.");
  }
};
