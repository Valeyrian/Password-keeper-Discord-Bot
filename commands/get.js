const { decrypt } = require("../utils/crypto");
const { sendWithReactionAndAutoDelete } = require("../utils/utils.js");
const { sendMessageAndDelete } = require("../utils/utils.js");

module.exports = (args, password, message) => {
  if (args.length < 4) {
    sendMessageAndDelete(message,"Syntaxe: !pass get <site> <clé>");
    return;
  }
  const [_, __, site, cle] = args;

  if (!password[site])
    return sendMessageAndDelete(message,`❌ Aucune entrée pour **${site}**.`);

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
    sendMessageAndDelete(message,"❌ Clé incorrecte ou données corrompues.");
  }
};
