const {
    MessageEmbed
} = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports = {
    name: "remove",
    description: "Remove coins from your pocket",
    execute: async (client, message, args) => {
        const user = message.mentions.users.first();
        const CoinsToRemove = user ? parseInt(args[1]) : parseInt(args[0]);
        const MemberId = user ? user.id : message.author.id;

        if (!message.member.hasPermission("ADMINISTRATOR")) return;

        if (CoinsToRemove <= config.max.remove) {
            if (CoinsToRemove >= config.min.remove) {
                if (!isNaN(CoinsToRemove)) {
                    if (CoinsToRemove != null) {
                        if (fs.existsSync(`./data/coins_${message.guild.id}-${MemberId}.json`)) {
                            let bal = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`));
                            fs.writeFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`, JSON.stringify({
                                coins: bal.coins - CoinsToRemove
                            }));
                            let newbal = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`));
                        
                            const msgembed1 = new MessageEmbed()
                                .setTitle("Coins removed")
                                .setDescription(`Remove \`${CoinsToRemove}\` coins ${user ? user.username + "'s" : "your"} balance is:\n\`${newbal.coins}\` coins`)
                                .setTimestamp()
                                .setFooter("Powered by https://github.com/slayerinc");
                        
                            await message.channel.send(msgembed1);
                        }else{
                            fs.writeFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`, JSON.stringify({
                                coins: 0
                            }));      
                            let bal = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`));      
                            fs.writeFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`, JSON.stringify({
                                coins: bal.coins - CoinsToRemove
                            }));        
                            let newbal = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${MemberId}.json`));
                        
                            const msgembed2 = new MessageEmbed()
                                .setTitle("Coins removed")
                                .setDescription(`Remove \`${CoinsToRemove}\` coins ${user ? user.username + "'s" : "your"} balance is:\n\`${newbal.coins}\` coins`)
                                .setTimestamp()
                                .setFooter("Powered by https://github.com/slayerinc");
                        
                            await message.channel.send(msgembed2);
                        }
                    }else{
                        const msgembed6 = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("Error")
                            .setDescription("Number is null, Please try again!")
                            .setTimestamp()
                            .setFooter("Powered by https://github.com/slayerinc");

                        await message.channel.send(msgembed6);
                    }
                }else{
                    const msgembed5 = new MessageEmbed()
                        .setColor("RED")
                        .setTitle("Error")
                        .setDescription("Number is not a value, Please try again!")
                        .setTimestamp()
                        .setFooter("Powered by https://github.com/slayerinc");

                    await message.channel.send(msgembed5);
                }
            }else{
                const msgembed4 = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Error")
                    .setDescription(`Not enough coins were sent to be added,\nPlease try a number above \`${config.min.add}\` ${config.min.add > 1 ? "coins" : "coin"}`)
                    .setTimestamp()
                    .setFooter("Powered by https://github.com/slayerinc");

                await message.channel.send(msgembed4);
            }
        }else{
            const msgembed3 = new MessageEmbed()
                .setColor("RED")
                .setTitle("Error")
                .setDescription(`Too many coins were sent to be added,\nPlease try a number below \`${config.max.add}\` coins`)
                .setTimestamp()
                .setFooter("Powered by https://github.com/slayerinc");

            await message.channel.send(msgembed3);
        }
    }
}