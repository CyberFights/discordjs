module.exports = {
  route: "/status",
  method: "get",
  run: async (req, res, client) => {
    const guilds = client.guilds.cache.size;
    const users = client.users.cache.size;
    const uptime = process.uptime();

    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime % 86400 / 3600);
    const minutes = Math.floor(uptime % 3600 / 60);
    const seconds = Math.floor(uptime % 60);

    const uptimeStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const usedMemory = process.memoryUsage().rss / 1024 / 1024;

    const ping = client.ws.ping;

    res.json({
      status: "Worked",
      message: "API is online and operational.",
      guilds: guilds,
      users: users,
      uptime: uptimeStr,
      memoryUsage: `${usedMemory.toFixed(2)} MB`,
      ping: `${ping} ms`
    });
  }
};
