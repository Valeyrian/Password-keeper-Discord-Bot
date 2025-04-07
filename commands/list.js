const { sendMessageAndDelete, sendWithReactionAndAutoDelete } = require("../utils/utils");

module.exports = (password, message) => {
  const sites = Object.entries(password);
  if (sites.length === 0)
    return sendMessageAndDelete(message, "Aucun site enregistré.");

  // Vérifie le niveau d'autorisation
  const userRole = message.member.roles.cache.map((role) => role.id);
  let accessLevel = 0;

  if (userRole.includes(process.env.ROLE_LEVEL_3))
    accessLevel = process.env.SECURITY_LEVEL_3;
  else if (userRole.includes(process.env.ROLE_LEVEL_2))
    accessLevel = process.env.SECURITY_LEVEL_2;
  else if (userRole.includes(process.env.ROLE_LEVEL_1))
    accessLevel = process.env.SECURITY_LEVEL_1;
  else
    return sendMessageAndDelete(
      message,
      "❌ Vous n'avez pas les permissions de faire ça."
    );

  // Filtre les sites en fonction du niveau d'accès de l'utilisateur
  const filteredSites = sites.filter(
    ([, details]) => details.accessLevel <= accessLevel
  );

  if (filteredSites.length === 0)
    return sendMessageAndDelete(message, "Aucun site enregistré.");

  sendWithReactionAndAutoDelete(
    message,
    "📚 Sites enregistrés :\n" +
      filteredSites
        .map(([siteName]) => `- ${siteName}`)
        .join("\n"),
    "✅"
  );
};
