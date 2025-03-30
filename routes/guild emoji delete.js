module.exports = {
  route: "/guild/emojidelete",
  method: "post",
  run: async (req, res, client) => {
    const { guildid, emojiid } = req.query;

    if (!guildid) {
      return res.status(400).json({ message: "Missing guild id." });
    }

    if (!emojiid) {
      return res.status(400).json({ message: "Missing emoji id." });
    }

    const guild = client.guilds.cache.get(guildid);
    if (!guild) {
      return res.status(404).json({ message: "Guild not found." });
    }

    try {
      const emoji = guild.emojis.cache.get(emojiid);
      if (!emoji) {
        return res.status(404).json({ message: "Emoji not found." });
      }
      await emoji.delete();
      return res.json({ message: `Emoji ${emoji.name} has been deleted.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete emoji." });
    }
  }
};
