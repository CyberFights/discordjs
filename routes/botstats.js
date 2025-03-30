


module.exports = {
  route: "/botstats",
  method: "get",
  run: async (req,res,client) => {
    let stats = {
      reach: {
        users: client.users.cache.size,
        members: client.guilds.cache.map(x=>x.memberCount).reduce((a, b) => a + b, 0),
        guilds: client.guilds.cache.size,
        averageUsersPerGuild: Math.floor(client.guilds.cache.map(x=>x.memberCount).reduce((a, b) => a + b, 0)/client.guilds.cache.size),
        channels: client.channels.cache.size,
        roles: client.guilds.cache.map(x=>x.roles.cache.size).reduce((a, b) => a + b, 0),
        emojis: client.guilds.cache.map(x=>x.emojis.cache.size).reduce((a, b) => a + b, 0)
      },
      ping: client.ws.ping,
      uptime: client.uptime+"ms"
    }

    res.json(stats)
  }
}