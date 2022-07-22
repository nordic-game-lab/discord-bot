const express = require("express");
const app = express();
const fs = require("fs");
const Discord = require("discord.js");
const { request } = require("express");
const prefix = "!";



const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: ["users"]
});
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./commands/${commandName}`)
  client.commands.set(commandName, command)
}

app.listen(3000, () => {
  console.log("Discord bot is online!");
})

app.get("/", (req, res) => {
  res.send("Hello world!");
})


client.on("messageCreate", message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    command.run(client, message, args)
  }
})



const discordtoken = process.env['token']

client.login(discordtoken);



