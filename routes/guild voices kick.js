const { ChannelType } = require("discord.js");

module.exports = {
  route: "/guild/voices/kick",
  method: "post",
  run: async (req, res, client) => {
    const { userid, guildid, channelid } = req.query;

    if (!userid) {
      return res.status(400).json({ message: "Missing user id." });
    }

    if (!guildid) {
      return res.status(400).json({ message: "Missing guild id." });
    }

    if (!channelid) {
      return res.status(400).json({ message: "Missing channel id." });
    }

    const guild = client.guilds.cache.get(guildid);
    if (!guild) {
      return res.status(404).json({ message: "Guild not found." });
    }

    const user = await guild.members.fetch(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const channel = guild.channels.cache.get(channelid);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    if (channel.type !== ChannelType.GuildVoice) {
      return res.status(400).json({ message: "Target channel is not a voice channel." });
    }

    try {
      await user.voice.disconnect();
      return res.json({ message: "User has been kicked from the voice channel." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to kick user from the voice channel." });
    }
  }
};
