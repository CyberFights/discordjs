module.exports = {
  route: "/endpoints",
  method: "get",
  run: async (req, res, client) => {
    const endpoints = [];
    const queries = req.query;
    for (let ep of require("fs").readdirSync("./Routes")) {
      let e = require("./"+ep);

      endpoints.push({
        route: e.route,
        method: e.method
      })
    }

    res.json({
      endpoints,
      count: endpoints.length
    })
  },
};
