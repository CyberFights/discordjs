module.exports = {
  route: "/role",
  method: "get",
  run: async (req,res,client) => {
    let guildid = req.query.guildid;
if(!guildid) return res.json({message:"Please provide a guild id."})

    let guild = client.guilds.cache.get(guildid)

    if(!guild?.id) return res.json({message:"Invaild guild id."})
    
    let roleid = req.query.roleid;
    if(!roleid) return res.json({message:"Please provide a role id."})

    let role = guild.roles.cache.get(roleid)

    if(!role?.id) return res.json({message:"Invaild role id."})
    delete role.guild
let users = guild.members.cache.filter(m=>m.roles.cache.has(role.id))
    res.json({...role,...{users: users.map(x=>x.user.id)}})
  }
}