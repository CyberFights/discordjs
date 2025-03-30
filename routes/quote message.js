const { MessageEmbed } = require('discord.js');

module.exports = {
  route: "/message",
  method: "get",
  run: async (input, client) => {
    let data = {};

    const messageId = input.query.messageid;
    const guildId = input.query.guildid;
    const channelId = input.query.channelid;

    if (!messageId) {
      data = {
        status: 404,
        message: "No message id provided.",
      }
      return data;
    }

    if (!guildId) {
      data = {
        status: 404,
        message: "No guild id provided.",
      }
      return data;
    }

    if (!channelId) {
      data = {
        status: 404,
        message: "No channel id provided.",
      }
      return data;
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      data = {
        status: 404,
        message: "Invalid guild id.",
      }
      return data;
    }

    const channel = guild.channels.cache.get(channelId);
    if (!channel) {
      data = {
        status: 404,
        message: "Invalid channel id.",
      }
      return data;
    }

    const message = await channel.messages.fetch(messageId);
    if (!message) {
      data = {
        status: 404,
        message: "Could not find message.",
      }
      return data;
    }

    let image = null;
    if (!message.author.bot && message.attachments.size > 0) {
      const attachment = message.attachments.first();
      if (attachment.url) {
        image = attachment.url;
      }
    }

    let embed = null;
    if (message.embeds.length > 0) {
      embed = new MessageEmbed(message.embeds[0]);
    }

    data = {
      status: 200,
      message: "Message retrieved successfully.",
      return: {
        isEmbed: message.embeds.length > 0,
        image: image,
        ...embed ? { embed: embed.toJSON() } : {}
      }
    }

    return data;
  }
};
