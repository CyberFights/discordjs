

const express = require("express");
const app = express();
const fs = require("fs");
const chalk = require("chalk")

app.use(express.json())
module.exports = (client) => {

  app.get('/', (req,res) => {
    res.json({message:`Api ready with ${client.user.tag}`})
  })



fs.readdirSync("./routes/").filter(x=>x.endsWith('.js')).forEach(route => {
  let path = "./routes/"+route,
    data = require(path);
  app[data.method](data.route,(req,res)=>data.run(req,res,client))
let ce = {
  get: "green",
  post: "blue",
  delete: "red",
  put: "brightGreen"
}
console.log(`\tLoaded ${chalk[ce[data.method]].bold(data.method.toUpperCase())} ${chalk.grey(data.route)}`)
})

  
  
}




app.listen(4000, () => {})
