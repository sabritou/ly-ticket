const { EmbedBuilder } = require('discord.js');

module.exports = {
    // client
    token: 'MTA2ODU3MzM4MzA4MTU5NTAzMg.GfOgbA.6Dk1i6b_HNkh2pnCXgFf1e1B0UJaXQy7kt6ezs',
    clientId: '1068573383081595032',
    guildId: '966704501111279646',

    // webhook
    webhooks: {
        error: {
            id: 'YOUR_WEBHOOK_ID',
            token: 'YOUR_WEBHOOK_TOKEN'
        }
    },

    // colors
    colors: {
        error: 0xFF0000,
        success: 0x00FF00,
        warning: 0xFFFF00,
        info: 0x0000FF,
    },

    // emojis
    emojis: {
        error: '⛔',
        success: '✅',
        warning: '⚠️',
        info: '📝',
    },

    // embed
    embeds: {
        E: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.error)
                .setDescription(`\`${module.exports.emojis.error}\` : ${description}`);
            return embed;
        },
        S: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.success)
                .setDescription(`\`${module.exports.emojis.success}\` : ${description}`);
            return embed;
        },
        Q: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.warning)
                .setDescription(`\`${module.exports.emojis.warning}\` : ${description}`);
            return embed;
        },
        I: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.info)
                .setDescription(`\`${module.exports.emojis.info}\` : ${description}`);
            return embed;
        },
        N: (emoji, description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.info)
                .setDescription(`\`${emoji}\` : ${description}`);
            return embed;
        }
    },
};