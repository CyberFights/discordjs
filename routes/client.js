


module.exports = {
  route: "/client", // This will be the route of your api like " https://replname.username.repl.co/client "
  method: "get", // HTTP Method
  run: async (req,res,client) => { // Code to run
const Client = client.user, Application = client.application;

    Client.stats = {
      servers: client.guilds.cache.size,
      users: client.users.cache.size
    }
    Client.flags = Client.flags.toArray();
    Application.flags = Application.flags.toArray();

    res.json({
      client: Client,
      application: Application
    })
  }
}