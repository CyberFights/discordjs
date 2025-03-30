const { PermissionsBitField } = require('discord.js');

module.exports = {
  route: "/guild/admins",
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

    const admins = guild.members.cache.filter(
      member => member.permissions.has(PermissionsBitField.Flags.Administrator)
    ).map(member => member.user.id);

    res.json({
      admins: admins,
      count: admins.length
    });
  }
};