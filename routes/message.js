module.exports = {
  route: "/message",
  method: "get",
  run: async (req,res,client) => {
    let msgid = req.query.messageid, chnlid= req.query.channelid
if(!msgid) return res.json({message:"Please provide a message id."})
if(!chnlid) return res.json({message:"Please provide a channel id."})

let channel = client.channels.cache.get(chnlid)
      
    if(!channel?.id) return res.json({message:"Invaild channel id."})
    await channel.messages.fetch();

    let message = channel.messages.cache.get(msgid)
    if(!message?.id) return res.json({message:"Invaild message id"})
    message.attachments = message.attachments.map(x=>JSON.parse(JSON.stringify(x)))
    
    
    message.flags = message.flags.toArray()

    res.json(message)
  }
}