module.exports = {
  route: "/channel/clone",
  method: "post",
  run: async (req,res,client) => {
    let guildid = req.body.guildid;
if(!guildid) return res.json({message:"Please provide a guild id."})

    let guild = client.guilds.cache.get(guildid)

    if(!guild?.id) return res.json({message:"Invaild guild id."})
    
    let channelid = req.body.channelid;
    if(!channelid) return res.json({message:"Please provide a channel id."})

    let channel = guild.channels.cache.get(channelid)

    if(!channel?.id) return res.json({message:"Invaild channel id."})

    try {
     let chnl = await channel.clone()
      res.json({message: "Channel succefully cloned.", clonedChannel: chnl});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to clone channel." });
    }
  }
}