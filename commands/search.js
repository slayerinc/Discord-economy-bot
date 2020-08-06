const {
    MessageEmbed
} = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports = {
    name: "search",
    description: "Search for coins to put in your pocket",
    execute: async (client, message, args) => {
        // Check if player has coin file
        if (!fs.existsSync(`./data/coins_${message.guild.id}-${message.author.id}.json`)) {
            fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: 0 }));
        }

        // Chance for getting coins depending on the tier detected
        const SearchTierChance = Math.floor(Math.round((Math.random() * 100))) + 1;

        // Check if chance is in between 2 numbers
        let IsInBetween = (Chance, Number1, Number2) => {
            return Chance >= Number1 && Chance <= Number2;
        }

        // Setup tiers
        let Tiers = Object.freeze({
            Low: "Low",
            Medium: "Medium",
            High: "High"            
        });

        // Determine tier
        let SearchTier;

        if (IsInBetween(SearchTierChance, 1, 9)) {
            return await message.channel.send("You found nothing better luck next time! ¯\\_(ツ)_/¯");
        }else if (IsInBetween(SearchTierChance, 10, 49)) {
            SearchTier = Tiers.Low;
        }else if (IsInBetween(SearchTierChance, 50, 94)) {
            SearchTier = Tiers.Medium;
        }else if (IsInBetween(SearchTierChance, 95, 100)) {
            SearchTier = Tiers.High;
        }

        // Give coins based on tier
        const CoinIndex = Math.floor(Math.round(Math.random() * 4));

        // Set coin amounts
        let coinsLow = [ 4, 11, 17, 25, 31 ];
        let coinsMedium = [ 32, 39, 46, 58, 67 ];
        let coinsHigh = [ 89, 94, 121, 136, 164 ];

        // Get coin amounts
        let CoinsToAddLow = coinsLow[CoinIndex];
        let CoinsToAddMedium = coinsMedium[CoinIndex];
        let CoinsToAddHigh = coinsHigh[CoinIndex];

        // Get current coins
        let CurrentCoins = JSON.parse(fs.readFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`)).coins;

        // Get location
        let LocationIndex = Math.floor(Math.round(Math.random() * 2));
        let Location = [
            config.search.locations.garbage,
            config.search.locations.car,
            config.search.locations.house
        ];

        // Create embeds
        const LowCoinEmbed = new MessageEmbed(), MediumCoinEmbed = new MessageEmbed(), HighCoinEmbed = new MessageEmbed();

        // Config embeds
        LowCoinEmbed.setColor("GREEN").setTitle("Search").setDescription(`You searched ${Location[LocationIndex]} and found ${CoinsToAddLow} coins`)
        .setTimestamp().setFooter("Powered by https://github.com/slayerinc");
        MediumCoinEmbed.setColor("GREEN").setTitle("Search").setDescription(`You searched ${Location[LocationIndex]} and found ${CoinsToAddMedium} coins`)
        .setTimestamp().setFooter("Powered by https://github.com/slayerinc");
        HighCoinEmbed.setColor("GREEN").setTitle("Search").setDescription(`You searched ${Location[LocationIndex]} and found ${CoinsToAddHigh} coins`)
        .setTimestamp().setFooter("Powered by https://github.com/slayerinc");

        // Set coins to search
        switch (SearchTier)
        {
        case Tiers.Low:
            fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: CurrentCoins + CoinsToAddLow }));
            await message.channel.send(LowCoinEmbed);
            break;
        case Tiers.Medium:
            fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: CurrentCoins + CoinsToAddMedium }));
            await message.channel.send(MediumCoinEmbed);
            break;
        case Tiers.High:
            if (SearchTierChance == 100) {
                fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: CurrentCoins + 200 }));
                await message.channel.send(HighCoinEmbed);
            }else{
                fs.writeFileSync(`./data/coins_${message.guild.id}-${message.author.id}.json`, JSON.stringify({ coins: CurrentCoins + CoinsToAddHigh }));
                await message.channel.send(HighCoinEmbed);
            }
            break;
        }
    }
}