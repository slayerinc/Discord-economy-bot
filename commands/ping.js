const { 
    MessageEmbed
} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "ping",
    description: "Return's the api ping in ms",
    execute: async (client, message) => {
        await message.channel.send(`**Pong!** \`Ping is ${await client.ws.ping}ms\``);
    }
}