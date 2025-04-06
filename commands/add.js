const fs = require("fs");
const { encrypt } = require("../utils/crypto");
const { sendMessageAndDelete } = require("../utils/utils");

module.exports = (args, password, message) => {
  if (args.length < 6)
    return sendMessageAndDelete(message,"Syntaxe: !pass add <site> <login> <mdp> <clé>");

  const [_, __, site, login, mdp, cle] = args;
  password[site] = {
    login: encrypt(login, cle),
    mdp: encrypt(mdp, cle),
  };

  fs.writeFileSync("./password.json", JSON.stringify(password, null, 2));
  sendMessageAndDelete(message,`✅ Mot de passe pour **${site}** ajouté.`);
};
