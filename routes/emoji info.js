const { Permissions } = require('discord.js');

module.exports = {
  route: "/emojiinfo",
  method: "get",
  run: async (req, res, client) => {
    const guildId = req.query.guildid;
    if (!guildId) {
      return res.json({ message: "Please provide a guild id." });
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      return res.json({ message: "Invalid guild id." });
    }

    const emojiid = req.query.emojiid
    if (!emojiid) {
      return res.json({ message: "Please provide an emoji id." });
    }

    const emoji = guild.emojis.cache.get(emojiid);
    if (!emoji) {
      return res.json({ message: "Invalid emoji id." });
    }

res.json(emoji)

  }
};
