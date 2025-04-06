const fs = require("fs");
const {
  sendWithReactionAndAutoDelete,
  logUnauthorizedAccess,
  sendMessageAndDelete,
} = require("../utils/utils.js");


module.exports = (args, password, message) => {
  if (args.length < 3) return sendMessageAndDelete(message,"Syntaxe: !pass remove <site>");
  const site = args[2];
  if (!password[site])
    return sendMessageAndDelete(message,`❌ Aucune entrée pour **${site}**.`);

  // Vérifie le niveau d'autorisation
  const userRole = message.member.roles.cache.map(role => role.id)
  let accessLevel = 0;
  if (userRole.includes(process.env.ROLE_LEVEL_3)) accessLevel = process.env.SECURITY_LEVEL_3;
  else if (userRole.includes(process.env.ROLE_LEVEL_2)) accessLevel = process.env.SECURITY_LEVEL_2;
  else if (userRole.includes(process.env.ROLE_LEVEL_1)) accessLevel = process.env.SECURITY_LEVEL_1;
  else return sendMessageAndDelete(message,"❌ Vous n'avez pas les permissions de faire ça.");

  if (accessLevel < password[site].accessLevel) {
  sendMessageAndDelete(message,`❌ Vous n'avez pas les permissions de supprimer ces identifiants.`);
  console.log(`Utilisateur ${message.author.id} n'a pas les permissions de supprimer les identifiants de ${site}`);
  logUnauthorizedAccess(
    message.author.username,
    message.author.id,
    `remove:${site}`,
    `Niveau requis pour supprimer : ${password[site].accessLevel}, niveau utilisateur: ${userAccessl}`
  );
    return;
}

  delete password[site];
  fs.writeFileSync("./password.json", JSON.stringify(password, null, 2));
  sendMessageAndDelete(message,`🗑️ Entrée **${site}** supprimée.`);
};
