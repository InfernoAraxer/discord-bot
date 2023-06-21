const express = require("express");
require('dotenv').config();
const app = express()

app.listen(3000, () => {
    console.log("Project is running");
})

app.get ("/", (req, res) => {
    res.send("Hello world!");
})

//Update Later
const Discord = require("discord.js");
const client = new Discord.Client({intents:["GUILDS", "GUILD_MESSAGES"]});

const fs = require("fs");
const prefix= "/";
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (file of commands) {
    const commandName = file.split(".")[0]
    const command = require(`./Commands/${commandName}`);
    client.commands.set(commandName, command);
}

client.on("messageCreate", message => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName);
        if (!command) return;
        command.run(client, message, args);
    }
})

client.login(process.env.DISCORD_TOKEN);

// // Define your command
// const myCommand = {
//     name: 'myCommand',
//     description: 'My custom command',
//     usage: '!myCommand <argument>', // Optional usage string
//     execute(message, args) {
//       // Your command logic goes here
//       message.channel.send(`Hello ${args}!`);
//     },
//   };
  
//   // Add your command to the command handler
//   client.commands.set(myCommand.name, myCommand);
  
//   // Update your help command (if applicable)
//   const helpCommand = {
//     name: 'help',
//     description: 'List all of my commands',
//     usage: '!help', // Optional usage string
//     execute(message, args) {
//       // Your help command logic goes here
//       const commandList = client.commands.map(command => command.name).join(', ');
//       message.channel.send(`Here's a list of all my commands: ${commandList}`);
//     },
//   };