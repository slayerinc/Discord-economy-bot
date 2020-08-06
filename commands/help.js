const { 
    MessageEmbed 
} = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

function CreateHelpEmbed(title, description, footer, color) 
{
    // Declare new MessageEmbed type
    const HelpEmbed = new MessageEmbed();

    // Configure MessageEmbed through function paramaters
    HelpEmbed.setColor(color)
    HelpEmbed.setTitle(title ? `Help: ${title}` : "Help: Custom Command");
    HelpEmbed.setDescription(description ? description : "Custom Command");
    HelpEmbed.setTimestamp();
    HelpEmbed.setFooter(footer);

    // Return Embed
    return HelpEmbed;
}

module.exports = {
    name: "help",
    description: "Return's a list of commands in the economy bot",
    execute: async (client, message, args) => {
        const msgembed1 = new MessageEmbed()
            .setTitle("Help")
            .setTimestamp()
            .setFooter("Powered by https://github.com/slayerinc");

        // Fields - Rob someone of thier coins
        msgembed1.addField("ping", "Return's the api ping in ms");
        msgembed1.addField("bal", "See how much money you have");
        msgembed1.addField("add", "Add coins to your pocket");
        msgembed1.addField("remove", "Remove coins from your pocket");
        msgembed1.addField("rob", "Rob someone of thier coins");
        msgembed1.addField("search", "Search for coins to put in your pocket");

        // Help commands
        if (args[0]) {
            switch (args[0]) {
            case "ping":
                const embed1 = CreateHelpEmbed(
                    "ping", 
                    `Return's the api ping in ms\n
                    Usage: \`${config.prefix}ping\``, 
                    "Powered by https://github.com/slayerinc"
                ); await message.channel.send(embed1);
                break;
            case "bal":
                const embed2 = CreateHelpEmbed(
                    "bal", 
                    `See how much money you have\n
                    Usage: \`${config.prefix}bal optional: [user]\``, 
                    "Powered by https://github.com/slayerinc"
                ); await message.channel.send(embed2);
                break;
            case "add":
                const embed3 = CreateHelpEmbed(
                    "add", 
                    `Add coins to your pocket\n
                    Usage: \`${config.prefix}add optional: [user] required: [coins]\``, 
                    "Powered by https://github.com/slayerinc"
                ); await message.channel.send(embed3);
                break;
            }
        }else{
            await message.channel.send(msgembed1);
        }
    }
}