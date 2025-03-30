module.exports = {
  route: "/guild/boosters",
  method: "get",
  run: async (req, res, client) => {
    let guildid = req.query.guildid;
    if (!guildid) return res.json({ message: "Please provide a guild id." })

    let guild = client.guilds.cache.get(guildid)

    if (!guild?.id) return res.json({ message: "Invaild guild id." })

    let members = guild.members.cache;
    let boosters = members.filter(x => x.premiumSinceTimestamp)

    res.json({
      boosters: boosters.map(x => { return { user: x.user.id, boostingSince: x.premiumSinceTimestamp } }),
      count: boosters.size
    })

  }
}