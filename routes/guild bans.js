module.exports = {
  route: "/guild/bans",
  method: "get",
  run: async (req, res, client) => {
    const guildId = req.query.guildid;
    if (!guildId) {
      return res.status(400).json({ message: "Please provide a guild id." });
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      return res.status(404).json({ message: "Invalid guild id." });
    }

    try {
      const bans = await guild.bans.fetch();
      const banList = bans.map(ban => ({
        user: ban.user.id,
        reason: ban.reason,
      }));

      //console.log(bans)

      res.json({
        bans: banList,
        count: bans.size
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch bans." });
    }
  }
};
