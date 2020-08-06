const {
    MessageEmbed
} = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "rob",
    category: "fun",
    description: "Rob someone of thier coins",
    execute: async (client, message) => {
        const user = message.mentions.users.first();

        if (!user) return;

        const chance = Math.floor(Math.round(Math.random() * 100)) + 1;

        if (!fs.existsSync(`./data/coins_${message.guild.id}-${message.author.id}.json`)) {
            fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: 0 }));
        }
        
        if (!fs.existsSync(`./data/coins_${message.guild.id}-${user.id}.json`)) {
            fs.writeFileSync(`./data/coins_${message.guild.id}-${user.id}.json`, JSON.stringify({ coins: 0 }));
        }

        let index = Math.floor(Math.round(Math.random() * 4));

        let Caught = [
            "You have been caught!",
            `While cracking open a safe, ${user} found you!`,
            `While going through ${user}'s wallet, you were caught!`,
            `A neighbor heard someone in ${user}'s and called the police\nAnd your were arrested!`
        ];

        let get = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`));
        let userget = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${user.id}.json`));

        const msgembederror1 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription("You can't rob the bot silly! ;P").setTimestamp().setFooter(config.url);
        const msgembederror2 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription("You can't rob yourself silly! ;P").setTimestamp().setFooter(config.url);
        const msgembederror3 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription("You dont have enough coins to rob someone! ;P").setTimestamp().setFooter(config.url);
        const msgembederror4 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription("User has too little money to be robbed! ;P").setTimestamp().setFooter(config.url);

        if (user == client.user) return await message.channel.send(msgembederror1);
        if (user == message.author) return await message.channel.send(msgembederror2);
        if (get.coins < config.neededrobamount) return await message.channel.send(msgembederror3);
        if (userget.coins < config.neededrobamount) return await message.channel.send(msgembederror4);

        if (chance >= 60) {
            let coinAmount = (chance - (Math.floor(Math.round(Math.random() * 2)) + 1)) * 2;

            fs.writeFileSync(`./data/coins_${message.guild.id}-${user.id}.json`, JSON.stringify({ coins: userget - coinAmount }));
            fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: get + coinAmount }));

            const msgembed2 = new MessageEmbed()
            .setColor("GREEN").setTitle("Sucess!").setDescription(`Successfully robbed ${user}!`).setTimestamp().setFooter(config.url);
            
            await message.channel.send(msgembed2);
        }else{
            const msgembed1 = new MessageEmbed()
            .setColor("RED").setTitle("Robbery Failed!").setDescription(`${Caught[index]}`).setTimestamp().setFooter(config.url);

            await message.channel.send(msgembed1);
        }
    }
}