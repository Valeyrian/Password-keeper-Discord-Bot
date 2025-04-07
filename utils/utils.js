const fs = require("fs");
const path = require("path");

// Fonction utilitaire pour envoyer un message et le supprimer après 30 secondes
function sendMessageAndDelete(message, content) {
  message.reply(content).then((sentMessage) => {
    // Supprimer le message après 30 secondes (30000ms)
    setTimeout(() => {
      sentMessage
        .delete()
        .catch((error) =>
          console.error(
            "Erreur lors de la suppression du message du bot:",
            error
          )
        );
    }, 30000);
  });

  // Supprimer le message de l'utilisateur après 30 secondes
  setTimeout(() => {
    message
      .delete()
      .catch((error) =>
        console.error(
          "Erreur lors de la suppression du message de l'utilisateur:",
          error
        )
      );
  }, 30000);
}

// utils.js
function sendWithReactionAndAutoDelete(
  message,
  content,
  reactionEmoji,
  deleteAfter = 600000 //10 minutes delays by default
) {
  message.author
    .send(content)
    .then((sentMessage) => {
      sentMessage.react(reactionEmoji).then(() => {
        const filter = (reaction, user) => {
          return (
            reaction.emoji.name === reactionEmoji &&
            user.id === message.author.id
          );
        };

        const collector = sentMessage.createReactionCollector({
          filter,
          time: deleteAfter,
        });

        const botMessageTimeout = setTimeout(() => {
          sentMessage.delete().catch((error) => {
            if (error.code !== 10008) {
              console.error("Erreur lors de la suppression du DM:", error);
            }
          });
        }, deleteAfter);

        collector.on("collect", (reaction, user) => {
          console.log(
            `✅ ${user.tag} a réagi avec ${reaction.emoji.name} (DM)`
          );
          clearTimeout(botMessageTimeout);
          sentMessage.delete().catch(console.error);
          collector.stop();
        });

        collector.on("end", (collected, reason) => {
          if (reason !== "user" && collected.size === 0) {
            console.log("⏰ Temps écoulé sans réaction (DM).");
            clearTimeout(botMessageTimeout);
            sentMessage.delete().catch((error) => {
              if (error.code !== 10008) {
                console.error(
                  "Erreur lors de la suppression du DM après expiration:",
                  error
                );
              }
            });
          } else {
            console.log(`Collecteur DM terminé pour la raison: ${reason}`);
          }
        });

        // Supprime le message original de l’utilisateur dans le salon (facultatif)
        setTimeout(() => {
          message.delete().catch((error) => {
            if (error.code !== 10008) {
              console.error(
                "Erreur lors de la suppression du message de l'utilisateur:",
                error
              );
            }
          });
        }, 5000);
      });
    })
    .catch((error) => {
      console.error("❌ Impossible d'envoyer un DM à l'utilisateur :", error);
      message.reply(
        "❌ Je ne peux pas t’envoyer de message privé. Active-les et réessaie."
      );
    });
}

function logUnauthorizedAccess(username, userId, commandType, reason) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ❌ ${username} (${userId}) a tenté "${commandType}" → ${reason}\n`;

  fs.appendFile(
    path.join(__dirname, "..", "unauthorized.log"),
    logLine,
    (err) => {
      if (err) console.error("Erreur de log :", err);
    }
  );
}

module.exports = { 
  sendWithReactionAndAutoDelete, 
  sendMessageAndDelete,
  logUnauthorizedAccess,
};



