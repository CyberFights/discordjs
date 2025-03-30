module.exports = {
  route: '/member',
  method: 'get',
  run: async (req, res, client) => {
    const userId = req.query.userid;
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user id.' });
    }
const guildId = req.query.guildid;
    if (!guildId) {
      return res.status(400).json({ message: 'Please provide a guild id.' });
    }
    
let guild = client.guilds.cache.get(guildId)

    if(!guild?.id) return res.status(404).json({
      message: "Invaild Guild"
    })

let member = guild.members.cache.get(userId);
    if(!member?.id) return res.status(404).json({
      message: "User Not Found In The Guild"
    })

    return res.json(member)
  },
};
