module.exports = {
  route: "/channel",
  method: "get",
  run: async (req,res,client) => {
    let guildid = req.query.guildid;
if(!guildid) return res.json({message:"Please provide a guild id."})

    let guild = client.guilds.cache.get(guildid)

    if(!guild?.id) return res.json({message:"Invaild guild id."})
    
    let channelid = req.query.channelid;
    if(!channelid) return res.json({message:"Please provide a channel id."})

    let channel = guild.channels.cache.get(channelid)

    if(!channel?.id) return res.json({message:"Invaild channel id."})
    let users = channel.members.map((m) => m.user.id);
    res.json({channel,users})
  }
}