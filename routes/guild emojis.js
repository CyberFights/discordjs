module.exports = {
  route: "/guild/emojis",
  method: "get",
  run: async (req,res,client) => {
    let guildid = req.query.guildid;
if(!guildid) return res.json({message:"Please provide a guild id."})

    let guild = client.guilds.cache.get(guildid)

    if(!guild?.id) return res.json({message:"Invaild guild id."})
    let emojis = guild.emojis.cache.map(x=>JSON.parse(JSON.stringify(x)))
    res.json(emojis)
  }
}