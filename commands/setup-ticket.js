const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket')
        .setDescription('🎫 Configurez le système de tickets ! /setup-ticket')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option.setName('channel').setDescription('📝 Le canal où le système de tickets sera mis en place !').setRequired(true))
        .addRoleOption(option => option.setName('support-role').setDescription('👮‍♂️ Le rôle qui permettra de voir les tickets !').setRequired(true))
        .addChannelOption(option => option.setName('open-category').setDescription('📂 La catégorie dans laquelle les tickets seront ouverts !').setRequired(true))
        .addChannelOption(option => option.setName('close-category').setDescription('📂 La catégorie où les tickets seront fermés !').setRequired(true)),

    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const supportRole = interaction.options.getRole('support-role');
        const openCategory = interaction.options.getChannel('open-category');
        const closeCategory = interaction.options.getChannel('close-category');

        await interaction.deferReply({ ephemeral: true }); // This will defer the reply to the user, so the bot will not be "thinking" for a long time.

        // Check if the channel is a text channel.
        if (channel.type !== ChannelType.GuildText) return interaction.editReply({ embeds: [client.config.embeds.E('Le canal doit être un canal texte !')] });
        if (openCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [client.config.embeds.E('La catégorie ouverte doit être un canal de catégorie !')] });
        if (closeCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [client.config.embeds.E('La catégorie de fermeture doit être un canal de catégorie !')] });

        // Embeds
        const ticketEmbed = new EmbedBuilder()
            .setTitle('🎫 Ly Tickets')
            .setDescription('\`📝\` : Ouvrez un ticket en cliquant sur le bouton ci-dessous, un membre du staff viendras dès que possible posez toute vos questions.')
            .setColor(client.config.colors.info)
            .setTimestamp();

        // Buttons
        const ticketRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('open-ticket')
                    .setEmoji('🎫')
                    .setStyle(ButtonStyle.Secondary)
            );

        await channel.send({ embeds: [ticketEmbed], components: [ticketRow] }); // Send the embed and the button to the channel in line 16.

        const ticketData = {
            supportRoleID: supportRole.id,
            openCategoryID: openCategory.id,
            closeCategoryID: closeCategory.id
        }; // Create an object with the data.

        fs.writeFileSync(`ticket.json`, JSON.stringify(ticketData, null, 4)); // Write the data to the file.

        await interaction.editReply({ embeds: [client.config.embeds.S('🎫', 'Le système de tickets a été mis en place !')] }); // Edit the reply to the user.
    }
};