const { sendMessageAndDelete, sendWithReactionAndAutoDelete } = require("../utils/utils");

module.exports = (password, message) => {
  const sites = Object.keys(password);
  if (sites.length === 0) return sendMessageAndDelete(message,"Aucun site enregistré.");
  sendWithReactionAndAutoDelete(
    message,
    "📚 Sites enregistrés :\n" + sites.map((s) => `- ${s}`).join("\n"),
    "✅"
  );
};
