import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client } from 'discord.js';

export async function registerPingCommand(client: Client) {
    await client.application?.commands.create(
        new SlashCommandBuilder().setName('ping').setDescription('Get the bot\'s API latency').toJSON()
    );
}

export async function handlePingInteraction(interaction: CommandInteraction) {
    if (interaction.commandName === 'ping') {
        const now = Date.now();
        const createdTimestamp = interaction.createdTimestamp;
        const ping = Math.abs(now - createdTimestamp);
        await interaction.reply(`API Latency: ${ping} ms`);
    }
}