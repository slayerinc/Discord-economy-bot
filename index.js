const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require('./config.json');

// Collections
client.commands = new Discord.Collection();

// Command handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`command loaded [${command.name}.js]`);
    client.commands.set(command.name, command);
}

// Events
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (!client.commands) return;
    if (!client.commands.has(cmd)) return;

    const command = client.commands.get(cmd);

    if (!command) return;

    command.execute(client, message, args);
});

client.on("ready", () => {
    client.user.setActivity("Economy Bot | e!help", {
        type: "WATCHING"
    });
    console.log("Economy Bot is ready!");
});

client.login(config.token);