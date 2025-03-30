module.exports = {
  route: '/user',
  method: 'get',
  run: async (req, res, client) => {
    const userid = req.query.userid;
    if (!userid) {
      return res.status(400).json({ error: 'Please provide a user ID' });
    }

    const user = await client.users.fetch(userid);
    if (!user?.id) {
      return res.status(404).json({ error: 'User not found' });
    }

    

    return res.json(user)
  },
};
