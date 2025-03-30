module.exports = {
  route: "/listmembers",
  method: "get",
  run: async (req,res,client) => {
    let guildid = req.query.guildid;
let sep = req.query.seperator;
if(!guildid) return res.json({message:"Please provide a guild id."})

    let guild = client.guilds.cache.get(guildid)

    if(!guild?.id) return res.json({message:"Invaild guild id."})

    
let list = guild.members.cache;

    let bots = [], humans = [];
    list.forEach(x=>{
      if(x.user.bot) {
        bots.push(x)
      } else {
        humans.push(x)
      }
    })

let r = {
  count: {
    humans: humans.length,
    bots: bots.length,
    total: [...humans,...bots].length
  },
  humans: humans.map(x=>x.user.id),
  bots: bots.map(x=>x.user.id)
}

    res.json(r)
  }
}