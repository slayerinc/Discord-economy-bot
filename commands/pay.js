const {
    MessageEmbed
} = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports = {
    name: "pay",
    description: "Send coins to someone",
    execute: async (client, message, args) => {
        const user = message.mentions.users.first();
        
        if (!user) return;

        const CoinsToSend = user ? parseInt(args[1]) : parseInt(args[0]);

        const msgembederror1 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription("Coin amount is not a number, try using a value between 1 - 99999").setTimestamp().setFooter(config.url);
        const msgembederror2 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription("Coin amount is not a number or value, please try again.").setTimestamp().setFooter(config.url);
        const msgembederror3 = new MessageEmbed()
        .setColor("RED").setTitle("Failed!").setDescription(`You dont have enough coins to send to ${user}`).setTimestamp().setFooter(config.url);

        if (!isNaN(CoinsToSend)) 
        {
            if (CoinsToSend !== null)
            {
                if (fs.existsSync(`./data/coins_${message.guild.id}-${message.author.id}.json`)) {
                    let get = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`));

                    if (!fs.existsSync(`./data/coins_${message.guild.id}-${user.id}.json`)) {
                        fs.writeFileSync(`./data/coins_${message.guild.id}-${user.id}.json`, JSON.stringify({ 
                            coins: 0 
                        }));
                    }

                    let userget = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${user.id}.json`));

                    if (get.coins < config.neededpayamount) return await message.channel.send(msgembederror3);

                    fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ 
                        coins: get.coins - CoinsToSend
                    }));
                    fs.writeFileSync(`./data/coins_${message.guild.id}-${user.id}.json`, JSON.stringify({ 
                        coins: userget.coins + CoinsToSend
                    }));
                    const msgembed1 = new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle("Success!")
                        .setDescription(`Successfully payed ${user} ${CoinsToSend} coins`)
                        .setTimestamp()
                        .setFooter(config.url);
                    
                    await message.channel.send(msgembed1);
                }else{
                    fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ 
                        coins: 0 
                    }));
                    if (!fs.existsSync(`./data/coins_${message.guild.id}-${user.id}.json`)) {
                        fs.writeFileSync(`./data/coins_${message.guild.id}-${user.id}.json`, JSON.stringify({ 
                            coins: 0 
                        }));
                    }
                    await message.channel.send(msgembederror3);
                }
            }else{
                await message.channel.send(msgembederror2);
            }
        }else{
            await message.channel.send(msgembederror1);
        }
    }
}