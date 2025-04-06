// Fonction utilitaire pour envoyer un message et le supprimer après 45 secondes
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
  deleteAfter = 600000
) {
  message.reply(content).then((sentMessage) => {
    // Ajouter la réaction ET ensuite créer le collecteur
    sentMessage.react(reactionEmoji).then(() => {
      // Créer un collecteur de réactions
      const filter = (reaction, user) => {
        return reaction.emoji.name === reactionEmoji && !user.bot;
      };

      const collector = sentMessage.createReactionCollector({
        filter,
        time: deleteAfter,
      });

      // Timeout pour suppression auto
      const botMessageTimeout = setTimeout(() => {
        sentMessage.delete().catch((error) => {
          if (error.code !== 10008) {
            console.error(
              "Erreur lors de la suppression du message du bot:",
              error
            );
          }
        });
      }, deleteAfter);

      collector.on("collect", (reaction, user) => {
        console.log(`✅ ${user.tag} a réagi avec ${reaction.emoji.name}`);
        clearTimeout(botMessageTimeout);
        sentMessage.delete().catch(console.error);
        collector.stop();
      });

      collector.on("end", (collected, reason) => {
        if (reason !== "user" && collected.size === 0) {
          console.log("⏰ Temps écoulé sans réaction.");
          clearTimeout(botMessageTimeout);
          sentMessage.delete().catch((error) => {
            if (error.code !== 10008) {
              console.error(
                "Erreur lors de la suppression du message du bot après expiration du délai:",
                error
              );
            }
          });
        } else {
          console.log(`Collecteur terminé pour la raison: ${reason}`);
        }
      });

      // Supprimer le message d’origine (de l’utilisateur) après le 5s
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
  });
}

module.exports = { 
  sendWithReactionAndAutoDelete, 
  sendMessageAndDelete 
};



