module.exports = {
  route: "/guild",
  method: "get",
  run: async (req,res,client) => {
    let guildid = req.query.guildid;
if(!guildid) return res.json({message:"Please provide a guild id."})

    let guild = client.guilds.cache.get(guildid)

    if(!guild?.id) return res.json({message:"Invaild guild id."})
    guild.systemChannelFlags = guild.systemChannelFlags.toArray()

    res.json(guild)
  }
}