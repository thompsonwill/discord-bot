const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');

const config = require("./config.json");

client.once("ready", () => {
  console.log("Ready!");
});



function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.stringify(body))
    } else if(error){
        console.log(JSON.stringify(error))
    }
  }
  
client.on("message", (message) => {
  // console.log(message.content);
  message.embeds.forEach((embed) => {
    let options = {
        url: 'https://forum.fullyrad.io/posts.json',
        json: true,
        headers: {
            "Api-Key": process.env.discourse || config.discourse,
            "Api-Username": "rad_bot"
        },
        body: {
            "topic_id": 46,
            "raw": embed.url,
          }
    }
      console.log(embed.url)
      request.post(options, callback)
    // add this embed to the database, using embed.description, embed.fields, etc.
     // if there are no embeds, this code won't run.
 });
  
});

client.login(process.env.BOT_TOKEN || config.token);
