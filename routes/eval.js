const beautify = require('beautify');
 const d = require("discord.js")
const {inspect} = require("util")
module.exports = {
  route: "/eval",
  method: "post",
  run: async (req,res,client) => {
    let { code } = req.body;

    let r;
    try {
      r=await eval(code)
    } catch (error) {
      r=error
    }
    let f;
    if (typeof r==="object") f=inspect(r); else f=r+""

res.json({
  return: f,
  code: beautify(code+'',{format:'js'})
})
    
  }
}