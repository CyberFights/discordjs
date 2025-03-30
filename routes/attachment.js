const d = require("discord.js"), fs = require("fs")

module.exports = {
  route: "/attachment",
  method: "post",
  run: async (req,res,client) => {
    let { channelId, content, name} = req.body;
if(!channelId) return res.json({message:"Please provide a channel id."})

let channel = client.channels.cache.get(channelId)
      
    if(!channel?.id) return res.json({message:"Invaild channel id."})
    
name = name ?? "attachment.txt"

    if(!content) return res.json({message:"Provide the content for the attachment."})
    
    function isValidURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
    

    let attachment;

    if(isValidURL(content)) {
      attachment = content
    } else {
      fs.writeFileSync("./"+name,content)
      attachment = "./"+name
    }




   let message = await channel.send({
      files: [{
        name, attachment
      }]
    })
    

    res.json(message)

    try{
fs.unlinkSync("./"+name)
    }catch(e) {
      
    }
    
  }
}