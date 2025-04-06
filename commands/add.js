const fs = require("fs");
const { encrypt } = require("../utils/crypto");
const { sendMessageAndDelete } = require("../utils/utils");

module.exports = (args, password, message) => {
  if (args.length < 6)
    return sendMessageAndDelete(message,"Syntaxe: !pass add <site> <login> <mdp> <clé>");

  const [_, __, site, login, mdp, cle] = args;

  // verifie le niveau d'autorisation
  const userRole = message.member.roles.cache.map(role => role.id)
  let accessLevel = 0;
  console.log(userRole);

  if (userRole.includes(process.env.ROLE_LEVEL_3)) accessLevel = process.env.SECURITY_LEVEL_3;
  else if (userRole.includes(process.env.ROLE_LEVEL_2)) accessLevel = process.env.SECURITY_LEVEL_2;
  else if (userRole.includes(process.env.ROLE_LEVEL_1)) accessLevel = process.env.SECURITY_LEVEL_1;
  else return sendMessageAndDelete(message,"❌ Vous n'avez pas les permissions de faire ça.");


  password[site] = {
    login: encrypt(login, cle),
    mdp: encrypt(mdp, cle),
    accessLevel: accessLevel,
  };

  fs.writeFileSync("./password.json", JSON.stringify(password, null, 2));
  sendMessageAndDelete(message,`✅ Mot de passe pour **${site}** ajouté.`);
};
