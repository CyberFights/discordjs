module.exports = {
  route: "/reaction/remove",
  method: "post",
  run: async (req, res, client) => {
    const { messageid, reaction, userid } = req.body;

    if (!messageid) {
      return res.status(400).json({ message: "Missing message id." });
    }

    if (!reaction) {
      return res.status(400).json({ message: "Missing reaction." });
    }

    if (!userid) {
      return res.status(400).json({ message: "Missing user id." });
    }

    try {
      const message = await client.channels.cache
        .filter(channel => channel.type === "text")
        .map(async (channel) => {
         await channel.messages.fetch()
         return channel.messages.cache.get(messageid)
        })
        .find(m => m?.id);

      if (!message) {
        return res.status(404).json({ message: "Message not found." });
      }

      message.reactions.cache.forEach(async (r) => {
        if (r.emoji.name === reaction && r.users.cache.has(userid)) {
          await r.users.remove(userid);
        }
      });

      return res.json({ message: "Reaction removed successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to remove reaction." });
    }
  }
};
