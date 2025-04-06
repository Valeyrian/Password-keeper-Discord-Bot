const fs = require("fs");
const { sendMessageAndDelete } = require("../utils/utils");


module.exports = (args, password, message) => {
  if (args.length < 3) return sendMessageAndDelete(message,"Syntaxe: !pass remove <site>");
  const site = args[2];
  if (!password[site])
    return sendMessageAndDelete(message,`❌ Aucune entrée pour **${site}**.`);
  delete password[site];
  fs.writeFileSync("./password.json", JSON.stringify(password, null, 2));
  sendMessageAndDelete(message,`🗑️ Entrée **${site}** supprimée.`);
};
