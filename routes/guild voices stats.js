module.exports = {
  route: "/guild/voices/stats",
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

    res.json({
      voice: {
        count: guild.members.cache.filter((m) => m.voice.channel).size,
        users: guild.members.cache.filter((m) => m.voice.channel).map((m) => m.user.id)
      },
      deafened: {
        count: guild.members.cache.filter((m) => m.voice.channel && m.voice.deaf).size,
        users: guild.members.cache.filter((m) => m.voice.channel && m.voice.deaf).map((m) => m.user.id)
      },
      muted: {
        count: guild.members.cache.filter((m) => m.voice.channel && m.voice.mute).size,
        users: guild.members.cache.filter((m) => m.voice.channel && m.voice.mute).map((m) => m.user.id)
      },
      streaming: {
        count: guild.members.cache.filter((m) => m.voice.channel && m.voice.streaming).size,
        users: guild.members.cache.filter((m) => m.voice.channel && m.voice.streaming).map((m) => m.user.id)
      },
      video: {
        count: guild.members.cache.filter((m) => m.voice.channel && m.voice.selfVideo).size,
        users: guild.members.cache.filter((m) => m.voice.channel && m.voice.selfVideo).map((m) => m.user.id)
      }
    })
  }
};