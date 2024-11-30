import { CommandInteraction } from 'discord.js';

let startTime: number;

export const registerUptimeCommand = async (client: any) => {
    await client.application.commands.create({
        name: "uptime",
        description: "Get the bot's uptime",
    });
};

export const setStartTime = (start: number) => {
    startTime = start;
};

export const handleUptimeInteraction = async (interaction: CommandInteraction) => {
    const currentTime = Date.now();
    const uptime = currentTime - startTime;

    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

    await interaction.reply(`Uptime: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``);
};