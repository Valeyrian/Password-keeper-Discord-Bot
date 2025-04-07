const fs = require("fs");
const { encrypt } = require("../utils/crypto");
const {
  sendWithReactionAndAutoDelete,
  logUnauthorizedAccess,
  sendMessageAndDelete,
} = require("../utils/utils.js");


module.exports = (args, password, message) => {
  if (args.length < 7)
    return sendMessageAndDelete(message,"Syntaxe: !pass update <site> <login> <mdp> <clé> <security Level: 1 to 3 (3 is the higher)>");
  const [_, __, site, login, mdp, cle,newLevel] = args;
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
   sendMessageAndDelete(message,`❌ Vous n'avez pas les permissions de modifier ces identifiants.`);
    console.log(`Utilisateur ${message.author.id} n'a pas les permissions de modifier les identifiants de ${site}`);
    logUnauthorizedAccess(
      message.author.username,
      message.author.id,
      `modify:${site}`,
      `Niveau requis pour modifier : ${password[site].accessLevel}, niveau utilisateur: ${accessLevel}`
    );
    return;
  }
  
  if (newLevel > accessLevel)
  {
    sendMessageAndDelete(message,`❌ Vous ne pouvez pas donner un niveau d'accès supérieur au vôtre.`);
    console.log(`Utilisateur ${message.author.id} essaie de donner un niveau d'accès supérieur à ${site}`);
    logUnauthorizedAccess(
      message.author.username,
      message.author.id,
      `modify:${site}`,
      `Niveau requis pour modifier le niveau de scurite : ${password[site].accessLevel}, niveau utilisateur: ${accessLevel}`
    );
    return;
  }
  if (newLevel < 1 || newLevel > 3) {
    sendMessageAndDelete(message,`❌ Le niveau de sécurité doit être compris entre ${process.env.SECURITY_LEVEL_1} et ${process.env.ROLE_LEVEL_3}.`);
    return;
  }

  password[site] = {
    login: encrypt(login, cle),
    mdp: encrypt(mdp, cle),
    accessLevel: newLevel,
  };
  fs.writeFileSync("./password.json", JSON.stringify(password, null, 2));
  sendMessageAndDelete(message,`✅ Données mises à jour pour **${site}**.`);
};
