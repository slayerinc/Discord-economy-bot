const { 
    MessageEmbed 
} = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports = {
    name: "bal",
    description: "See how much money you have",
    execute: async (client, message, args) => {
        const user = message.mentions.users.first();
        const MemberId = user ? user.id : message.author.id;

        if (fs.existsSync(`./data/coins_${message.guild.id}-${MemberId}.json`))
        {
            let bal = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`));
            const msgembed1 = new MessageEmbed()
                .setTitle("Balance")
                .setDescription(`${user ? `${user.username}'s ` : ""}Balance: \`${bal.coins}\` coins`)
                .setTimestamp()
                .setFooter("Powered by https://github.com/slayerinc");
            
            await message.channel.send(msgembed1);
        }else{
            fs.writeFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`, JSON.stringify({ coins: 0 }));
            let bal = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`));
            const msgembed1 = new MessageEmbed()
                .setTitle("bal")
                .setDescription(`${user ? `${user.username}'s ` : ""}Balance: \`${bal.coins}\` coins`)
                .setTimestamp()
                .setFooter("Powered by https://github.com/slayerinc");
            
            await message.channel.send(msgembed1);
        }
    }
}